'use client';

import { Check, RotateCw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PdfPageGrid({
  pages = [], // Array<{ pageNumber: number, dataUrl: string, rotation?: number }>
  selectedPages = [], // Array of page numbers (1-indexed) or page indices (0-indexed)
  onToggleSelect,
  onRotatePage,
  mode = 'select', // 'select' | 'rotate' | 'delete'
}) {
  if (pages.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 p-4 bg-slate-50/70 border border-slate-200/80 rounded-3xl max-h-[520px] overflow-y-auto">
      {pages.map((p, idx) => {
        const isSelected = selectedPages.includes(p.pageNumber || idx);
        const rotation = p.rotation || 0;

        return (
          <div
            key={p.pageNumber || idx}
            onClick={() => onToggleSelect && onToggleSelect(p.pageNumber || idx)}
            className={cn(
              'group relative flex flex-col bg-white rounded-2xl border p-2.5 transition-all duration-200 select-none cursor-pointer shadow-2xs hover:shadow-sm',
              isSelected
                ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/20'
                : 'border-slate-200/90 hover:border-slate-300'
            )}
          >
            {/* Top Toolbar overlay on Card */}
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                p.{p.pageNumber || idx + 1}
              </span>

              {mode === 'rotate' && onRotatePage && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRotatePage(idx);
                  }}
                  className="p-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 transition-colors"
                  title="Rotate 90° clockwise"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              )}

              {mode === 'delete' && (
                <span
                  className={cn(
                    'w-5 h-5 rounded-md flex items-center justify-center transition-colors',
                    isSelected
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-400 group-hover:border group-hover:border-slate-300'
                  )}
                >
                  <Trash2 className="w-3 h-3" />
                </span>
              )}

              {mode === 'select' && (
                <span
                  className={cn(
                    'w-5 h-5 rounded-md flex items-center justify-center transition-colors',
                    isSelected
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-300 group-hover:border group-hover:border-slate-300'
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              )}
            </div>

            {/* Thumbnail Canvas View */}
            <div className="relative aspect-[3/4] w-full bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-1 checkerboard-bg">
              {p.dataUrl ? (
                <img
                  src={p.dataUrl}
                  alt={`Page ${p.pageNumber || idx + 1}`}
                  className="max-w-full max-h-full object-contain rounded transition-transform duration-200 shadow-2xs"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-mono">
                  Loading…
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
