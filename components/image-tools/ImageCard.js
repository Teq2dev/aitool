'use client';

import { Download, Trash2, Eye, AlertCircle, Loader2, Sparkles, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatBytes, calcReduction } from '@/lib/utils';
import { downloadBlob, MIME_TO_EXT } from '@/lib/imageProcessing';
import { cn } from '@/lib/utils';

export default function ImageCard({ item, onRemove, showPreview }) {
  const {
    id,
    file,
    status,
    compressedBlob,
    outputMime,
    error,
    previewUrl,
    reductionPct,
    reduced,
  } = item;

  const originalSize    = file?.size || 0;
  const compressedSize  = compressedBlob?.size || 0;

  // Always derived from actual Blob.size — never estimated
  const savedBytes = reduced ? (originalSize - compressedSize) : 0;
  const displayPct = (reduced && typeof reductionPct === 'number') ? reductionPct : 0;

  const inputMime  = file?.type || 'image/jpeg';
  const finalMime  = outputMime || inputMime;
  const inputExt   = (MIME_TO_EXT[inputMime]  || 'jpg').toUpperCase();
  const outputExt  = (MIME_TO_EXT[finalMime]  || 'jpg').toUpperCase();
  const converted  = inputExt !== outputExt;

  const handleDownload = () => {
    if (!compressedBlob) return;
    const baseName = file.name.replace(/\.[^.]+$/, '');
    const filename = `${baseName}-optimized.${outputExt.toLowerCase()}`;
    downloadBlob(compressedBlob, filename);
  };

  const isDone           = status === 'done';
  const isAlreadyOptimal = status === 'already-optimized';
  const isProcessing     = status === 'processing';
  const isError          = status === 'error';
  const isPending        = status === 'pending';

  return (
    <div
      className={cn(
        'group relative bg-white rounded-2xl border transition-all duration-200 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm',
        isDone           && 'border-emerald-200/80 hover:border-emerald-300',
        isAlreadyOptimal && 'border-slate-200/90 hover:border-slate-300',
        isProcessing     && 'border-blue-300 bg-blue-50/20',
        isError          && 'border-rose-200 bg-rose-50/20',
        isPending        && 'border-slate-200/90',
      )}
    >
      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* Thumbnail */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/80">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={file?.name || 'Preview'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
              No Preview
            </div>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-2xs flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
          )}

          {/* Format badge */}
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 backdrop-blur-md rounded text-[9px] font-mono font-bold text-white leading-none">
            {converted ? `${inputExt}→${outputExt}` : outputExt}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate" title={file?.name}>
            {file?.name}
          </p>

          {/* Pending */}
          {isPending && (
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Queued · {formatBytes(originalSize)}
            </p>
          )}

          {/* Processing */}
          {isProcessing && (
            <div className="mt-1 space-y-1">
              <p className="text-xs font-semibold text-blue-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                Compressing in browser…
              </p>
              <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-3/4 animate-pulse" />
              </div>
            </div>
          )}

          {/* Done — real compression achieved */}
          {isDone && compressedBlob && (
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="font-mono text-slate-400">{formatBytes(originalSize)}</span>
                <span className="text-slate-300">→</span>
                <span className="font-mono font-bold text-slate-900">{formatBytes(compressedSize)}</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-extrabold shadow-2xs">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                ↓ {displayPct}% Saved
              </span>
              {converted && (
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-[11px] font-bold">
                  {inputExt} → {outputExt}
                </span>
              )}
            </div>
          )}

          {/* Already optimized — honest, no fake stats */}
          {isAlreadyOptimal && compressedBlob && (
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="font-mono">{formatBytes(originalSize)}</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-full text-xs font-semibold">
                <Info className="w-3 h-3 text-slate-400" />
                Already Optimized
              </span>
            </div>
          )}

          {/* Error */}
          {isError && (
            <p className="text-xs font-semibold text-rose-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {error || 'Compression failed'}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {(isDone || isAlreadyOptimal) && compressedBlob && (
            <>
              <button
                type="button"
                onClick={() => showPreview && showPreview(item)}
                title="Compare Original vs Compressed"
                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                aria-label="Preview comparison"
              >
                <Eye className="w-4 h-4" />
              </button>

              <Button
                size="sm"
                onClick={handleDownload}
                className={cn(
                  'text-white font-bold text-xs h-9 px-3.5 rounded-xl shadow-xs gap-1.5 transition-all cursor-pointer',
                  isDone
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-slate-700 hover:bg-slate-800'
                )}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </>
          )}

          <button
            type="button"
            onClick={() => onRemove(id)}
            title="Remove item"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            aria-label="Remove image"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
