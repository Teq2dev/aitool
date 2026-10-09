import { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const REGION = process.env.AWS_REGION || 'us-east-1';
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'bestaitoolsfree-conversions';
const SQS_QUEUE_URL = process.env.AWS_SQS_QUEUE_URL || '';

const s3Config = { region: REGION };
const sqsConfig = { region: REGION };

if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  s3Config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
  sqsConfig.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

export const s3Client = new S3Client(s3Config);
export const sqsClient = new SQSClient(sqsConfig);

/**
 * Generate a presigned PUT URL for single-part file upload (Files < 20 MB).
 */
export async function getPresignedUploadUrl(fileKey, mimeType, expiresInSeconds = 600) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    ContentType: mimeType,
  });
  return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
}

/**
 * Generate a presigned GET URL for downloading converted outputs.
 */
export async function getPresignedDownloadUrl(fileKey, filename, expiresInSeconds = 900) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    ResponseContentDisposition: `attachment; filename="${encodeURIComponent(filename)}"`,
  });
  return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
}

/**
 * Verify S3 Object Existence and return actual ContentLength.
 */
export async function checkS3ObjectSize(fileKey) {
  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
    });
    const res = await s3Client.send(command);
    return res.ContentLength || 0;
  } catch (err) {
    return null;
  }
}

/**
 * Initiate Multipart Upload for large files (>= 20 MB).
 */
export async function initiateMultipartUpload(fileKey, mimeType) {
  const command = new CreateMultipartUploadCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    ContentType: mimeType,
  });
  const res = await s3Client.send(command);
  return { uploadId: res.UploadId, fileKey };
}

/**
 * Generate presigned URL for a single part of a multipart upload.
 */
export async function getPresignedPartUrl(fileKey, uploadId, partNumber, expiresInSeconds = 600) {
  const command = new UploadPartCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    UploadId: uploadId,
    PartNumber: partNumber,
  });
  return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
}

/**
 * Complete Multipart Upload after all parts are uploaded.
 */
export async function completeMultipartUpload(fileKey, uploadId, parts) {
  const command = new CompleteMultipartUploadCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: parts, // Array of { ETag, PartNumber }
    },
  });
  return await s3Client.send(command);
}

/**
 * Dispatch job payload message to AWS SQS Queue.
 */
export async function dispatchSqsJob(jobData) {
  if (!SQS_QUEUE_URL) {
    console.warn('AWS_SQS_QUEUE_URL not configured.');
    return null;
  }
  const command = new SendMessageCommand({
    QueueUrl: SQS_QUEUE_URL,
    MessageBody: JSON.stringify(jobData),
  });
  return await sqsClient.send(command);
}
