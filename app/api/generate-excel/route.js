import { NextResponse } from 'next/server';

// Development: http://127.0.0.1:8000
// Production:  set OCR_SERVICE_URL env var to the deployed Python service URL
const OCR_SERVICE_URL = process.env.OCR_SERVICE_URL || 'http://127.0.0.1:8000';

export async function POST(request) {
  try {
    const body = await request.json();
    const { headers = [], rows = [], tables = null, filename = 'extracted-table.xlsx' } = body;

    // 1. Call Python openpyxl microservice
    try {
      const pyResponse = await fetch(`${OCR_SERVICE_URL}/generate-excel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headers, rows, tables, filename }),
      });

      if (pyResponse.ok) {
        const arrayBuffer = await pyResponse.arrayBuffer();
        return new NextResponse(new Uint8Array(arrayBuffer), {
          status: 200,
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${filename}"`,
          },
        });
      }
    } catch (netErr) {
      console.warn('Python openpyxl service unavailable, falling back:', netErr.message);
    }

    // 2. Fallback: Local ExcelJS generator
    const { generateExcelWorkbook } = await import('@/lib/excelGenerator');
    const xlsxBlob = await generateExcelWorkbook({ headers, rows });
    const buffer = await xlsxBlob.arrayBuffer();

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('API /api/generate-excel error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to generate Excel file.' },
      { status: 500 }
    );
  }
}
