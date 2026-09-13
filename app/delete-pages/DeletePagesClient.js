'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileText, Trash2, Download, RefreshCw, Loader2, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PdfUploadZone from '@/components/pdf-tools/PdfUploadZone';
import PdfPageGrid from '@/components/pdf-tools/PdfPageGrid';
import { deletePages, downloadPdfBlob, getPdfInfo, renderPdfThumbnails } from '@/lib/pdfProcessing';
import { trackPdfToolView, trackPdfProcessingStarted, trackPdfProcessingCompleted, trackPdfDownloaded } from '@/lib/pdfAnalytics';
import { formatBytes } from '@/lib/utils';

export default function DeletePagesClient() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pages, setPages] = useState([]);
  const [selectedToDelete, setSelectedToDelete] = useState([]); // Array of 0-indexed page indices
  const [isProcessing, setIsProcessing] = useState(false);
  const [cleanedBlob, setCleanedBlob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    trackPdfToolView('delete-pages');
  }, []);

  const handleFiles = useCallback(async (files) => {
    if (files.length === 0) return;
    const selectedFile = files[0];
    setFile(selectedFile);
    setCleanedBlob(null);
    setSelectedToDelete([]);
    setError(null);

    try {
      const info = await getPdfInfo(selectedFile);
      setPageCount(info.pageCount);
      const thumbs = await renderPdfThumbnails(selectedFile, { maxPages: 60 });
      setPages(thumbs);
    } catch {
      setPageCount(1);
    }
  }, []);

  const handleToggleSelect = (pageIndexOrNumber) => {
    const idx = typeof pageIndexOrNumber === 'number' ? pageIndexOrNumber - 1 : 0;
    setSelectedToDelete((prev) =>
      prev.includes(idx) ? prev.filter((p) => p !== idx) : [...prev, idx]
    );
    setCleanedBlob(null);
  };

  const handleDelete = async () => {
    if (!file) return;
    if (selectedToDelete.length === 0) {
      setError('Please select at least one page to delete.');
      return;
    }
    if (selectedToDelete.length >= pageCount) {
      setError('You cannot delete all pages. At least one page must remain.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    const startTime = Date.now();
    trackPdfProcessingStarted('delete-pages', 1);

    try {
      const { blob, remainingCount } = await deletePages(file, selectedToDelete);
      setCleanedBlob(blob);

      const durationMs = Date.now() - startTime;
      trackPdfProcessingCompleted('delete-pages', {
        fileCount: 1,
        durationMs,
        pageCount: remainingCount,
      });
    } catch (err) {
      console.error('Delete pages error:', err);
      setError(err.message || 'Failed to delete pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!cleanedBlob) return;
    downloadPdfBlob(cleanedBlob, `${file.name.replace(/\.pdf$/i, '')}-pages-removed.pdf`);
    trackPdfDownloaded('delete-pages');
  };

  const handleReset = () => {
    setFile(null);
    setPages([]);
    setPageCount(0);
    setSelectedToDelete([]);
    setCleanedBlob(null);
    setError(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12 p-6 sm:p-8 md:p-10 space-y-6">
      {!file ? (
        <PdfUploadZone
          onFiles={handleFiles}
          multiple={false}
          label="Drag & Drop PDF to Delete Pages"
          sublabel="or click to browse a PDF document"
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

          {/* Selection Banner */}
          {!cleanedBlob && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/80 border border-slate-200/90 rounded-2xl gap-2">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Select Pages to Remove:
                </p>
                <p className="text-[11px] text-slate-500">
                  Click any page thumbnail below to toggle deletion. Red badge indicates page marked for removal.
                </p>
              </div>

              <span className="text-xs font-bold font-mono px-3 py-1 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 self-start sm:self-auto">
                {selectedToDelete.length} selected
              </span>
            </div>
          )}

          {/* Visual Page Grid */}
          {!cleanedBlob && (
            <PdfPageGrid
              pages={pages}
              mode="delete"
              selectedPages={selectedToDelete.map((idx) => idx + 1)}
              onToggleSelect={handleToggleSelect}
            />
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Action Blocks */}
          <div className="pt-2">
            {!cleanedBlob ? (
              <Button
                onClick={handleDelete}
                disabled={isProcessing || selectedToDelete.length === 0}
                className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-rose-500/25 gap-2 text-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Removing Pages in Browser RAM…
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete {selectedToDelete.length} Selected {selectedToDelete.length === 1 ? 'Page' : 'Pages'}
                  </>
                )}
              </Button>
            ) : (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-base">
                      Pages Removed Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700">
                      New document has {pageCount - selectedToDelete.length} pages remaining ({formatBytes(cleanedBlob.size)}).
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <Button
                    onClick={handleDownload}
                    className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-emerald-500/25 gap-2 text-sm transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download Cleaned PDF
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl h-12 px-5 text-xs border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                    Delete Pages from Another PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
