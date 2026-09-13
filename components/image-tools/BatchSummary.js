'use client';

import { useCallback, useState } from 'react';
import { Trash2, RefreshCw, Archive, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatBytes } from '@/lib/utils';
import { MIME_TO_EXT } from '@/lib/imageProcessing';

export default function BatchSummary({ items, toolSlug, onClearAll, onProcessAnother }) {
  const [isZipping, setIsZipping] = useState(false);

  // Items that finished — include both genuinely compressed and already-optimal in ZIP
  const finishedItems = items.filter(
    (it) => (it.status === 'done' || it.status === 'already-optimized') && it.compressedBlob
  );

  // Totals derived from actual Blob.size — never estimated
  const totalOriginal   = items.reduce((sum, it) => sum + (it.file?.size || 0), 0);
  const totalCompressed = finishedItems.reduce((sum, it) => sum + (it.compressedBlob?.size || 0), 0);
  const totalSaved      = Math.max(0, totalOriginal - totalCompressed);
  const overallReduction = totalOriginal > 0
    ? Math.round((totalSaved / totalOriginal) * 100)
    : 0;

  const allDone = items.every((it) =>
    ['done', 'already-optimized', 'error'].includes(it.status)
  );

  const handleDownloadAll = useCallback(async () => {
    if (finishedItems.length === 0) return;
    setIsZipping(true);

    try {
      const { zipSync } = await import('fflate');

      const zipEntries = {};
      for (const item of finishedItems) {
        const { compressedBlob, file, outputMime } = item;
        const ext      = MIME_TO_EXT[outputMime] || 'jpg';
        const baseName = file.name.replace(/\.[^.]+$/, '');
        const filename = `${baseName}-optimized.${ext}`;
        const arrayBuffer = await compressedBlob.arrayBuffer();
        zipEntries[filename] = new Uint8Array(arrayBuffer);
      }

      const zipped = zipSync(zipEntries, { level: 0 });
      const blob   = new Blob([zipped], { type: 'application/zip' });
      const url    = URL.createObjectURL(blob);
      const a      = document.createElement('a');
      a.href     = url;
      a.download = `bestaitools-optimized-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (err) {
      console.error('ZIP generation failed:', err);
    } finally {
      setIsZipping(false);
    }
  }, [finishedItems]);

  if (items.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-5 md:p-7 shadow-xl shadow-slate-900/10 space-y-6">
      {/* Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
        <div className="text-left md:pr-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Processed</p>
          <p className="text-2xl md:text-3xl font-black text-white mt-1">
            {finishedItems.length} <span className="text-sm font-normal text-slate-400">/ {items.length}</span>
          </p>
        </div>

        <div className="text-left md:px-4 pt-3 md:pt-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Original Total</p>
          <p className="text-2xl md:text-3xl font-black text-slate-300 mt-1 font-mono">
            {formatBytes(totalOriginal)}
          </p>
        </div>

        <div className="text-left md:px-4 pt-3 md:pt-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Optimized Total</p>
          <p className="text-2xl md:text-3xl font-black text-blue-400 mt-1 font-mono">
            {formatBytes(totalCompressed)}
          </p>
        </div>

        <div className="text-left md:pl-4 pt-3 md:pt-0">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Total Saved
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl md:text-3xl font-black text-emerald-400">
              {overallReduction > 0 ? `-${overallReduction}%` : '0%'}
            </span>
            {totalSaved > 0 && (
              <span className="text-xs font-bold text-emerald-300 font-mono">
                ({formatBytes(totalSaved)})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Dock */}
      {allDone && finishedItems.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800/80">
          <Button
            onClick={handleDownloadAll}
            disabled={isZipping}
            className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-sm h-12 rounded-2xl shadow-lg shadow-blue-500/25 gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            {isZipping ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Packaging ZIP…
              </>
            ) : (
              <>
                <Archive className="w-4 h-4" />
                Download All ({finishedItems.length} {finishedItems.length === 1 ? 'file' : 'files'}) as ZIP
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={onProcessAnother}
            className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 font-bold text-xs h-12 px-5 rounded-2xl gap-2 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            New Batch
          </Button>

          <Button
            variant="ghost"
            onClick={onClearAll}
            className="w-full sm:w-auto text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 text-xs font-semibold h-12 px-4 rounded-2xl gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
