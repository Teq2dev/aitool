/**
 * app/api/upload/route.js
 *
 * Logo upload endpoint — stores uploaded tool logos in Google Cloud Storage.
 *
 * Authentication: Cloud Run Application Default Credentials (no JSON key needed).
 * The bucket name is read from GCS_LOGO_BUCKET env var.
 *
 * Response contract (unchanged from previous Cloudinary implementation):
 *   200 → { success: true, url: "https://storage.googleapis.com/..." }
 *   400 → { error: "<user-safe message>" }
 *   500 → { error: "Upload failed" }
 */

import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import { randomUUID } from 'crypto';

// ─── Constants ────────────────────────────────────────────────────────────────

const BUCKET_NAME = process.env.GCS_LOGO_BUCKET || 'bestaitoolsfree-logos';
const LOGO_PREFIX = 'aitools-logos/';
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB — matches existing client-side limit

// Allowed MIME types (SVG excluded — can contain active script content)
const ALLOWED_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
]);

// Magic-byte signatures for server-side MIME verification
const MAGIC_BYTES = [
  { mime: 'image/png',  bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: 'image/jpeg', bytes: [0xff, 0xd8, 0xff] },
  { mime: 'image/webp', bytes: [0x52, 0x49, 0x46, 0x46] }, // "RIFF" prefix
  { mime: 'image/gif',  bytes: [0x47, 0x49, 0x46] },        // "GIF"
];

// ─── GCS client (singleton — reused across warm invocations) ─────────────────
const storage = new Storage(); // uses Application Default Credentials on Cloud Run

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Derive a safe file extension from the validated MIME type.
 * Never uses the user-supplied filename.
 */
function mimeToExtension(mime) {
  const map = {
    'image/png':  'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/gif':  'gif',
  };
  return map[mime] || 'bin';
}

/**
 * Verify the actual file content against known magic byte signatures.
 * Returns the confirmed MIME type, or null if unrecognised.
 */
function detectMimeFromBuffer(buffer) {
  for (const sig of MAGIC_BYTES) {
    const match = sig.bytes.every((b, i) => buffer[i] === b);
    if (match) return sig.mime;
  }
  return null;
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(request) {
  const requestId = request.headers.get('x-cloud-trace-context') || `upload_${Date.now()}`;
  console.log(`[Upload] reqId=${requestId} Starting logo upload`);

  try {
    // 1. Parse multipart form
    let formData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      console.warn(`[Upload] reqId=${requestId} No file in request`);
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 2. File size check (before reading full buffer)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      console.warn(`[Upload] reqId=${requestId} File too large: ${file.size} bytes`);
      return NextResponse.json(
        { error: `File size exceeds the ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB limit` },
        { status: 400 }
      );
    }

    // 3. Browser-reported MIME check (quick pre-filter)
    const reportedMime = file.type || '';
    if (!ALLOWED_MIME_TYPES.has(reportedMime)) {
      console.warn(`[Upload] reqId=${requestId} Rejected MIME type: ${reportedMime}`);
      return NextResponse.json(
        { error: 'Invalid file type. Only PNG, JPEG, WebP, and GIF images are accepted.' },
        { status: 400 }
      );
    }

    // 4. Read buffer and verify magic bytes (server-side MIME verification)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const confirmedMime = detectMimeFromBuffer(buffer);
    if (!confirmedMime) {
      console.warn(`[Upload] reqId=${requestId} Magic byte check failed for reported MIME: ${reportedMime}`);
      return NextResponse.json(
        { error: 'File content does not match a supported image format.' },
        { status: 400 }
      );
    }

    // 5. Generate safe, unique object name — never use file.name
    const ext = mimeToExtension(confirmedMime);
    const objectName = `${LOGO_PREFIX}${randomUUID()}.${ext}`;

    console.log(`[Upload] reqId=${requestId} mime=${confirmedMime} size=${buffer.length} object=${objectName}`);

    // 6. Upload to GCS
    const bucket = storage.bucket(BUCKET_NAME);
    const gcsFile = bucket.file(objectName);

    await gcsFile.save(buffer, {
      metadata: {
        contentType: confirmedMime,
        cacheControl: 'public, max-age=31536000, immutable',
      },
      // Uniform bucket-level access — no per-object ACL needed if bucket is public
      resumable: false,
    });

    // 7. Build permanent public URL
    // Format: https://storage.googleapis.com/<bucket>/<object>
    const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${objectName}`;

    console.log(`[Upload] reqId=${requestId} Success → ${publicUrl}`);

    // 8. Return the same contract the frontend expects: { url, success }
    return NextResponse.json({
      success: true,
      url: publicUrl,
      publicId: objectName,        // extra metadata — not required by frontend
      contentType: confirmedMime,   // extra metadata — not required by frontend
    });

  } catch (err) {
    // Never return raw error details to the client
    console.error(`[Upload] reqId=${requestId} Unexpected error: ${err.message}`);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
