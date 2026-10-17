/**
 * app/api/jpg-to-excel/extract/route.js
 * 
 * Multimodal AI Table Extraction Endpoint using Google Gemini via Vertex AI.
 * 
 * Security & Validation:
 * - Server-side only (Vertex AI and GCP credentials never exposed to client).
 * - Enforces 10 MB file size limit and non-zero byte checks.
 * - Verifies true binary signatures (magic bytes for JPEG, PNG, WebP) to prevent MIME spoofing.
 * - Pacing & retry mechanisms prevent quota exhaustion.
 * - Does not log image bytes or extracted sensitive table data.
 * - Pure Gemini via Vertex AI (no PaddleOCR, Tesseract, or external OCR engines).
 */

import { NextResponse } from 'next/server';
import { extractTablesWithVertexGemini } from '@/lib/vertexGeminiClient';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]);

const MAGIC_BYTES = [
  { mime: 'image/png', bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: 'image/jpeg', bytes: [0xff, 0xd8, 0xff] },
  { mime: 'image/webp', bytes: [0x52, 0x49, 0x46, 0x46] }, // 'RIFF' prefix
];

import crypto from 'crypto';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createSlidingWindowLimiter, createConcurrencyLimiter } from '@/lib/ipRateLimiter';
import { checkConversionLimit, recordSuccessfulConversion } from '@/lib/userConversionLimits';

// ── Concurrency & Rate Limiting ──────────────────────────────────────────────

export const rateLimiter = createSlidingWindowLimiter({ windowMs: 60000, maxRequests: 15 });
export const concurrencyLimiter = createConcurrencyLimiter(5);


function verifyMagicBytes(buffer) {
  if (!buffer || buffer.length < 4) return null;
  for (const sig of MAGIC_BYTES) {
    const match = sig.bytes.every((b, i) => buffer[i] === b);
    if (match) return sig.mime;
  }
  return null;
}

export async function POST(request) {
  const startTime = Date.now();
  const requestId = request.headers.get('x-cloud-trace-context') || `jpg2xl_${Date.now()}`;

  // 1. Client IP rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : (request.headers.get('x-real-ip') || '127.0.0.1');

  const rateLimit = rateLimiter.check(clientIp);
  if (rateLimit.limited) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many AI extraction requests from your IP. Please wait ${rateLimit.retryAfter} seconds before trying again.`,
        code: 'IP_RATE_LIMITED',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfter),
        },
      }
    );
  }

  // 2. Server-side 1-conversion-per-user enforcement
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (authErr) {
    // Fallback gracefully for anonymous requests
  }
  const userEmail = session?.user?.email || null;
  const isAdmin = Boolean(session?.user?.isAdmin || session?.user?.role === 'admin');
  const existingVisitorId = request.cookies.get('jpg2xl_uid')?.value || null;
  const visitorId = existingVisitorId || crypto.randomUUID();

  const quotaCheck = await checkConversionLimit({
    email: userEmail,
    visitorId,
    ip: clientIp,
    isAdmin,
  });

  if (!quotaCheck.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: quotaCheck.reason,
        code: 'CONVERSION_LIMIT_REACHED',
      },
      { status: 403 }
    );
  }


  // 2. Concurrency limiting
  if (!concurrencyLimiter.acquire()) {
    return NextResponse.json(
      {
        success: false,
        error: 'The AI extraction engine is currently at maximum capacity. Please wait a few seconds and try again.',
        code: 'MAX_CONCURRENCY_REACHED',
      },
      {
        status: 503,
        headers: {
          'Retry-After': '5',
        },
      }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image') || formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { success: false, error: 'Please upload a valid JPG, JPEG, or PNG image file.' },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { success: false, error: 'The uploaded image file is empty (0 bytes).' },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        {
          success: false,
          error: `Image size (${sizeMb} MB) exceeds the 10 MB limit for AI table extraction. Please upload a smaller image.`,
        },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Verify true magic byte signature
    const verifiedMime = verifyMagicBytes(buffer);
    if (!verifiedMime || !ALLOWED_MIME_TYPES.has(verifiedMime)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unsupported or corrupted image format. Please upload a genuine JPG, JPEG, PNG, or WebP image.',
        },
        { status: 400 }
      );
    }

    // Call Gemini via Vertex AI
    let result;
    try {
      result = await extractTablesWithVertexGemini(buffer, verifiedMime);
    } catch (modelErr) {
      console.error(`[AI JPG-to-Excel Error] reqId=${requestId} error=${modelErr.message}`);

      // Discriminate between quota/credentials vs generic failures
      const msg = String(modelErr.message || '');
      if (msg.includes('credentials') || msg.includes('GoogleAuth') || msg.includes('UNAUTHENTICATED')) {
        return NextResponse.json(
          {
            success: false,
            error: 'AI table extraction service is currently awaiting Google Cloud credential verification. Please ensure Vertex AI service credentials are configured.',
            code: 'AUTH_REQUIRED',
          },
          { status: 503 }
        );
      }

      if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
        return NextResponse.json(
          {
            success: false,
            error: 'AI extraction request limit reached. Please wait a moment and try again.',
            code: 'RATE_LIMITED',
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'An error occurred while analyzing the image table with Gemini AI. Please try again with a clear, high-contrast image.',
          details: process.env.NODE_ENV === 'development' ? modelErr.message : undefined,
        },
        { status: 500 }
      );
    }

    if (!result.hasTables || !result.tables || result.tables.length === 0) {
      return NextResponse.json(
        {
          success: false,
          hasTables: false,
          error: "We couldn't detect a structured table in this image. Please upload a clear image containing visible rows, columns, or borders.",
        },
        { status: 422 }
      );
    }

    const processingTimeMs = Date.now() - startTime;
    let uncertainCount = 0;
    result.tables.forEach((t) => {
      uncertainCount += (t.uncertainCells || []).length;
    });

    // Record successful conversion to enforce 1-conversion limit
    await recordSuccessfulConversion({
      email: userEmail,
      visitorId,
      ip: clientIp,
      isAdmin,
    });

    const res = NextResponse.json({
      success: true,
      hasTables: true,
      tables: result.tables,
      notes: result.notes || '',
      uncertainCellsCount: uncertainCount,
      model: result.model,
      processingTimeMs,
    });

    if (!existingVisitorId) {
      res.cookies.set('jpg2xl_uid', visitorId, {
        path: '/',
        httpOnly: true,
        maxAge: 31536000,
        sameSite: 'lax',
      });
    }

    return res;
  } catch (err) {
    console.error(`[AI JPG-to-Excel Fatal Error] reqId=${requestId} error=${err.message}`);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred while processing your image.' },
      { status: 500 }
    );
  } finally {
    concurrencyLimiter.release();
  }
}

