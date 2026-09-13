'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileText, ArrowUp, ArrowDown, Trash2, Download, RefreshCw, Loader2, Sparkles, Files } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PdfUploadZone from '@/components/pdf-tools/PdfUploadZone';
import { mergePdfFiles, downloadPdfBlob, getPdfInfo } from '@/lib/pdfProcessing';
import { trackPdfToolView, trackPdfProcessingStarted, trackPdfProcessingCompleted, trackPdfDownloaded } from '@/lib/pdfAnalytics';
import { formatBytes } from '@/lib/utils';

export default function MergePdfClient() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedBlob, setMergedBlob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    trackPdfToolView('merge-pdf');
  }, []);

  const handleFiles = useCallback(async (newFiles) => {
    const enriched = await Promise.all(
      newFiles.map(async (file) => {
        let pageCount = 1;
        try {
          const info = await getPdfInfo(file);
          pageCount = info.pageCount;
        } catch {
          // fallback
        }
        return {
          id: crypto.randomUUID(),
          file,
          pageCount,
        };
      })
    );

    setFiles((prev) => [...prev, ...enriched]);
    setMergedBlob(null);
    setError(null);
  }, []);

  const moveFile = (index, direction) => {
    setFiles((prev) => {
      const next = [...prev];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
    setMergedBlob(null);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setMergedBlob(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    const startTime = Date.now();
    trackPdfProcessingStarted('merge-pdf', files.length);

    try {
      const rawFiles = files.map((f) => f.file);
      const blob = await mergePdfFiles(rawFiles);
      setMergedBlob(blob);

      const durationMs = Date.now() - startTime;
      const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0);
      trackPdfProcessingCompleted('merge-pdf', {
        fileCount: files.length,
        durationMs,
        pageCount: totalPages,
      });
    } catch (err) {
      console.error('Merge error:', err);
      setError(err.message || 'Failed to merge PDF files. Ensure files are not corrupted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!mergedBlob) return;
    downloadPdfBlob(mergedBlob, `merged-document-${Date.now()}.pdf`);
    trackPdfDownloaded('merge-pdf');
  };

  const handleReset = () => {
    setFiles([]);
    setMergedBlob(null);
    setError(null);
  };

  const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0);
  const totalSize = files.reduce((sum, f) => sum + f.file.size, 0);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12 p-6 sm:p-8 md:p-10 space-y-6">
      {/* Upload Zone */}
      {!mergedBlob && (
        <PdfUploadZone
          onFiles={handleFiles}
          multiple={true}
          compact={files.length > 0}
          label="Drag & Drop PDF Documents Here"
          sublabel="or click to browse multiple PDFs"
        />
      )}

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* File List Queue (when not yet merged or when editing files) */}
      {files.length > 0 && !mergedBlob && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Files className="w-4 h-4 text-blue-600" />
              Files to Merge ({files.length})
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Total: <strong>{totalPages} pages</strong> · {formatBytes(totalSize)}
            </span>
          </div>

          <div className="space-y-2.5">
            {files.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-200/90 rounded-2xl shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-600 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate" title={item.file.name}>
                      {item.file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.pageCount} {item.pageCount === 1 ? 'page' : 'pages'} · {formatBytes(item.file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveFile(idx, -1)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === files.length - 1}
                    onClick={() => moveFile(idx, 1)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFile(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer ml-1"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              onClick={handleMerge}
              disabled={isProcessing || files.length < 2}
              className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-blue-500/25 gap-2 text-sm transition-all cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Merging Documents in Browser RAM…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Merge {files.length} PDF Documents
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full sm:w-auto text-slate-600 rounded-2xl h-12 px-5 text-xs font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Success State */}
      {mergedBlob && (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 text-base">
                Documents Merged Successfully!
              </h4>
              <p className="text-xs text-emerald-700">
                Combined {files.length} PDF files into a single {totalPages}-page document ({formatBytes(mergedBlob.size)}).
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <Button
              onClick={handleDownload}
              className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-emerald-500/25 gap-2 text-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Merged PDF
            </Button>

            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl h-12 px-5 text-xs border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              Merge Another Set
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
