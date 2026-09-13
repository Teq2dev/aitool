'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  UploadCloud,
  Maximize2,
  Lock,
  Unlock,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Shield,
  Zap,
  Star,
  Sliders,
  Sparkles,
  ArrowRight,
  ImageIcon
} from 'lucide-react';
import { resizeImage, getImageDimensions, formatBytes, getFileMime, MIME_TO_EXT } from '@/lib/imageProcessing';
import NextToolJourney from '@/components/image-tools/NextToolJourney';

const PRESETS = [
  { label: '25%', scale: 0.25 },
  { label: '50%', scale: 0.5 },
  { label: '75%', scale: 0.75 },
  { label: 'Instagram (1080×1080)', w: 1080, h: 1080 },
  { label: 'YouTube (1280×720)', w: 1280, h: 720 },
  { label: 'Full HD (1920×1080)', w: 1920, h: 1080 },
];

export default function ImageResizerClient() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [origDimensions, setOrigDimensions] = useState({ width: 0, height: 0 });
  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [outputFormat, setOutputFormat] = useState('original');
  const [quality, setQuality] = useState(90);

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Clean up object URLs
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
      setTargetWidth(dims.width);
      setTargetHeight(dims.height);
      setAspectRatio(dims.width / (dims.height || 1));
    } catch (err) {
      setError('Failed to load image metadata. Please try another file.');
    }
  }, [resultUrl]);

  const handleWidthChange = (val) => {
    const w = parseInt(val, 10) || 0;
    setTargetWidth(w);
    if (lockAspectRatio && aspectRatio > 0) {
      setTargetHeight(Math.round(w / aspectRatio));
    }
  };

  const handleHeightChange = (val) => {
    const h = parseInt(val, 10) || 0;
    setTargetHeight(h);
    if (lockAspectRatio && aspectRatio > 0) {
      setTargetWidth(Math.round(h * aspectRatio));
    }
  };

  const applyPreset = (preset) => {
    if (preset.scale) {
      const w = Math.round(origDimensions.width * preset.scale);
      const h = Math.round(origDimensions.height * preset.scale);
      setTargetWidth(w);
      setTargetHeight(h);
    } else if (preset.w && preset.h) {
      setTargetWidth(preset.w);
      setTargetHeight(preset.h);
    }
  };

  const handleProcessResize = async () => {
    if (!file || targetWidth <= 0 || targetHeight <= 0) return;
    setIsProcessing(true);
    setError(null);

    try {
      let finalMime = null;
      if (outputFormat === 'jpeg') finalMime = 'image/jpeg';
      else if (outputFormat === 'png') finalMime = 'image/png';
      else if (outputFormat === 'webp') finalMime = 'image/webp';

      const res = await resizeImage(file, {
        targetWidth,
        targetHeight,
        quality: quality / 100,
        outputMime: finalMime,
      });

      const url = URL.createObjectURL(res.blob);
      setResult(res);
      setResultUrl(url);
    } catch (err) {
      setError(err.message || 'Resizing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !resultUrl) return;
    const ext = MIME_TO_EXT[result.outputMime] || 'jpg';
    const originalBaseName = file.name.replace(/\.[^/.]+$/, '');
    const filename = `${originalBaseName}_${result.width}x${result.height}.${ext}`;
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
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Main SaaS Workspace Shell */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8">
        
        {/* State 1: Empty / Upload Zone */}
        {!file && (
          <div
            ref={dropZoneRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-2xl p-10 sm:p-14 text-center transition-all duration-200 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10"
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Select or Drop an Image to Resize
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
              Supports JPG, PNG, and WebP up to 50MB. Processed 100% locally in your browser RAM with zero server uploads.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
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

        {/* State 2: Active Image Loaded & Controls */}
        {file && !result && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-sm">
                    {file.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Original: {origDimensions.width} × {origDimensions.height} px • {formatBytes(file.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Choose Different Image
              </button>
            </div>

            {/* Layout: Preview left / Controls right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Image Preview */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
                {originalUrl && (
                  <div className="relative max-h-[300px] w-full flex items-center justify-center overflow-hidden rounded-xl">
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="max-h-[280px] max-w-full object-contain rounded-lg shadow-sm"
                    />
                  </div>
                )}
                <span className="mt-2 text-xs text-slate-400 font-mono">
                  Current Ratio: {aspectRatio.toFixed(2)}:1
                </span>
              </div>

              {/* Controls Form */}
              <div className="lg:col-span-7 space-y-5">
                {/* Dimensions inputs */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Target Dimensions (Pixels)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <span className="text-xs text-slate-500 mb-1 block">Width (px)</span>
                      <input
                        type="number"
                        min="1"
                        max="20000"
                        value={targetWidth}
                        onChange={(e) => handleWidthChange(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setLockAspectRatio(!lockAspectRatio)}
                      title={lockAspectRatio ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio'}
                      className={`mt-5 p-2.5 rounded-xl border transition-all ${
                        lockAspectRatio
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-400'
                          : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700'
                      }`}
                    >
                      {lockAspectRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>

                    <div className="flex-1">
                      <span className="text-xs text-slate-500 mb-1 block">Height (px)</span>
                      <input
                        type="number"
                        min="1"
                        max="20000"
                        value={targetHeight}
                        onChange={(e) => handleHeightChange(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Quick Presets
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => applyPreset(p)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format & Quality */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Output Format</label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="original">Keep Original</option>
                      <option value="jpeg">JPG / JPEG</option>
                      <option value="png">PNG (Preserves Alpha)</option>
                      <option value="webp">WebP (Modern Compact)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Quality ({quality}%)</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-indigo-600 mt-2"
                    />
                  </div>
                </div>

                {/* Resize Action Button */}
                <button
                  type="button"
                  disabled={isProcessing || targetWidth <= 0 || targetHeight <= 0}
                  onClick={handleProcessResize}
                  className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Resampling Image in Browser RAM...</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4" />
                      <span>Resize to {targetWidth} × {targetHeight} px</span>
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
                  Image Resized Successfully!
                </h3>
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resize Another Image
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Output Preview */}
              <div className="md:col-span-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center">
                <img
                  src={resultUrl}
                  alt="Resized Result"
                  className="max-h-[320px] max-w-full object-contain rounded-xl shadow-md"
                />
              </div>

              {/* Metrics & Download Card */}
              <div className="md:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Dimensions:</span>
                    <span className="font-semibold text-slate-900 dark:text-white font-mono">
                      {origDimensions.width}×{origDimensions.height} → {result.width}×{result.height} px
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Original Size:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-mono">
                      {formatBytes(result.originalSize)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Output Size:</span>
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
                  <span>Download Resized Image</span>
                </button>
              </div>
            </div>

            {/* Cross-Tool Workflow Continuum */}
            <NextToolJourney workflow="image-editing" customTitle="Resized your image? Recommended next steps:" />
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
              <span>Bicubic Canvas Smoothing</span>
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
