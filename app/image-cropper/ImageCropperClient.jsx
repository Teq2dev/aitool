'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  UploadCloud,
  Crop,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Shield,
  Zap,
  Star,
  Maximize2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { cropImage, getImageDimensions, formatBytes, MIME_TO_EXT } from '@/lib/imageProcessing';
import NextToolJourney from '@/components/image-tools/NextToolJourney';

const ASPECT_RATIO_PRESETS = [
  { label: 'Freeform', ratio: null },
  { label: '1:1 Square', ratio: 1 },
  { label: '16:9 Widescreen', ratio: 16 / 9 },
  { label: '9:16 Vertical', ratio: 9 / 16 },
  { label: '4:3 Standard', ratio: 4 / 3 },
  { label: '3:2 Classic', ratio: 3 / 2 },
];

export default function ImageCropperClient() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [origDimensions, setOrigDimensions] = useState({ width: 0, height: 0 });

  // Crop box parameters (in original image pixel space)
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(0);
  const [cropHeight, setCropHeight] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState('Freeform');

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

      // Default crop: center 80%
      const defaultW = Math.round(dims.width * 0.8);
      const defaultH = Math.round(dims.height * 0.8);
      const defaultX = Math.round((dims.width - defaultW) / 2);
      const defaultY = Math.round((dims.height - defaultH) / 2);

      setCropWidth(defaultW);
      setCropHeight(defaultH);
      setCropX(defaultX);
      setCropY(defaultY);
      setSelectedPreset('Freeform');
    } catch (err) {
      setError('Failed to load image metadata. Please try another file.');
    }
  }, [resultUrl]);

  const applyRatioPreset = (preset) => {
    setSelectedPreset(preset.label);
    if (!preset.ratio) return;

    const r = preset.ratio;
    let newW = origDimensions.width;
    let newH = Math.round(newW / r);

    if (newH > origDimensions.height) {
      newH = origDimensions.height;
      newW = Math.round(newH * r);
    }

    // Scale down to 85% of max possible to give margin
    newW = Math.round(newW * 0.85);
    newH = Math.round(newH * 0.85);

    const newX = Math.round((origDimensions.width - newW) / 2);
    const newY = Math.round((origDimensions.height - newH) / 2);

    setCropWidth(newW);
    setCropHeight(newH);
    setCropX(Math.max(0, newX));
    setCropY(Math.max(0, newY));
  };

  const handleProcessCrop = async () => {
    if (!file || cropWidth <= 0 || cropHeight <= 0) return;
    setIsProcessing(true);
    setError(null);

    try {
      let finalMime = null;
      if (outputFormat === 'jpeg') finalMime = 'image/jpeg';
      else if (outputFormat === 'png') finalMime = 'image/png';
      else if (outputFormat === 'webp') finalMime = 'image/webp';

      const res = await cropImage(file, {
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        quality: quality / 100,
        outputMime: finalMime,
      });

      const url = URL.createObjectURL(res.blob);
      setResult(res);
      setResultUrl(url);
    } catch (err) {
      setError(err.message || 'Cropping failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !resultUrl) return;
    const ext = MIME_TO_EXT[result.outputMime] || 'jpg';
    const originalBaseName = file.name.replace(/\.[^/.]+$/, '');
    const filename = `${originalBaseName}_crop_${result.width}x${result.height}.${ext}`;
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

  // Calculate percentage positions for visual preview overlay
  const previewLeftPct = origDimensions.width ? (cropX / origDimensions.width) * 100 : 0;
  const previewTopPct = origDimensions.height ? (cropY / origDimensions.height) * 100 : 0;
  const previewWidthPct = origDimensions.width ? (cropWidth / origDimensions.width) * 100 : 100;
  const previewHeightPct = origDimensions.height ? (cropHeight / origDimensions.height) * 100 : 100;

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
            className="group relative cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-2xl p-10 sm:p-14 text-center transition-all duration-200 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-emerald-50/20 dark:hover:bg-emerald-900/10"
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Crop className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Select or Drop an Image to Crop
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
              Frame your picture, choose aspect ratios, or enter custom crop dimensions. Processed entirely inside your browser.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
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

        {/* State 2: Active Image Loaded & Interactive Cropping */}
        {file && !result && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <Crop className="w-5 h-5" />
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
                <RotateCcw className="w-3.5 h-3.5" />
                Change Image
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Visual Crop Preview with Box Overlay */}
              <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[320px] overflow-hidden">
                <div className="relative inline-block max-h-[340px] max-w-full">
                  <img
                    src={originalUrl}
                    alt="Original Crop Target"
                    className="max-h-[340px] max-w-full object-contain block opacity-70"
                  />
                  {/* Visual Crop Box Overlay */}
                  <div
                    style={{
                      left: `${previewLeftPct}%`,
                      top: `${previewTopPct}%`,
                      width: `${previewWidthPct}%`,
                      height: `${previewHeightPct}%`,
                    }}
                    className="absolute border-2 border-emerald-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)] pointer-events-none transition-all duration-100 rounded-sm"
                  >
                    <div className="absolute top-1 left-1.5 bg-emerald-500 text-white text-[10px] font-bold px-1 rounded shadow">
                      {cropWidth}×{cropHeight}
                    </div>
                  </div>
                </div>
                <span className="mt-3 text-xs text-slate-400">
                  Highlighted region indicates final cropped export
                </span>
              </div>

              {/* Controls Form */}
              <div className="lg:col-span-6 space-y-5">
                {/* Aspect Ratio Presets */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Aspect Ratio Presets
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {ASPECT_RATIO_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => applyRatioPreset(p)}
                        className={`text-xs font-semibold py-2 px-2.5 rounded-xl border transition-all text-center ${
                          selectedPreset === p.label
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-700 dark:text-emerald-300'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pixel Crop Inputs */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Crop Region Dimensions (Pixels)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Width (px)</span>
                      <input
                        type="number"
                        min="10"
                        max={origDimensions.width - cropX}
                        value={cropWidth}
                        onChange={(e) => {
                          const w = Math.min(origDimensions.width - cropX, parseInt(e.target.value, 10) || 10);
                          setCropWidth(w);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Height (px)</span>
                      <input
                        type="number"
                        min="10"
                        max={origDimensions.height - cropY}
                        value={cropHeight}
                        onChange={(e) => {
                          const h = Math.min(origDimensions.height - cropY, parseInt(e.target.value, 10) || 10);
                          setCropHeight(h);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">X Offset (px)</span>
                      <input
                        type="number"
                        min="0"
                        max={origDimensions.width - cropWidth}
                        value={cropX}
                        onChange={(e) => {
                          const x = Math.max(0, Math.min(origDimensions.width - cropWidth, parseInt(e.target.value, 10) || 0));
                          setCropX(x);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Y Offset (px)</span>
                      <input
                        type="number"
                        min="0"
                        max={origDimensions.height - cropHeight}
                        value={cropY}
                        onChange={(e) => {
                          const y = Math.max(0, Math.min(origDimensions.height - cropHeight, parseInt(e.target.value, 10) || 0));
                          setCropY(y);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Output format & quality */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Export Format</label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="original">Keep Original</option>
                      <option value="jpeg">JPG / JPEG</option>
                      <option value="png">PNG (Preserves Alpha)</option>
                      <option value="webp">WebP (Optimized)</option>
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
                      className="w-full accent-emerald-600 mt-2"
                    />
                  </div>
                </div>

                {/* Crop Action Button */}
                <button
                  type="button"
                  disabled={isProcessing || cropWidth <= 0 || cropHeight <= 0}
                  onClick={handleProcessCrop}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Extracting Crop in Browser RAM...</span>
                    </>
                  ) : (
                    <>
                      <Crop className="w-4 h-4" />
                      <span>Crop to {cropWidth} × {cropHeight} px</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Crop Success Screen */}
        {result && resultUrl && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Image Cropped Successfully!
                </h3>
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Crop Another Image
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center">
                <img
                  src={resultUrl}
                  alt="Cropped Result"
                  className="max-h-[320px] max-w-full object-contain rounded-xl shadow-md"
                />
              </div>

              <div className="md:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Cropped Resolution:</span>
                    <span className="font-semibold text-slate-900 dark:text-white font-mono">
                      {result.width} × {result.height} px
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Source Dimensions:</span>
                    <span className="text-slate-700 dark:text-slate-300 font-mono">
                      {origDimensions.width} × {origDimensions.height} px
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Cropped File Size:</span>
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
                  <span>Download Cropped Image</span>
                </button>
              </div>
            </div>

            {/* Cross-Tool Workflow Continuum */}
            <NextToolJourney workflow="image-editing" customTitle="Cropped your image? Recommended next steps:" />
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
              <span>Pixel-Precise Canvas Clipping</span>
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
