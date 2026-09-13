'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  UploadCloud,
  FileText,
  X,
  ArrowRight,
  Download,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  FileSpreadsheet,
  Presentation,
} from 'lucide-react';
import { toast } from 'sonner';

export default function OfficeConverterClient({
  toolSlug = 'pdf-to-word',
  apiEndpoint = '/api/pdf-to-word',
  inputAccept = { 'application/pdf': ['.pdf'] },
  acceptedExtensions = ['.pdf'],
  inputFormatLabel = 'PDF',
  outputExt = '.docx',
  outputFormatLabel = 'Word (DOCX)',
  ctaLabel = 'Convert to Word (DOCX)',
  accent = 'blue', // 'blue' | 'emerald' | 'orange' | 'indigo'
}) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFilename, setDownloadFilename] = useState('');
  const [convertedSize, setConvertedSize] = useState(null);

  // Timer for simulated smooth progress step feedback during conversion
  const stepTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      setErrorMsg(null);
      setDownloadUrl(null);
      setConvertedSize(null);
      setProcessingStep(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: inputAccept,
    maxFiles: 1,
    multiple: false,
    noClick: false,
    noKeyboard: false,
  });

  const handleConvert = async () => {
    if (!file || isProcessing) return;

    setIsProcessing(true);
    setErrorMsg(null);
    setProcessingStep(1);

    // Dynamic step progression for user feedback
    stepTimerRef.current = setInterval(() => {
      setProcessingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1800);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errStr = 'Conversion failed';
        try {
          const errData = await response.json();
          errStr = errData.error || errStr;
        } catch (e) {}
        throw new Error(errStr);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const outName = `${baseName}${outputExt}`;

      setDownloadUrl(url);
      setDownloadFilename(outName);
      setConvertedSize(blob.size);
      setProcessingStep(3);

      // Auto-trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = outName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success(`${outputFormatLabel} converted successfully!`);
    } catch (error) {
      setErrorMsg(error.message || 'An error occurred during document conversion.');
      toast.error(error.message || 'Conversion failed.');
    } finally {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    setFile(null);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadFilename('');
    setConvertedSize(null);
    setProcessingStep(0);
  };

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Accent styling mappings
  const accentClasses = {
    blue: {
      btn: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25',
      iconBg: 'bg-blue-50 text-blue-600',
      border: 'border-blue-400',
      pill: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    emerald: {
      btn: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25',
      iconBg: 'bg-emerald-50 text-emerald-600',
      border: 'border-emerald-400',
      pill: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    orange: {
      btn: 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/25',
      iconBg: 'bg-orange-50 text-orange-600',
      border: 'border-orange-400',
      pill: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    indigo: {
      btn: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25',
      iconBg: 'bg-indigo-50 text-indigo-600',
      border: 'border-indigo-400',
      pill: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
  }[accent] || {
    btn: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25',
    iconBg: 'bg-blue-50 text-blue-600',
    border: 'border-blue-400',
    pill: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12">
      <div className="p-6 sm:p-8 md:p-10 space-y-6">

        {/* 1. Empty State: Hero Dropzone */}
        {!file && (
          <div
            {...getRootProps()}
            className={`relative group cursor-pointer flex flex-col items-center justify-center min-h-[260px] md:min-h-[300px] p-8 md:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 ${
              isDragActive
                ? 'border-blue-600 bg-gradient-to-b from-blue-50/90 to-indigo-50/60 shadow-xl scale-[1.005]'
                : 'border-slate-300/90 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 hover:border-blue-400 hover:shadow-lg'
            }`}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center gap-4 text-center max-w-md">
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isDragActive
                    ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/25'
                    : 'bg-white border border-slate-200/80 text-blue-600 group-hover:scale-105 group-hover:shadow-md'
                }`}
              >
                <UploadCloud className="w-10 h-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </div>

              <div className="space-y-1.5">
                <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  {isDragActive ? 'Drop file here' : `Drag & Drop your ${inputFormatLabel} File`}
                </p>
                <p className="text-sm text-slate-600">
                  or{' '}
                  <span className="font-bold text-blue-600 group-hover:text-blue-700 underline underline-offset-4 decoration-blue-300 group-hover:decoration-blue-600 transition-colors">
                    choose file from your device
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 flex-wrap justify-center">
                {acceptedExtensions.map((ext) => (
                  <span
                    key={ext}
                    className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs uppercase font-mono"
                  >
                    {ext.replace('.', '')}
                  </span>
                ))}
                <span className="text-xs font-semibold text-slate-400">· Max 100MB</span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100/90 border border-slate-200/80 px-3 py-1 rounded-full font-medium mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Encrypted Transmission · Cleanup After Conversion
              </div>
            </div>
          </div>
        )}

        {/* 2. File Selected / Converting / Success State */}
        {file && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Active Document Header Card */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-50/80 border border-slate-200/90 rounded-2xl">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${accentClasses.iconBg}`}>
                  {toolSlug.includes('excel') ? (
                    <FileSpreadsheet className="w-6 h-6" />
                  ) : toolSlug.includes('powerpoint') ? (
                    <Presentation className="w-6 h-6" />
                  ) : (
                    <FileText className="w-6 h-6" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-sm sm:text-base truncate" title={file.name}>
                    {file.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{formatSize(file.size)}</span>
                    <span>•</span>
                    <span className="uppercase font-mono font-bold text-slate-700">
                      {inputFormatLabel}
                    </span>
                  </div>
                </div>
              </div>

              {!isProcessing && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  title="Change file"
                  aria-label="Remove and select another file"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-start gap-3 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Conversion Error</p>
                  <p className="mt-0.5 text-rose-700">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="p-6 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-4 text-center">
                <div className="flex items-center justify-center gap-2 text-blue-700 font-bold text-sm sm:text-base">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Converting Document...</span>
                </div>
                <div className="w-full bg-blue-200/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-700"
                    style={{
                      width: processingStep === 1 ? '35%' : processingStep === 2 ? '75%' : '95%',
                    }}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  {processingStep === 1 && 'Uploading file securely over HTTPS...'}
                  {processingStep === 2 && 'Reconstructing document formatting and tables...'}
                  {processingStep >= 3 && 'Finalizing conversion and generating download...'}
                </p>
              </div>
            )}

            {/* Success Card */}
            {downloadUrl && !isProcessing && (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-base">
                      Conversion Complete!
                    </h4>
                    <p className="text-xs text-emerald-700">
                      Your {outputFormatLabel} document is ready to download.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-emerald-200/80 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-800 truncate">
                      {downloadFilename}
                    </span>
                  </div>
                  {convertedSize && (
                    <span className="text-xs font-medium text-slate-500 flex-shrink-0">
                      {formatSize(convertedSize)}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <a
                    href={downloadUrl}
                    download={downloadFilename}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 text-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download {outputFormatLabel}
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    Convert Another File
                  </button>
                </div>
              </div>
            )}

            {/* Action Bar (When not converted yet) */}
            {!downloadUrl && !isProcessing && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base text-white shadow-xl transition-all cursor-pointer hover:-translate-y-0.5 ${accentClasses.btn}`}
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-4 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
