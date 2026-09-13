/**
 * ocrClient.js — Client-Side In-Browser OCR & Table Processing Engine
 *
 * Architecture:
 *  1. Image validation & preprocessing via HTML5 Canvas (contrast boost, grayscale)
 *  2. Tesseract.js WebAssembly OCR with bounding box coordinates extraction
 *  3. Geometric Row & Column Table Reconstruction (tableExtractor.js)
 *  4. Generates formatted .xlsx via ExcelJS (excelGenerator.js)
 *  5. 100% Client-Side. Zero server uploads.
 */

import { reconstructTableFromOCR } from './tableExtractor';
import { generateExcelWorkbook } from './excelGenerator';

/**
 * Preprocess image for OCR using HTML5 Canvas
 */
async function preprocessForOCR(file) {
  let source = null;
  if (typeof createImageBitmap === 'function') {
    try {
      source = await createImageBitmap(file);
    } catch {
      // fallback
    }
  }

  if (!source) {
    await new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => { URL.revokeObjectURL(url); source = img; resolve(); };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image for OCR')); };
      img.src = url;
    });
  }

  const width = source.width || source.naturalWidth;
  const height = source.height || source.naturalHeight;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  // Draw original
  ctx.drawImage(source, 0, 0, width, height);

  // Apply Grayscale + Contrast Enhancement in-canvas
  const imgData = ctx.getImageData(0, 0, width, height);
  const d = imgData.data;

  // Simple adaptive contrast & grayscale
  for (let i = 0; i < d.length; i += 4) {
    const gray = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114);
    // Increase contrast
    const contrast = 1.25;
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    const enhanced = Math.min(255, Math.max(0, factor * (gray - 128) + 128));

    d[i] = enhanced;
    d[i + 1] = enhanced;
    d[i + 2] = enhanced;
  }

  ctx.putImageData(imgData, 0, 0);

  const processedDataUrl = canvas.toDataURL('image/png');
  return { processedDataUrl, width, height };
}

/**
 * Main function: Extract table data from Image file
 *
 * @param {File} file - JPG, JPEG, PNG
 * @param {Function} onProgress - Callback for status updates
 * @returns {Promise<{
 *   headers: string[],
 *   rows: string[][],
 *   rowCount: number,
 *   colCount: number,
 *   rawText: string
 * }>}
 */
export async function extractTableFromImage(file, onProgress = () => {}) {
  // Step 1: Preprocessing
  onProgress({ step: 'preprocess', message: 'Enhancing image clarity & contrast…', progress: 15 });
  const { processedDataUrl, width, height } = await preprocessForOCR(file);

  // Step 2: Load Tesseract.js dynamically
  onProgress({ step: 'loading_ocr', message: 'Initializing AI OCR engine…', progress: 30 });
  const { createWorker } = await import('tesseract.js');

  const worker = await createWorker('eng', 1, {
    logger: (m) => {
      if (m.status === 'recognizing text') {
        const p = Math.round(30 + (m.progress || 0) * 45);
        onProgress({ step: 'ocr', message: `Recognizing table text (${Math.round((m.progress || 0) * 100)}%)…`, progress: p });
      }
    },
  });

  // Step 3: Run recognition
  onProgress({ step: 'ocr', message: 'Extracting text and coordinate boundaries…', progress: 50 });
  const ocrResult = await worker.recognize(processedDataUrl);
  await worker.terminate();

  // Step 4: Reconstruct Table Grid
  onProgress({ step: 'table_structure', message: 'Reconstructing table rows and columns…', progress: 85 });
  const { headers, rows } = reconstructTableFromOCR(ocrResult, width, height);

  const colCount = Math.max(
    headers.length,
    ...rows.map((r) => r.length),
    0
  );
  const rowCount = (headers.length > 0 ? 1 : 0) + rows.length;

  if (colCount === 0 || (headers.length === 0 && rows.length === 0)) {
    throw new Error(
      "We couldn't detect a clear table in this image. Please ensure the image has legible text and clear rows or borders."
    );
  }

  onProgress({ step: 'done', message: 'Table extraction complete!', progress: 100 });

  return {
    headers,
    rows,
    rowCount,
    colCount,
    rawText: ocrResult.data?.text || '',
  };
}

/**
 * Generate .xlsx Blob from headers & rows
 */
export async function exportTableToXlsx(headers, rows) {
  return await generateExcelWorkbook({ headers, rows });
}
