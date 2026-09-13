/**
 * Google Analytics 4 tracking helpers for PDF tools.
 * Zero document contents or private metadata are ever recorded.
 */

export function trackPdfToolView(tool) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pdf_tool_view', { tool });
  }
}

export function trackPdfProcessingStarted(tool, fileCount = 1) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pdf_processing_started', {
      tool,
      file_count: fileCount,
    });
  }
}

export function trackPdfProcessingCompleted(tool, { fileCount = 1, durationMs = 0, pageCount = 0 }) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pdf_processing_completed', {
      tool,
      file_count: fileCount,
      duration_ms: durationMs,
      page_count: pageCount,
    });
  }
}

export function trackPdfDownloaded(tool, type = 'single') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pdf_downloaded', {
      tool,
      download_type: type,
    });
  }
}
