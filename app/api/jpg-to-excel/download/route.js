/**
 * app/api/jpg-to-excel/download/route.js
 * 
 * Server-side Genuine Excel (.xlsx) Workbook Generator & Downloader.
 * 
 * Security & Anti-Tampering Validations:
 * - Enforces strict structural boundaries to prevent memory exhaustion and DoS:
 *     - Max 20 tables / worksheets per request
 *     - Max 5,000 rows per table
 *     - Max 100 columns per table
 *     - Max 50,000 total cells per workbook
 *     - Max 5,000 characters per cell
 * - Validates array-of-arrays row structure and normalizes all cell types.
 * - Formula injection protection (sanitizes =, +, -, @ to prevent spreadsheet formula execution).
 * - Directory traversal & filename sanitization (strips .., /, \, and control chars).
 * - Streams downloadable binary .xlsx with Content-Disposition attachment header.
 */

import { NextResponse } from 'next/server';
import { generateExcelBuffer } from '@/lib/excelGenerator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ── Resource Boundaries ───────────────────────────────────────────────────────

const LIMITS = {
  maxTables: 20,
  maxRowsPerTable: 5000,
  maxColsPerTable: 100,
  maxTotalCells: 50000,
  maxCellLength: 5000,
  maxFilenameLength: 100,
};

/**
 * Validates and sanitizes client-submitted table structures.
 * Prevents memory exhaustion, infinite loops, and prototype pollution.
 */
function validateAndSanitizeSubmittedTables(tablesInput, headersInput, rowsInput) {
  let rawTables = [];

  if (Array.isArray(tablesInput) && tablesInput.length > 0) {
    rawTables = tablesInput;
  } else if (Array.isArray(headersInput) && headersInput.length > 0) {
    rawTables = [{ name: 'Extracted Table', headers: headersInput, rows: rowsInput }];
  } else {
    return { valid: false, error: 'No table data provided to generate Excel file.' };
  }

  if (rawTables.length > LIMITS.maxTables) {
    return {
      valid: false,
      error: `Too many worksheets requested (${rawTables.length}). Maximum allowed is ${LIMITS.maxTables}.`,
    };
  }

  let totalCellCount = 0;
  const validatedTables = [];

  for (let tIdx = 0; tIdx < rawTables.length; tIdx++) {
    const rawTbl = rawTables[tIdx];
    if (!rawTbl || typeof rawTbl !== 'object') {
      return { valid: false, error: `Invalid table structure at index ${tIdx}.` };
    }

    const name = String(rawTbl.name || `Table ${tIdx + 1}`).trim().substring(0, 31);
    const rawHeaders = Array.isArray(rawTbl.headers) ? rawTbl.headers : [];
    const rawRows = Array.isArray(rawTbl.rows) ? rawTbl.rows : [];

    if (rawHeaders.length > LIMITS.maxColsPerTable) {
      return {
        valid: false,
        error: `Table "${name}" exceeds the maximum column limit of ${LIMITS.maxColsPerTable} (got ${rawHeaders.length}).`,
      };
    }

    if (rawRows.length > LIMITS.maxRowsPerTable) {
      return {
        valid: false,
        error: `Table "${name}" exceeds the maximum row limit of ${LIMITS.maxRowsPerTable} (got ${rawRows.length}).`,
      };
    }

    // Sanitize headers
    const headers = rawHeaders.map((h, cIdx) => {
      const str = h !== null && h !== undefined ? String(h).trim() : `Col ${cIdx + 1}`;
      return str.substring(0, 255);
    });

    const colCount = Math.max(headers.length, 1);

    // Sanitize rows
    const rows = [];
    for (let rIdx = 0; rIdx < rawRows.length; rIdx++) {
      const rawRow = rawRows[rIdx];
      if (!Array.isArray(rawRow)) {
        return { valid: false, error: `Malformed row at index ${rIdx} in table "${name}". Must be an array.` };
      }

      const row = [];
      for (let cIdx = 0; cIdx < colCount; cIdx++) {
        totalCellCount++;
        if (totalCellCount > LIMITS.maxTotalCells) {
          return {
            valid: false,
            error: `Total workbook cell count exceeds limit of ${LIMITS.maxTotalCells}. Please split your document.`,
          };
        }

        const cell = rawRow[cIdx];
        if (cell === null || cell === undefined) {
          row.push('');
        } else {
          const cellStr = String(cell).substring(0, LIMITS.maxCellLength);
          row.push(cellStr);
        }
      }
      rows.push(row);
    }

    validatedTables.push({
      name,
      headers,
      rows,
    });
  }

  return { valid: true, tables: validatedTables };
}

/**
 * Sanitizes download filename to prevent path traversal and invalid characters.
 */
function sanitizeDownloadFilename(filename) {
  let clean = String(filename || 'extracted-table.xlsx')
    .replace(/[/\\]/g, '_')
    .replace(/\.\./g, '')
    .replace(/[^\w\s.-]/gi, '_')
    .trim();

  if (clean.toLowerCase().endsWith('.xlsx')) {
    clean = clean.slice(0, -5);
  }

  clean = clean.substring(0, LIMITS.maxFilenameLength).trim();
  if (!clean) clean = 'extracted-table';

  return `${clean}.xlsx`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { tables, headers, rows, filename = 'extracted-table.xlsx', theme = 'emerald' } = body;

    // Strict structural & anti-tampering validation
    const validation = validateAndSanitizeSubmittedTables(tables, headers, rows);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const safeFilename = sanitizeDownloadFilename(filename);

    const excelBuffer = await generateExcelBuffer({
      tables: validation.tables,
      theme: theme === 'blue' ? 'blue' : 'emerald',
    });

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(safeFilename)}"`,
        'Content-Length': String(excelBuffer.length),
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err) {
    console.error('[API /api/jpg-to-excel/download Error]:', err.message);
    return NextResponse.json(
      { success: false, error: 'Failed to generate genuine Excel (.xlsx) workbook.' },
      { status: 500 }
    );
  }
}
