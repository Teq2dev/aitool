import { NextResponse } from 'next/server';

// Development: http://127.0.0.1:8000
// Production:  set OCR_SERVICE_URL env var to the deployed Python service URL
const OCR_SERVICE_URL = process.env.OCR_SERVICE_URL || 'http://127.0.0.1:8000';
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { success: false, error: 'Please upload a valid image file.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 25 MB limit.' },
        { status: 413 }
      );
    }

    // Forward to Python OCR microservice
    const pyFormData = new FormData();
    pyFormData.append('image', file);

    let pyResponse;
    try {
      pyResponse = await fetch(`${OCR_SERVICE_URL}/extract-table`, {
        method: 'POST',
        body: pyFormData,
      });
    } catch (netErr) {
      console.error('Python OCR service unreachable:', netErr.message);
      return NextResponse.json(
        {
          success: false,
          error: 'AI OCR service is temporarily unavailable. Please make sure the Python backend is running.',
        },
        { status: 503 }
      );
    }

    const data = await pyResponse.json();

    if (!pyResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || data.detail || "We couldn't detect a table in this image.",
        },
        { status: pyResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('API /api/extract-table error:', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while extracting the table.' },
      { status: 500 }
    );
  }
}
