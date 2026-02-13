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

    // Use absolute path for uploads directory
    // In Next.js standalone mode, we need to handle paths carefully
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    
    console.log('Upload directory:', uploadsDir);
    console.log('File name:', file.name);
    console.log('File size:', buffer.length);

    // Ensure uploads directory exists
    try {
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
        console.log('Created uploads directory');
      }
    } catch (mkdirError) {
      console.error('Error creating directory:', mkdirError);
      // Try alternative path
      const altUploadsDir = '/app/public/uploads';
      if (!existsSync(altUploadsDir)) {
        await mkdir(altUploadsDir, { recursive: true });
      }
    }

    // Create unique filename - sanitize the filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
    const filename = `${Date.now()}-${sanitizedName}`;
    
    // Try primary path first, then fallback
    let filePath = join(uploadsDir, filename);
    let savedPath = `/uploads/${filename}`;
    
    try {
      await writeFile(filePath, buffer);
      console.log('File saved to:', filePath);
    } catch (writeError) {
      console.error('Primary write failed:', writeError);
      // Try alternative absolute path
      filePath = `/app/public/uploads/${filename}`;
      await writeFile(filePath, buffer);
      console.log('File saved to alternative path:', filePath);
    }

    // Return public URL
    return NextResponse.json({ 
      success: true, 
      url: savedPath,
      filename 
    });
  } catch (error) {
    console.error('Upload error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error.message 
    }, { status: 500 });
  }
}
