'use client';

import { useEffect, useRef, useState } from 'react';
import { X, ArrowRight, Sparkles, Download, Check, SplitSquareVertical } from 'lucide-react';
import { formatBytes, calcReduction } from '@/lib/utils';
import { MIME_TO_EXT, downloadBlob } from '@/lib/imageProcessing';
import { Button } from '@/components/ui/button';

export default function BeforeAfterModal({ item, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!item) return null;

  const { file, compressedBlob, outputMime, previewUrl, compressedUrl } = item;
  const originalSize = file?.size || 0;
  const compressedSize = compressedBlob?.size || 0;
  const reduction = calcReduction(originalSize, compressedSize);
  const outputExt = (MIME_TO_EXT[outputMime] || 'jpg').toUpperCase();

  const handleDownload = () => {
    if (!compressedBlob) return;
    const baseName = file.name.replace(/\.[^.]+$/, '');
    const filename = `${baseName}-optimized.${outputExt.toLowerCase()}`;
    downloadBlob(compressedBlob, filename);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Quality Inspector"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Visual Quality Inspector</h2>
              <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">{file?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {reduction > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-black font-mono">
                ↓ {reduction}% Reduction
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Side by Side Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Original Card */}
            <div className="flex flex-col bg-slate-50/80 rounded-2xl border border-slate-200/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Original Asset</span>
                <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                  {formatBytes(originalSize)}
                </span>
              </div>

              <div className="relative flex-1 min-h-[260px] max-h-[420px] bg-slate-900/5 rounded-xl overflow-hidden flex items-center justify-center p-2 checkerboard-bg">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Original version"
                    className="max-w-full max-h-[380px] object-contain rounded-lg shadow-sm"
                  />
                ) : (
                  <p className="text-xs text-slate-400">Preview unavailable</p>
                )}
              </div>
            </div>

            {/* Compressed Card */}
            <div className="flex flex-col bg-blue-50/40 rounded-2xl border border-blue-200/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  Optimized Output ({outputExt})
                </span>
                <span className="font-mono text-xs font-black text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs">
                  {formatBytes(compressedSize)}
                </span>
              </div>

              <div className="relative flex-1 min-h-[260px] max-h-[420px] bg-slate-900/5 rounded-xl overflow-hidden flex items-center justify-center p-2 checkerboard-bg">
                {compressedUrl ? (
                  <img
                    src={compressedUrl}
                    alt="Compressed output"
                    className="max-w-full max-h-[380px] object-contain rounded-lg shadow-sm"
                  />
                ) : (
                  <p className="text-xs text-slate-400">Processing output…</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Savings:</span>
            <strong className="text-emerald-700 font-mono">
              {formatBytes(Math.max(0, originalSize - compressedSize))} ({reduction > 0 ? `-${reduction}%` : '0%'})
            </strong>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-xl text-xs font-bold"
            >
              Close
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download This File
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
