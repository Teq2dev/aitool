'use client';

import { useState, useCallback, useRef } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  Download,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  Shield,
  Zap,
  Star,
  FileImage,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import TablePreview from '@/components/image-to-excel/TablePreview';
import { formatBytes } from '@/lib/utils';
import { downloadBlob } from '@/lib/imageProcessing';
import { cn } from '@/lib/utils';

const MAX_IMAGE_SIZE = 25 * 1024 * 1024; // 25 MB
const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/jpg', 'image/webp']);

export default function ImageToExcelClient() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Extraction State
  const [status, setStatus] = useState('idle'); // idle | processing | success | error
  const [statusMessage, setStatusMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Multi-Table State
  const [tables, setTables] = useState([]);
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [tableData, setTableData] = useState({ headers: [], rows: [] });
  const [isDownloading, setIsDownloading] = useState(false);

  // File Validation
  const validateFile = (f) => {
    if (!f) return 'No file selected.';
    const ext = f.name.split('.').pop()?.toLowerCase();
    const isMimeOk = ACCEPTED_TYPES.has(f.type) || ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
    if (!isMimeOk) {
      return 'Unsupported file format. Please upload a JPG, JPEG, or PNG image.';
    }
    if (f.size > MAX_IMAGE_SIZE) {
      return `File too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed size is 25 MB.`;
    }
    return null;
  };

  const handleSelectFile = useCallback((selectedFile) => {
    const error = validateFile(selectedFile);
    if (error) {
      setErrorMessage(error);
      setStatus('error');
      return;
    }

    setErrorMessage('');
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setStatus('idle');
    setTables([]);
    setActiveTableIndex(0);
    setTableData({ headers: [], rows: [] });
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
      const droppedFile = e.dataTransfer?.files?.[0];
      if (droppedFile) handleSelectFile(droppedFile);
    },
    [handleSelectFile]
  );

  const handleInputChange = useCallback(
    (e) => {
      const selected = e.target.files?.[0];
      if (selected) {
        handleSelectFile(selected);
        e.target.value = '';
      }
    },
    [handleSelectFile]
  );

  const handleRemoveFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setStatus('idle');
    setStatusMessage('');
    setProgress(0);
    setErrorMessage('');
    setTables([]);
    setActiveTableIndex(0);
    setTableData({ headers: [], rows: [] });
  }, [previewUrl]);

  // Convert Process — via PaddleOCR / TATR Backend
  const handleExtractTable = async () => {
    if (!file) return;

    setStatus('processing');
    setProgress(15);
    setStatusMessage('Uploading document for AI table recognition…');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const pTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 85) return prev + 12;
          return prev;
        });
      }, 400);

      setStatusMessage('Extracting structured table data…');

      const response = await fetch('/api/extract-table', {
        method: 'POST',
        body: formData,
      });

      clearInterval(pTimer);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "We couldn't detect a table in this image.");
      }

      setProgress(100);
      setStatusMessage('Table extraction complete!');

      const extractedTables = data.tables && data.tables.length > 0
        ? data.tables
        : [{ id: 'table_1', name: 'Extracted Table', headers: data.headers || [], rows: data.rows || [] }];

      setTables(extractedTables);
      setActiveTableIndex(0);
      setTableData({
        headers: extractedTables[0].headers || [],
        rows: extractedTables[0].rows || [],
      });
      setStatus('success');
    } catch (err) {
      console.error('OCR Extraction error:', err);
      setStatus('error');
      setErrorMessage(
        err.message ||
          "We couldn't detect a table in this image. Please upload a clearer image containing a table with visible rows or borders."
      );
    }
  };

  const handleSelectTableTab = (index) => {
    if (index >= 0 && index < tables.length) {
      setActiveTableIndex(index);
      setTableData({
        headers: tables[index].headers || [],
        rows: tables[index].rows || [],
      });
    }
  };

  const handleTableChange = (updated) => {
    setTableData(updated);
    setTables((prev) => {
      const next = [...prev];
      if (next[activeTableIndex]) {
        next[activeTableIndex] = {
          ...next[activeTableIndex],
          headers: updated.headers,
          rows: updated.rows,
          rowCount: updated.rows.length + (updated.headers.length > 0 ? 1 : 0),
          colCount: updated.headers.length,
        };
      }
      return next;
    });
  };

  // Download Real .xlsx — via openpyxl Backend
  const handleDownloadExcel = async () => {
    if (!tableData || (tableData.headers.length === 0 && tableData.rows.length === 0)) return;

    setIsDownloading(true);
    try {
      const baseName = file?.name ? file.name.replace(/\.[^.]+$/, '') : 'extracted-table';
      const filename = `${baseName}.xlsx`;

      const response = await fetch('/api/generate-excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headers: tableData.headers,
          rows: tableData.rows,
          tables: tables.length > 1 ? tables : null,
          filename,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate Excel file.');
      }

      const blob = await response.blob();
      downloadBlob(blob, filename);
    } catch (err) {
      console.error('Excel generation failed:', err);
      setErrorMessage('Failed to generate Excel workbook. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const isProcessing = status === 'processing';
  const isSuccess = status === 'success';

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        onChange={handleInputChange}
        className="sr-only"
        id="image-to-excel-input"
      />

      {/* ── 1. UPLOAD ZONE / FILE PREVIEW CARD ── */}
      {!file ? (
        <div
          onDragEnter={handleDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'group relative flex flex-col items-center justify-center w-full min-h-[260px] md:min-h-[300px] p-8 md:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer select-none',
            isDragOver
              ? 'border-blue-600 bg-gradient-to-b from-blue-50/90 to-indigo-50/60 shadow-xl scale-[1.01]'
              : 'border-slate-300/90 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5'
          )}
        >
          <div className="relative flex flex-col items-center gap-4 text-center max-w-md">
            {/* Icon */}
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

            {/* Title */}
            <div className="space-y-1.5">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {isDragOver ? 'Drop table image to extract' : 'Drag & Drop Table Image Here'}
              </h2>
              <p className="text-sm text-slate-600">
                or{' '}
                <label
                  htmlFor="image-to-excel-input"
                  className="font-bold text-blue-600 group-hover:text-blue-700 underline underline-offset-4 decoration-blue-300 group-hover:decoration-blue-600 transition-colors cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  choose file from your device
                </label>
              </p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 pt-1 flex-wrap justify-center pointer-events-none">
              {['JPG', 'JPEG', 'PNG'].map((fmt) => (
                <span
                  key={fmt}
                  className="px-3 py-1 bg-white/90 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs group-hover:border-slate-300 transition-colors font-mono"
                >
                  {fmt}
                </span>
              ))}
              <span className="text-xs font-semibold text-slate-400">· Max 25MB</span>
            </div>

            {/* Trust Pill */}
            <div className="inline-flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50/90 border border-blue-200/80 px-3 py-1 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              PaddleOCR / PP-StructureV3 · OpenPyXL Engine
            </div>
          </div>
        </div>
      ) : (
        /* Selected Image Card */
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 md:p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {/* Thumbnail */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <FileImage className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-bold text-slate-900 truncate" title={file.name}>
                  {file.name}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-mono">
                  <span>{formatBytes(file.size)}</span>
                  <span>·</span>
                  <span className="uppercase font-bold text-blue-600">{file.name.split('.').pop()}</span>
                </div>
              </div>
            </div>

            {/* Remove Action */}
            <button
              type="button"
              onClick={handleRemoveFile}
              disabled={isProcessing}
              title="Remove selected image"
              className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Processing Progress Bar */}
          {isProcessing && (
            <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-700 flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                  {statusMessage || 'Processing document…'}
                </span>
                <span className="font-mono font-bold text-blue-600">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-blue-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Primary Action Button */}
          {!isSuccess && !isProcessing && (
            <Button
              onClick={handleExtractTable}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/25 gap-2 transition-all hover:scale-[1.005] active:scale-[0.99] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Convert to Excel (.xlsx)
            </Button>
          )}
        </div>
      )}

      {/* ── 2. ERROR STATE ── */}
      {status === 'error' && errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Extraction Failed</p>
            <p className="text-rose-700">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* ── 3. SUCCESS / SPREADSHEET PREVIEW & DOWNLOAD ── */}
      {isSuccess && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Table Preview Component */}
          <TablePreview
            headers={tableData.headers}
            rows={tableData.rows}
            tables={tables}
            activeTableIndex={activeTableIndex}
            onSelectTable={handleSelectTableTab}
            onTableChange={handleTableChange}
          />

          {/* Download Dock */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {tables.length > 1 ? `${tables.length} Tables Successfully Extracted` : 'Table Successfully Extracted'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Generated via OpenPyXL with styled headers, zebra striping, and auto-formatted columns.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={handleDownloadExcel}
                disabled={isDownloading}
                className="w-full sm:flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-500/25 gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Excel Workbook…
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    {tables.length > 1 ? `Download All (${tables.length} Sheets) as Excel (.xlsx)` : 'Download Excel (.xlsx)'}
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleRemoveFile}
                className="w-full sm:w-auto h-12 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 font-bold text-xs px-5 rounded-2xl gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Convert Another Image
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Trust Badges */}
      {!file && (
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 py-2">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>PaddleOCR & PP-Structure table recognition</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>OpenPyXL genuine .xlsx generation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500" />
            <span>Free & unlimited table extractions</span>
          </div>
        </div>
      )}
    </div>
  );
}
