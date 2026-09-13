'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  UploadCloud,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Download,
  CheckCircle2,
  AlertCircle,
  Shield,
  Zap,
  Star,
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { rotateAndFlipImage, getImageDimensions, formatBytes, MIME_TO_EXT } from '@/lib/imageProcessing';
import NextToolJourney from '@/components/image-tools/NextToolJourney';

export default function ImageRotatorClient() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [origDimensions, setOrigDimensions] = useState({ width: 0, height: 0 });

  // Transform states
  const [angle, setAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const [outputFormat, setOutputFormat] = useState('original');
  const [quality, setQuality] = useState(90);

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [originalUrl, resultUrl]);

  const handleFileSelect = useCallback(async (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('Image exceeds maximum limit of 50MB.');
      return;
    }

    setError(null);
    setResult(null);
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }

    try {
      const dims = await getImageDimensions(selectedFile);
      const url = URL.createObjectURL(selectedFile);

      setFile(selectedFile);
      setOriginalUrl(url);
      setOrigDimensions(dims);
      setAngle(0);
      setFlipH(false);
      setFlipV(false);
    } catch (err) {
      setError('Failed to load image metadata. Please try another file.');
    }
  }, [resultUrl]);

  const rotateCW = () => setAngle((prev) => (prev + 90) % 360);
  const rotateCCW = () => setAngle((prev) => (prev - 90 + 360) % 360);
  const toggleFlipH = () => setFlipH((prev) => !prev);
  const toggleFlipV = () => setFlipV((prev) => !prev);
  const resetTransform = () => {
    setAngle(0);
    setFlipH(false);
    setFlipV(false);
  };

  const handleProcessRotation = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      let finalMime = null;
      if (outputFormat === 'jpeg') finalMime = 'image/jpeg';
      else if (outputFormat === 'png') finalMime = 'image/png';
      else if (outputFormat === 'webp') finalMime = 'image/webp';

      const res = await rotateAndFlipImage(file, {
        angle,
        flipH,
        flipV,
        quality: quality / 100,
        outputMime: finalMime,
      });

      const url = URL.createObjectURL(res.blob);
      setResult(res);
      setResultUrl(url);
    } catch (err) {
      setError(err.message || 'Rotation processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !resultUrl) return;
    const ext = MIME_TO_EXT[result.outputMime] || 'jpg';
    const originalBaseName = file.name.replace(/\.[^/.]+$/, '');
    const filename = `${originalBaseName}_rotated_${result.width}x${result.height}.${ext}`;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setOriginalUrl(null);
    setResult(null);
    setResultUrl(null);
    setError(null);
    setAngle(0);
    setFlipH(false);
    setFlipV(false);
  };

  // Preview CSS transform
  const transformStyle = {
    transform: `rotate(${angle}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
    transition: 'transform 0.2s ease-in-out',
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8">
        
        {/* State 1: Upload Zone */}
        {!file && (
          <div
            ref={dropZoneRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-400 rounded-2xl p-10 sm:p-14 text-center transition-all duration-200 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-violet-50/20 dark:hover:bg-violet-900/10"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
              }}
            />
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <RotateCw className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Select or Drop an Image to Rotate & Flip
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
              Fix photo orientation by 90°, 180°, or 270°, and mirror horizontally or vertically in your browser memory.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors shadow-sm">
              <UploadCloud className="w-4 h-4" />
              <span>Browse Image File</span>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="text-sm">{error}</div>
          </div>
        )}

        {/* State 2: Active Image Loaded & Interactive Transforms */}
        {file && !result && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                  <RotateCw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-sm">
                    {file.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Source: {origDimensions.width} × {origDimensions.height} px • {formatBytes(file.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change Image
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Visual Preview Box */}
              <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[340px] overflow-hidden">
                <div className="relative flex items-center justify-center max-h-[320px] max-w-full">
                  <img
                    src={originalUrl}
                    alt="Transform Target"
                    style={transformStyle}
                    className="max-h-[300px] max-w-full object-contain block rounded-lg shadow-lg"
                  />
                </div>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <span>Rotation: <strong className="text-white">{angle}°</strong></span>
                  <span>•</span>
                  <span>Flip H: <strong className="text-white">{flipH ? 'Yes' : 'No'}</strong></span>
                  <span>•</span>
                  <span>Flip V: <strong className="text-white">{flipV ? 'Yes' : 'No'}</strong></span>
                </div>
              </div>

              {/* Controls Form */}
              <div className="lg:col-span-6 space-y-5">
                {/* Transform Action Buttons */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Rotate & Reorient
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={rotateCW}
                      className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors shadow-sm"
                    >
                      <RotateCw className="w-4 h-4 text-violet-600" />
                      <span>Rotate +90° CW</span>
                    </button>
                    <button
                      type="button"
                      onClick={rotateCCW}
                      className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors shadow-sm"
                    >
                      <RotateCcw className="w-4 h-4 text-violet-600" />
                      <span>Rotate -90° CCW</span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Mirror & Flip
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={toggleFlipH}
                      className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-semibold transition-colors shadow-sm ${
                        flipH
                          ? 'bg-violet-50 border-violet-400 text-violet-700 dark:bg-violet-950/50 dark:border-violet-700 dark:text-violet-300'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-violet-300'
                      }`}
                    >
                      <FlipHorizontal className="w-4 h-4" />
                      <span>Flip Horizontal</span>
                    </button>
                    <button
                      type="button"
                      onClick={toggleFlipV}
                      className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-semibold transition-colors shadow-sm ${
                        flipV
                          ? 'bg-violet-50 border-violet-400 text-violet-700 dark:bg-violet-950/50 dark:border-violet-700 dark:text-violet-300'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-violet-300'
                      }`}
                    >
                      <FlipVertical className="w-4 h-4" />
                      <span>Flip Vertical</span>
                    </button>
                  </div>
                </div>

                {/* Reset button */}
                {(angle !== 0 || flipH || flipV) && (
                  <button
                    type="button"
                    onClick={resetTransform}
                    className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 transition-colors"
                  >
                    Reset to Original Orientation
                  </button>
                )}

                {/* Format & Quality */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Export Format</label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="original">Keep Original</option>
                      <option value="jpeg">JPG / JPEG</option>
                      <option value="png">PNG (Preserves Alpha)</option>
                      <option value="webp">WebP (Modern Compact)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Quality ({quality}%)</label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-violet-600 mt-2"
                    />
                  </div>
                </div>

                {/* Process Button */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleProcessRotation}
                  className="w-full py-3.5 px-6 rounded-2xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Reorienting Canvas Pixels...</span>
                    </>
                  ) : (
                    <>
                      <RotateCw className="w-4 h-4" />
                      <span>Save & Apply Orientation</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Success Result Screen */}
        {result && resultUrl && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Image Reoriented Successfully!
                </h3>
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Rotate Another Image
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center">
                <img
                  src={resultUrl}
                  alt="Rotated Result"
                  className="max-h-[320px] max-w-full object-contain rounded-xl shadow-md"
                />
              </div>

              <div className="md:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">New Dimensions:</span>
                    <span className="font-semibold text-slate-900 dark:text-white font-mono">
                      {result.width} × {result.height} px
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Applied Rotation:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-mono">
                      {result.angle}° {result.flipH ? '(Flipped H)' : ''} {result.flipV ? '(Flipped V)' : ''}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">File Size:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {formatBytes(result.outputSize)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Reoriented Image</span>
                </button>
              </div>
            </div>

            {/* Cross-Tool Workflow Continuum */}
            <NextToolJourney workflow="image-editing" customTitle="Reoriented your image? Recommended next steps:" />
          </div>
        )}

        {/* Value Prop Badges */}
        {!file && (
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>100% In-Browser RAM Processing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Lossless Pixel Matrix Transformation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500" />
              <span>Free & Unlimited Use</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
