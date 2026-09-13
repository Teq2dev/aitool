import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Forward to Python backend
    const backendRes = await fetch('http://127.0.0.1:8000/unlock-pdf', {
      method: 'POST',
      body: formData,
    });
    
    if (!backendRes.ok) {
      const errorData = await backendRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Failed to unlock PDF' }, 
        { status: backendRes.status }
      );
    }
    
    const buffer = await backendRes.arrayBuffer();
    
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="unlocked.pdf"',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
