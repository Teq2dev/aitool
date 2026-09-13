'use client';

import { useCallback, useRef, useState } from 'react';
import { UploadCloud, Plus, AlertCircle } from 'lucide-react';
import { ACCEPTED_MIME_TYPES, validateImageFile } from '@/lib/imageProcessing';
import { cn } from '@/lib/utils';

export default function ImageUploadZone({
  onFiles,
  acceptedFormats = ['JPG', 'PNG', 'WebP'],
  disabled = false,
  compact = false,
  className,
}) {
  const inputRef   = useRef(null);
  const inputId    = useRef(`img-upload-${Math.random().toString(36).slice(2)}`);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors,    setErrors]      = useState([]);

  const processFiles = useCallback((fileList) => {
    const files = Array.from(fileList);
    const valid = [], errs = [];
    for (const file of files) {
      const { valid: ok, error } = validateImageFile(file);
      ok ? valid.push(file) : errs.push(`${file.name}: ${error}`);
    }
    if (errs.length) { setErrors(errs); setTimeout(() => setErrors([]), 6000); }
    if (valid.length) onFiles(valid);
  }, [onFiles]);

  const handleDragEnter = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }, []);
  const handleDragOver  = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }, []);
  const handleDragLeave = useCallback((e) => {
    e.preventDefault(); e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDragOver(false);
  }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault(); e.stopPropagation(); setIsDragOver(false);
    if (disabled) return;
    if (e.dataTransfer?.files?.length) processFiles(e.dataTransfer.files);
  }, [disabled, processFiles]);

  const handleInputChange = useCallback((e) => {
    if (e.target.files?.length) { processFiles(e.target.files); e.target.value = ''; }
  }, [processFiles]);

  // Only called when user clicks the zone background (not the label link)
  const handleZoneClick = useCallback((e) => {
    // Don't intercept if the click is on the label — let browser handle it
    if (e.target.tagName === 'LABEL' || e.target.closest('label')) return;
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const acceptAttr = [...ACCEPTED_MIME_TYPES].join(',') + ',.jpg,.jpeg,.png,.webp';

  return (
    <div className={cn('w-full', className)}>
      {/* Hidden file input — the label below is its clickable trigger */}
      <input
        ref={inputRef}
        id={inputId.current}
        type="file"
        multiple
        accept={acceptAttr}
        onChange={handleInputChange}
        className="sr-only"
        aria-label="Upload images"
        tabIndex={-1}
      />

      {compact ? (
        /* Compact dropbar (shown when files are in the queue) */
        <div
          role="button"
          tabIndex={0}
          onClick={handleZoneClick}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'group relative flex items-center justify-between px-5 py-4 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            isDragOver
              ? 'border-blue-600 bg-blue-50/80 shadow-md scale-[1.005]'
              : 'border-slate-300/80 bg-slate-50/70 hover:border-blue-400 hover:bg-blue-50/30'
          )}
        >
          <div className="flex items-center gap-3.5">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0',
              isDragOver ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200/80 text-blue-600 group-hover:scale-105'
            )}>
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {isDragOver ? 'Drop files to add to batch' : 'Drag & drop more images here'}
              </p>
              <p className="text-xs text-slate-500">
                or{' '}
                <label
                  htmlFor={inputId.current}
                  className="text-blue-600 font-semibold underline underline-offset-2 cursor-pointer hover:text-blue-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  browse files
                </label>
                {' '}from your computer
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-3 py-1.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Plus className="w-3.5 h-3.5" />
            Add Images
          </span>
        </div>
      ) : (
        /* Full hero dropzone */
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleZoneClick}
          className={cn(
            'group relative flex flex-col items-center justify-center w-full min-h-[260px] md:min-h-[300px] p-8 md:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer select-none',
            isDragOver
              ? 'border-blue-600 bg-gradient-to-b from-blue-50/90 to-indigo-50/60 shadow-xl scale-[1.01]'
              : 'border-slate-300/90 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5'
          )}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" />

          <div className="relative flex flex-col items-center gap-4 text-center max-w-md">
            {/* Icon */}
            <div className={cn(
              'w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm pointer-events-none',
              isDragOver
                ? 'bg-blue-600 text-white scale-110 shadow-blue-500/25 shadow-lg'
                : 'bg-white border border-slate-200/80 text-blue-600 group-hover:border-blue-300 group-hover:scale-105 group-hover:shadow-md'
            )}>
              <UploadCloud className="w-10 h-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>

            {/* Text */}
            <div className="space-y-2 pointer-events-none">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {isDragOver ? 'Drop images here to process' : 'Drag & Drop Images Here'}
              </h2>
              <p className="text-sm text-slate-600">
                or{' '}
                {/* label is pointer-events-auto so clicks go directly to the input */}
                <label
                  htmlFor={inputId.current}
                  className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 transition-colors cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  choose files from your device
                </label>
              </p>
            </div>

            {/* Format badges */}
            <div className="flex items-center gap-2 pt-1 flex-wrap justify-center pointer-events-none">
              {acceptedFormats.map((fmt) => (
                <span
                  key={fmt}
                  className="px-3 py-1 bg-white/90 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs group-hover:border-slate-300 transition-colors"
                >
                  {fmt}
                </span>
              ))}
              <span className="text-xs font-semibold text-slate-400">· Max 50MB</span>
            </div>

            {/* Privacy pill */}
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50/90 border border-emerald-200/80 px-3 py-1 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              100% In-Browser · Never Uploaded to Servers
            </div>
          </div>
        </div>
      )}

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="mt-3.5 space-y-2">
          {errors.map((err, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl px-4 py-2.5 text-xs md:text-sm font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
