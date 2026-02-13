import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get file data
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Create unique filename - sanitize the filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
    const filename = `${Date.now()}-${sanitizedName}`;
    const filePath = join(uploadsDir, filename);

    // Save file
    await writeFile(filePath, buffer);

    // Return public URL
    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}`,
      filename 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error.message 
    }, { status: 500 });
  }
}
