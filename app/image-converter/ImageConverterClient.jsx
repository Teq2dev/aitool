'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  UploadCloud,
  RefreshCw,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Shield,
  Zap,
  Star,
  FileImage,
  Archive,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { convertImage, formatBytes, MIME_TO_EXT, EXT_TO_MIME } from '@/lib/imageProcessing';
import NextToolJourney from '@/components/image-tools/NextToolJourney';

const TARGET_FORMATS = [
  {
    id: 'webp',
    name: 'WebP',
    ext: 'webp',
    mime: 'image/webp',
    tag: 'Recommended',
    desc: 'Modern compact format with high compression & transparency support.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'png',
    name: 'PNG',
    ext: 'png',
    mime: 'image/png',
    tag: 'Lossless',
    desc: 'Crisp graphics, screenshots, and full alpha channel transparency.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'jpg',
    name: 'JPG / JPEG',
    ext: 'jpg',
    mime: 'image/jpeg',
    tag: 'Universal',
    desc: 'Maximum cross-platform compatibility for photographs and web images.',
    color: 'from-amber-500 to-orange-600',
  },
];

export default function ImageConverterClient() {
  const [targetFormat, setTargetFormat] = useState('webp');
  const [quality, setQuality] = useState(90);
  const [items, setItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const objectUrlsRef = useRef(new Set());

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();
    };
  }, []);

  const createObjectUrl = (blob) => {
    const url = URL.createObjectURL(blob);
    objectUrlsRef.current.add(url);
    return url;
  };

  const handleAddFiles = useCallback((files) => {
    if (!files || files.length === 0) return;
    setError(null);

    const validFiles = [];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith('image/')) {
        setError('Only image files (JPG, PNG, WebP) are supported.');
        continue;
      }
      if (f.size > 50 * 1024 * 1024) {
        setError('One or more files exceed the 50MB file size limit.');
        continue;
      }
      validFiles.push({
        id: `${f.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file: f,
        status: 'idle', // idle | processing | done | error
        resultBlob: null,
        resultUrl: null,
        outputSize: null,
        targetExt: targetFormat,
      });
    }

    if (validFiles.length > 0) {
      setItems((prev) => [...prev, ...validFiles]);
    }
  }, [targetFormat]);

  const handleConvertAll = async () => {
    if (items.length === 0 || isProcessing) return;
    setIsProcessing(true);
    setError(null);

    for (const item of items) {
      if (item.status === 'done' && item.targetExt === targetFormat) continue;

      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: 'processing' } : it))
      );

      try {
        const res = await convertImage(item.file, {
          targetFormat,
          quality: quality / 100,
        });

        const url = createObjectUrl(res.blob);
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? {
                  ...it,
                  status: 'done',
                  resultBlob: res.blob,
                  resultUrl: url,
                  outputSize: res.outputSize,
                  targetExt: targetFormat,
                }
              : it
          )
        );
      } catch (err) {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, status: 'error', errorMessage: err.message } : it
          )
        );
      }
    }

    setIsProcessing(false);
  };

  const handleDownloadItem = (item) => {
    if (!item.resultUrl) return;
    const baseName = item.file.name.replace(/\.[^/.]+$/, '');
    const filename = `${baseName}.${item.targetExt}`;
    const a = document.createElement('a');
    a.href = item.resultUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAllZip = async () => {
    const doneItems = items.filter((it) => it.status === 'done' && it.resultBlob);
    if (doneItems.length === 0) return;

    setIsZipping(true);
    try {
      const { zipSync } = await import('fflate');
      const zipEntries = {};

      for (const it of doneItems) {
        const baseName = it.file.name.replace(/\.[^/.]+$/, '');
        const filename = `${baseName}.${it.targetExt}`;
        const buffer = await it.resultBlob.arrayBuffer();
        zipEntries[filename] = new Uint8Array(buffer);
      }

      const zipped = zipSync(zipEntries, { level: 0 });
      const zipBlob = new Blob([zipped], { type: 'application/zip' });
      const zipUrl = createObjectUrl(zipBlob);

      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = `converted_images_${targetFormat}_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError('ZIP creation failed: ' + err.message);
    } finally {
      setIsZipping(false);
    }
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => {
      const target = prev.find((it) => it.id === id);
      if (target?.resultUrl) {
        URL.revokeObjectURL(target.resultUrl);
        objectUrlsRef.current.delete(target.resultUrl);
      }
      return prev.filter((it) => it.id !== id);
    });
  };

  const handleClearAll = () => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current.clear();
    setItems([]);
    setError(null);
  };

  const completedCount = items.filter((it) => it.status === 'done').length;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8">
        
        {/* Step 1: Choose Target Format */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            1. Select Output Format
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TARGET_FORMATS.map((fmt) => {
              const isSelected = targetFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setTargetFormat(fmt.id)}
                  className={`relative flex flex-col p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-purple-50/50 dark:bg-purple-950/30 border-purple-500 ring-2 ring-purple-500/20 shadow-sm'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Convert to {fmt.name}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                      {fmt.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {fmt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quality Slider (for JPG and WebP) */}
        {targetFormat !== 'png' && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Encoding Quality</span>
              <span className="font-mono text-purple-600 dark:text-purple-400">{quality}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>
        )}

        {/* Dropzone / Upload Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files) handleAddFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="group relative cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-400 rounded-2xl p-8 sm:p-10 text-center transition-all bg-slate-50/50 dark:bg-slate-800/30 hover:bg-purple-50/20"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleAddFiles(e.target.files);
            }}
          />
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <UploadCloud className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
            {items.length === 0 ? 'Select or Drop Images to Convert' : 'Add More Images to Batch'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-3">
            Drop JPG, PNG, or WebP files. Converts locally inside your browser memory.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors shadow-sm">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Choose Images</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="text-sm">{error}</div>
          </div>
        )}

        {/* Items List */}
        {items.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Queue ({items.length} file{items.length > 1 ? 's' : ''})
              </h4>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600">
                      <FileImage className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate max-w-xs">
                        {item.file.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {formatBytes(item.file.size)} → target: <span className="uppercase font-bold text-purple-600">{item.targetExt}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === 'processing' && (
                      <div className="flex items-center gap-1.5 text-xs text-purple-600 font-medium">
                        <div className="w-3.5 h-3.5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <span>Converting...</span>
                      </div>
                    )}

                    {item.status === 'done' && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                          {formatBytes(item.outputSize)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDownloadItem(item)}
                          className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs transition-colors shadow-sm"
                          title="Download Converted File"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Convert Batch Action */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                disabled={isProcessing || items.length === 0}
                onClick={handleConvertAll}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Converting Images in Browser RAM...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Convert {items.length} Image{items.length > 1 ? 's' : ''} to {targetFormat.toUpperCase()}</span>
                  </>
                )}
              </button>

              {completedCount > 1 && (
                <button
                  type="button"
                  disabled={isZipping}
                  onClick={handleDownloadAllZip}
                  className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isZipping ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating ZIP Archive...</span>
                    </>
                  ) : (
                    <>
                      <Archive className="w-4 h-4" />
                      <span>Download All as ZIP ({completedCount})</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Workflow Continuum */}
        {completedCount > 0 && (
          <NextToolJourney workflow="image-editing" customTitle="Converted your images? Recommended next steps:" />
        )}

        {/* Value Prop Badges */}
        {items.length === 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>100% In-Browser RAM Processing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Direct HTML5 Canvas Conversion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500" />
              <span>Free, Batch & Unlimited</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
