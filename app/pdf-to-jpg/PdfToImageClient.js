'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileText, Download, RefreshCw, Loader2, Sparkles, CheckCircle2, Archive, Sliders, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PdfUploadZone from '@/components/pdf-tools/PdfUploadZone';
import PdfProcessingProgress from '@/components/pdf-tools/PdfProcessingProgress';
import { renderPDFToImages, downloadPdfBlob, getPdfInfo } from '@/lib/pdfProcessing';
import { trackPdfToolView, trackPdfProcessingStarted, trackPdfProcessingCompleted, trackPdfDownloaded } from '@/lib/pdfAnalytics';
import { formatBytes } from '@/lib/utils';
import { PDF_CONFIG } from '@/lib/pdfConfig';
import NextToolJourney from '@/components/image-tools/NextToolJourney';

export default function PdfToImageClient({
  toolSlug = 'pdf-to-jpg',
  format = 'jpeg', // 'jpeg' | 'png'
  defaultFormatLabel = 'JPG',
}) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [resolutionScale, setResolutionScale] = useState(PDF_CONFIG.scales.standard);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [renderedPages, setRenderedPages] = useState([]);
  const [isZipping, setIsZipping] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    trackPdfToolView(toolSlug);
  }, [toolSlug]);

  const handleFiles = useCallback(async (files) => {
    if (files.length === 0) return;
    const selectedFile = files[0];
    setFile(selectedFile);
    setRenderedPages([]);
    setProgress(0);
    setError(null);

    try {
      const info = await getPdfInfo(selectedFile);
      setPageCount(info.pageCount);
    } catch {
      setPageCount(1);
    }
  }, []);

  const handleRender = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(5);
    setError(null);
    const startTime = Date.now();
    trackPdfProcessingStarted(toolSlug, 1);

    try {
      const pages = await renderPDFToImages(file, {
        format,
        scale: resolutionScale,
        onProgress: (p) => setProgress(p),
      });

      // Enrich with local preview URLs
      const enriched = pages.map((p) => ({
        ...p,
        previewUrl: URL.createObjectURL(p.blob),
      }));

      setRenderedPages(enriched);

      const durationMs = Date.now() - startTime;
      trackPdfProcessingCompleted(toolSlug, {
        fileCount: 1,
        durationMs,
        pageCount: pages.length,
      });
    } catch (err) {
      console.error('Render error:', err);
      setError(err.message || 'Failed to render PDF pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSingle = (page) => {
    const baseName = file.name.replace(/\.pdf$/i, '');
    const ext = format === 'png' ? 'png' : 'jpg';
    downloadPdfBlob(page.blob, `${baseName}-page-${page.pageNumber}.${ext}`);
    trackPdfDownloaded(toolSlug, 'single');
  };

  const handleDownloadAllZip = async () => {
    if (renderedPages.length === 0) return;
    setIsZipping(true);

    try {
      const { zipSync } = await import('fflate');
      const zipEntries = {};
      const baseName = file.name.replace(/\.pdf$/i, '');
      const ext = format === 'png' ? 'png' : 'jpg';

      for (const p of renderedPages) {
        const arrayBuffer = await p.blob.arrayBuffer();
        zipEntries[`${baseName}-page-${p.pageNumber}.${ext}`] = new Uint8Array(arrayBuffer);
      }

      const zipped = zipSync(zipEntries, { level: 0 });
      const zipBlob = new Blob([zipped], { type: 'application/zip' });
      downloadPdfBlob(zipBlob, `${baseName}-${ext}-pages.zip`);
      trackPdfDownloaded(toolSlug, 'zip');
    } catch (err) {
      console.error('ZIP packaging error:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleReset = () => {
    renderedPages.forEach((p) => {
      if (p.previewUrl) URL.revokeObjectURL(p.previewUrl);
    });
    setFile(null);
    setPageCount(0);
    setRenderedPages([]);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12 p-6 sm:p-8 md:p-10 space-y-6">
      {!file ? (
        <PdfUploadZone
          onFiles={handleFiles}
          multiple={false}
          label={`Drag & Drop PDF to Convert to ${defaultFormatLabel}`}
          sublabel={`or click to browse a PDF document`}
          privacyBadge="Client-Side Browser Processing"
          maxSizeLabel="Max file size: 100MB"
        />
      ) : (
        <div className="space-y-6">
          {/* Active File Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-slate-50/80 border border-slate-200/90 rounded-2xl gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
                <p className="text-xs text-slate-500 font-medium">
                  {pageCount} {pageCount === 1 ? 'page' : 'pages'} · {formatBytes(file.size)}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-xs text-slate-600 hover:text-rose-600 rounded-xl bg-white border-slate-200 self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              Change PDF
            </Button>
          </div>

          {/* Resolution / DPI Controls */}
          {renderedPages.length === 0 && (
            <div className="p-5 md:p-6 bg-slate-50/60 border border-slate-200/90 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Page Rendering Resolution</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60">
                {[
                  { scale: PDF_CONFIG.scales.standard, label: 'Standard', desc: '150 DPI · Fast & balanced' },
                  { scale: PDF_CONFIG.scales.high, label: 'High', desc: '200 DPI · Recommended' },
                  { scale: PDF_CONFIG.scales.veryHigh, label: 'Very High', desc: '300 DPI · Print clarity' },
                ].map((item) => (
                  <button
                    key={item.scale}
                    type="button"
                    onClick={() => setResolutionScale(item.scale)}
                    className={`p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                      resolutionScale === item.scale
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                        : 'text-slate-600 hover:bg-white/60 font-medium'
                    }`}
                  >
                    <span className="text-sm block">{item.label}</span>
                    <span className="text-[11px] text-slate-500 font-normal">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Progress or Render Action */}
          {isProcessing ? (
            <PdfProcessingProgress progress={progress} statusText={`Rendering ${pageCount} PDF pages to ${defaultFormatLabel} in browser…`} />
          ) : renderedPages.length === 0 ? (
            <Button
              onClick={handleRender}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-blue-500/25 gap-2 text-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Convert {pageCount} {pageCount === 1 ? 'Page' : 'Pages'} to {defaultFormatLabel}
            </Button>
          ) : null}

          {/* Rendered Image Grid Results */}
          {renderedPages.length > 0 && (
            <div className="space-y-6">
              {/* Batch Action Bar / Success Card */}
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-base">
                      {renderedPages.length} {renderedPages.length === 1 ? 'Page' : 'Pages'} Rendered to {defaultFormatLabel}!
                    </h4>
                    <p className="text-xs text-emerald-700">
                      Download individual pages below or save all pages as a single ZIP archive.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <Button
                    onClick={handleDownloadAllZip}
                    disabled={isZipping}
                    className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-emerald-500/25 gap-2 text-sm transition-all cursor-pointer"
                  >
                    {isZipping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Archive className="w-4 h-4" />}
                    Download All ({renderedPages.length}) as ZIP
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl h-12 px-5 text-xs border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                    Convert Another PDF
                  </Button>
                </div>
              </div>

              {/* Grid of Extracted Images */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
                  Individual Pages ({renderedPages.length})
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {renderedPages.map((page) => (
                    <div
                      key={page.pageNumber}
                      className="group bg-slate-50/60 border border-slate-200/90 rounded-2xl p-3 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                          <span>Page {page.pageNumber}</span>
                          <span className="font-mono">{formatBytes(page.blob.size)}</span>
                        </div>

                        <div className="relative aspect-[3/4] bg-white rounded-xl overflow-hidden flex items-center justify-center p-1 border border-slate-200/70 shadow-2xs">
                          <img
                            src={page.previewUrl}
                            alt={`Page ${page.pageNumber}`}
                            className="max-w-full max-h-full object-contain rounded"
                          />
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadSingle(page)}
                        className="mt-3 w-full rounded-xl text-xs font-bold gap-1.5 h-8 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Save {defaultFormatLabel}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cross-Product Image Workflow Continuum */}
              <NextToolJourney
                workflow="pdf-to-image"
                customTitle="Extracted your images? Continue your workflow:"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
