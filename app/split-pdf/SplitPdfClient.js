'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileText, Scissors, Download, RefreshCw, Loader2, Sparkles, CheckCircle2, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PdfUploadZone from '@/components/pdf-tools/PdfUploadZone';
import { splitPdf, downloadPdfBlob, getPdfInfo } from '@/lib/pdfProcessing';
import { trackPdfToolView, trackPdfProcessingStarted, trackPdfProcessingCompleted, trackPdfDownloaded } from '@/lib/pdfAnalytics';
import { formatBytes } from '@/lib/utils';

export default function SplitPdfClient() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState('ranges'); // 'ranges' | 'all'
  const [rangeString, setRangeString] = useState('1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [resultPages, setResultPages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    trackPdfToolView('split-pdf');
  }, []);

  const handleFiles = useCallback(async (files) => {
    if (files.length === 0) return;
    const selectedFile = files[0];
    setFile(selectedFile);
    setResultBlob(null);
    setResultPages([]);
    setError(null);

    try {
      const info = await getPdfInfo(selectedFile);
      setPageCount(info.pageCount);
      setRangeString(`1-${Math.min(3, info.pageCount)}`);
    } catch {
      setPageCount(1);
    }
  }, []);

  const handleSplit = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    const startTime = Date.now();
    trackPdfProcessingStarted('split-pdf', 1);

    try {
      if (mode === 'all') {
        const pages = await splitPdf(file, { mode: 'all' });
        setResultPages(pages);
      } else {
        const blob = await splitPdf(file, { mode: 'ranges', rangeString });
        setResultBlob(blob);
      }

      const durationMs = Date.now() - startTime;
      trackPdfProcessingCompleted('split-pdf', {
        fileCount: 1,
        durationMs,
        pageCount,
      });
    } catch (err) {
      console.error('Split error:', err);
      setError(err.message || 'Failed to split PDF. Please check your page range.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSingle = () => {
    if (!resultBlob) return;
    downloadPdfBlob(resultBlob, `${file.name.replace(/\.pdf$/i, '')}-extracted.pdf`);
    trackPdfDownloaded('split-pdf', 'single');
  };

  const handleDownloadAllZip = async () => {
    if (resultPages.length === 0) return;
    const { zipSync } = await import('fflate');

    const zipEntries = {};
    const baseName = file.name.replace(/\.pdf$/i, '');

    for (const p of resultPages) {
      const arrayBuffer = await p.blob.arrayBuffer();
      zipEntries[`${baseName}-page-${p.pageNumber}.pdf`] = new Uint8Array(arrayBuffer);
    }

    const zipped = zipSync(zipEntries, { level: 0 });
    const zipBlob = new Blob([zipped], { type: 'application/zip' });
    downloadPdfBlob(zipBlob, `${baseName}-all-pages.zip`);
    trackPdfDownloaded('split-pdf', 'zip');
  };

  const handleReset = () => {
    setFile(null);
    setPageCount(0);
    setResultBlob(null);
    setResultPages([]);
    setError(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12 p-6 sm:p-8 md:p-10 space-y-6">
      {!file ? (
        <PdfUploadZone
          onFiles={handleFiles}
          multiple={false}
          label="Drag & Drop PDF to Split"
          sublabel="or click to browse a PDF document"
          privacyBadge="Client-Side Browser Processing"
          maxSizeLabel="Max file size: 100MB"
        />
      ) : (
        <div className="space-y-6">
          {/* Active File Card */}
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

          {/* Split Mode Selector */}
          {!resultBlob && resultPages.length === 0 && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-xs space-y-5">
              <h3 className="text-sm font-bold text-slate-900">Choose Split Method</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => { setMode('ranges'); setResultBlob(null); setResultPages([]); }}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                    mode === 'ranges'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:bg-white/60 font-medium'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider block text-blue-600 font-semibold mb-0.5">Extract Range</span>
                  <span className="text-sm">Custom Page Range</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMode('all'); setResultBlob(null); setResultPages([]); }}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                    mode === 'all'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:bg-white/60 font-medium'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider block text-blue-600 font-semibold mb-0.5">Burst All</span>
                  <span className="text-sm">Extract All Pages into ZIP</span>
                </button>
              </div>

              {mode === 'ranges' && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Enter Page Numbers or Ranges (e.g. 1-3, 5, 8-10):
                  </label>
                  <input
                    type="text"
                    value={rangeString}
                    onChange={(e) => setRangeString(e.target.value)}
                    placeholder="e.g. 1-3, 5"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    Total document length: {pageCount} {pageCount === 1 ? 'page' : 'pages'}.
                  </p>
                </div>
              )}

              {mode === 'all' && (
                <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-800 space-y-1">
                  <p className="font-semibold">Extract Every Page Individually</p>
                  <p className="text-blue-600/90 text-[11px]">
                    This will split your {pageCount}-page PDF into {pageCount} single-page documents packaged into a downloadable ZIP file.
                  </p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <Button
                  onClick={handleSplit}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-blue-500/25 gap-2 text-sm transition-all cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Splitting in Browser RAM…
                    </>
                  ) : (
                    <>
                      <Scissors className="w-4 h-4" />
                      {mode === 'ranges' ? 'Extract Selected Pages' : `Split into ${pageCount} Individual Pages`}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Results Action Block: Single Range Result */}
          {resultBlob && (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-base">
                    Pages Extracted Successfully!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Extracted pages from {file.name} ({formatBytes(resultBlob.size)}).
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <Button
                  onClick={handleDownloadSingle}
                  className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-emerald-500/25 gap-2 text-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Extracted PDF
                </Button>

                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl h-12 px-5 text-xs border-slate-200"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                  Split Another PDF
                </Button>
              </div>
            </div>
          )}

          {/* Results Action Block: Burst Pages Result */}
          {resultPages.length > 0 && (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-base">
                    PDF Split Into {resultPages.length} Files!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    All individual pages extracted and ready to download as a ZIP archive.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <Button
                  onClick={handleDownloadAllZip}
                  className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-emerald-500/25 gap-2 text-sm transition-all cursor-pointer"
                >
                  <Archive className="w-4 h-4" />
                  Download All Pages as ZIP Archive
                </Button>

                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl h-12 px-5 text-xs border-slate-200"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                  Split Another PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
