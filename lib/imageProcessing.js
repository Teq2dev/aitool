/**
 * imageProcessing.js — Professional Client-Side Image Compression Engine
 *
 * Principle:
 *  - Same Format In -> Same Format Out
 *    - JPG in  -> Compressed JPG out (DCT re-encoding + EXIF cleanup)
 *    - PNG in  -> Compressed PNG out (TinyPNG-grade UPNG 256/128-color palette quantization)
 *    - WebP in -> Compressed WebP out (Modern WebP lossy encoding)
 *  - Conversion is ONLY performed when explicitly requested by dedicated conversion routes (e.g. PNG to JPG).
 *  - 100% Client-Side. Zero server uploads.
 */

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

export const MIME_TO_EXT = {
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp',
};

export const EXT_TO_MIME = {
  jpg:  'image/jpeg',
  jpeg: 'image/jpeg',
  png:  'image/png',
  webp: 'image/webp',
};

export const ACCEPTED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
export const ACCEPTED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp']);

export const QUALITY_PRESETS = {
  low:    88, // Best Quality (Near-Lossless)
  medium: 80, // Balanced (Default)
  high:   65, // Max Compression
};

// ─── Validation ───────────────────────────────────────────────────────────────
export function validateImageFile(file) {
  if (!file) return { valid: false, error: 'No file provided.' };
  const ext    = file.name.split('.').pop()?.toLowerCase();
  const mimeOk = ACCEPTED_MIME_TYPES.has(file.type);
  const extOk  = ACCEPTED_EXTENSIONS.has(ext);
  if (!mimeOk && !extOk) {
    return { valid: false, error: `Unsupported format (.${ext || 'unknown'}). Please upload JPG, PNG, or WebP.` };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 50 MB.` };
  }
  return { valid: true };
}

export function getFileMime(file) {
  if (ACCEPTED_MIME_TYPES.has(file.type)) return file.type;
  const ext = file.name.split('.').pop()?.toLowerCase();
  return EXT_TO_MIME[ext] || 'image/jpeg';
}

// ─── Canvas Helper ────────────────────────────────────────────────────────────
async function fileToCanvas(file, withAlpha = true) {
  let source = null;
  let isBitmap = false;

  if (typeof createImageBitmap === 'function') {
    try {
      source = await createImageBitmap(file);
      isBitmap = true;
    } catch {
      // fallback
    }
  }

  if (!source) {
    await new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => { URL.revokeObjectURL(url); source = img; resolve(); };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to decode image.')); };
      img.src = url;
    });
  }

  const width  = isBitmap ? source.width  : (source.naturalWidth  || source.width);
  const height = isBitmap ? source.height : (source.naturalHeight || source.height);

  const canvas = document.createElement('canvas');
  canvas.width  = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d', { alpha: withAlpha });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (!withAlpha) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(source, 0, 0, width, height);
  if (isBitmap && source.close) source.close();

  return { canvas, ctx, width, height };
}

function canvasToBlob(canvas, mime, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b || null), mime, quality);
  });
}

// ─── BIC (browser-image-compression) ──────────────────────────────────────────
async function bicCompress(file, targetMime, qualityFraction) {
  try {
    const mod = await import('browser-image-compression');
    const fn = mod.default || mod;
    if (typeof fn !== 'function') return null;

    const result = await fn(file, {
      initialQuality: qualityFraction,
      maxSizeMB: 9999,
      alwaysKeepResolution: true,
      useWebWorker: true,
      fileType: targetMime,
    });
    return result;
  } catch (err) {
    console.warn('BIC compression fallback:', err.message);
    return null;
  }
}

// ─── UPNG (TinyPNG-grade Palette Quantization) ─────────────────────────────────
async function upngCompress(file, qualityFraction) {
  try {
    const mod = await import('upng-js');
    const UPNG = mod.default || mod;
    const { ctx, width, height } = await fileToCanvas(file, true);
    const imageData = ctx.getImageData(0, 0, width, height);

    // cnum: 256 colors for balanced / best quality (TinyPNG standard), 128 for max compression
    const cnum = qualityFraction < 0.70 ? 128 : 256;
    const encoded = UPNG.encode([imageData.data.buffer], width, height, cnum);
    return new Blob([encoded], { type: 'image/png' });
  } catch (err) {
    console.warn('UPNG compression fallback:', err.message);
    return null;
  }
}

// ─── Main Compression Function ────────────────────────────────────────────────
/**
 * Process and compress an image file while strictly preserving its original format.
 *
 * @param {File} file
 * @param {object} options
 * @param {number} [options.quality=0.80] - Quality 0 to 1
 * @param {string|null} [options.outputMime=null] - null = Keep original format, or explicit target MIME for converters
 * @returns {Promise<{
 *   blob: Blob|File,
 *   width: number,
 *   height: number,
 *   originalSize: number,
 *   compressedSize: number,
 *   reduced: boolean,
 *   reductionPct: number,
 *   outputMime: string,
 *   method: string,
 * }>}
 */
export async function processImage(file, { quality = 0.80, outputMime = null } = {}) {
  const inputMime = getFileMime(file);
  // Strictly enforce same format unless explicit outputMime is provided for converter pages
  const targetMime = outputMime || inputMime;
  const originalSize = file.size;
  const q = Math.max(0.10, Math.min(1.0, quality));

  const candidates = [];
  const push = (blob, mime, method) => {
    if (blob && blob.size > 0) candidates.push({ blob, mime, method });
  };

  // Dimensions
  let width = 0, height = 0;
  try {
    const bmp = await createImageBitmap(file);
    width = bmp.width;
    height = bmp.height;
    bmp.close();
  } catch {
    // Non-fatal
  }

  // Pre-generate canvases
  let canvasRGBA = null;
  let canvasFlat = null;

  const getRGBA = async () => {
    if (!canvasRGBA) canvasRGBA = await fileToCanvas(file, true);
    return canvasRGBA;
  };

  const getFlat = async () => {
    if (!canvasFlat) canvasFlat = await fileToCanvas(file, false);
    return canvasFlat;
  };

  // ── Format-Specific Compression ─────────────────────────────────────────────

  if (targetMime === 'image/jpeg') {
    // 1. JPEG: Multi-pass DCT + EXIF strip via BIC
    const bicJ = await bicCompress(file, 'image/jpeg', q);
    push(bicJ, 'image/jpeg', 'bic-jpeg');

    // 2. Canvas JPEG fallback
    const { canvas } = await getFlat();
    const cvJ = await canvasToBlob(canvas, 'image/jpeg', q);
    push(cvJ, 'image/jpeg', 'canvas-jpeg');

    // 3. Tighter quality step if still not smaller
    if (q > 0.50) {
      const cvJTight = await canvasToBlob(canvas, 'image/jpeg', Math.max(0.35, q * 0.80));
      push(cvJTight, 'image/jpeg', 'canvas-jpeg-tight');
    }
  } else if (targetMime === 'image/png') {
    // 1. TinyPNG-grade UPNG 256/128-color palette quantization (preserves transparency)
    const upngB = await upngCompress(file, q);
    push(upngB, 'image/png', 'upng');

    // 2. Canvas PNG fallback
    const { canvas } = await getRGBA();
    const cvP = await canvasToBlob(canvas, 'image/png', 1.0);
    push(cvP, 'image/png', 'canvas-png');
  } else if (targetMime === 'image/webp') {
    // 1. WebP via BIC
    const bicW = await bicCompress(file, 'image/webp', q);
    push(bicW, 'image/webp', 'bic-webp');

    // 2. Canvas WebP fallback
    const { canvas } = await getRGBA();
    const cvW = await canvasToBlob(canvas, 'image/webp', q);
    push(cvW, 'image/webp', 'canvas-webp');
  }

  // ── Winner Selection (Strictly among same-format candidates) ─────────────────
  const winners = candidates
    .filter((c) => c.blob && c.blob.size < originalSize)
    .sort((a, b) => a.blob.size - b.blob.size);

  const best = winners[0] || null;

  if (best) {
    const compressedSize = best.blob.size;
    const reductionPct = Math.round(((originalSize - compressedSize) / originalSize) * 100);
    return {
      blob: best.blob,
      width,
      height,
      originalSize,
      compressedSize,
      reduced: true,
      reductionPct,
      outputMime: targetMime,
      method: best.method,
    };
  }

  // If already optimal, return original file with honesty
  return {
    blob: file,
    width,
    height,
    originalSize,
    compressedSize: originalSize,
    reduced: false,
    reductionPct: 0,
    outputMime: targetMime,
    method: 'none',
  };
}

// ─── Utilities ────────────────────────────────────────────────────────────────
export function generateOutputFilename(originalName, outputMime) {
  const base = originalName.replace(/\.[^.]+$/, '');
  const ext  = MIME_TO_EXT[outputMime] || 'jpg';
  return `${base}-compressed.${ext}`;
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export async function checkWebPEncodeSupport() {
  try {
    const c = document.createElement('canvas');
    c.width = 1; c.height = 1;
    const blob = await new Promise((r) => c.toBlob(r, 'image/webp', 0.8));
    return blob !== null && blob.type === 'image/webp';
  } catch {
    return false;
  }
}

// ─── Image Dimensions Helper ──────────────────────────────────────────────────
export async function getImageDimensions(file) {
  try {
    if (typeof createImageBitmap === 'function') {
      const bmp = await createImageBitmap(file);
      const res = { width: bmp.width, height: bmp.height };
      bmp.close();
      return res;
    }
  } catch {
    // fallback
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth || img.width, height: img.naturalHeight || img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image metadata.'));
    };
    img.src = url;
  });
}

// ─── Resize Image ─────────────────────────────────────────────────────────────
/**
 * Resize an image file by dimensions or scaling factor.
 */
export async function resizeImage(file, {
  targetWidth,
  targetHeight,
  quality = 0.85,
  outputMime = null,
} = {}) {
  const inputMime = getFileMime(file);
  const targetMime = outputMime || inputMime;
  const withAlpha = targetMime !== 'image/jpeg';

  const { canvas: srcCanvas, width: origW, height: origH } = await fileToCanvas(file, withAlpha);

  const destW = Math.max(1, Math.round(targetWidth || origW));
  const destH = Math.max(1, Math.round(targetHeight || origH));

  const outCanvas = document.createElement('canvas');
  outCanvas.width = destW;
  outCanvas.height = destH;
  const ctx = outCanvas.getContext('2d', { alpha: withAlpha });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (!withAlpha) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, destW, destH);
  }

  ctx.drawImage(srcCanvas, 0, 0, origW, origH, 0, 0, destW, destH);

  const blob = await canvasToBlob(outCanvas, targetMime, quality);
  return {
    blob,
    width: destW,
    height: destH,
    originalWidth: origW,
    originalHeight: origH,
    originalSize: file.size,
    outputSize: blob.size,
    outputMime: targetMime,
  };
}

// ─── Crop Image ───────────────────────────────────────────────────────────────
/**
 * Crop an image file to the specified pixel rectangle.
 */
export async function cropImage(file, {
  cropX = 0,
  cropY = 0,
  cropWidth,
  cropHeight,
  quality = 0.90,
  outputMime = null,
} = {}) {
  const inputMime = getFileMime(file);
  const targetMime = outputMime || inputMime;
  const withAlpha = targetMime !== 'image/jpeg';

  const { canvas: srcCanvas, width: origW, height: origH } = await fileToCanvas(file, withAlpha);

  const x = Math.max(0, Math.min(origW - 1, Math.round(cropX)));
  const y = Math.max(0, Math.min(origH - 1, Math.round(cropY)));
  const w = Math.max(1, Math.min(origW - x, Math.round(cropWidth || origW)));
  const h = Math.max(1, Math.min(origH - y, Math.round(cropHeight || origH)));

  const outCanvas = document.createElement('canvas');
  outCanvas.width = w;
  outCanvas.height = h;
  const ctx = outCanvas.getContext('2d', { alpha: withAlpha });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (!withAlpha) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
  }

  ctx.drawImage(srcCanvas, x, y, w, h, 0, 0, w, h);

  const blob = await canvasToBlob(outCanvas, targetMime, quality);
  return {
    blob,
    width: w,
    height: h,
    originalWidth: origW,
    originalHeight: origH,
    originalSize: file.size,
    outputSize: blob.size,
    outputMime: targetMime,
  };
}

// ─── Rotate & Flip Image ──────────────────────────────────────────────────────
/**
 * Rotate an image by angle (0, 90, 180, 270) and optionally flip horizontally / vertically.
 */
export async function rotateAndFlipImage(file, {
  angle = 0,
  flipH = false,
  flipV = false,
  quality = 0.90,
  outputMime = null,
} = {}) {
  const inputMime = getFileMime(file);
  const targetMime = outputMime || inputMime;
  const withAlpha = targetMime !== 'image/jpeg';

  const { canvas: srcCanvas, width: origW, height: origH } = await fileToCanvas(file, withAlpha);

  const normAngle = ((angle % 360) + 360) % 360;
  const isPerpendicular = normAngle === 90 || normAngle === 270;

  const destW = isPerpendicular ? origH : origW;
  const destH = isPerpendicular ? origW : origH;

  const outCanvas = document.createElement('canvas');
  outCanvas.width = destW;
  outCanvas.height = destH;
  const ctx = outCanvas.getContext('2d', { alpha: withAlpha });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (!withAlpha) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, destW, destH);
  }

  ctx.save();
  // Move context to center
  ctx.translate(destW / 2, destH / 2);
  // Apply rotation
  ctx.rotate((normAngle * Math.PI) / 180);
  // Apply flips
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  // Draw image centered
  ctx.drawImage(srcCanvas, -origW / 2, -origH / 2);
  ctx.restore();

  const blob = await canvasToBlob(outCanvas, targetMime, quality);
  return {
    blob,
    width: destW,
    height: destH,
    originalWidth: origW,
    originalHeight: origH,
    originalSize: file.size,
    outputSize: blob.size,
    outputMime: targetMime,
    angle: normAngle,
    flipH,
    flipV,
  };
}

// ─── Universal Convert Image ──────────────────────────────────────────────────
/**
 * Convert any supported image (JPG, PNG, WebP) to target format (jpg, png, webp).
 */
export async function convertImage(file, {
  targetFormat = 'png',
  quality = 0.85,
} = {}) {
  const targetMime = EXT_TO_MIME[targetFormat.toLowerCase()] || 'image/png';
  const withAlpha = targetMime !== 'image/jpeg';

  const { canvas: srcCanvas, width, height } = await fileToCanvas(file, withAlpha);

  const outCanvas = document.createElement('canvas');
  outCanvas.width = width;
  outCanvas.height = height;
  const ctx = outCanvas.getContext('2d', { alpha: withAlpha });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (!withAlpha) {
    // Fill white background for transparent formats being converted to JPEG
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(srcCanvas, 0, 0);

  const blob = await canvasToBlob(outCanvas, targetMime, quality);
  return {
    blob,
    width,
    height,
    originalSize: file.size,
    outputSize: blob.size,
    outputMime: targetMime,
    targetFormat: targetFormat.toLowerCase(),
  };
}

export { formatBytes } from '@/lib/utils';

