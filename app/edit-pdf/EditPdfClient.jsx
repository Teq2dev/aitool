'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FileText,
  X,
  Type,
  Pen,
  Square,
  RotateCcw,
  Download,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import PdfUploadZone from '@/components/pdf-tools/PdfUploadZone';
import { Button } from '@/components/ui/button';

export default function EditPdfClient() {
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [toolMode, setToolMode] = useState('draw');
  const [color, setColor] = useState('#2563eb');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageScale] = useState(1.5);
  const [annotations, setAnnotations] = useState({});

  const bgCanvasRef = useRef(null);
  const drawCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleFiles = useCallback(async (acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      setCurrentPage(1);
      setAnnotations({});
      setIsProcessing(true);

      try {
        const arrayBuffer = await selected.arrayBuffer();
        const pdfjsLib = await import('pdfjs-dist/build/pdf');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';

        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const loadedPdf = await loadingTask.promise;
        setPdfDoc(loadedPdf);
        setTotalPages(loadedPdf.numPages);
        toast.success('Loaded ' + loadedPdf.numPages + ' page(s)');
      } catch (err) {
        toast.error('Failed to parse PDF document.');
        setFile(null);
      } finally {
        setIsProcessing(false);
      }
    }
  }, []);

  const renderCurrentPage = useCallback(async () => {
    if (!pdfDoc || !bgCanvasRef.current || !drawCanvasRef.current) return;

    try {
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale: pageScale });

      const bgCanvas = bgCanvasRef.current;
      const bgCtx = bgCanvas.getContext('2d');
      bgCanvas.width = viewport.width;
      bgCanvas.height = viewport.height;

      const drawCanvas = drawCanvasRef.current;
      drawCanvas.width = viewport.width;
      drawCanvas.height = viewport.height;
      const drawCtx = drawCanvas.getContext('2d');
      drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

      if (annotations[currentPage]) {
        const img = new Image();
        img.onload = () => {
          drawCtx.drawImage(img, 0, 0);
        };
        img.src = annotations[currentPage];
      }

      await page.render({ canvasContext: bgCtx, viewport }).promise;
    } catch (err) {
      console.error('Render page error:', err);
    }
  }, [pdfDoc, currentPage, pageScale, annotations]);

  useEffect(() => {
    renderCurrentPage();
  }, [renderCurrentPage]);

  const saveCurrentAnnotations = () => {
    if (!drawCanvasRef.current) return;
    const dataUrl = drawCanvasRef.current.toDataURL('image/png');
    setAnnotations((prev) => ({
      ...prev,
      [currentPage]: dataUrl
    }));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      saveCurrentAnnotations();
      setCurrentPage((p) => p - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      saveCurrentAnnotations();
      setCurrentPage((p) => p + 1);
    }
  };

  const getCanvasCoords = (e) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e) => {
    const coords = getCanvasCoords(e);
    isDrawingRef.current = true;
    lastPosRef.current = coords;
    startPosRef.current = coords;

    if (toolMode === 'text') {
      const textToPlace = textInput.trim() || 'Sample Annotation';
      const canvas = drawCanvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.font = 'bold ' + (strokeWidth * 6) + 'px Arial';
      ctx.fillStyle = color;
      ctx.fillText(textToPlace, coords.x, coords.y);
      saveCurrentAnnotations();
      isDrawingRef.current = false;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    const coords = getCanvasCoords(e);
    const canvas = drawCanvasRef.current;
    const ctx = canvas.getContext('2d');

    if (toolMode === 'draw') {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth * 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      lastPosRef.current = coords;
    }
  };

  const handleMouseUp = (e) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    if (toolMode === 'rectangle') {
      const coords = getCanvasCoords(e);
      const canvas = drawCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const x = Math.min(startPosRef.current.x, coords.x);
      const y = Math.min(startPosRef.current.y, coords.y);
      const w = Math.abs(coords.x - startPosRef.current.x);
      const h = Math.abs(coords.y - startPosRef.current.y);

      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth * 2;
      ctx.strokeRect(x, y, w, h);
    }

    saveCurrentAnnotations();
  };

  const handleClearPage = () => {
    if (!drawCanvasRef.current) return;
    const canvas = drawCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setAnnotations((prev) => {
      const copy = { ...prev };
      delete copy[currentPage];
      return copy;
    });
    toast.info('Page annotations cleared.');
  };

  const handleDownload = async () => {
    if (!file) return;
    saveCurrentAnnotations();
    setIsProcessing(true);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfLibDoc = await PDFDocument.load(arrayBuffer);

      for (const [pageNumStr, dataUrl] of Object.entries(annotations)) {
        const pageIdx = parseInt(pageNumStr, 10) - 1;
        if (pageIdx >= 0 && pageIdx < pdfLibDoc.getPageCount()) {
          const page = pdfLibDoc.getPage(pageIdx);
          const { width, height } = page.getSize();

          const response = await fetch(dataUrl);
          const pngBytes = await response.arrayBuffer();
          const pngImage = await pdfLibDoc.embedPng(pngBytes);

          page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width,
            height
          });
        }
      }

      const pdfBytes = await pdfLibDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited_' + file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Edited PDF exported successfully!');
    } catch (err) {
      console.error('Export error:', err);
      toast.error('Failed to export edited PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12 p-6 sm:p-8 md:p-10 space-y-6">
      {!file ? (
        <PdfUploadZone
          onFiles={handleFiles}
          multiple={false}
          label="Drag & Drop PDF to Edit"
          sublabel="or click to browse a PDF document"
          privacyBadge="Client-Side Browser Processing"
          maxSizeLabel="Max file size: 100MB"
        />
      ) : (
        <div className="space-y-6">
          {/* Active File & Pagination Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-slate-50/80 border border-slate-200/90 rounded-2xl gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
                <p className="text-xs text-slate-500 font-medium">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-700 px-1">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                onClick={handleDownload}
                disabled={isProcessing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-4 rounded-xl gap-1.5 shadow-sm cursor-pointer"
              >
                {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                Export PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setFile(null); setPdfDoc(null); setAnnotations({}); }}
                className="text-xs text-slate-600 hover:text-rose-600 rounded-xl bg-white border-slate-200 h-10 px-3"
                title="Close document"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                Change PDF
              </Button>
            </div>
          </div>

            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-100/80 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setToolMode('draw')}
                  className={'flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ' + (toolMode === 'draw' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-white/60')}
                >
                  <Pen className="w-4 h-4" />
                  Draw
                </button>
                <button
                  onClick={() => setToolMode('text')}
                  className={'flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ' + (toolMode === 'text' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-white/60')}
                >
                  <Type className="w-4 h-4" />
                  Text
                </button>
                <button
                  onClick={() => setToolMode('rectangle')}
                  className={'flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ' + (toolMode === 'rectangle' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-white/60')}
                >
                  <Square className="w-4 h-4" />
                  Box
                </button>
              </div>

              {toolMode === 'text' && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type text, then click on page..."
                    className="px-3 py-1.5 text-xs sm:text-sm rounded-xl border border-slate-300 w-48 sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {['#0f172a', '#2563eb', '#dc2626', '#16a34a', '#ca8a04'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={'w-6 h-6 rounded-full transition-transform ' + (color === c ? 'scale-125 ring-2 ring-blue-500 ring-offset-2' : '')}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 pl-2 border-l border-slate-300">
                  <span className="text-xs text-slate-500 font-medium">Size:</span>
                  {[2, 4, 8].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStrokeWidth(s)}
                      className={'w-7 h-7 rounded-lg text-xs font-bold transition-all ' + (strokeWidth === s ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200')}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleClearPage}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 ml-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear
                </button>
              </div>
            </div>

            <div className="relative overflow-auto max-h-[750px] border border-slate-200 rounded-2xl bg-slate-200/50 p-4 flex justify-center items-center shadow-inner">
              <div className="relative shadow-2xl bg-white">
                <canvas ref={bgCanvasRef} className="block pointer-events-none" />
                <canvas
                  ref={drawCanvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  className="absolute inset-0 cursor-crosshair"
                />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
