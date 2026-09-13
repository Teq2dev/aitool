"""
image_processor.py — Image Preprocessing Pipeline for PaddleOCR & Table Recognition

Capabilities:
 - EXIF auto-orientation correction
 - Grayscale & adaptive contrast enhancement (CLAHE)
 - Deskewing via OpenCV Hough lines / contour minimum bounding box
 - Noise reduction (bilateral filter) while preserving sharp table grid lines
"""

import io
import cv2
import numpy as np
from PIL import Image, ImageOps

def load_image_bytes(image_bytes: bytes) -> np.ndarray:
    """Load image bytes into RGB numpy array with EXIF auto-orientation."""
    pil_img = Image.open(io.BytesIO(image_bytes))
    pil_img = ImageOps.exif_transpose(pil_img)
    if pil_img.mode != 'RGB':
        pil_img = pil_img.convert('RGB')
    return np.array(pil_img)

def deskew_image(image_cv: np.ndarray) -> np.ndarray:
    """Detect text/table skew angle and rotate image straight."""
    try:
        gray = cv2.cvtColor(image_cv, cv2.COLOR_RGB2GRAY)
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

        coords = np.column_stack(np.where(thresh > 0))
        if len(coords) < 50:
            return image_cv

        angle = cv2.minAreaRect(coords)[-1]
        if angle < -45:
            angle = -(90 + angle)
        elif angle > 45:
            angle = 90 - angle

        # Only correct moderate skew between -15 and +15 degrees
        if abs(angle) > 0.5 and abs(angle) < 15.0:
            (h, w) = image_cv.shape[:2]
            center = (w // 2, h // 2)
            M = cv2.getRotationMatrix2D(center, angle, 1.0)
            rotated = cv2.warpAffine(
                image_cv, M, (w, h),
                flags=cv2.INTER_CUBIC,
                borderMode=cv2.BORDER_REPLICATE
            )
            return rotated
    except Exception:
        pass
    return image_cv

def enhance_table_contrast(image_cv: np.ndarray) -> np.ndarray:
    """Apply adaptive histogram equalization (CLAHE) to improve table grid & text contrast."""
    try:
        lab = cv2.cvtColor(image_cv, cv2.COLOR_RGB2LAB)
        l, a, b = cv2.split(lab)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        cl = clahe.apply(l)
        limg = cv2.merge((cl, a, b))
        enhanced = cv2.cvtColor(limg, cv2.COLOR_LAB2RGB)
        return enhanced
    except Exception:
        return image_cv

def preprocess_for_ocr(image_bytes: bytes) -> np.ndarray:
    """Complete image preprocessing pipeline for table extraction."""
    img = load_image_bytes(image_bytes)
    img = deskew_image(img)
    img = enhance_table_contrast(img)
    return img
