/**
 * Image Analytics — tracks processing events without sending any image data.
 * All properties are metadata only (format, file size bucket, duration, reduction %).
 */

function gtag(...args) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

export function trackToolView(toolSlug) {
  gtag('event', 'image_tool_view', {
    tool: toolSlug,
  });
}

export function trackUploadStarted(toolSlug, fileCount, totalSizeBytes) {
  gtag('event', 'image_upload_started', {
    tool: toolSlug,
    file_count: fileCount,
    total_size_kb: Math.round(totalSizeBytes / 1024),
  });
}

export function trackProcessingStarted(toolSlug, format, fileCount) {
  gtag('event', 'image_processing_started', {
    tool: toolSlug,
    format,
    file_count: fileCount,
  });
}

export function trackProcessingCompleted(toolSlug, { inputFormat, outputFormat, durationMs, reductionPct, sizeBucket }) {
  gtag('event', 'image_processing_completed', {
    tool: toolSlug,
    input_format: inputFormat,
    output_format: outputFormat,
    duration_ms: Math.round(durationMs),
    reduction_pct: Math.round(reductionPct),
    size_bucket: sizeBucket,
  });
}

export function trackImageDownloaded(toolSlug, outputFormat) {
  gtag('event', 'image_downloaded', {
    tool: toolSlug,
    output_format: outputFormat,
  });
}

export function trackBatchDownloaded(toolSlug, fileCount, totalSizeMb) {
  gtag('event', 'image_batch_downloaded', {
    tool: toolSlug,
    file_count: fileCount,
    total_size_mb: Math.round(totalSizeMb * 10) / 10,
  });
}

export function trackCompressionCompleted(inputFormat, outputFormat, reductionPct) {
  gtag('event', 'compression_completed', {
    input_format: inputFormat,
    output_format: outputFormat,
    reduction_pct: Math.round(reductionPct),
  });
}

export function trackFormatConversion(fromFormat, toFormat) {
  gtag('event', 'format_conversion_completed', {
    from_format: fromFormat,
    to_format: toFormat,
  });
}
