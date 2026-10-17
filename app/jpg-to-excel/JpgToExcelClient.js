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
  ShieldCheck,
  Zap,
  FileImage,
  Layers,
  Eye,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import JpgTablePreview from '@/components/jpg-to-excel/JpgTablePreview';
import { formatBytes } from '@/lib/utils';
import { cn } from '@/lib/utils';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB production limit
const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/jpg', 'image/webp']);

export default function JpgToExcelClient() {
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
  const [uncertainCellsCount, setUncertainCellsCount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // File Validation
  const validateFile = (f) => {
    if (!f) return 'No file selected.';
    const ext = f.name.split('.').pop()?.toLowerCase();
    const isMimeOk = ACCEPTED_TYPES.has(f.type) || ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
    if (!isMimeOk) {
      return 'Unsupported file format. Please upload a JPG, JPEG, or PNG image.';
    }
    if (f.size > MAX_IMAGE_SIZE) {
      return `File too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed size is 10 MB.`;
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
    setUncertainCellsCount(0);
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
    setUncertainCellsCount(0);
  }, [previewUrl]);

  // Convert Process — via Vertex AI Google Gemini
  const handleExtractTable = async () => {
    if (!file) return;

    setStatus('processing');
    setProgress(15);
    setStatusMessage('Uploading image to Gemini Vision AI…');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const pTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 85) return prev + 12;
          return prev;
        });
      }, 500);

      const response = await fetch('/api/jpg-to-excel/extract', {
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

      const extractedTables = Array.isArray(data.tables) && data.tables.length > 0
        ? data.tables
        : [{ id: 'table_1', name: 'Extracted Table', headers: data.headers || [], rows: data.rows || [] }];

      setTables(extractedTables);
      setActiveTableIndex(0);
      setTableData({
        headers: extractedTables[0].headers || [],
        rows: extractedTables[0].rows || [],
      });
      setUncertainCellsCount(data.uncertainCellsCount || 0);
      setStatus('success');
    } catch (err) {
      console.error('AI Table Extraction error:', err);
      setStatus('error');
      setErrorMessage(
        err.message ||
          "We couldn't detect a table in this image. Please upload a clear image containing a table with visible rows, columns, or borders."
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

  // Download Genuine .xlsx Workbook
  const handleDownloadExcel = async () => {
    if (!tableData || (tableData.headers.length === 0 && tableData.rows.length === 0)) return;

    setIsDownloading(true);
    try {
      const baseName = file?.name ? file.name.replace(/\.[^.]+$/, '') : 'extracted-table';
      const filename = `${baseName}.xlsx`;

      // 1. Call server-side downloader endpoint
      const response = await fetch('/api/jpg-to-excel/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tables: tables.length > 0 ? tables : [{ name: 'Table Data', ...tableData }],
          filename,
          theme: 'emerald',
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      } else {
        // Fallback: client-side generator via exceljs
        const { generateExcelWorkbook } = await import('@/lib/excelGenerator');
        const blob = await generateExcelWorkbook({
          tables: tables.length > 0 ? tables : [{ name: 'Table Data', ...tableData }],
          theme: 'emerald',
        });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to generate Excel download. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Drag & Drop Upload Zone ── */}
      {!file && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'group relative border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-300',
            isDragOver
              ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01] shadow-lg shadow-emerald-500/10'
              : 'border-slate-300/80 bg-white hover:border-emerald-500/80 hover:bg-emerald-50/20 shadow-xs'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs border border-emerald-100">
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Drop your JPG or PNG table image here
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                or <span className="text-emerald-600 font-semibold underline underline-offset-4">browse files</span> from your computer or phone
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-semibold text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">JPG</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">JPEG</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">PNG</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">Max 10 MB</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Active File & Workspace Card ── */}
      {file && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
          {/* File Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
                <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-[240px] sm:max-w-md">
                  {file.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span>{formatBytes(file.size)}</span>
                  <span>•</span>
                  <span className="uppercase text-emerald-700 font-semibold">{file.type.split('/')[1] || 'IMAGE'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {previewUrl && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImageModal(true)}
                  className="h-9 px-3 text-xs text-slate-600 hover:text-slate-900 border-slate-200"
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                  View Image
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={status === 'processing'}
                className="h-9 px-3 text-xs text-slate-600 hover:text-slate-900 border-slate-200"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                Replace
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                disabled={status === 'processing'}
                className="h-9 px-3 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleInputChange}
            className="hidden"
          />

          {/* Processing State */}
          {status === 'processing' && (
            <div className="py-10 px-4 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto animate-spin">
                <Loader2 className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">
                  {statusMessage || 'Extracting structured table data…'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Google Gemini AI is inspecting table boundaries, headers, cells, and formatting.
                </p>
              </div>

              <div className="w-full max-w-xs mx-auto bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Idle State / Ready to Convert */}
          {status === 'idle' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Ready for Gemini AI Extraction
                  </h4>
                  <p className="text-xs text-slate-500">
                    Extracts headers, numbers, currencies, dates, and empty cells faithfully into .xlsx.
                  </p>
                </div>
              </div>

              <Button
                type="button"
                size="lg"
                onClick={handleExtractTable}
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-7 py-6 rounded-2xl shadow-md shadow-emerald-700/20 text-sm transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Extract Table with Gemini
              </Button>
            </div>
          )}

          {/* Error Message */}
          {status === 'error' && errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-red-900">Extraction Issue</h5>
                <p className="text-xs text-red-700 leading-relaxed">{errorMessage}</p>
                <div className="pt-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleExtractTable}
                    className="text-xs border-red-300 text-red-700 hover:bg-red-100"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Success State: Table Preview & Download Bar */}
          {status === 'success' && (
            <div className="space-y-6 animate-fade-in">
              {/* Success Callout Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-emerald-950">
                      Table Extracted Successfully!
                    </h5>
                    <p className="text-xs text-emerald-700">
                      {tables.length} {tables.length === 1 ? 'table' : 'tables'} detected. You can review and edit cells below before downloading.
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  size="lg"
                  onClick={handleDownloadExcel}
                  disabled={isDownloading}
                  className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-5 rounded-xl shadow-xs text-sm shrink-0"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating .xlsx…
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Excel (.xlsx)
                    </>
                  )}
                </Button>
              </div>

              {/* Table Preview Component */}
              <JpgTablePreview
                headers={tableData.headers}
                rows={tableData.rows}
                tables={tables}
                activeTableIndex={activeTableIndex}
                uncertainCells={tables[activeTableIndex]?.uncertainCells || []}
                onSelectTable={handleSelectTableTab}
                onTableChange={handleTableChange}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Image Lightbox Modal ── */}
      {showImageModal && previewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-4 max-w-3xl max-h-[90vh] overflow-auto relative shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileImage className="w-4 h-4 text-emerald-600" />
                Original Uploaded Image
              </span>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={previewUrl}
              alt="Uploaded table preview"
              className="max-h-[75vh] w-auto mx-auto rounded-xl object-contain border border-slate-200"
            />
          </div>
        </div>
      )}
    </div>
  );
}
