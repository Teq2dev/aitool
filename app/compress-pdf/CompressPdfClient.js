'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileText, Minimize2, Download, RefreshCw, Loader2, Sparkles, CheckCircle2, Info, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PdfUploadZone from '@/components/pdf-tools/PdfUploadZone';
import PdfProcessingProgress from '@/components/pdf-tools/PdfProcessingProgress';
import { compressPDF, downloadPdfBlob, getPdfInfo } from '@/lib/pdfProcessing';
import { trackPdfToolView, trackPdfProcessingStarted, trackPdfProcessingCompleted, trackPdfDownloaded } from '@/lib/pdfAnalytics';
import { formatBytes } from '@/lib/utils';

const PRESETS = [
  {
    id: 'gentle',
    label: 'Gentle',
    desc: 'Light cleanup',
    detail: 'Reduces size with minimal quality impact. Great for archiving important documents.',
    quality: '82% quality',
    color: 'emerald',
  },
  {
    id: 'balanced',
    label: 'Balanced',
    desc: 'Recommended',
    detail: 'Best balance between file size and visual quality. Suitable for most documents.',
    quality: '72% quality',
    color: 'blue',
  },
  {
    id: 'aggressive',
    label: 'Maximum',
    desc: 'Smallest file',
    detail: 'Maximum compression. Best for documents that will only be viewed on screen.',
    quality: '55% quality',
    color: 'orange',
  },
];

export default function CompressPdfClient() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [preset, setPreset] = useState('balanced');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    trackPdfToolView('compress-pdf');
  }, []);

  const handleFiles = useCallback(async (files) => {
    if (files.length === 0) return;
    const selectedFile = files[0];
    setFile(selectedFile);
    setResult(null);
    setProgress(0);
    setError(null);

    try {
      const info = await getPdfInfo(selectedFile);
      setPageCount(info.pageCount);
    } catch {
      setPageCount(1);
    }
  }, []);

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(5);
    setError(null);
    const startTime = Date.now();
    trackPdfProcessingStarted('compress-pdf', 1);

    try {
      const res = await compressPDF(file, preset, (p) => setProgress(p));
      setResult(res);

      const durationMs = Date.now() - startTime;
      trackPdfProcessingCompleted('compress-pdf', {
        fileCount: 1,
        durationMs,
        pageCount,
      });
    } catch (err) {
      console.error('Compress error:', err);
      setError(err.message || 'Failed to compress PDF. Please try with a different file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result?.blob) return;
    downloadPdfBlob(result.blob, `${file.name.replace(/\.pdf$/i, '')}-compressed.pdf`);
    trackPdfDownloaded('compress-pdf');
  };

  const handleReset = () => {
    setFile(null);
    setPageCount(0);
    setResult(null);
    setProgress(0);
    setError(null);
  };

  const activePreset = PRESETS.find((p) => p.id === preset);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12 p-6 sm:p-8 md:p-10 space-y-6">
      {!file ? (
        <PdfUploadZone
          onFiles={handleFiles}
          multiple={false}
          label="Drag & Drop PDF to Compress"
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

          {/* Preset Selector */}
          {!result && !isProcessing && (
            <div className="p-5 md:p-6 bg-slate-50/60 border border-slate-200/90 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Compression Level</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPreset(p.id)}
                    className={`relative p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                      preset === p.id
                        ? 'border-blue-600 bg-white shadow-sm ring-2 ring-blue-600/10'
                        : 'border-slate-200/80 hover:border-slate-300 bg-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-sm font-bold ${preset === p.id ? 'text-blue-700' : 'text-slate-900'}`}>
                        {p.label}
                      </span>
                      {p.id === 'balanced' && (
                        <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-md">
                          Recommended
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block leading-tight">{p.detail}</span>
                    <span className={`text-[11px] font-bold mt-2.5 block ${preset === p.id ? 'text-blue-600' : 'text-slate-400'}`}>
                      {p.quality}
                    </span>
                  </button>
                ))}
              </div>

              {/* Honest Explainer */}
              <div className="p-3.5 bg-white border border-slate-200/70 rounded-xl flex items-start gap-3">
                <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  Compression re-encodes embedded image streams directly in your browser. If a document is already compressed or primarily text, we return the original file to prevent quality degradation.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Progress or Action */}
          {isProcessing ? (
            <PdfProcessingProgress
              progress={progress}
              statusText={`Optimizing ${pageCount} ${pageCount === 1 ? 'page' : 'pages'} with ${activePreset?.label} compression in browser…`}
            />
          ) : result ? (
            result.reduced ? (
              /* Success — real compression achieved */
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 animate-in fade-in duration-200">
                {/* Stats Bar */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Compression Complete!
                  </div>
                  <span className="text-xs font-black text-white bg-emerald-600 px-3 py-1 rounded-xl shadow-xs">
                    ↓ {result.reductionPercent}% Smaller
                  </span>
                </div>

                {/* Size comparison bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Original: {formatBytes(result.originalSize)}</span>
                    <span className="text-emerald-700">Compressed: {formatBytes(result.compressedSize)}</span>
                  </div>
                  <div className="h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(10, 100 - result.reductionPercent)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Reduced by {formatBytes(result.originalSize - result.compressedSize)} using {activePreset?.label} mode.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <Button
                    onClick={handleDownload}
                    className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-emerald-500/25 gap-2 text-sm transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download Compressed PDF ({formatBytes(result.compressedSize)})
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl h-12 px-5 text-xs border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                    Compress Another
                  </Button>
                </div>
              </div>
            ) : (
              /* Not smaller — honest notice */
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2.5 text-slate-800 font-bold text-sm">
                  <Info className="w-5 h-5 text-blue-600" />
                  PDF Already Optimally Compressed
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This PDF is already compactly encoded. Further compression at <strong>{activePreset?.label}</strong> level did not yield a smaller file without degrading quality. We safely preserved your original file.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <Button
                    onClick={handleDownload}
                    className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold h-12 rounded-2xl gap-2 text-xs transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download Unaltered Original ({formatBytes(result.originalSize)})
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="sm:w-auto bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl h-12 px-5 text-xs border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                    Try Another File
                  </Button>
                </div>
              </div>
            )
          ) : (
            <Button
              onClick={handleCompress}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-blue-500/25 gap-2 text-sm transition-all cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
              Compress PDF — {activePreset?.label} Mode
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
