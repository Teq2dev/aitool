'use client';

import { useCallback, useRef, useState } from 'react';
import { UploadCloud, Plus, AlertCircle, FileText, Sparkles } from 'lucide-react';
import { validatePdfFile } from '@/lib/pdfProcessing';
import { cn } from '@/lib/utils';

export default function PdfUploadZone({
  onFiles,
  acceptedExtensions = ['.pdf'],
  accept = 'application/pdf',
  multiple = true,
  disabled = false,
  compact = false,
  label = 'Drag & Drop PDF Files Here',
  sublabel = 'or choose files from your device',
  privacyBadge = '100% In-Browser · Zero Server Uploads',
  maxSizeLabel = 'Max 100MB',
  className,
}) {
  const inputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState([]);

  const processFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList);
      const valid = [];
      const errs = [];

      for (const file of files) {
        // If accepting image formats (e.g. for jpg-to-pdf)
        if (accept.includes('image')) {
          valid.push(file);
        } else {
          const { valid: ok, error } = validatePdfFile(file);
          if (ok) {
            valid.push(file);
          } else {
            errs.push(`${file.name}: ${error}`);
          }
        }
      }

      if (errs.length > 0) {
        setErrors(errs);
        setTimeout(() => setErrors([]), 6000);
      }

      if (valid.length > 0) {
        onFiles(valid);
      }
    },
    [onFiles, accept]
  );

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (disabled) return;
      const dt = e.dataTransfer;
      if (dt?.files?.length) {
        processFiles(dt.files);
      }
    },
    [disabled, processFiles]
  );

  const handleInputChange = useCallback(
    (e) => {
      if (e.target.files?.length) {
        processFiles(e.target.files);
        e.target.value = '';
      }
    },
    [processFiles]
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        className="sr-only"
        aria-label="Upload files"
      />

      {compact ? (
        /* Compact Studio Dropbar */
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
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
                {isDragOver ? 'Drop files now' : 'Drag & drop more files here'}
              </p>
              <p className="text-xs text-slate-500">
                or <span className="text-blue-600 font-semibold underline underline-offset-2">browse files</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-3 py-1.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Plus className="w-3.5 h-3.5" />
              Add More
            </span>
          </div>
        </div>
      ) : (
        /* Full Hero Dropzone */
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'group relative flex flex-col items-center justify-center w-full min-h-[260px] md:min-h-[300px] p-8 md:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100',
            isDragOver
              ? 'border-blue-600 bg-gradient-to-b from-blue-50/90 to-indigo-50/60 shadow-xl scale-[1.01]'
              : 'border-slate-300/90 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5'
          )}
        >
          <div className="relative flex flex-col items-center gap-4 text-center max-w-md">
            <div
              className={cn(
                'w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm',
                isDragOver
                  ? 'bg-blue-600 text-white scale-110 shadow-blue-500/25 shadow-lg'
                  : 'bg-white border border-slate-200/80 text-blue-600 group-hover:border-blue-300 group-hover:scale-105 group-hover:shadow-md'
              )}
            >
              <UploadCloud className="w-10 h-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>

            <div className="space-y-1.5">
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {isDragOver ? 'Drop files here to process' : label}
              </p>
              <p className="text-sm text-slate-600">
                or{' '}
                <span className="font-bold text-blue-600 group-hover:text-blue-700 underline underline-offset-4 decoration-blue-300 group-hover:decoration-blue-600 transition-colors">
                  {sublabel}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 flex-wrap justify-center">
              {acceptedExtensions.map((ext) => (
                <span
                  key={ext}
                  className="px-3 py-1 bg-white/90 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs group-hover:border-slate-300 transition-colors uppercase font-mono"
                >
                  {ext.replace('.', '')}
                </span>
              ))}
              {maxSizeLabel && (
                <span className="text-xs font-semibold text-slate-400">· {maxSizeLabel}</span>
              )}
            </div>

            {privacyBadge && (
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100/90 border border-slate-200/80 px-3 py-1 rounded-full font-medium mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                {privacyBadge}
              </div>
            )}
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mt-3.5 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
          {errors.map((err, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl px-4 py-2.5 text-xs md:text-sm font-medium"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
