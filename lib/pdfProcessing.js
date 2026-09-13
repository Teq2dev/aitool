/**
 * Internal PDF Processing Abstraction Layer for BestAIToolsFree.
 * All PDF processing is encapsulated behind our internal PDF processing abstraction layer.
 * All operations execute locally in the user's browser memory (zero server uploads).
 */

import { PDF_CONFIG } from './pdfConfig';

/**
 * Validate PDF file before processing.
 */
export function validatePdfFile(file) {
  if (!file) return { valid: false, error: 'No file provided.' };

  const ext = file.name.split('.').pop()?.toLowerCase();
  const isPdf = file.type === 'application/pdf' || ext === 'pdf';

  if (!isPdf) {
    return {
      valid: false,
      error: `Unsupported format (.${ext || 'unknown'}). Please upload a standard PDF document.`,
    };
  }

  if (file.size > PDF_CONFIG.maxFileSizeBytes) {
    const mb = (file.size / 1024 / 1024).toFixed(1);
    const limitMb = (PDF_CONFIG.maxFileSizeBytes / 1024 / 1024).toFixed(0);
    return {
      valid: false,
      error: `File is too large (${mb} MB). Maximum supported size for browser processing is ${limitMb} MB.`,
    };
  }

  return { valid: true };
}

/**
 * Trigger download from a Blob and automatically revoke object URL.
 */
export function downloadPdfBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 6000);
}

/**
 * Dynamic lazy-loader for pdf-lib (keeps bundle light on non-PDF pages).
 */
async function getPdfLib() {
  const pdfLib = await import('pdf-lib');
  return pdfLib.default || pdfLib;
}

/**
 * Dynamic lazy-loader for pdfjs-dist.
 */
async function getPdfJs() {
  const pdfjsLib = await import('pdfjs-dist/build/pdf');
  if (typeof window !== 'undefined') {
    // Serve worker from our own domain — no external CDN round-trip
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';
  }
  return pdfjsLib;
}

/**
 * 1. MERGE PDFS
 * Combines multiple PDF files into one in the specified order.
 * @param {File[]} files
 * @param {Function} [onProgress]
 * @returns {Promise<{ blob: Blob, pageCount: number, size: number }>}
 */
export async function mergePDFs(files, onProgress) {
  const { PDFDocument } = await getPdfLib();
  const mergedDoc = await PDFDocument.create();

  let totalPages = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (onProgress) onProgress(Math.round(((i + 1) / files.length) * 90));

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageIndices = pdf.getPageIndices();
    totalPages += pageIndices.length;

    const copiedPages = await mergedDoc.copyPages(pdf, pageIndices);
    copiedPages.forEach((page) => mergedDoc.addPage(page));
  }

  const bytes = await mergedDoc.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });
  if (onProgress) onProgress(100);

  return { blob, pageCount: totalPages, size: blob.size };
}

/**
 * 2. SPLIT PDF
 * Splits a PDF by custom page ranges (e.g., "1-3, 5") or into individual pages.
 * @param {File} file
 * @param {object} options
 * @param {'ranges' | 'all' | 'selected'} options.mode
 * @param {string} [options.rangeString]
 * @param {number[]} [options.selectedPages] - 1-indexed page numbers
 * @returns {Promise<{ blob?: Blob, pages?: Array<{ pageNumber: number, blob: Blob }> }>}
 */
export async function splitPDF(file, { mode = 'ranges', rangeString = '', selectedPages = [] } = {}) {
  const { PDFDocument } = await getPdfLib();
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();

  if (mode === 'all') {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      const singleDoc = await PDFDocument.create();
      const [copiedPage] = await singleDoc.copyPages(srcPdf, [i]);
      singleDoc.addPage(copiedPage);
      const bytes = await singleDoc.save();
      pages.push({
        pageNumber: i + 1,
        blob: new Blob([bytes], { type: 'application/pdf' }),
      });
    }
    return { pages };
  }

  const targetIndices = new Set();

  if (mode === 'selected' && selectedPages.length > 0) {
    selectedPages.forEach((p) => {
      if (p >= 1 && p <= totalPages) targetIndices.add(p - 1);
    });
  } else if (mode === 'ranges' && rangeString) {
    const parts = rangeString.split(',').map((p) => p.trim()).filter(Boolean);
    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim());
        const start = Math.max(1, parseInt(startStr, 10));
        const end = Math.min(totalPages, parseInt(endStr, 10));
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let p = start; p <= end; p++) targetIndices.add(p - 1);
        }
      } else {
        const p = parseInt(part, 10);
        if (!isNaN(p) && p >= 1 && p <= totalPages) targetIndices.add(p - 1);
      }
    }
  }

  const indicesToCopy = Array.from(targetIndices).sort((a, b) => a - b);
  if (indicesToCopy.length === 0) {
    throw new Error('No valid pages found in the specified range.');
  }

  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(srcPdf, indicesToCopy);
  copiedPages.forEach((page) => newDoc.addPage(page));

  const bytes = await newDoc.save();
  return { blob: new Blob([bytes], { type: 'application/pdf' }) };
}

/**
 * 3. ROTATE PDF
 * Rotates pages by 90, 180, or 270 degrees.
 * @param {File} file
 * @param {object} options
 * @param {number} options.angle - 90, 180, 270
 * @param {number[] | 'all'} options.targetPages - 0-indexed page indices or 'all'
 * @param {object} [options.perPageRotations] - { [pageIndex]: degrees }
 * @returns {Promise<{ blob: Blob, pageCount: number }>}
 */
export async function rotatePDF(file, { angle = 90, targetPages = 'all', perPageRotations = null } = {}) {
  const { PDFDocument, degrees } = await getPdfLib();
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  pages.forEach((page, idx) => {
    if (perPageRotations && typeof perPageRotations[idx] === 'number') {
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + perPageRotations[idx]) % 360));
    } else if (targetPages === 'all' || (Array.isArray(targetPages) && targetPages.includes(idx))) {
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + angle) % 360));
    }
  });

  const bytes = await pdfDoc.save();
  return { blob: new Blob([bytes], { type: 'application/pdf' }), pageCount: pages.length };
}

/**
 * 4. DELETE PAGES
 * Deletes selected pages from a PDF document.
 * @param {File} file
 * @param {number[]} pageIndicesToDelete - 0-indexed indices to remove
 * @returns {Promise<{ blob: Blob, remainingCount: number }>}
 */
export async function deletePages(file, pageIndicesToDelete = []) {
  const { PDFDocument } = await getPdfLib();
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = srcPdf.getPageCount();

  const toDelete = new Set(pageIndicesToDelete);
  const toKeep = [];
  for (let i = 0; i < totalPages; i++) {
    if (!toDelete.has(i)) toKeep.push(i);
  }

  if (toKeep.length === 0) {
    throw new Error('Cannot delete all pages. At least one page must remain.');
  }

  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(srcPdf, toKeep);
  copiedPages.forEach((page) => newDoc.addPage(page));

  const bytes = await newDoc.save();
  return { blob: new Blob([bytes], { type: 'application/pdf' }), remainingCount: toKeep.length };
}

/**
 * 5. IMAGES TO PDF (JPG / PNG -> PDF)
 * Converts image files into a formatted PDF document with layout controls.
 * @param {File[]} imageFiles
 * @param {object} options
 * @param {'a4' | 'letter' | 'fit'} options.pageSize
 * @param {'portrait' | 'landscape' | 'auto'} options.orientation
 * @param {'none' | 'small' | 'big'} options.margin
 * @returns {Promise<{ blob: Blob, pageCount: number }>}
 */
export async function imagesToPDF(imageFiles, { pageSize = 'a4', orientation = 'portrait', margin = 'small' } = {}) {
  const { PDFDocument, PageSizes } = await getPdfLib();
  const pdfDoc = await PDFDocument.create();

  const marginValues = { none: 0, small: 20, big: 40 };
  const m = marginValues[margin] ?? 20;

  for (const file of imageFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');

    let embeddedImage = null;
    try {
      if (isPng) {
        embeddedImage = await pdfDoc.embedPng(arrayBuffer);
      } else {
        embeddedImage = await pdfDoc.embedJpg(arrayBuffer);
      }
    } catch {
      // Fallback: draw through canvas to convert to JPG
      const imgBitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = imgBitmap.width;
      canvas.height = imgBitmap.height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgBitmap, 0, 0);
      const fallbackBlob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.92));
      const fallbackBuffer = await fallbackBlob.arrayBuffer();
      embeddedImage = await pdfDoc.embedJpg(fallbackBuffer);
      imgBitmap.close();
    }

    const imgWidth = embeddedImage.width;
    const imgHeight = embeddedImage.height;

    let pageWidth, pageHeight;

    if (pageSize === 'fit') {
      pageWidth = imgWidth + m * 2;
      pageHeight = imgHeight + m * 2;
    } else {
      const baseDimensions = pageSize === 'letter' ? PageSizes.Letter : PageSizes.A4;
      const isImgLandscape = imgWidth > imgHeight;
      const useLandscape = orientation === 'landscape' || (orientation === 'auto' && isImgLandscape);

      pageWidth = useLandscape ? baseDimensions[1] : baseDimensions[0];
      pageHeight = useLandscape ? baseDimensions[0] : baseDimensions[1];
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Calculate fitted dimensions within margins
    const availW = pageWidth - m * 2;
    const availH = pageHeight - m * 2;
    const scaleFactor = Math.min(availW / imgWidth, availH / imgHeight, 1);

    const drawW = imgWidth * scaleFactor;
    const drawH = imgHeight * scaleFactor;
    const drawX = m + (availW - drawW) / 2;
    const drawY = m + (availH - drawH) / 2;

    page.drawImage(embeddedImage, {
      x: drawX,
      y: drawY,
      width: drawW,
      height: drawH,
    });
  }

  const bytes = await pdfDoc.save();
  return { blob: new Blob([bytes], { type: 'application/pdf' }), pageCount: imageFiles.length };
}

/**
 * 6. RENDER PDF TO JPG / PNG IMAGES
 * High-quality PDF page rendering.
 * @param {File} file
 * @param {object} options
 * @param {'jpeg' | 'png'} options.format
 * @param {number} options.scale - 1.5 (Standard), 2.0 (High), 3.0 (Very High)
 * @param {Function} [options.onProgress]
 * @returns {Promise<Array<{ pageNumber: number, blob: Blob, width: number, height: number }>>}
 */
export async function renderPDFToImages(file, { format = 'jpeg', scale = 1.5, onProgress } = {}) {
  const pdfjs = await getPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  if (numPages > PDF_CONFIG.maxPageCount) {
    throw new Error(`This PDF has ${numPages} pages, which exceeds the browser safety limit of ${PDF_CONFIG.maxPageCount}. Try splitting it first.`);
  }

  const results = [];
  const mime = format === 'png' ? 'image/png' : 'image/jpeg';
  const quality = format === 'png' ? undefined : 0.88;

  for (let i = 1; i <= numPages; i++) {
    if (onProgress) onProgress(Math.round((i / numPages) * 100));

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d', { alpha: format === 'png' });

    if (format === 'jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    await page.render({ canvasContext: ctx, viewport }).promise;

    const blob = await new Promise((res) => canvas.toBlob(res, mime, quality));
    results.push({
      pageNumber: i,
      blob,
      width: viewport.width,
      height: viewport.height,
    });
  }

  return results;
}

export const renderPDFToJPG = (file, opts) => renderPDFToImages(file, { ...opts, format: 'jpeg' });
export const renderPDFToPNG = (file, opts) => renderPDFToImages(file, { ...opts, format: 'png' });

// Function Aliases
export const mergePdfFiles = mergePDFs;
export const splitPdf = splitPDF;
export const rotatePdf = rotatePDF;
export const compressPdf = compressPDF;
export const imagesToPdf = imagesToPDF;

/**
 * 7. COMPRESS PDF (Real image re-encoding compression)
 * Rasterizes each PDF page through HTML5 Canvas via pdfjs-dist,
 * re-encodes at target JPEG quality, and rebuilds a new compact PDF
 * using pdf-lib. This produces meaningful file size reduction for
 * image-heavy and scanned PDFs.
 *
 * Presets:
 *   'gentle'     — 1.4x scale, 0.82 JPEG quality  (light optimization)
 *   'balanced'   — 1.2x scale, 0.72 JPEG quality  (recommended)
 *   'aggressive' — 1.0x scale, 0.55 JPEG quality  (maximum size reduction)
 *
 * Honestly verifies output: returns original if compressed version is larger.
 *
 * @param {File} file
 * @param {'gentle'|'balanced'|'aggressive'} preset
 * @param {Function} [onProgress]
 * @returns {Promise<{ blob: Blob, originalSize: number, compressedSize: number, reduced: boolean, reductionPercent: number }>}
 */
export async function compressPDF(file, preset = 'balanced', onProgress) {
  const originalSize = file.size;

  const PRESETS = {
    gentle:     { scale: 1.4, quality: 0.82 },
    balanced:   { scale: 1.2, quality: 0.72 },
    aggressive: { scale: 1.0, quality: 0.55 },
  };

  const { scale, quality } = PRESETS[preset] || PRESETS.balanced;

  const pdfjs = await getPdfJs();
  const { PDFDocument } = await getPdfLib();

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  const newDoc = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    if (onProgress) onProgress(Math.round((i / numPages) * 90));

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport }).promise;

    // Re-encode as JPEG at target quality
    const jpegBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', quality)
    );
    const jpegBuffer = await jpegBlob.arrayBuffer();

    // Embed into the new PDF document
    const embeddedImg = await newDoc.embedJpg(jpegBuffer);

    // Use original page dimensions (points) — PDF point = 1/72 inch
    const origPage = pdf.getPage ? null : null; // getPage already returned above
    const pdfPage = newDoc.addPage([viewport.width, viewport.height]);
    pdfPage.drawImage(embeddedImg, {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height,
    });
  }

  if (onProgress) onProgress(95);

  const compressedBytes = await newDoc.save({ useObjectStreams: true });
  const compressedBlob = new Blob([compressedBytes], { type: 'application/pdf' });
  const compressedSize = compressedBlob.size;

  if (onProgress) onProgress(100);

  if (compressedSize < originalSize) {
    const reductionPercent = Math.round(((originalSize - compressedSize) / originalSize) * 100);
    return {
      blob: compressedBlob,
      originalSize,
      compressedSize,
      reduced: true,
      reductionPercent,
    };
  }

  // Output is not smaller — preserve original and notify user honestly
  return {
    blob: file,
    originalSize,
    compressedSize: originalSize,
    reduced: false,
    reductionPercent: 0,
  };
}


/**
 * 8. RENDER THUMBNAILS FOR VISUAL GRIDS
 * Quick in-memory thumbnail rendering for page selection and reordering.
 * @param {File} file
 * @param {object} options
 * @param {number} [options.maxPages]
 * @param {number} [options.scale]
 * @returns {Promise<Array<{ pageNumber: number, dataUrl: string, width: number, height: number }>>}
 */
export async function renderPdfThumbnails(file, { maxPages = 60, scale = 0.4 } = {}) {
  const pdfjs = await getPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const count = Math.min(pdf.numPages, maxPages);

  const thumbnails = [];
  for (let i = 1; i <= count; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport }).promise;
    thumbnails.push({
      pageNumber: i,
      dataUrl: canvas.toDataURL('image/jpeg', 0.7),
      width: viewport.width,
      height: viewport.height,
    });
  }

  return thumbnails;
}

/**
 * 9. GET PDF METADATA
 */
export async function getPdfInfo(file) {
  const { PDFDocument } = await getPdfLib();
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  return {
    pageCount: pdfDoc.getPageCount(),
    title: pdfDoc.getTitle() || file.name,
  };
}
