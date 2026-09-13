'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  UploadCloud,
  FileText,
  X,
  Lock,
  Unlock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Download,
  RefreshCw,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';

export default function UnlockPdfClient() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [unlockedBlob, setUnlockedBlob] = useState(null);
  const [unlockedUrl, setUnlockedUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const selected = acceptedFiles[0];
      if (selected.type === 'application/pdf' || selected.name.toLowerCase().endsWith('.pdf')) {
        setFile(selected);
        setPassword('');
        setErrorMsg(null);
        setUnlockedBlob(null);
        if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
        setUnlockedUrl(null);
      } else {
        toast.error('Please select a valid PDF file.');
      }
    }
  }, [unlockedUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    multiple: false,
  });

  const handleUnlock = async () => {
    if (!file || isProcessing) return;
    setIsProcessing(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    try {
      const response = await fetch('/api/unlock-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errStr = 'Failed to unlock PDF';
        try {
          const errData = await response.json();
          errStr = errData.error || errStr;
        } catch (e) {}
        throw new Error(errStr);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setUnlockedBlob(blob);
      setUnlockedUrl(url);

      const outName = `unlocked_${file.name}`;
      const a = document.createElement('a');
      a.href = url;
      a.download = outName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success('PDF unlocked successfully! Download started.');
    } catch (error) {
      setErrorMsg(error.message || 'Unable to decrypt document. If the document has an open password, verify that it was typed correctly.');
      toast.error(error.message || 'Decryption failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
    setFile(null);
    setPassword('');
    setErrorMsg(null);
    setUnlockedBlob(null);
    setUnlockedUrl(null);
  };

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12">
      <div className="p-6 sm:p-8 md:p-10 space-y-6">

        {/* 1. Empty Dropzone */}
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
                <Lock className="w-10 h-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </div>

              <div className="space-y-1.5">
                <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  {isDragActive ? 'Drop locked PDF here' : 'Drag & Drop your Protected PDF'}
                </p>
                <p className="text-sm text-slate-600">
                  or{' '}
                  <span className="font-bold text-blue-600 group-hover:text-blue-700 underline underline-offset-4 decoration-blue-300 group-hover:decoration-blue-600 transition-colors">
                    choose file from your device
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 flex-wrap justify-center">
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs font-mono uppercase">
                  PDF
                </span>
                <span className="text-xs font-semibold text-slate-400">· Max 100MB</span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100/90 border border-slate-200/80 px-3 py-1 rounded-full font-medium mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Encrypted Transmission · Automatic Cleanup After Unlocking
              </div>
            </div>
          </div>
        )}

        {/* 2. File Selected & Password Configuration */}
        {file && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Active File Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-50/80 border border-slate-200/90 rounded-2xl">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-sm sm:text-base truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {formatSize(file.size)} • Protected Document
                  </p>
                </div>
              </div>

              {!isProcessing && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  title="Change file"
                  aria-label="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Password Entry Box (When not yet unlocked) */}
            {!unlockedBlob && (
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <KeyRound className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Password Options
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      <strong>Owner / Permission Locks:</strong> If your document allows opening but restricts printing, copying, or modifying, leave the password field blank.
                      <br />
                      <strong>Open / User Passwords:</strong> If the document requires a password to open, enter it below.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <label htmlFor="unlock-password-input" className="block text-xs font-bold text-slate-700">
                    Document Password (Optional):
                  </label>
                  <input
                    id="unlock-password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password if required to open file..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-start gap-3 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Decryption Failed</p>
                  <p className="mt-0.5 text-rose-700">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Success State */}
            {unlockedBlob && (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-base">
                      Document Unlocked Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700">
                      Security restrictions and passwords have been removed.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-emerald-200/80 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-800 truncate">
                      unlocked_{file.name}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex-shrink-0">
                    {formatSize(unlockedBlob.size)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <a
                    href={unlockedUrl}
                    download={`unlocked_${file.name}`}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 text-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download Unlocked PDF
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    Unlock Another File
                  </button>
                </div>
              </div>
            )}

            {/* Action Bar (When not unlocked) */}
            {!unlockedBlob && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleUnlock}
                  disabled={isProcessing}
                  className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base text-white shadow-xl shadow-blue-500/25 transition-all cursor-pointer hover:-translate-y-0.5 ${
                    isProcessing
                      ? 'bg-slate-300 cursor-not-allowed shadow-none'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Decrypting & Removing Restrictions...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-5 h-5" />
                      <span>Unlock PDF Document</span>
                    </>
                  )}
                </button>

                {!isProcessing && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-4 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
