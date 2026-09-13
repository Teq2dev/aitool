'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileText, RotateCw, Download, RefreshCw, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PdfUploadZone from '@/components/pdf-tools/PdfUploadZone';
import PdfPageGrid from '@/components/pdf-tools/PdfPageGrid';
import { rotatePDF, downloadPdfBlob, getPdfInfo, renderPdfThumbnails } from '@/lib/pdfProcessing';
import { trackPdfToolView, trackPdfProcessingStarted, trackPdfProcessingCompleted, trackPdfDownloaded } from '@/lib/pdfAnalytics';
import { formatBytes } from '@/lib/utils';

export default function RotatePdfClient() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pages, setPages] = useState([]);
  const [globalRotation, setGlobalRotation] = useState(0);
  const [perPageRotations, setPerPageRotations] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotatedBlob, setRotatedBlob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    trackPdfToolView('rotate-pdf');
  }, []);

  const handleFiles = useCallback(async (files) => {
    if (files.length === 0) return;
    const selectedFile = files[0];
    setFile(selectedFile);
    setRotatedBlob(null);
    setPerPageRotations({});
    setGlobalRotation(0);
    setError(null);

    try {
      const info = await getPdfInfo(selectedFile);
      setPageCount(info.pageCount);
      const thumbs = await renderPdfThumbnails(selectedFile, { maxPages: 40 });
      setPages(thumbs);
    } catch {
      setPageCount(1);
    }
  }, []);

  const rotateAll = (deg) => {
    setGlobalRotation((prev) => (prev + deg) % 360);
    setPages((prev) =>
      prev.map((p) => ({
        ...p,
        rotation: ((p.rotation || 0) + deg) % 360,
      }))
    );
    setRotatedBlob(null);
  };

  const handleRotateSinglePage = (pageIdx) => {
    setPerPageRotations((prev) => ({
      ...prev,
      [pageIdx]: ((prev[pageIdx] || 0) + 90) % 360,
    }));
    setPages((prev) =>
      prev.map((p, idx) =>
        idx === pageIdx ? { ...p, rotation: ((p.rotation || 0) + 90) % 360 } : p
      )
    );
    setRotatedBlob(null);
  };

  const handleSaveRotations = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    const startTime = Date.now();
    trackPdfProcessingStarted('rotate-pdf', 1);

    try {
      const { blob } = await rotatePDF(file, {
        angle: globalRotation,
        perPageRotations: Object.keys(perPageRotations).length > 0 ? perPageRotations : null,
      });
      setRotatedBlob(blob);

      const durationMs = Date.now() - startTime;
      trackPdfProcessingCompleted('rotate-pdf', {
        fileCount: 1,
        durationMs,
        pageCount,
      });
    } catch (err) {
      console.error('Rotation error:', err);
      setError(err.message || 'Failed to rotate PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!rotatedBlob) return;
    downloadPdfBlob(rotatedBlob, `${file.name.replace(/\.pdf$/i, '')}-rotated.pdf`);
    trackPdfDownloaded('rotate-pdf');
  };

  const handleReset = () => {
    setFile(null);
    setPages([]);
    setPageCount(0);
    setRotatedBlob(null);
    setPerPageRotations({});
    setGlobalRotation(0);
    setError(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12 p-6 sm:p-8 md:p-10 space-y-6">
      {!file ? (
        <PdfUploadZone
          onFiles={handleFiles}
          multiple={false}
          label="Drag & Drop PDF to Rotate"
          sublabel="or click to browse a PDF file"
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

          {/* Quick Rotation Toolbar */}
          {!rotatedBlob && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50/60 border border-slate-200/90 rounded-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mr-1">Rotate All:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => rotateAll(90)}
                  className="rounded-xl text-xs font-bold gap-1 cursor-pointer bg-white"
                >
                  <RotateCw className="w-3.5 h-3.5" /> +90°
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => rotateAll(180)}
                  className="rounded-xl text-xs font-bold gap-1 cursor-pointer bg-white"
                >
                  <RotateCw className="w-3.5 h-3.5" /> +180°
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => rotateAll(270)}
                  className="rounded-xl text-xs font-bold gap-1 cursor-pointer bg-white"
                >
                  <RotateCw className="w-3.5 h-3.5" /> +270°
                </Button>
              </div>

              <p className="text-[11px] text-slate-400">Click ↻ on any individual page to rotate independently</p>
            </div>
          )}

          {/* Visual Thumbnail Grid */}
          {!rotatedBlob && (
            <PdfPageGrid
              pages={pages}
              mode="rotate"
              onRotatePage={handleRotateSinglePage}
            />
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Save & Download Actions */}
          <div className="pt-2">
            {!rotatedBlob ? (
              <Button
                onClick={handleSaveRotations}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-blue-500/25 gap-2 text-sm transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Applying Rotation in Browser RAM…
                  </>
                ) : (
                  <>
                    <RotateCw className="w-4 h-4" />
                    Save & Apply Rotation
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
                      Document Rotated Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700">
                      Rotation saved directly in your browser ({formatBytes(rotatedBlob.size)}).
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <Button
                    onClick={handleDownload}
                    className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-emerald-500/25 gap-2 text-sm transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download Rotated PDF
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl h-12 px-5 text-xs border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                    Rotate Another PDF
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
