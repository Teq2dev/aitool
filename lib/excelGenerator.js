/**
 * excelGenerator.js — Professional Excel (.xlsx) Workbook Generator
 *
 * Generates genuine Microsoft Excel (.xlsx) workbooks with:
 *  - Formatted header row (Royal Blue fill #2563EB, Bold White text, centered)
 *  - Alternating zebra row striping (#F8FAFC / #FFFFFF)
 *  - Number / currency / percentage auto-detection
 *  - Auto-fitted column widths with safety padding
 *  - Thin crisp grid cell borders
 *
 * Dynamic lazy-loading for fast page compilation & light bundle.
 */

export async function generateExcelWorkbook({ headers = [], rows = [], sheetName = 'Table Data' }) {
  const mod = await import('exceljs/dist/exceljs.min.js');
  const ExcelJS = mod.default || mod;

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'BestAIToolsFree Image to Excel';
  workbook.lastModifiedBy = 'BestAIToolsFree';
  workbook.created = new Date();
  workbook.modified = new Date();

  const worksheet = workbook.addWorksheet(sheetName, {
    views: [{ showGridLines: true }],
  });

  // 1. Add Headers
  if (headers && headers.length > 0) {
    const headerRow = worksheet.addRow(headers);
    headerRow.height = 28;

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF2563EB' },
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
        top: { style: 'thin', color: { argb: 'FF1D4ED8' } },
        left: { style: 'thin', color: { argb: 'FF1D4ED8' } },
        bottom: { style: 'medium', color: { argb: 'FF1E40AF' } },
        right: { style: 'thin', color: { argb: 'FF1D4ED8' } },
      };
    });
  }

  // 2. Add Data Rows
  if (rows && rows.length > 0) {
    rows.forEach((rowData, rowIdx) => {
      const typedRow = rowData.map((val) => {
        if (typeof val !== 'string') return val ?? '';
        const trimmed = val.trim();
        if (!trimmed) return '';

        const cleanNum = trimmed.replace(/[\$,]/g, '');
        if (/^-?\d+(\.\d+)?$/.test(cleanNum) && !isNaN(Number(cleanNum))) {
          return Number(cleanNum);
        }
        return trimmed;
      });

      const row = worksheet.addRow(typedRow);
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
      const valStr = cell.value ? String(cell.value) : '';
      if (valStr.length > maxLength) {
        maxLength = valStr.length;
      }
    });
    column.width = Math.min(45, Math.max(12, maxLength + 3));
  });

  // 4. Output as Blob
  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}
