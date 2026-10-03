import { NextResponse } from 'next/server';
import { CONVERSION_SERVICE_URL, getCloudRunIdToken } from '@/lib/conversionConfig';

const TARGET_SERVICE_URL = CONVERSION_SERVICE_URL || process.env.OCR_SERVICE_URL || 'http://127.0.0.1:8000';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB production limit

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

    if (file.size === 0) {
      return NextResponse.json(
        { success: false, error: 'The uploaded image is empty (0 bytes).' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `Image size (${(file.size / 1024 / 1024).toFixed(1)} MB) exceeds the 10 MB limit for AI table extraction.` },
        { status: 413 }
      );
    }

    // Forward to Python OCR microservice
    const pyFormData = new FormData();
    pyFormData.append('image', file);

    const headers = {};
    const idToken = await getCloudRunIdToken(TARGET_SERVICE_URL);
    if (idToken) {
      headers['Authorization'] = `Bearer ${idToken}`;
    }

    let pyResponse;
    try {
      pyResponse = await fetch(`${TARGET_SERVICE_URL}/extract-table`, {
        method: 'POST',
        headers,
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
