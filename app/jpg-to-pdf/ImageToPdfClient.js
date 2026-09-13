'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileText, ArrowUp, ArrowDown, Trash2, Download, RefreshCw, Loader2, Sparkles, Image as ImageIcon, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PdfUploadZone from '@/components/pdf-tools/PdfUploadZone';
import { imagesToPDF, downloadPdfBlob } from '@/lib/pdfProcessing';
import { trackPdfToolView, trackPdfProcessingStarted, trackPdfProcessingCompleted, trackPdfDownloaded } from '@/lib/pdfAnalytics';
import { formatBytes } from '@/lib/utils';
import NextToolJourney from '@/components/image-tools/NextToolJourney';

export default function ImageToPdfClient({
  toolSlug = 'jpg-to-pdf',
  acceptedExtensions = ['.jpg', '.jpeg'],
  accept = 'image/jpeg',
  defaultFormatLabel = 'JPG',
}) {
  const [images, setImages] = useState([]);
  const [pageSize, setPageSize] = useState('a4'); // 'a4' | 'letter' | 'fit'
  const [orientation, setOrientation] = useState('portrait'); // 'portrait' | 'landscape' | 'auto'
  const [margin, setMargin] = useState('small'); // 'none' | 'small' | 'big'
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedBlob, setGeneratedBlob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    trackPdfToolView(toolSlug);
  }, [toolSlug]);

  const handleFiles = useCallback((files) => {
    const newItems = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newItems]);
    setGeneratedBlob(null);
    setError(null);
  }, []);

  const moveImage = (index, direction) => {
    setImages((prev) => {
      const next = [...prev];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
    setGeneratedBlob(null);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const item = prev.find((img) => img.id === id);
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
    setGeneratedBlob(null);
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      setError('Please add at least one image to convert.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    const startTime = Date.now();
    trackPdfProcessingStarted(toolSlug, images.length);

    try {
      const rawFiles = images.map((img) => img.file);
      const { blob } = await imagesToPDF(rawFiles, {
        pageSize,
        orientation,
        margin,
      });
      setGeneratedBlob(blob);

      const durationMs = Date.now() - startTime;
      trackPdfProcessingCompleted(toolSlug, {
        fileCount: images.length,
        durationMs,
        pageCount: images.length,
      });
    } catch (err) {
      console.error('Image to PDF error:', err);
      setError(err.message || 'Failed to convert images to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!generatedBlob) return;
    downloadPdfBlob(generatedBlob, `converted-document-${Date.now()}.pdf`);
    trackPdfDownloaded(toolSlug);
  };

  const handleReset = () => {
    images.forEach((img) => {
      if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
    });
    setImages([]);
    setGeneratedBlob(null);
    setError(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12 p-6 sm:p-8 md:p-10 space-y-6">
      {/* Upload Zone */}
      {!generatedBlob && (
        <PdfUploadZone
          onFiles={handleFiles}
          multiple={true}
          acceptedExtensions={acceptedExtensions}
          accept={accept}
          compact={images.length > 0}
          label={`Drag & Drop ${defaultFormatLabel} Images Here`}
          sublabel={`or click to browse ${defaultFormatLabel} files`}
          privacyBadge="Client-Side Browser Processing"
          maxSizeLabel="Max file size: 100MB"
        />
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {images.length > 0 && !generatedBlob && (
        <div className="space-y-6">
          {/* Document Layout Controls */}
          <div className="p-5 md:p-6 bg-slate-50/70 border border-slate-200/90 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <Sliders className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Document Layout Settings</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Page Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Page Size:</label>
                <select
                  value={pageSize}
                  onChange={(e) => { setPageSize(e.target.value); setGeneratedBlob(null); }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="a4">A4 (Standard 210 × 297 mm)</option>
                  <option value="letter">US Letter (8.5 × 11 in)</option>
                  <option value="fit">Fit to Image Size</option>
                </select>
              </div>

              {/* Orientation */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Orientation:</label>
                <select
                  value={orientation}
                  onChange={(e) => { setOrientation(e.target.value); setGeneratedBlob(null); }}
                  disabled={pageSize === 'fit'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="portrait">Portrait (Vertical)</option>
                  <option value="landscape">Landscape (Horizontal)</option>
                  <option value="auto">Auto (Match Image Ratio)</option>
                </select>
              </div>

              {/* Margins */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Margins:</label>
                <select
                  value={margin}
                  onChange={(e) => { setMargin(e.target.value); setGeneratedBlob(null); }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="small">Small Margins (Standard)</option>
                  <option value="none">No Margins (Edge to Edge)</option>
                  <option value="big">Big Margins</option>
                </select>
              </div>
            </div>
          </div>

          {/* Image Queue List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold text-slate-900">
                Images to Convert ({images.length} {images.length === 1 ? 'page' : 'pages'})
              </h3>
              <span className="text-xs text-slate-500">
                Total size: <strong>{formatBytes(images.reduce((sum, img) => sum + img.file.size, 0))}</strong>
              </span>
            </div>

            <div className="space-y-2.5">
              {images.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-slate-200/90 rounded-2xl shadow-2xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-600 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/80">
                      <img src={item.previewUrl} alt={item.file.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate" title={item.file.name}>
                        {item.file.name}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        Page {idx + 1} · {formatBytes(item.file.size)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveImage(idx, -1)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => moveImage(idx, 1)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(item.id)}
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
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={handleConvert}
                disabled={isProcessing}
                className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-blue-500/25 gap-2 text-sm transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating PDF Document in Browser RAM…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Create PDF from {images.length} {images.length === 1 ? 'Image' : 'Images'}
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
        </div>
      )}

      {/* Success State */}
      {generatedBlob && (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 text-base">
                PDF Created Successfully!
              </h4>
              <p className="text-xs text-emerald-700">
                Converted {images.length} {defaultFormatLabel} {images.length === 1 ? 'image' : 'images'} into a {images.length}-page document ({formatBytes(generatedBlob.size)}).
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <Button
              onClick={handleDownload}
              className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-emerald-500/25 gap-2 text-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Converted PDF
            </Button>

            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl h-12 px-5 text-xs border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              Convert More Images
            </Button>
          </div>

          {/* Cross-Product PDF Workflow Continuum */}
          <NextToolJourney
            workflow="image-to-pdf"
            customTitle="Created your PDF? Continue your workflow:"
          />
        </div>
      )}
    </div>
  );
}
