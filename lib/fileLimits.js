/**
 * lib/fileLimits.js
 * Centralized resource limits and pre-flight validation policies for document and image processing.
 * Prevents oversized or excessively complex files from exhausting Google Cloud Run CPU/RAM.
 */

import { PDFDocument } from 'pdf-lib';
import { unzipSync, strFromU8 } from 'fflate';

export const FILE_LIMITS = {
  // Heavy Python Cloud Run endpoints
  '/pdf-to-powerpoint': {
    maxSizeBytes: 10 * 1024 * 1024, // 10 MB
    maxPages: 10,
    name: 'PDF to PowerPoint',
    type: 'pdf',
  },
  '/pdf-to-word': {
    maxSizeBytes: 10 * 1024 * 1024, // 10 MB
    maxPages: 10,
    name: 'PDF to Word',
    type: 'pdf',
  },
  '/pdf-to-excel': {
    maxSizeBytes: 10 * 1024 * 1024, // 10 MB
    maxPages: 20,
    name: 'PDF to Excel',
    type: 'pdf',
  },
  '/powerpoint-to-pdf': {
    maxSizeBytes: 20 * 1024 * 1024, // 20 MB
    maxSlides: 20,
    name: 'PowerPoint to PDF',
    type: 'pptx',
  },
  '/word-to-pdf': {
    maxSizeBytes: 20 * 1024 * 1024, // 20 MB
    name: 'Word to PDF',
    type: 'docx',
  },
  '/excel-to-pdf': {
    maxSizeBytes: 20 * 1024 * 1024, // 20 MB
    maxSheets: 20,
    name: 'Excel to PDF',
    type: 'xlsx',
  },
  '/unlock-pdf': {
    maxSizeBytes: 20 * 1024 * 1024, // 20 MB
    maxPages: 50,
    name: 'Unlock PDF',
    type: 'pdf',
  },
  '/extract-table': {
    maxSizeBytes: 10 * 1024 * 1024, // 10 MB
    maxPixels: 50_000_000,
    name: 'AI Table Extraction',
    type: 'image',
  },

  // Client-side Browser PDF tools
  'pdf-to-jpg': {
    maxSizeBytes: 10 * 1024 * 1024,
    maxPages: 20,
    name: 'PDF to JPG',
  },
  'pdf-to-png': {
    maxSizeBytes: 10 * 1024 * 1024,
    maxPages: 10,
    name: 'PDF to PNG',
  },

  // Client-side Browser Image tools
  'image-tools': {
    maxSizeBytes: 20 * 1024 * 1024, // 20 MB per file
    maxBatchSizeBytes: 100 * 1024 * 1024, // 100 MB total
    maxBatchFiles: 20,
    maxWidth: 12000,
    maxHeight: 12000,
    maxPixels: 50_000_000, // 50 Megapixels
  },
};

/**
 * Validates an uploaded document file before forwarding to the Cloud Run conversion service.
 * @param {File|Blob} file - The file extracted from FormData
 * @param {string} endpoint - The target endpoint path (e.g. '/pdf-to-powerpoint')
 * @returns {Promise<{ valid: boolean, status?: number, error?: string }>}
 */
export async function validateConversionFile(file, endpoint) {
  if (!file || typeof file === 'string') {
    return {
      valid: false,
      status: 400,
      error: 'No file was provided for conversion. Please select a valid document.',
    };
  }

  const policy = FILE_LIMITS[endpoint];
  if (!policy) {
    if (file.size > 20 * 1024 * 1024) {
      return {
        valid: false,
        status: 413,
        error: `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds maximum allowed limit of 20 MB.`,
      };
    }
    return { valid: true };
  }

  // 1. File size checks
  if (file.size === 0) {
    return {
      valid: false,
      status: 400,
      error: 'The uploaded file is empty (0 bytes). Please upload a valid document.',
    };
  }

  if (file.size > policy.maxSizeBytes) {
    const limitMb = (policy.maxSizeBytes / (1024 * 1024)).toFixed(0);
    const fileMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      status: 413,
      error: `${policy.name} allows files up to ${limitMb} MB. Your file is ${fileMb} MB. Please upload a smaller file.`,
    };
  }

  // 2. Pre-flight structural/complexity checks
  if (policy.type === 'pdf') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      const doc = await PDFDocument.load(uint8, { ignoreEncryption: true });
      const pageCount = doc.getPageCount();

      if (policy.maxPages && pageCount > policy.maxPages) {
        return {
          valid: false,
          status: 400,
          error: `${policy.name} allows up to ${policy.maxPages} pages per conversion to ensure fast processing and stability. Your document has ${pageCount} pages. Please split your document or upload a shorter file.`,
        };
      }
    } catch (err) {
      return {
        valid: false,
        status: 400,
        error: 'The uploaded file is not a valid PDF or could not be parsed.',
      };
    }
  } else if (policy.type === 'pptx' && policy.maxSlides) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      const unzipped = unzipSync(uint8, {
        filter(entry) {
          return entry.name === 'ppt/presentation.xml' || (entry.name.startsWith('ppt/slides/slide') && entry.name.endsWith('.xml'));
        },
      });

      let slideCount = 0;
      if (unzipped['ppt/presentation.xml']) {
        const xml = strFromU8(unzipped['ppt/presentation.xml']);
        const matches = xml.match(/<p:sldId\b/g);
        slideCount = matches ? matches.length : 0;
      }
      if (slideCount === 0) {
        slideCount = Object.keys(unzipped).filter(k => k.startsWith('ppt/slides/slide') && k.endsWith('.xml')).length;
      }

      if (slideCount > policy.maxSlides) {
        return {
          valid: false,
          status: 400,
          error: `PowerPoint to PDF conversion allows up to ${policy.maxSlides} slides. Your presentation contains ${slideCount} slides. Please shorten your presentation or convert it in sections.`,
        };
      }
    } catch (e) {
      // If zip parsing fails on pptx, allow backend to inspect or handle
    }
  } else if (policy.type === 'xlsx' && policy.maxSheets) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      const unzipped = unzipSync(uint8, {
        filter(entry) {
          return entry.name === 'xl/workbook.xml' || (entry.name.startsWith('xl/worksheets/sheet') && entry.name.endsWith('.xml'));
        },
      });

      let sheetCount = 0;
      if (unzipped['xl/workbook.xml']) {
        const xml = strFromU8(unzipped['xl/workbook.xml']);
        const matches = xml.match(/<sheet\b/g);
        sheetCount = matches ? matches.length : 0;
      }
      if (sheetCount === 0) {
        sheetCount = Object.keys(unzipped).filter(k => k.startsWith('xl/worksheets/sheet') && k.endsWith('.xml')).length;
      }

      if (sheetCount > policy.maxSheets) {
        return {
          valid: false,
          status: 400,
          error: `Excel to PDF conversion allows up to ${policy.maxSheets} worksheets. Your workbook contains ${sheetCount} sheets.`,
        };
      }
    } catch (e) {
      // If zip parsing fails on xlsx, allow backend to inspect or handle
    }
  }

  return { valid: true };
}
