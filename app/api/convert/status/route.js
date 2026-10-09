import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { getPresignedDownloadUrl } from '@/lib/s3Storage';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { error: 'Missing jobId parameter' },
        { status: 400 }
      );
    }

    const jobsCollection = await getCollection('conversion_jobs');
    const job = await jobsCollection.findOne({ jobId });

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found or expired', status: 'expired' },
        { status: 404 }
      );
    }

    let downloadUrl = null;
    if (job.status === 'completed' && job.resultKey) {
      downloadUrl = await getPresignedDownloadUrl(
        job.resultKey,
        job.resultFilename || 'converted_document.pdf'
      );
    }

    return NextResponse.json({
      jobId: job.jobId,
      status: job.status,
      progress: job.progress || (job.status === 'completed' ? 100 : 50),
      downloadUrl,
      downloadFilename: job.resultFilename,
      error: job.error,
    });
  } catch (err) {
    console.error('API /api/convert/status error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch job status.', details: err.message },
      { status: 500 }
    );
  }
}
