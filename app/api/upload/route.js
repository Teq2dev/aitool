import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  console.log('=== Cloudinary Upload API Called ===');
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      console.log('Error: No file in request');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received for Cloudinary:', file.name, 'Size:', file.size);

    // Get file data
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using a promise to handle the stream
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'aitools-logos',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    console.log('Cloudinary upload successful:', uploadResponse.secure_url);
    
    return NextResponse.json({ 
      success: true, 
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id
    });
  } catch (error) {
    console.error('Upload process error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error.message 
    }, { status: 500 });
  }
}
