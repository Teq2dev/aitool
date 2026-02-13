import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { cwd } from 'process';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadsDir = join(cwd(), 'public', 'uploads');

    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '-')
      .replace(/-+/g, '-');

    const filename = `${Date.now()}-${sanitizedName}`;
    const filePath = join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      filename,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}
