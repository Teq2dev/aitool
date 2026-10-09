import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getPresignedUploadUrl, initiateMultipartUpload, getPresignedPartUrl } from '@/lib/s3Storage';

const MAX_FILE_SIZE = parseInt(process.env.MAX_CONVERSION_FILE_SIZE_BYTES || '104857600', 10); // 100 MB default

const ALLOWED_TOOLS = [
  'powerpoint-to-pdf',
  'word-to-pdf',
  'excel-to-pdf',
  'pdf-to-powerpoint',
  'pdf-to-word',
  'pdf-to-excel',
  'unlock-pdf',
  'generate-excel',
  'extract-table',
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { filename, fileSize, mimeType, toolSlug, isMultipart = false, partCount = 1 } = body;

    if (!filename || !fileSize || !toolSlug) {
      return NextResponse.json(
        { error: 'Invalid request: filename, fileSize, and toolSlug are required.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_TOOLS.includes(toolSlug)) {
      return NextResponse.json(
        { error: `Unsupported conversion tool: ${toolSlug}` },
        { status: 400 }
      );
    }

    if (fileSize > MAX_FILE_SIZE) {
      const maxMb = Math.round(MAX_FILE_SIZE / (1024 * 1024));
      return NextResponse.json(
        { error: `File size exceeds maximum allowed limit of ${maxMb} MB.` },
        { status: 413 }
      );
    }

    // Generate unique storage key
    const fileId = uuidv4();
    const ext = filename.includes('.') ? filename.split('.').pop() : 'tmp';
    const fileKey = `raw/uploads/${fileId}.${ext}`;

    if (isMultipart && fileSize >= 20000000) {
      // Initiate Multipart Upload for large files (>= 20 MB)
      const { uploadId } = await initiateMultipartUpload(fileKey, mimeType || 'application/octet-stream');
      const partUrls = [];
      for (let partNumber = 1; partNumber <= partCount; partNumber++) {
        const url = await getPresignedPartUrl(fileKey, uploadId, partNumber);
        partUrls.push({ partNumber, url });
      }
      return NextResponse.json({
        isMultipart: true,
        fileKey,
        uploadId,
        partUrls,
      });
    } else {
      // Single-part Presigned Upload URL
      const uploadUrl = await getPresignedUploadUrl(fileKey, mimeType || 'application/octet-stream');
      return NextResponse.json({
        isMultipart: false,
        fileKey,
        uploadUrl,
      });
    }
  } catch (err) {
    console.error('API /api/convert/presign-upload error:', err);
    return NextResponse.json(
      { error: 'Failed to issue upload URL.', details: err.message },
      { status: 500 }
    );
  }
}
