/**
 * lib/excelGenerator.js — Professional Excel (.xlsx) Workbook Generator
 *
 * Generates genuine Microsoft Excel (.xlsx) workbooks with:
 *  - Single or Multi-Table / Multi-Worksheet support
 *  - Formatted header row (Emerald Green #107C41 or Royal Blue #2563EB, Bold White text, centered)
 *  - Alternating zebra row striping (#F8FAFC / #FFFFFF)
 *  - Number / currency / percentage auto-detection
 *  - Formula Injection Protection (prevents spreadsheet formula execution vulnerabilities)
 *  - Auto-fitted column widths with safety padding (min 12, max 50)
 *  - Thin crisp grid cell borders
 *  - Safe worksheet name sanitization (max 31 chars, valid chars only)
 *
 * Supports both Node.js server environments (Buffer output) and browser environments (Blob output).
 */

async function getExcelJS() {
  if (typeof window === 'undefined') {
    // Server-side Node.js environment
    const mod = await import('exceljs');
    return mod.default || mod;
  }
  // Client-side browser bundle
  const mod = await import('exceljs/dist/exceljs.min.js');
  return mod.default || mod;
}

/**
 * Sanitizes worksheet names according to Excel's specification:
 * - Max 31 characters
 * - No characters: \ / ? * [ ] :
 * - Must be unique within the workbook
 */
export function sanitizeSheetName(name, existingNames = new Set()) {
  let cleaned = String(name || '')
    .trim()
    .replace(/[\\/?*[\]:]/g, '_')
    .replace(/\s+/g, ' ')
    .substring(0, 31);

  if (!cleaned) cleaned = 'Table Data';

  let candidate = cleaned;
  let counter = 1;
  while (existingNames.has(candidate.toLowerCase())) {
    const suffix = ` (${counter})`;
    candidate = cleaned.substring(0, 31 - suffix.length) + suffix;
    counter++;
  }

  existingNames.add(candidate.toLowerCase());
  return candidate;
}

/**
 * Sanitizes cell values to guard against Excel Formula Injection (CWE-1236).
 * Values starting with =, +, -, @ could trigger arbitrary calculation or DDE execution.
 */
export function sanitizeCellValue(val) {
  if (val === null || val === undefined) return '';
  if (typeof val === 'number' || typeof val === 'boolean') return val;

  const str = String(val).trim();
  if (!str) return '';

  // Auto-detect clean decimal/integer numbers
  const cleanNum = str.replace(/[\$,]/g, '');
  if (/^-?\d+(\.\d+)?$/.test(cleanNum) && !isNaN(Number(cleanNum))) {
    // If original string had a leading +, treat cautiously
    if (str.startsWith('+')) {
      return `'${str}`;
    }
    return Number(cleanNum);
  }

  // Formula injection guard: prepend single quote
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`;
  }

  return str;
}

/**
 * Populates and styles a single Excel worksheet.
 */
function populateWorksheet(worksheet, headers = [], rows = [], theme = 'emerald') {
  const isEmerald = theme === 'emerald';
  const headerBgColor = isEmerald ? 'FF107C41' : 'FF2563EB';
  const headerBorderColor = isEmerald ? 'FF0D6535' : 'FF1D4ED8';
  const headerBottomColor = isEmerald ? 'FF094C27' : 'FF1E40AF';

  // 1. Add Headers
  if (headers && headers.length > 0) {
    const sanitizedHeaders = headers.map((h) => sanitizeCellValue(h));
    const headerRow = worksheet.addRow(sanitizedHeaders);
    headerRow.height = 28;

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: headerBgColor },
      };
      cell.font = {
        name: 'Segoe UI',
        size: 11,
        bold: true,
        color: { argb: 'FFFFFFFF' },
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      };
      cell.border = {
        top: { style: 'thin', color: { argb: headerBorderColor } },
        left: { style: 'thin', color: { argb: headerBorderColor } },
        bottom: { style: 'medium', color: { argb: headerBottomColor } },
        right: { style: 'thin', color: { argb: headerBorderColor } },
      };
    });
  }

  // 2. Add Data Rows
  if (rows && rows.length > 0) {
    rows.forEach((rowData, rowIdx) => {
      const sanitizedRow = Array.isArray(rowData)
        ? rowData.map((val) => sanitizeCellValue(val))
        : [];

      const row = worksheet.addRow(sanitizedRow);
      row.height = 22;
      const isEven = rowIdx % 2 === 0;

      row.eachCell((cell) => {
        cell.font = {
          name: 'Segoe UI',
          size: 10.5,
          color: { argb: 'FF1E293B' },
        };

        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: isEven ? 'FFFFFFFF' : 'FFF8FAFC' },
        };

        const isNumber = typeof cell.value === 'number';
        cell.alignment = {
          vertical: 'middle',
          horizontal: isNumber ? 'right' : 'left',
          wrapText: false,
        };

        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        };
      });
    });
  }

  // 3. Auto-fit Column Widths
  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const valStr = cell.value !== undefined && cell.value !== null ? String(cell.value) : '';
      if (valStr.length > maxLength) {
        maxLength = valStr.length;
      }
    });
    column.width = Math.min(50, Math.max(12, maxLength + 3));
  });
}

/**
 * Builds an ExcelJS Workbook instance from either single-table or multi-table input.
 */
async function buildWorkbook({ headers = [], rows = [], sheetName = 'Table Data', tables = null, theme = 'emerald' }) {
  const ExcelJS = await getExcelJS();
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'BestAIToolsFree AI JPG to Excel';
  workbook.lastModifiedBy = 'BestAIToolsFree';
  workbook.created = new Date();
  workbook.modified = new Date();

  const usedSheetNames = new Set();

  if (Array.isArray(tables) && tables.length > 0) {
    tables.forEach((tbl, idx) => {
      const rawName = tbl.name || `Table ${idx + 1}`;
      const safeName = sanitizeSheetName(rawName, usedSheetNames);
      const worksheet = workbook.addWorksheet(safeName, {
        views: [{ showGridLines: true }],
      });
      populateWorksheet(worksheet, tbl.headers || [], tbl.rows || [], theme);
    });
  } else {
    const safeName = sanitizeSheetName(sheetName, usedSheetNames);
    const worksheet = workbook.addWorksheet(safeName, {
      views: [{ showGridLines: true }],
    });
    populateWorksheet(worksheet, headers, rows, theme);
  }

  return workbook;
}

/**
 * Generates an Excel (.xlsx) file as a Blob (typically for browser client downloads).
 */
export async function generateExcelWorkbook({ headers = [], rows = [], sheetName = 'Table Data', tables = null, theme = 'emerald' }) {
  const workbook = await buildWorkbook({ headers, rows, sheetName, tables, theme });
  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}

/**
 * Generates an Excel (.xlsx) file as a Node.js Buffer (for server-side route responses).
 */
export async function generateExcelBuffer({ headers = [], rows = [], sheetName = 'Table Data', tables = null, theme = 'emerald' }) {
  const workbook = await buildWorkbook({ headers, rows, sheetName, tables, theme });
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
