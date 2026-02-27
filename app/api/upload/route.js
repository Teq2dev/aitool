import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {

 try {

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
   return NextResponse.json(
    { error: "No file" },
    { status: 400 }
   );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const base64 =
   `data:${file.type};base64,${buffer.toString("base64")}`;

  const result =
   await cloudinary.uploader.upload(base64);

  return NextResponse.json({
   url: result.secure_url
  });

 } catch (error) {

  return NextResponse.json(
   { error: error.message },
   { status: 500 }
  );

 }

}
