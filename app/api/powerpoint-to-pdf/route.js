import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const backendRes = await fetch('http://127.0.0.1:8000/powerpoint-to-pdf', {
      method: 'POST',
      body: formData,
    });

    if (!backendRes.ok) {
      const errorData = await backendRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Conversion failed on server' },
        { status: backendRes.status }
      );
    }

    const buffer = await backendRes.arrayBuffer();
    const contentDisposition = backendRes.headers.get('Content-Disposition') || 'attachment; filename="converted.pdf"';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': contentDisposition,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
