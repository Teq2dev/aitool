import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getCollection } from '@/lib/db';
import { dispatchSqsJob, completeMultipartUpload, checkS3ObjectSize } from '@/lib/s3Storage';

const MAX_FILE_SIZE = parseInt(process.env.MAX_CONVERSION_FILE_SIZE_BYTES || '104857600', 10); // 100 MB

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fileKey,
      filename,
      fileSize,
      toolSlug,
      isMultipart = false,
      uploadId = null,
      parts = [],
      options = {},
    } = body;

    if (!fileKey || !filename || !toolSlug) {
      return NextResponse.json(
        { error: 'Missing required parameters: fileKey, filename, toolSlug' },
        { status: 400 }
      );
    }

    // Security Verification 1: Key Path Sanitization
    if (!fileKey.startsWith('raw/uploads/')) {
      return NextResponse.json(
        { error: 'Security violation: invalid fileKey path prefix.' },
        { status: 403 }
      );
    }

    // Complete multipart upload if applicable
    if (isMultipart && uploadId && parts.length > 0) {
      await completeMultipartUpload(fileKey, uploadId, parts);
    }

    // Security Verification 2: Verify S3 Object Existence & Actual Content Size
    const actualSize = await checkS3ObjectSize(fileKey);
    if (actualSize === null) {
      return NextResponse.json(
        { error: 'Uploaded object was not found in storage.' },
        { status: 404 }
      );
    }

    // Security Verification 3: Server-side File Size Enforcement
    if (actualSize > MAX_FILE_SIZE) {
      const maxMb = Math.round(MAX_FILE_SIZE / (1024 * 1024));
      return NextResponse.json(
        { error: `Verified file size (${Math.round(actualSize / 1024 / 1024)} MB) exceeds server limit of ${maxMb} MB.` },
        { status: 413 }
      );
    }

    const jobId = `job_${uuidv4().replace(/-/g, '')}`;

    // Job Record Schema
    const jobRecord = {
      jobId,
      status: 'queued', // created | uploaded | queued | processing | completed | failed | expired
      toolSlug,
      filename,
      fileSize: actualSize, // Use server-verified size
      fileKey,
      resultKey: null,
      resultFilename: null,
      options,
      error: null,
      progress: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const jobsCollection = await getCollection('conversion_jobs');
    await jobsCollection.insertOne(jobRecord);

    // Dispatch message to SQS Queue for Python worker
    await dispatchSqsJob({
      jobId,
      toolSlug,
      fileKey,
      filename,
      options,
    });

    return NextResponse.json({
      success: true,
      jobId,
      status: 'queued',
      message: 'Job created and queued for conversion.',
    });
  } catch (err) {
    console.error('API /api/convert/start-job error:', err);
    return NextResponse.json(
      { error: 'Failed to start conversion job.', details: err.message },
      { status: 500 }
    );
  }
}
