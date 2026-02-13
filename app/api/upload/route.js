import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request) {
  console.log('=== Upload API Called ===');
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      console.log('Error: No file in request');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received:', file.name, 'Size:', file.size);

    // Get file data
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define uploads directory - use absolute path
    const uploadsDir = '/app/public/uploads';
    
    console.log('Uploads directory:', uploadsDir);
    console.log('Directory exists:', existsSync(uploadsDir));

    // Create directory if it doesn't exist
    if (!existsSync(uploadsDir)) {
      console.log('Creating uploads directory...');
      try {
        await mkdir(uploadsDir, { recursive: true, mode: 0o777 });
        console.log('Directory created successfully');
      } catch (mkdirErr) {
        console.error('Failed to create directory:', mkdirErr);
        return NextResponse.json({ 
          error: 'Upload failed', 
          details: 'Could not create uploads directory: ' + mkdirErr.message 
        }, { status: 500 });
      }
    }

    // Create unique filename - sanitize the filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').replace(/-+/g, '-');
    const filename = `${Date.now()}-${sanitizedName}`;
    const filePath = join(uploadsDir, filename);
    
    console.log('Saving file to:', filePath);

    // Save file
    try {
      await writeFile(filePath, buffer);
      console.log('File saved successfully!');
    } catch (writeErr) {
      console.error('Failed to write file:', writeErr);
      return NextResponse.json({ 
        error: 'Upload failed', 
        details: 'Could not save file: ' + writeErr.message 
      }, { status: 500 });
    }

    // Return public URL
    const publicUrl = `/uploads/${filename}`;
    console.log('Returning URL:', publicUrl);
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
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
