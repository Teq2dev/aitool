'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FileText,
  X,
  Type,
  Pen,
  Square,
  Circle,
  Minus,
  ArrowRight,
  Highlighter,
  Eraser,
  Stamp,
  Image as ImageIcon,
  PenTool,
  RotateCcw,
  RotateCw,
  Download,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Bold,
  Italic,
  Trash2,
  Move,
  MousePointer,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import PdfUploadZone from '@/components/pdf-tools/PdfUploadZone';
import SignatureModal from '@/components/pdf-tools/SignatureModal';
import { Button } from '@/components/ui/button';

// Helper to convert hex colors to pdf-lib rgb
function hexToRgb(hex) {
  if (!hex || hex === 'transparent') return null;
  const clean = hex.replace('#', '');
  if (clean.length < 6) return null;
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  return {
    r: isNaN(r) ? 0 : r,
    g: isNaN(g) ? 0 : g,
    b: isNaN(b) ? 0 : b,
  };
}

// Helper to sample perimeter background color around a bounding box on the rendered canvas
function sampleBackgroundColorFromImageData(imageData, x, y, width, height, canvasW, canvasH) {
  if (!imageData || !imageData.data || width <= 0 || height <= 0 || canvasW <= 0 || canvasH <= 0) {
    return '#ffffff';
  }

  const margin = 3;
  const topY = Math.max(0, Math.floor(y - margin));
  const botY = Math.min(canvasH - 1, Math.floor(y + height + margin));
  const leftX = Math.max(0, Math.floor(x - margin));
  const rightX = Math.min(canvasW - 1, Math.floor(x + width + margin));

  const samplePoints = [];
  const numStepsX = Math.min(10, Math.max(3, Math.floor(width / 8)));
  const stepX = width / numStepsX;
  for (let i = 0; i <= numStepsX; i++) {
    const sx = Math.floor(Math.max(0, Math.min(canvasW - 1, x + i * stepX)));
    samplePoints.push([sx, topY]);
    samplePoints.push([sx, botY]);
  }

  const numStepsY = Math.min(6, Math.max(2, Math.floor(height / 6)));
  const stepY = height / numStepsY;
  for (let i = 0; i <= numStepsY; i++) {
    const sy = Math.floor(Math.max(0, Math.min(canvasH - 1, y + i * stepY)));
    samplePoints.push([leftX, sy]);
    samplePoints.push([rightX, sy]);
  }

  const colorBuckets = {};
  const data = imageData.data;
  for (const [px, py] of samplePoints) {
    const idx = (py * canvasW + px) * 4;
    const a = data[idx + 3];
    if (a < 128) continue; // Skip transparent pixels
    // Quantize by 4 to normalize slight anti-aliasing variations
    const r = Math.round(data[idx] / 4) * 4;
    const g = Math.round(data[idx + 1] / 4) * 4;
    const b = Math.round(data[idx + 2] / 4) * 4;
    const key = `${r},${g},${b}`;
    colorBuckets[key] = (colorBuckets[key] || 0) + 1;
  }

  let bestKey = '255,255,255';
  let maxCount = -1;
  for (const [key, count] of Object.entries(colorBuckets)) {
    if (count > maxCount) {
      maxCount = count;
      bestKey = key;
    }
  }

  const [r, g, b] = bestKey.split(',').map(Number);
  const toHex = (c) => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function EditPdfClient() {
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageDimensions, setPageDimensions] = useState({}); // { [pageNum]: { width, height } } in PDF points
  const [zoom, setZoom] = useState(1.25);
  const [isProcessing, setIsProcessing] = useState(false);

  // Active Tool Mode
  // 'select' | 'editText' | 'text' | 'draw' | 'highlight' | 'whiteout' | 'shapes' | 'stamp'
  const [toolMode, setToolMode] = useState('editText');
  const [shapeType, setShapeType] = useState('rectangle'); // 'rectangle' | 'circle' | 'line' | 'arrow'

  // Formatting & Tool Properties
  const [color, setColor] = useState('#0f172a');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Helvetica');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [highlightColor, setHighlightColor] = useState('#fef08a');
  const [whiteoutColor, setWhiteoutColor] = useState('#ffffff');
  const [stampType, setStampType] = useState('APPROVED');

  // Page Annotations Data Model:
  // annotations[pageNum] = { existingTexts, addedTexts, highlights, whiteouts, shapes, images, signatures, stamps, drawings }
  const [annotations, setAnnotations] = useState({});
  const annotationsRef = useRef({});

  // Selection & Active Object
  const [selectedObj, setSelectedObj] = useState(null); // { type: 'existingText'|'addedText'|'highlight'|'whiteout'|'shape'|'image'|'signature'|'stamp', id }
  const [editingTextId, setEditingTextId] = useState(null);

  // Modals & UI toggles
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [showShapeMenu, setShowShapeMenu] = useState(false);
  const [showStampMenu, setShowStampMenu] = useState(false);

  // History Stack for Undo/Redo
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const historyIdxRef = useRef(-1);
  const historyRef = useRef([]);

  // DOM Refs
  const bgCanvasRef = useRef(null);
  const drawCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const imageInputRef = useRef(null);
  const renderTaskRef = useRef(null);

  // Interaction Refs (to avoid stale state during mouse drag events)
  const isPenDrawingRef = useRef(false);
  const penPointsRef = useRef([]);
  const isDraggingObjRef = useRef(false);
  const isResizingObjRef = useRef(false);
  const isCreatingRectRef = useRef(false);
  const rectStartPtRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, objX: 0, objY: 0, objW: 0, objH: 0 });

  // Get or initialize active page data
  const getPageData = useCallback(
    (pageNum) => {
      return (
        annotations[pageNum] || {
          existingTexts: [],
          addedTexts: [],
          highlights: [],
          whiteouts: [],
          shapes: [],
          images: [],
          signatures: [],
          stamps: [],
          drawings: [],
        }
      );
    },
    [annotations]
  );

  // Save changes to annotations and history
  const updatePageData = useCallback(
    (updater, addToHistory = true) => {
      const prev = annotationsRef.current;
      const curPageData = prev[currentPage] || {
        existingTexts: [],
        addedTexts: [],
        highlights: [],
        whiteouts: [],
        shapes: [],
        images: [],
        signatures: [],
        stamps: [],
        drawings: [],
      };
      const updatedPageData = typeof updater === 'function' ? updater(curPageData) : updater;
      const newAnnotations = { ...prev, [currentPage]: updatedPageData };
      annotationsRef.current = newAnnotations;
      setAnnotations(newAnnotations);

      if (addToHistory) {
        const currentIdx = historyIdxRef.current >= 0 ? historyIdxRef.current : 0;
        const nextHist = historyRef.current.slice(0, currentIdx + 1);
        nextHist.push(JSON.parse(JSON.stringify(newAnnotations)));
        if (nextHist.length > 30) nextHist.shift();
        const newIdx = nextHist.length - 1;
        historyRef.current = nextHist;
        historyIdxRef.current = newIdx;
        setHistory(nextHist);
        setHistoryIdx(newIdx);
      }
    },
    [currentPage]
  );

  // Undo / Redo handlers
  const handleUndo = useCallback(() => {
    const curIdx = historyIdxRef.current;
    const hist = historyRef.current;
    if (curIdx > 0 && hist.length > curIdx) {
      const nextIdx = curIdx - 1;
      historyIdxRef.current = nextIdx;
      setHistoryIdx(nextIdx);
      annotationsRef.current = hist[nextIdx];
      setAnnotations(JSON.parse(JSON.stringify(hist[nextIdx])));
      setSelectedObj(null);
      setEditingTextId(null);
      toast.info('Undo');
    }
  }, []);

  const handleRedo = useCallback(() => {
    const curIdx = historyIdxRef.current;
    const hist = historyRef.current;
    if (curIdx >= 0 && curIdx < hist.length - 1) {
      const nextIdx = curIdx + 1;
      historyIdxRef.current = nextIdx;
      setHistoryIdx(nextIdx);
      annotationsRef.current = hist[nextIdx];
      setAnnotations(JSON.parse(JSON.stringify(hist[nextIdx])));
      setSelectedObj(null);
      setEditingTextId(null);
      toast.info('Redo');
    }
  }, []);

  // Keyboard shortcuts (Undo, Redo, Delete, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedObj && !editingTextId) {
        e.preventDefault();
        handleDeleteSelected();
      } else if (e.key === 'Escape') {
        setSelectedObj(null);
        setEditingTextId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObj, editingTextId, handleUndo, handleRedo]);

  // Handle PDF upload
  const handleFiles = useCallback(async (acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      setCurrentPage(1);
      setAnnotations({});
      annotationsRef.current = {};
      setHistory([]);
      historyRef.current = [];
      historyIdxRef.current = -1;
      setHistoryIdx(-1);
      setSelectedObj(null);
      setEditingTextId(null);
      setIsProcessing(true);

      try {
        const arrayBuffer = await selected.arrayBuffer();
        const pdfjsLib = await import('pdfjs-dist/build/pdf');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.mjs';

        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const loadedPdf = await loadingTask.promise;
        setPdfDoc(loadedPdf);
        setTotalPages(loadedPdf.numPages);
        toast.success(`Loaded ${loadedPdf.numPages} page(s)`);
      } catch (err) {
        console.error('PDF parse error:', err);
        toast.error('Failed to parse PDF document.');
        setFile(null);
      } finally {
        setIsProcessing(false);
      }
    }
  }, []);

  // Extract PDF text content & dimensions for currentPage if not already extracted
  useEffect(() => {
    if (!pdfDoc) return;

    let isCancelled = false;

    const loadPageData = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const pWidth = unscaledViewport.width;
        const pHeight = unscaledViewport.height;

        setPageDimensions((prev) => ({
          ...prev,
          [currentPage]: { width: pWidth, height: pHeight },
        }));

        setAnnotations((prev) => {
          if (prev[currentPage]?.existingTexts?.length > 0) {
            return prev; // Already extracted
          }

          page.getTextContent().then((textContent) => {
            if (isCancelled) return;

            const extracted = [];
            for (let i = 0; i < textContent.items.length; i++) {
              const item = textContent.items[i];
              if (!item.str || !item.str.trim()) continue;

              const [scaleX, skewY, skewX, scaleY, tx, ty] = item.transform;
              const fSize = Math.max(6, Math.hypot(scaleX, skewY));

              // Convert PDF bottom-left baseline (tx, ty) to top-left PDF points
              const normX = tx;
              const normY = Math.max(0, pHeight - ty - fSize * 0.85);
              const normWidth = Math.max(10, item.width || item.str.length * fSize * 0.5);
              const normHeight = Math.max(fSize * 1.15, item.height || fSize);

              extracted.push({
                id: `ext-${currentPage}-${i}`,
                origText: item.str,
                currentText: item.str,
                x: normX,
                y: normY,
                width: normWidth,
                height: normHeight,
                pdfTx: tx,
                pdfTy: ty,
                pdfWidth: item.width || normWidth,
                pdfHeight: item.height || normHeight,
                origX: normX,
                origY: normY,
                origWidth: normWidth,
                origHeight: normHeight,
                origFontSize: Math.round(fSize * 10) / 10,
                fontSize: Math.round(fSize * 10) / 10,
                fontFamily: 'Helvetica',
                color: '#0f172a',
                bold: false,
                italic: false,
                bgColor: '#ffffff',
                isEdited: false,
                isDeleted: false,
                isMoved: false,
              });
            }

            // Initialize items with sampling flags (sampling is performed after page renders)
            const initialExtracted = extracted.map((t) => ({
              ...t,
              isBgSampled: false,
              bgColorUserOverride: false,
            }));

            setAnnotations((current) => {
              const curPage = current[currentPage] || {
                existingTexts: [],
                addedTexts: [],
                highlights: [],
                whiteouts: [],
                shapes: [],
                images: [],
                signatures: [],
                stamps: [],
                drawings: [],
              };

              const updatedAnnotations = {
                ...current,
                [currentPage]: {
                  ...curPage,
                  existingTexts: initialExtracted,
                  isTextLoaded: true,
                },
              };

              // Push initial state to history if history is empty
              setHistory((h) => {
                if (h.length === 0 || historyRef.current.length === 0) {
                  const snap = JSON.parse(JSON.stringify(updatedAnnotations));
                  historyRef.current = [snap];
                  historyIdxRef.current = 0;
                  setHistoryIdx(0);
                  return [snap];
                }
                return h;
              });

              annotationsRef.current = updatedAnnotations;
              return updatedAnnotations;
            });
          });

          return prev;
        });
      } catch (err) {
        console.error('Error extracting page text content:', err);
      }
    };

    loadPageData();

    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, currentPage]);

  // Render current PDF page onto background canvas & redraw freehand pen strokes
  const renderCurrentPage = useCallback(async () => {
    if (!pdfDoc || !bgCanvasRef.current || !drawCanvasRef.current) return;

    try {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {}
      }

      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale: zoom });

      const bgCanvas = bgCanvasRef.current;
      const bgCtx = bgCanvas.getContext('2d', { willReadFrequently: true });
      bgCanvas.width = viewport.width;
      bgCanvas.height = viewport.height;

      const drawCanvas = drawCanvasRef.current;
      drawCanvas.width = viewport.width;
      drawCanvas.height = viewport.height;

      // Render PDF.js page onto bgCanvas
      const renderTask = page.render({ canvasContext: bgCtx, viewport });
      renderTaskRef.current = renderTask;
      await renderTask.promise;

      // Sample background colors for extracted text if not sampled yet
      try {
        const imgData = bgCtx.getImageData(0, 0, bgCanvas.width, bgCanvas.height);
        setAnnotations((prev) => {
          const curPage = prev[currentPage];
          if (!curPage?.existingTexts || curPage.existingTexts.length === 0) return prev;
          const needsSampling = curPage.existingTexts.some((t) => !t.isBgSampled && !t.bgColorUserOverride);
          if (!needsSampling) return prev;

          const updatedTexts = curPage.existingTexts.map((it) => {
            if (it.isBgSampled || it.bgColorUserOverride) return it;
            const sampled = sampleBackgroundColorFromImageData(
              imgData,
              it.origX * zoom,
              it.origY * zoom,
              it.origWidth * zoom,
              it.origHeight * zoom,
              bgCanvas.width,
              bgCanvas.height
            );
            return { ...it, bgColor: sampled, isBgSampled: true };
          });

          const nextState = {
            ...prev,
            [currentPage]: {
              ...curPage,
              existingTexts: updatedTexts,
            },
          };
          if (historyRef.current.length <= 1) {
            const snap = JSON.parse(JSON.stringify(nextState));
            historyRef.current = [snap];
            setHistory([snap]);
          }
          annotationsRef.current = nextState;
          return nextState;
        });
      } catch (e) {
        console.warn('Post-render background sampling error:', e);
      }

      // Redraw freehand pen drawings onto drawCanvas
      const drawCtx = drawCanvas.getContext('2d');
      drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      const curPageData = annotations[currentPage];
      if (curPageData?.drawings?.length > 0) {
        for (const dr of curPageData.drawings) {
          if (!dr.points || dr.points.length < 2) continue;
          drawCtx.beginPath();
          drawCtx.moveTo(dr.points[0].x * zoom, dr.points[0].y * zoom);
          for (let i = 1; i < dr.points.length; i++) {
            drawCtx.lineTo(dr.points[i].x * zoom, dr.points[i].y * zoom);
          }
          drawCtx.strokeStyle = dr.color || '#0f172a';
          drawCtx.lineWidth = (dr.strokeWidth || 2) * (zoom / 1.25);
          drawCtx.lineCap = 'round';
          drawCtx.lineJoin = 'round';
          drawCtx.stroke();
        }
      }
    } catch (err) {
      if (err?.name !== 'RenderingCancelledException') {
        console.error('Render page error:', err);
      }
    }
  }, [pdfDoc, currentPage, zoom, annotations]);

  useEffect(() => {
    renderCurrentPage();
  }, [renderCurrentPage]);

  // Convert mouse/touch screen coordinates to PDF points (pt)
  const getCanvasPdfPt = (e) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) / zoom,
      y: (clientY - rect.top) / zoom,
    };
  };

  // Convert PDF points (pt) to screen pixels (px)
  const toPx = (pt) => pt * zoom;

  // Active page annotations helper
  const curPageData = getPageData(currentPage);

  // Selected Object Getter
  const getSelectedObjectData = () => {
    if (!selectedObj) return null;
    const { type, id } = selectedObj;
    if (type === 'existingText') {
      return curPageData.existingTexts.find((t) => t.id === id);
    }
    if (type === 'addedText') {
      return curPageData.addedTexts.find((t) => t.id === id);
    }
    if (type === 'highlight') {
      return curPageData.highlights.find((h) => h.id === id);
    }
    if (type === 'whiteout') {
      return curPageData.whiteouts.find((w) => w.id === id);
    }
    if (type === 'shape') {
      return curPageData.shapes.find((s) => s.id === id);
    }
    if (type === 'image') {
      return curPageData.images.find((img) => img.id === id);
    }
    if (type === 'signature') {
      return curPageData.signatures.find((sig) => sig.id === id);
    }
    if (type === 'stamp') {
      return curPageData.stamps.find((st) => st.id === id);
    }
    return null;
  };

  const selectedData = getSelectedObjectData();

  // Delete Currently Selected Object
  const handleDeleteSelected = () => {
    if (!selectedObj) return;
    const { type, id } = selectedObj;

    updatePageData((page) => {
      if (type === 'existingText') {
        return {
          ...page,
          existingTexts: page.existingTexts.map((it) =>
            it.id === id ? { ...it, isDeleted: true, isEdited: true } : it
          ),
        };
      }
      if (type === 'addedText') {
        return { ...page, addedTexts: page.addedTexts.filter((t) => t.id !== id) };
      }
      if (type === 'highlight') {
        return { ...page, highlights: page.highlights.filter((h) => h.id !== id) };
      }
      if (type === 'whiteout') {
        return { ...page, whiteouts: page.whiteouts.filter((w) => w.id !== id) };
      }
      if (type === 'shape') {
        return { ...page, shapes: page.shapes.filter((s) => s.id !== id) };
      }
      if (type === 'image') {
        return { ...page, images: page.images.filter((img) => img.id !== id) };
      }
      if (type === 'signature') {
        return { ...page, signatures: page.signatures.filter((sig) => sig.id !== id) };
      }
      if (type === 'stamp') {
        return { ...page, stamps: page.stamps.filter((st) => st.id !== id) };
      }
      return page;
    });

    setSelectedObj(null);
    setEditingTextId(null);
    toast.info('Item deleted');
  };

  // Update properties on the selected object
  const updateSelectedObjectProp = (propName, propValue) => {
    if (!selectedObj) return;
    const { type, id } = selectedObj;

    updatePageData((page) => {
      if (type === 'existingText') {
        return {
          ...page,
          existingTexts: page.existingTexts.map((it) =>
            it.id === id ? { ...it, [propName]: propValue, isEdited: true } : it
          ),
        };
      }
      if (type === 'addedText') {
        return {
          ...page,
          addedTexts: page.addedTexts.map((t) => (t.id === id ? { ...t, [propName]: propValue } : t)),
        };
      }
      if (type === 'shape') {
        return {
          ...page,
          shapes: page.shapes.map((s) => (s.id === id ? { ...s, [propName]: propValue } : s)),
        };
      }
      if (type === 'whiteout') {
        return {
          ...page,
          whiteouts: page.whiteouts.map((w) => (w.id === id ? { ...w, [propName]: propValue } : w)),
        };
      }
      if (type === 'highlight') {
        return {
          ...page,
          highlights: page.highlights.map((h) => (h.id === id ? { ...h, [propName]: propValue } : h)),
        };
      }
      return page;
    });
  };

  // Add a new text box on click in 'text' mode
  const handleAddTextClick = (e) => {
    if (toolMode !== 'text') return;
    const pt = getCanvasPdfPt(e);
    const newId = `text-${Date.now()}`;
    const newTextItem = {
      id: newId,
      text: 'Click to edit text',
      x: pt.x,
      y: pt.y,
      width: 140,
      height: 28,
      fontSize: fontSize || 16,
      fontFamily: fontFamily || 'Helvetica',
      color: color || '#0f172a',
      bold: isBold,
      italic: isItalic,
      bgColor: 'transparent',
    };

    updatePageData((page) => ({
      ...page,
      addedTexts: [...page.addedTexts, newTextItem],
    }));

    setSelectedObj({ type: 'addedText', id: newId });
    setEditingTextId(newId);
    setToolMode('select');
  };

  // Drag & Move handlers for objects
  const handleObjectMouseDown = (e, type, id) => {
    e.stopPropagation();
    setSelectedObj({ type, id });

    let item = null;
    if (type === 'existingText') item = curPageData.existingTexts.find((t) => t.id === id);
    else if (type === 'addedText') item = curPageData.addedTexts.find((t) => t.id === id);
    else if (type === 'highlight') item = curPageData.highlights.find((h) => h.id === id);
    else if (type === 'whiteout') item = curPageData.whiteouts.find((w) => w.id === id);
    else if (type === 'shape') item = curPageData.shapes.find((s) => s.id === id);
    else if (type === 'image') item = curPageData.images.find((img) => img.id === id);
    else if (type === 'signature') item = curPageData.signatures.find((sig) => sig.id === id);
    else if (type === 'stamp') item = curPageData.stamps.find((st) => st.id === id);

    if (!item) return;

    isDraggingObjRef.current = true;
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      objX: item.x,
      objY: item.y,
      objW: item.width,
      objH: item.height,
    };
  };

  // Resize handler for bottom-right handle
  const handleResizeMouseDown = (e, type, id) => {
    e.stopPropagation();
    isResizingObjRef.current = true;
    let item = null;
    if (type === 'existingText') item = curPageData.existingTexts.find((t) => t.id === id);
    else if (type === 'addedText') item = curPageData.addedTexts.find((t) => t.id === id);
    else if (type === 'highlight') item = curPageData.highlights.find((h) => h.id === id);
    else if (type === 'whiteout') item = curPageData.whiteouts.find((w) => w.id === id);
    else if (type === 'shape') item = curPageData.shapes.find((s) => s.id === id);
    else if (type === 'image') item = curPageData.images.find((img) => img.id === id);
    else if (type === 'signature') item = curPageData.signatures.find((sig) => sig.id === id);
    else if (type === 'stamp') item = curPageData.stamps.find((st) => st.id === id);

    if (!item) return;

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      objX: item.x,
      objY: item.y,
      objW: item.width,
      objH: item.height,
    };
  };

  // Main canvas mouse handlers
  const handleCanvasMouseDown = (e) => {
    if (toolMode === 'text') {
      handleAddTextClick(e);
      return;
    }

    const pt = getCanvasPdfPt(e);

    if (toolMode === 'draw') {
      isPenDrawingRef.current = true;
      penPointsRef.current = [pt];
      const ctx = drawCanvasRef.current.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(pt.x * zoom, pt.y * zoom);
      return;
    }

    if (toolMode === 'highlight' || toolMode === 'whiteout' || toolMode === 'shapes') {
      isCreatingRectRef.current = true;
      rectStartPtRef.current = pt;
      return;
    }

    // Clicked empty canvas area in select or editText mode
    if (toolMode === 'select' || toolMode === 'editText') {
      setSelectedObj(null);
      setEditingTextId(null);
    }
  };

  const handleCanvasMouseMove = (e) => {
    const pt = getCanvasPdfPt(e);

    // Freehand pen drawing
    if (isPenDrawingRef.current && toolMode === 'draw') {
      penPointsRef.current.push(pt);
      const ctx = drawCanvasRef.current.getContext('2d');
      ctx.lineTo(pt.x * zoom, pt.y * zoom);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth * (zoom / 1.25);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      return;
    }

    // Dragging an object
    if (isDraggingObjRef.current && selectedObj) {
      const dx = (e.clientX - dragStartRef.current.mouseX) / zoom;
      const dy = (e.clientY - dragStartRef.current.mouseY) / zoom;
      const newX = Math.round((dragStartRef.current.objX + dx) * 10) / 10;
      const newY = Math.round((dragStartRef.current.objY + dy) * 10) / 10;

      const { type, id } = selectedObj;
      updatePageData(
        (page) => {
          if (type === 'existingText') {
            return {
              ...page,
              existingTexts: page.existingTexts.map((it) =>
                it.id === id ? { ...it, x: newX, y: newY, isMoved: true, isEdited: true } : it
              ),
            };
          }
          if (type === 'addedText') {
            return {
              ...page,
              addedTexts: page.addedTexts.map((t) => (t.id === id ? { ...t, x: newX, y: newY } : t)),
            };
          }
          if (type === 'highlight') {
            return {
              ...page,
              highlights: page.highlights.map((h) => (h.id === id ? { ...h, x: newX, y: newY } : h)),
            };
          }
          if (type === 'whiteout') {
            return {
              ...page,
              whiteouts: page.whiteouts.map((w) => (w.id === id ? { ...w, x: newX, y: newY } : w)),
            };
          }
          if (type === 'shape') {
            return {
              ...page,
              shapes: page.shapes.map((s) => (s.id === id ? { ...s, x: newX, y: newY } : s)),
            };
          }
          if (type === 'image') {
            return {
              ...page,
              images: page.images.map((img) => (img.id === id ? { ...img, x: newX, y: newY } : img)),
            };
          }
          if (type === 'signature') {
            return {
              ...page,
              signatures: page.signatures.map((sig) => (sig.id === id ? { ...sig, x: newX, y: newY } : sig)),
            };
          }
          if (type === 'stamp') {
            return {
              ...page,
              stamps: page.stamps.map((st) => (st.id === id ? { ...st, x: newX, y: newY } : st)),
            };
          }
          return page;
        },
        false // don't push each mouse move step to undo stack
      );
      return;
    }

    // Resizing an object
    if (isResizingObjRef.current && selectedObj) {
      const dx = (e.clientX - dragStartRef.current.mouseX) / zoom;
      const dy = (e.clientY - dragStartRef.current.mouseY) / zoom;
      const newW = Math.max(20, Math.round((dragStartRef.current.objW + dx) * 10) / 10);
      const newH = Math.max(14, Math.round((dragStartRef.current.objH + dy) * 10) / 10);

      const { type, id } = selectedObj;
      updatePageData(
        (page) => {
          if (type === 'existingText') {
            return {
              ...page,
              existingTexts: page.existingTexts.map((it) =>
                it.id === id ? { ...it, width: newW, height: newH, isEdited: true } : it
              ),
            };
          }
          if (type === 'addedText') {
            return {
              ...page,
              addedTexts: page.addedTexts.map((t) => (t.id === id ? { ...t, width: newW, height: newH } : t)),
            };
          }
          if (type === 'highlight') {
            return {
              ...page,
              highlights: page.highlights.map((h) => (h.id === id ? { ...h, width: newW, height: newH } : h)),
            };
          }
          if (type === 'whiteout') {
            return {
              ...page,
              whiteouts: page.whiteouts.map((w) => (w.id === id ? { ...w, width: newW, height: newH } : w)),
            };
          }
          if (type === 'shape') {
            return {
              ...page,
              shapes: page.shapes.map((s) => (s.id === id ? { ...s, width: newW, height: newH } : s)),
            };
          }
          if (type === 'image') {
            return {
              ...page,
              images: page.images.map((img) => (img.id === id ? { ...img, width: newW, height: newH } : img)),
            };
          }
          if (type === 'signature') {
            return {
              ...page,
              signatures: page.signatures.map((sig) => (sig.id === id ? { ...sig, width: newW, height: newH } : sig)),
            };
          }
          if (type === 'stamp') {
            return {
              ...page,
              stamps: page.stamps.map((st) => (st.id === id ? { ...st, width: newW, height: newH } : st)),
            };
          }
          return page;
        },
        false
      );
      return;
    }

    // Preview rectangle/shape while dragging
    if (isCreatingRectRef.current) {
      const start = rectStartPtRef.current;
      const minX = Math.min(start.x, pt.x) * zoom;
      const minY = Math.min(start.y, pt.y) * zoom;
      const w = Math.abs(pt.x - start.x) * zoom;
      const h = Math.abs(pt.y - start.y) * zoom;

      const canvas = drawCanvasRef.current;
      const ctx = canvas.getContext('2d');
      // Redraw existing strokes
      renderCurrentPage();

      if (toolMode === 'highlight') {
        ctx.fillStyle = highlightColor;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(minX, minY, w, h);
        ctx.globalAlpha = 1.0;
      } else if (toolMode === 'whiteout') {
        ctx.fillStyle = whiteoutColor;
        ctx.fillRect(minX, minY, w, h);
        ctx.strokeStyle = '#cbd5e1';
        ctx.strokeRect(minX, minY, w, h);
      } else if (toolMode === 'shapes') {
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth * (zoom / 1.25);
        if (shapeType === 'rectangle') {
          ctx.strokeRect(minX, minY, w, h);
        } else if (shapeType === 'circle') {
          ctx.beginPath();
          ctx.ellipse(minX + w / 2, minY + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else if (shapeType === 'line' || shapeType === 'arrow') {
          ctx.beginPath();
          ctx.moveTo(start.x * zoom, start.y * zoom);
          ctx.lineTo(pt.x * zoom, pt.y * zoom);
          ctx.stroke();
        }
      }
    }
  };

  const handleCanvasMouseUp = (e) => {
    // Finish freehand pen stroke
    if (isPenDrawingRef.current && toolMode === 'draw') {
      isPenDrawingRef.current = false;
      if (penPointsRef.current.length > 1) {
        const newStroke = {
          id: `draw-${Date.now()}`,
          points: [...penPointsRef.current],
          color: color,
          strokeWidth: strokeWidth,
        };
        updatePageData((page) => ({
          ...page,
          drawings: [...page.drawings, newStroke],
        }));
      }
      penPointsRef.current = [];
      return;
    }

    // Finish object move or resize
    if (isDraggingObjRef.current || isResizingObjRef.current) {
      isDraggingObjRef.current = false;
      isResizingObjRef.current = false;
      // Push snapshot to undo stack
      const currentIdx = historyIdxRef.current >= 0 ? historyIdxRef.current : 0;
      const nextHist = historyRef.current.slice(0, currentIdx + 1);
      nextHist.push(JSON.parse(JSON.stringify(annotations)));
      if (nextHist.length > 30) nextHist.shift();
      const newIdx = nextHist.length - 1;
      historyRef.current = nextHist;
      historyIdxRef.current = newIdx;
      setHistory(nextHist);
      setHistoryIdx(newIdx);
      return;
    }

    // Finish creating highlight, whiteout, or shape
    if (isCreatingRectRef.current) {
      isCreatingRectRef.current = false;
      const pt = getCanvasPdfPt(e);
      const start = rectStartPtRef.current;
      const minX = Math.round(Math.min(start.x, pt.x) * 10) / 10;
      const minY = Math.round(Math.min(start.y, pt.y) * 10) / 10;
      const w = Math.round(Math.abs(pt.x - start.x) * 10) / 10;
      const h = Math.round(Math.abs(pt.y - start.y) * 10) / 10;

      if (w > 5 && h > 5) {
        const newId = `${toolMode}-${Date.now()}`;

        if (toolMode === 'highlight') {
          const newHl = {
            id: newId,
            x: minX,
            y: minY,
            width: w,
            height: h,
            color: highlightColor,
            opacity: 0.4,
          };
          updatePageData((page) => ({ ...page, highlights: [...page.highlights, newHl] }));
          setSelectedObj({ type: 'highlight', id: newId });
        } else if (toolMode === 'whiteout') {
          const newWo = {
            id: newId,
            x: minX,
            y: minY,
            width: w,
            height: h,
            color: whiteoutColor,
          };
          updatePageData((page) => ({ ...page, whiteouts: [...page.whiteouts, newWo] }));
          setSelectedObj({ type: 'whiteout', id: newId });
        } else if (toolMode === 'shapes') {
          const newShape = {
            id: newId,
            shapeType: shapeType,
            x: minX,
            y: minY,
            width: w,
            height: h,
            strokeColor: color,
            strokeWidth: strokeWidth,
            fillColor: 'transparent',
            opacity: 1.0,
          };
          updatePageData((page) => ({ ...page, shapes: [...page.shapes, newShape] }));
          setSelectedObj({ type: 'shape', id: newId });
        }
        setToolMode('select');
      }
      renderCurrentPage();
    }
  };

  // Stamp Insertion
  const handleInsertStamp = (type) => {
    const pDims = pageDimensions[currentPage] || { width: 595, height: 842 };
    const stampColors = {
      APPROVED: '#16a34a',
      REJECTED: '#dc2626',
      CONFIDENTIAL: '#e11d48',
      DRAFT: '#d97706',
      FINAL: '#2563eb',
      VOID: '#64748b',
    };

    const newId = `stamp-${Date.now()}`;
    const newStamp = {
      id: newId,
      type: type,
      text: type,
      color: stampColors[type] || '#16a34a',
      x: (pDims.width - 150) / 2,
      y: (pDims.height - 48) / 2,
      width: 150,
      height: 48,
      rotation: -12,
    };

    updatePageData((page) => ({
      ...page,
      stamps: [...page.stamps, newStamp],
    }));

    setSelectedObj({ type: 'stamp', id: newId });
    setToolMode('select');
    setShowStampMenu(false);
    toast.success(`Inserted ${type} stamp`);
  };

  // Signature Insertion
  const handleSaveSignature = (dataUrl) => {
    const pDims = pageDimensions[currentPage] || { width: 595, height: 842 };
    const newId = `sig-${Date.now()}`;
    const newSig = {
      id: newId,
      dataUrl: dataUrl,
      x: (pDims.width - 160) / 2,
      y: (pDims.height - 60) / 2,
      width: 160,
      height: 60,
    };

    updatePageData((page) => ({
      ...page,
      signatures: [...page.signatures, newSig],
    }));

    setSelectedObj({ type: 'signature', id: newId });
    setToolMode('select');
    toast.success('Signature placed onto page');
  };

  // Image Insertion
  const handleImageFileChange = (e) => {
    const fileUploaded = e.target.files?.[0];
    if (!fileUploaded) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const img = new Image();
      img.onload = () => {
        const pDims = pageDimensions[currentPage] || { width: 595, height: 842 };
        const aspect = img.height / img.width;
        const initialW = Math.min(200, pDims.width - 40);
        const initialH = initialW * aspect;

        const newId = `img-${Date.now()}`;
        const newImgObj = {
          id: newId,
          dataUrl: dataUrl,
          x: (pDims.width - initialW) / 2,
          y: (pDims.height - initialH) / 2,
          width: Math.round(initialW),
          height: Math.round(initialH),
        };

        updatePageData((page) => ({
          ...page,
          images: [...page.images, newImgObj],
        }));

        setSelectedObj({ type: 'image', id: newId });
        setToolMode('select');
        toast.success('Image inserted');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(fileUploaded);
    e.target.value = '';
  };

  // Export modified PDF using pdf-lib vector preserving pipeline
  const handleDownload = async () => {
    if (!file || !pdfDoc) return;
    setIsProcessing(true);

    try {
      const { PDFDocument, rgb, degrees, StandardFonts } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfLibDoc = await PDFDocument.load(arrayBuffer);

      // Embed standard fonts once
      const helvetica = await pdfLibDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBold = await pdfLibDoc.embedFont(StandardFonts.HelveticaBold);
      const helveticaOblique = await pdfLibDoc.embedFont(StandardFonts.HelveticaOblique);
      const helveticaBoldOblique = await pdfLibDoc.embedFont(StandardFonts.HelveticaBoldOblique);

      const timesRoman = await pdfLibDoc.embedFont(StandardFonts.TimesRoman);
      const timesRomanBold = await pdfLibDoc.embedFont(StandardFonts.TimesRomanBold);
      const timesRomanItalic = await pdfLibDoc.embedFont(StandardFonts.TimesRomanItalic);
      const timesRomanBoldItalic = await pdfLibDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

      const courier = await pdfLibDoc.embedFont(StandardFonts.Courier);
      const courierBold = await pdfLibDoc.embedFont(StandardFonts.CourierBold);
      const courierOblique = await pdfLibDoc.embedFont(StandardFonts.CourierOblique);
      const courierBoldOblique = await pdfLibDoc.embedFont(StandardFonts.CourierBoldOblique);

      const getFont = (family, bold, italic) => {
        if (family === 'TimesRoman' || family === 'serif') {
          if (bold && italic) return timesRomanBoldItalic;
          if (bold) return timesRomanBold;
          if (italic) return timesRomanItalic;
          return timesRoman;
        }
        if (family === 'Courier' || family === 'monospace') {
          if (bold && italic) return courierBoldOblique;
          if (bold) return courierBold;
          if (italic) return courierOblique;
          return courier;
        }
        if (bold && italic) return helveticaBoldOblique;
        if (bold) return helveticaBold;
        if (italic) return helveticaOblique;
        return helvetica;
      };

      const numPages = pdfLibDoc.getPageCount();

      for (let pIdx = 0; pIdx < numPages; pIdx++) {
        const pageNum = pIdx + 1;
        const page = pdfLibDoc.getPage(pIdx);
        const { height: pHeight } = page.getSize();
        const pageData = annotations[pageNum];
        if (!pageData) continue;

        // 1. Process Existing Texts (Edited, Deleted, or Moved)
        for (const item of pageData.existingTexts || []) {
          if (item.isEdited || item.isDeleted || item.isMoved) {
            // A. Draw background cover over the ORIGINAL text position
            const bgRgb = hexToRgb(item.bgColor || '#ffffff') || rgb(1, 1, 1);
            const fSize = item.origFontSize || item.fontSize || 12;
            const coverMarginX = 1.5;
            const coverMarginY = 1.0;
            page.drawRectangle({
              x: item.pdfTx - coverMarginX,
              y: item.pdfTy - (fSize * 0.24) - coverMarginY,
              width: item.pdfWidth + (coverMarginX * 2),
              height: (fSize * 1.15) + (coverMarginY * 2),
              color: rgb(bgRgb.r, bgRgb.g, bgRgb.b),
            });

            // B. If not deleted, draw replacement / updated text
            if (!item.isDeleted && item.currentText) {
              let drawX = item.pdfTx;
              let drawY = item.pdfTy;
              if (item.isMoved) {
                drawX = item.x;
                drawY = pHeight - item.y - item.height + item.fontSize * 0.25;
              }
              const font = getFont(item.fontFamily, item.bold, item.italic);
              const txtRgb = hexToRgb(item.color || '#000000') || rgb(0, 0, 0);

              page.drawText(item.currentText, {
                x: drawX,
                y: drawY,
                size: item.fontSize || item.origFontSize || 12,
                font: font,
                color: rgb(txtRgb.r, txtRgb.g, txtRgb.b),
              });
            }
          }
        }

        // 2. Process Whiteouts / Erasers / Redactions
        for (const wo of pageData.whiteouts || []) {
          const woRgb = hexToRgb(wo.color || '#ffffff') || rgb(1, 1, 1);
          page.drawRectangle({
            x: wo.x,
            y: pHeight - wo.y - wo.height,
            width: wo.width,
            height: wo.height,
            color: rgb(woRgb.r, woRgb.g, woRgb.b),
          });
        }

        // 3. Process Highlights
        for (const hl of pageData.highlights || []) {
          const hlRgb = hexToRgb(hl.color || '#fef08a') || rgb(0.99, 0.94, 0.54);
          page.drawRectangle({
            x: hl.x,
            y: pHeight - hl.y - hl.height,
            width: hl.width,
            height: hl.height,
            color: rgb(hlRgb.r, hlRgb.g, hlRgb.b),
            opacity: hl.opacity || 0.4,
          });
        }

        // 4. Process Shapes
        for (const sh of pageData.shapes || []) {
          const strokeRgb = hexToRgb(sh.strokeColor || '#2563eb') || rgb(0.15, 0.39, 0.92);
          const fillRgb = hexToRgb(sh.fillColor);

          if (sh.shapeType === 'rectangle') {
            page.drawRectangle({
              x: sh.x,
              y: pHeight - sh.y - sh.height,
              width: sh.width,
              height: sh.height,
              borderColor: rgb(strokeRgb.r, strokeRgb.g, strokeRgb.b),
              borderWidth: sh.strokeWidth || 2,
              color: fillRgb ? rgb(fillRgb.r, fillRgb.g, fillRgb.b) : undefined,
            });
          } else if (sh.shapeType === 'circle') {
            page.drawEllipse({
              x: sh.x + sh.width / 2,
              y: pHeight - sh.y - sh.height / 2,
              xScale: sh.width / 2,
              yScale: sh.height / 2,
              borderColor: rgb(strokeRgb.r, strokeRgb.g, strokeRgb.b),
              borderWidth: sh.strokeWidth || 2,
              color: fillRgb ? rgb(fillRgb.r, fillRgb.g, fillRgb.b) : undefined,
            });
          } else if (sh.shapeType === 'line' || sh.shapeType === 'arrow') {
            page.drawLine({
              start: { x: sh.x, y: pHeight - sh.y },
              end: { x: sh.x + sh.width, y: pHeight - sh.y - sh.height },
              thickness: sh.strokeWidth || 2,
              color: rgb(strokeRgb.r, strokeRgb.g, strokeRgb.b),
            });
            if (sh.shapeType === 'arrow') {
              const startX = sh.x;
              const startY = pHeight - sh.y;
              const endX = sh.x + sh.width;
              const endY = pHeight - sh.y - sh.height;
              const angle = Math.atan2(endY - startY, endX - startX);
              const headLen = 10;
              page.drawLine({
                start: { x: endX, y: endY },
                end: {
                  x: endX - headLen * Math.cos(angle - Math.PI / 6),
                  y: endY - headLen * Math.sin(angle - Math.PI / 6),
                },
                thickness: sh.strokeWidth || 2,
                color: rgb(strokeRgb.r, strokeRgb.g, strokeRgb.b),
              });
              page.drawLine({
                start: { x: endX, y: endY },
                end: {
                  x: endX - headLen * Math.cos(angle + Math.PI / 6),
                  y: endY - headLen * Math.sin(angle + Math.PI / 6),
                },
                thickness: sh.strokeWidth || 2,
                color: rgb(strokeRgb.r, strokeRgb.g, strokeRgb.b),
              });
            }
          }
        }

        // 5. Process Added Text Boxes
        for (const txt of pageData.addedTexts || []) {
          if (!txt.text) continue;
          const font = getFont(txt.fontFamily, txt.bold, txt.italic);
          const txtRgb = hexToRgb(txt.color || '#000000') || rgb(0, 0, 0);
          const lines = txt.text.split('\n');
          const lineHeight = (txt.fontSize || 14) * 1.25;

          if (txt.bgColor && txt.bgColor !== 'transparent') {
            const bgRgb = hexToRgb(txt.bgColor);
            if (bgRgb) {
              page.drawRectangle({
                x: txt.x - 2,
                y: pHeight - txt.y - txt.height,
                width: txt.width + 4,
                height: txt.height + 4,
                color: rgb(bgRgb.r, bgRgb.g, bgRgb.b),
              });
            }
          }

          let currY = pHeight - txt.y - (txt.fontSize || 14);
          for (const line of lines) {
            page.drawText(line, {
              x: txt.x,
              y: currY,
              size: txt.fontSize || 14,
              font: font,
              color: rgb(txtRgb.r, txtRgb.g, txtRgb.b),
            });
            currY -= lineHeight;
          }
        }

        // 6. Process Images
        for (const img of pageData.images || []) {
          try {
            const res = await fetch(img.dataUrl);
            const imgBytes = await res.arrayBuffer();
            const embeddedImg =
              img.dataUrl.startsWith('data:image/jpeg') || img.dataUrl.startsWith('data:image/jpg')
                ? await pdfLibDoc.embedJpg(imgBytes)
                : await pdfLibDoc.embedPng(imgBytes);

            page.drawImage(embeddedImg, {
              x: img.x,
              y: pHeight - img.y - img.height,
              width: img.width,
              height: img.height,
            });
          } catch (e) {
            console.error('Embed image failed:', e);
          }
        }

        // 7. Process Signatures
        for (const sig of pageData.signatures || []) {
          try {
            const res = await fetch(sig.dataUrl);
            const sigBytes = await res.arrayBuffer();
            const embeddedSig = await pdfLibDoc.embedPng(sigBytes);

            page.drawImage(embeddedSig, {
              x: sig.x,
              y: pHeight - sig.y - sig.height,
              width: sig.width,
              height: sig.height,
            });
          } catch (e) {
            console.error('Embed signature failed:', e);
          }
        }

        // 8. Process Stamps
        for (const st of pageData.stamps || []) {
          const stRgb = hexToRgb(st.color || '#16a34a') || rgb(0.09, 0.64, 0.29);
          page.drawRectangle({
            x: st.x,
            y: pHeight - st.y - st.height,
            width: st.width,
            height: st.height,
            borderColor: rgb(stRgb.r, stRgb.g, stRgb.b),
            borderWidth: 2.5,
            rotate: degrees(st.rotation || -12),
          });
          page.drawText(st.text || 'APPROVED', {
            x: st.x + 12,
            y: pHeight - st.y - st.height + 12,
            size: 18,
            font: helveticaBold,
            color: rgb(stRgb.r, stRgb.g, stRgb.b),
            rotate: degrees(st.rotation || -12),
          });
        }

        // 9. Process Drawings (Freehand strokes)
        for (const dr of pageData.drawings || []) {
          if (!dr.points || dr.points.length < 2) continue;
          const drRgb = hexToRgb(dr.color || '#2563eb') || rgb(0.15, 0.39, 0.92);
          for (let i = 0; i < dr.points.length - 1; i++) {
            const p1 = dr.points[i];
            const p2 = dr.points[i + 1];
            page.drawLine({
              start: { x: p1.x, y: pHeight - p1.y },
              end: { x: p2.x, y: pHeight - p2.y },
              thickness: dr.strokeWidth || 2,
              color: rgb(drRgb.r, drRgb.g, drRgb.b),
            });
          }
        }
      }

      const pdfBytes = await pdfLibDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited_' + (file.name || 'document.pdf');
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

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
      setSelectedObj(null);
      setEditingTextId(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      setSelectedObj(null);
      setEditingTextId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden mb-12 p-4 sm:p-6 md:p-8 space-y-5">
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
        <div className="space-y-4">
          {/* Top Bar: File Info, Navigation, Zoom, Undo/Redo & Export */}
          <div className="flex flex-wrap items-center justify-between p-3.5 sm:p-4 bg-slate-50/90 border border-slate-200/90 rounded-2xl gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate max-w-[180px] sm:max-w-xs">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>

            {/* Middle Controls: Page Navigation & Zoom & History */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Page Navigator */}
              <div className="flex items-center bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-700 px-2">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-2xs gap-1">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.75, Math.round((z - 0.25) * 100) / 100))}
                  disabled={zoom <= 0.75}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-700 px-1 min-w-[42px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(2.0, Math.round((z + 0.25) * 100) / 100))}
                  disabled={zoom >= 2.0}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(1.0)}
                  className="text-2xs font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer ml-1"
                  title="Reset to 100%"
                >
                  100%
                </button>
              </div>

              {/* Undo / Redo */}
              <div className="flex items-center bg-white px-1.5 py-1 rounded-xl border border-slate-200 shadow-2xs gap-0.5">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={historyIdx <= 0}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                  title="Undo (Ctrl+Z)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={historyIdx >= history.length - 1}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                  title="Redo (Ctrl+Y)"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Actions: Export & Reset */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDownload}
                disabled={isProcessing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 px-4 rounded-xl gap-1.5 shadow-sm cursor-pointer"
              >
                {isProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                Export PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFile(null);
                  setPdfDoc(null);
                  setAnnotations({});
                }}
                className="text-xs text-slate-600 hover:text-rose-600 rounded-xl bg-white border-slate-200 h-9 px-3"
                title="Close document"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                Change
              </Button>
            </div>
          </div>

          {/* Main Editing Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-100/90 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Select Tool */}
              <button
                type="button"
                onClick={() => setToolMode('select')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  toolMode === 'select'
                    ? 'bg-white text-blue-600 shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:bg-white/60'
                }`}
                title="Select and move objects"
              >
                <MousePointer className="w-3.5 h-3.5" />
                Select
              </button>

              {/* Edit Existing Text Tool */}
              <button
                type="button"
                onClick={() => setToolMode('editText')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  toolMode === 'editText'
                    ? 'bg-white text-blue-600 shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:bg-white/60'
                }`}
                title="Click any text in the PDF to edit it"
              >
                <Type className="w-3.5 h-3.5" />
                Edit Text
              </button>

              {/* Add New Text Tool */}
              <button
                type="button"
                onClick={() => setToolMode('text')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  toolMode === 'text'
                    ? 'bg-white text-blue-600 shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:bg-white/60'
                }`}
                title="Add new text box"
              >
                <span className="font-mono text-sm leading-none font-black">+</span>
                Add Text
              </button>

              {/* Draw Tool */}
              <button
                type="button"
                onClick={() => setToolMode('draw')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  toolMode === 'draw'
                    ? 'bg-white text-blue-600 shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:bg-white/60'
                }`}
                title="Draw freehand"
              >
                <Pen className="w-3.5 h-3.5" />
                Draw
              </button>

              {/* Highlight Tool */}
              <button
                type="button"
                onClick={() => setToolMode('highlight')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  toolMode === 'highlight'
                    ? 'bg-white text-blue-600 shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:bg-white/60'
                }`}
                title="Highlight text or area"
              >
                <Highlighter className="w-3.5 h-3.5" />
                Highlight
              </button>

              {/* Whiteout / Eraser Tool */}
              <button
                type="button"
                onClick={() => setToolMode('whiteout')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  toolMode === 'whiteout'
                    ? 'bg-white text-blue-600 shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:bg-white/60'
                }`}
                title="Whiteout / Eraser (Covers content visually. It does not securely remove hidden PDF data)"
              >
                <Eraser className="w-3.5 h-3.5" />
                Whiteout
              </button>

              {/* Shapes Tool Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setToolMode('shapes');
                    setShowShapeMenu(!showShapeMenu);
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    toolMode === 'shapes'
                      ? 'bg-white text-blue-600 shadow-2xs border border-slate-200'
                      : 'text-slate-600 hover:bg-white/60'
                  }`}
                  title="Draw shapes"
                >
                  <Square className="w-3.5 h-3.5" />
                  Shape ({shapeType})
                </button>
                {showShapeMenu && (
                  <div className="absolute left-0 top-full mt-1.5 bg-white border border-slate-200 shadow-xl rounded-xl p-1 z-30 flex flex-col gap-1 w-32">
                    {[
                      { id: 'rectangle', label: 'Rectangle', icon: Square },
                      { id: 'circle', label: 'Circle', icon: Circle },
                      { id: 'line', label: 'Line', icon: Minus },
                      { id: 'arrow', label: 'Arrow', icon: ArrowRight },
                    ].map((st) => {
                      const Icon = st.icon;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => {
                            setShapeType(st.id);
                            setToolMode('shapes');
                            setShowShapeMenu(false);
                          }}
                          className={`flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-left cursor-pointer ${
                            shapeType === st.id
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {st.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Signature Tool */}
              <button
                type="button"
                onClick={() => setIsSignatureModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-white/60 transition-all cursor-pointer"
                title="Add handwritten or typed signature"
              >
                <PenTool className="w-3.5 h-3.5" />
                Sign
              </button>

              {/* Image Tool */}
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-white/60 transition-all cursor-pointer"
                title="Insert image"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Image
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />

              {/* Stamp Tool Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowStampMenu(!showStampMenu)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-white/60 transition-all cursor-pointer"
                  title="Insert stamp"
                >
                  <Stamp className="w-3.5 h-3.5" />
                  Stamp
                </button>
                {showStampMenu && (
                  <div className="absolute left-0 top-full mt-1.5 bg-white border border-slate-200 shadow-xl rounded-xl p-1.5 z-30 flex flex-col gap-1 w-36">
                    {['APPROVED', 'REJECTED', 'CONFIDENTIAL', 'DRAFT', 'FINAL', 'VOID'].map(
                      (st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleInsertStamp(st)}
                          className="px-2.5 py-1.5 text-xs font-bold rounded-lg text-left hover:bg-slate-100 cursor-pointer flex items-center justify-between"
                        >
                          <span>{st}</span>
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Delete current selected object button */}
            {selectedObj && (
              <button
                type="button"
                onClick={handleDeleteSelected}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200 cursor-pointer ml-auto"
                title="Delete selected item (or press Delete key)"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            )}
          </div>

          {/* Contextual Properties Bar (Font size, Color, Bold, Stroke width) */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Color Swatches */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Color:</span>
                {['#0f172a', '#2563eb', '#dc2626', '#16a34a', '#7c3aed', '#d97706'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setColor(c);
                      if (selectedObj) updateSelectedObjectProp('color', c);
                    }}
                    className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                      color === c ? 'scale-125 ring-2 ring-blue-500 ring-offset-1' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              {/* Text formatting options (shown when text tool or text item selected) */}
              {(toolMode === 'text' ||
                toolMode === 'editText' ||
                selectedObj?.type === 'existingText' ||
                selectedObj?.type === 'addedText') && (
                <>
                  {/* Font Size */}
                  <div className="flex items-center gap-1 pl-3 border-l border-slate-200">
                    <span className="text-slate-500 font-medium">Size:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newSz = Math.max(8, fontSize - 2);
                        setFontSize(newSz);
                        if (selectedObj) updateSelectedObjectProp('fontSize', newSz);
                      }}
                      className="w-6 h-6 rounded bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold w-6 text-center">{fontSize}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newSz = Math.min(64, fontSize + 2);
                        setFontSize(newSz);
                        if (selectedObj) updateSelectedObjectProp('fontSize', newSz);
                      }}
                      className="w-6 h-6 rounded bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Font Family */}
                  <div className="flex items-center gap-1 pl-3 border-l border-slate-200">
                    <span className="text-slate-500 font-medium">Font:</span>
                    <select
                      value={selectedData?.fontFamily || fontFamily}
                      onChange={(e) => {
                        setFontFamily(e.target.value);
                        if (selectedObj) updateSelectedObjectProp('fontFamily', e.target.value);
                      }}
                      className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700 font-medium cursor-pointer"
                    >
                      <option value="Helvetica">Helvetica (Sans)</option>
                      <option value="TimesRoman">Times (Serif)</option>
                      <option value="Courier">Courier (Mono)</option>
                    </select>
                  </div>

                  {/* Bold & Italic */}
                  <div className="flex items-center gap-1 pl-3 border-l border-slate-200">
                    <button
                      type="button"
                      onClick={() => {
                        const nextB = !isBold;
                        setIsBold(nextB);
                        if (selectedObj) updateSelectedObjectProp('bold', nextB);
                      }}
                      className={`p-1 rounded cursor-pointer ${
                        (selectedData?.bold ?? isBold)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                      title="Bold"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const nextI = !isItalic;
                        setIsItalic(nextI);
                        if (selectedObj) updateSelectedObjectProp('italic', nextI);
                      }}
                      className={`p-1 rounded cursor-pointer ${
                        (selectedData?.italic ?? isItalic)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                      title="Italic"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Cover Background Color (for existing text) */}
                  {selectedObj?.type === 'existingText' && (
                    <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
                      <span className="text-slate-500 font-medium">Cover Bg:</span>
                      <div className="flex items-center gap-1">
                        <div
                          className="w-5 h-5 rounded border border-slate-300 shadow-2xs"
                          style={{ backgroundColor: selectedData?.bgColor || '#ffffff' }}
                          title={`Sampled: ${selectedData?.bgColor || '#ffffff'}`}
                        />
                        <input
                          type="color"
                          value={selectedData?.bgColor?.startsWith('#') ? selectedData.bgColor : '#ffffff'}
                          onChange={(e) => {
                            updateSelectedObjectProp('bgColor', e.target.value);
                            updateSelectedObjectProp('bgColorUserOverride', true);
                          }}
                          className="w-6 h-6 p-0 border border-slate-200 rounded cursor-pointer"
                          title="Override background cover color"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Stroke Width options (for Draw or Shapes) */}
              {(toolMode === 'draw' || toolMode === 'shapes') && (
                <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
                  <span className="text-slate-500 font-medium">Thickness:</span>
                  {[2, 4, 8].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setStrokeWidth(s);
                        if (selectedObj) updateSelectedObjectProp('strokeWidth', s);
                      }}
                      className={`w-6 h-6 rounded text-xs font-bold transition-all cursor-pointer ${
                        strokeWidth === s
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Whiteout / Eraser Color options */}
              {(toolMode === 'whiteout' || selectedObj?.type === 'whiteout') && (
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200 flex-wrap">
                  <span className="text-slate-500 font-medium">Cover Color:</span>
                  {['#ffffff', '#f8fafc', '#f1f5f9', '#000000'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setWhiteoutColor(c);
                        if (selectedObj) updateSelectedObjectProp('color', c);
                      }}
                      className={`w-5 h-5 rounded border border-slate-300 cursor-pointer ${
                        (selectedData?.color || whiteoutColor) === c ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                      }`}
                      style={{ backgroundColor: c }}
                      title={c === '#ffffff' ? 'White' : c === '#000000' ? 'Black (Redact)' : c}
                    />
                  ))}
                  <input
                    type="color"
                    value={selectedData?.color || whiteoutColor}
                    onChange={(e) => {
                      setWhiteoutColor(e.target.value);
                      if (selectedObj) updateSelectedObjectProp('color', e.target.value);
                    }}
                    className="w-6 h-6 p-0 border border-slate-200 rounded cursor-pointer"
                    title="Custom eraser color"
                  />
                  <span className="text-2xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">
                    ⚠️ Visual cover only. Does not securely remove hidden PDF data.
                  </span>
                </div>
              )}
            </div>

            <div className="text-2xs text-slate-400 font-medium hidden sm:block">
              {toolMode === 'editText' && 'Tip: Click any existing text to edit or replace it'}
              {toolMode === 'text' && 'Tip: Click anywhere to drop a new text box'}
              {toolMode === 'select' && 'Tip: Click and drag to move or resize elements'}
              {toolMode === 'highlight' && 'Tip: Drag a rectangle over content to highlight'}
              {toolMode === 'whiteout' && 'Tip: Drag a rectangle to whiteout/erase. Note: Covers content visually, not secure redaction.'}
            </div>
          </div>

          {/* Scanned / Image-Only Document Notification */}
          {curPageData?.isTextLoaded && curPageData?.existingTexts?.length === 0 && (
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs shadow-2xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  No editable text found on this page (scanned or image-only document). Use <strong>+ Add Text</strong> to overlay text.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setToolMode('text')}
                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs cursor-pointer shrink-0 transition-colors"
              >
                Switch to Add Text
              </button>
            </div>
          )}

          {/* Document Canvas Container with Interactive Overlay */}
          <div
            ref={containerRef}
            className="relative overflow-auto max-h-[760px] border border-slate-200 rounded-2xl bg-slate-200/60 p-4 sm:p-6 flex justify-center items-start shadow-inner select-none"
          >
            <div
              className="relative shadow-2xl bg-white transition-transform"
              style={{
                width: toPx(pageDimensions[currentPage]?.width || 595),
                height: toPx(pageDimensions[currentPage]?.height || 842),
              }}
            >
              {/* PDF.js Page Background Canvas */}
              <canvas ref={bgCanvasRef} className="block pointer-events-none absolute inset-0" />

              {/* Overlay Canvas for Freehand Drawing & Drag Previews */}
              <canvas
                ref={drawCanvasRef}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                className={`absolute inset-0 z-10 ${
                  toolMode === 'draw'
                    ? 'cursor-crosshair'
                    : toolMode === 'text'
                    ? 'cursor-text'
                    : toolMode === 'highlight' || toolMode === 'whiteout' || toolMode === 'shapes'
                    ? 'cursor-crosshair'
                    : 'cursor-default'
                }`}
              />

              {/* DOM Interactive Annotation Objects Overlay */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* 1. Whiteout / Eraser Rectangles */}
                {curPageData.whiteouts.map((wo) => {
                  const isSelected = selectedObj?.id === wo.id;
                  return (
                    <div
                      key={wo.id}
                      onMouseDown={(e) => handleObjectMouseDown(e, 'whiteout', wo.id)}
                      style={{
                        left: `${toPx(wo.x)}px`,
                        top: `${toPx(wo.y)}px`,
                        width: `${toPx(wo.width)}px`,
                        height: `${toPx(wo.height)}px`,
                        backgroundColor: wo.color || '#ffffff',
                      }}
                      className={`absolute pointer-events-auto cursor-move ${
                        isSelected ? 'ring-2 ring-blue-500 shadow-md' : 'border border-slate-200'
                      }`}
                    >
                      {isSelected && (
                        <div
                          onMouseDown={(e) => handleResizeMouseDown(e, 'whiteout', wo.id)}
                          className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full cursor-nwse-resize"
                        />
                      )}
                    </div>
                  );
                })}

                {/* 2. Highlight Rectangles */}
                {curPageData.highlights.map((hl) => {
                  const isSelected = selectedObj?.id === hl.id;
                  return (
                    <div
                      key={hl.id}
                      onMouseDown={(e) => handleObjectMouseDown(e, 'highlight', hl.id)}
                      style={{
                        left: `${toPx(hl.x)}px`,
                        top: `${toPx(hl.y)}px`,
                        width: `${toPx(hl.width)}px`,
                        height: `${toPx(hl.height)}px`,
                        backgroundColor: hl.color || '#fef08a',
                        opacity: hl.opacity || 0.4,
                      }}
                      className={`absolute pointer-events-auto cursor-move mix-blend-multiply ${
                        isSelected ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      {isSelected && (
                        <div
                          onMouseDown={(e) => handleResizeMouseDown(e, 'highlight', hl.id)}
                          className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full cursor-nwse-resize"
                        />
                      )}
                    </div>
                  );
                })}

                {/* 3. Shapes */}
                {curPageData.shapes.map((sh) => {
                  const isSelected = selectedObj?.id === sh.id;
                  return (
                    <div
                      key={sh.id}
                      onMouseDown={(e) => handleObjectMouseDown(e, 'shape', sh.id)}
                      style={{
                        left: `${toPx(sh.x)}px`,
                        top: `${toPx(sh.y)}px`,
                        width: `${toPx(sh.width)}px`,
                        height: `${toPx(sh.height)}px`,
                      }}
                      className={`absolute pointer-events-auto cursor-move ${
                        isSelected ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <svg className="w-full h-full overflow-visible">
                        {sh.shapeType === 'rectangle' && (
                          <rect
                            x={0}
                            y={0}
                            width="100%"
                            height="100%"
                            stroke={sh.strokeColor || '#2563eb'}
                            strokeWidth={sh.strokeWidth || 2}
                            fill={sh.fillColor || 'transparent'}
                          />
                        )}
                        {sh.shapeType === 'circle' && (
                          <ellipse
                            cx="50%"
                            cy="50%"
                            rx="50%"
                            ry="50%"
                            stroke={sh.strokeColor || '#2563eb'}
                            strokeWidth={sh.strokeWidth || 2}
                            fill={sh.fillColor || 'transparent'}
                          />
                        )}
                        {(sh.shapeType === 'line' || sh.shapeType === 'arrow') && (
                          <>
                            <line
                              x1={0}
                              y1={0}
                              x2="100%"
                              y2="100%"
                              stroke={sh.strokeColor || '#2563eb'}
                              strokeWidth={sh.strokeWidth || 2}
                            />
                            {sh.shapeType === 'arrow' && (
                              <polygon
                                points="100%,100% 90%,85% 85%,90%"
                                fill={sh.strokeColor || '#2563eb'}
                              />
                            )}
                          </>
                        )}
                      </svg>
                      {isSelected && (
                        <div
                          onMouseDown={(e) => handleResizeMouseDown(e, 'shape', sh.id)}
                          className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full cursor-nwse-resize"
                        />
                      )}
                    </div>
                  );
                })}

                {/* 4. Existing PDF Text Items (Click to Edit) */}
                {curPageData.existingTexts.map((it) => {
                  const isSelected = selectedObj?.id === it.id;
                  const isEditing = editingTextId === it.id;

                  // Deleted item: render background patch over original location so text does NOT show underneath
                  if (it.isDeleted) {
                    return (
                      <div
                        key={it.id}
                        style={{
                          left: `${toPx(it.origX - 1.5)}px`,
                          top: `${toPx(it.origY - 1.0)}px`,
                          width: `${toPx(it.origWidth + 3.0)}px`,
                          height: `${toPx(it.origHeight + 2.0)}px`,
                          backgroundColor: it.bgColor || '#ffffff',
                        }}
                        className="absolute pointer-events-none"
                      />
                    );
                  }

                  // Edited, moved, or currently being edited:
                  if (it.isEdited || it.isMoved || isEditing) {
                    return (
                      <React.Fragment key={it.id}>
                        {/* Always cover original position with background patch */}
                        <div
                          style={{
                            left: `${toPx(it.origX - 1.5)}px`,
                            top: `${toPx(it.origY - 1.0)}px`,
                            width: `${toPx(it.origWidth + 3.0)}px`,
                            height: `${toPx(it.origHeight + 2.0)}px`,
                            backgroundColor: it.bgColor || '#ffffff',
                          }}
                          className="absolute pointer-events-none z-10"
                        />

                        {/* Render active or modified replacement text box */}
                        <div
                          onMouseDown={(e) => handleObjectMouseDown(e, 'existingText', it.id)}
                          style={{
                            left: `${toPx(it.x - 2)}px`,
                            top: `${toPx(it.y - 2)}px`,
                            minWidth: `${toPx(it.width + 4)}px`,
                            backgroundColor: it.bgColor || '#ffffff',
                          }}
                          className={`absolute pointer-events-auto rounded px-1 py-0.5 transition-shadow ${
                            isSelected ? 'ring-2 ring-blue-500 shadow-md z-30' : 'z-20'
                          }`}
                        >
                          {isEditing ? (
                            <div className="flex flex-col">
                              <div className="flex items-center justify-between text-2xs text-blue-500 font-mono select-none cursor-move mb-0.5 pb-0.5 border-b border-blue-100">
                                <span className="flex items-center gap-1 font-bold">
                                  <Move className="w-2.5 h-2.5" /> Drag
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingTextId(null);
                                  }}
                                  className="hover:text-blue-700 font-bold px-1"
                                >
                                  Done ✓
                                </button>
                              </div>
                              <input
                                type="text"
                                data-pdf-editor="inline-text-input"
                                value={it.currentText}
                                onMouseDown={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updatePageData((page) => ({
                                    ...page,
                                    existingTexts: page.existingTexts.map((item) =>
                                      item.id === it.id
                                        ? { ...item, currentText: val, isEdited: true }
                                        : item
                                    ),
                                  }));
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    setEditingTextId(null);
                                  }
                                }}
                                autoFocus
                                style={{
                                  fontSize: `${toPx(it.fontSize || 14)}px`,
                                  color: it.color || '#0f172a',
                                  fontWeight: it.bold ? 'bold' : 'normal',
                                  fontStyle: it.italic ? 'italic' : 'normal',
                                  fontFamily:
                                    it.fontFamily === 'TimesRoman'
                                      ? 'serif'
                                      : it.fontFamily === 'Courier'
                                      ? 'monospace'
                                      : 'sans-serif',
                                }}
                                className="w-full bg-white outline-none border-b border-blue-500 py-0.5 px-0.5"
                              />
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setSelectedObj({ type: 'existingText', id: it.id });
                                setEditingTextId(it.id);
                                setFontSize(it.fontSize);
                                setColor(it.color);
                                setFontFamily(it.fontFamily);
                                setIsBold(it.bold);
                                setIsItalic(it.italic);
                              }}
                              style={{
                                fontSize: `${toPx(it.fontSize || 14)}px`,
                                color: it.color || '#0f172a',
                                fontWeight: it.bold ? 'bold' : 'normal',
                                fontStyle: it.italic ? 'italic' : 'normal',
                                fontFamily:
                                  it.fontFamily === 'TimesRoman'
                                    ? 'serif'
                                    : it.fontFamily === 'Courier'
                                    ? 'monospace'
                                    : 'sans-serif',
                              }}
                              className="cursor-text py-0.5 whitespace-pre"
                              title={`Click to edit "${it.currentText}"`}
                            >
                              {it.currentText}
                            </div>
                          )}

                          {isSelected && (
                            <div
                              onMouseDown={(e) => handleResizeMouseDown(e, 'existingText', it.id)}
                              className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full cursor-nwse-resize"
                            />
                          )}
                        </div>
                      </React.Fragment>
                    );
                  }

                  // Unedited item: Hoverable hit-box in editText or select mode
                  return (
                    <div
                      key={it.id}
                      onClick={() => {
                        if (toolMode === 'editText' || toolMode === 'select') {
                          setSelectedObj({ type: 'existingText', id: it.id });
                          setEditingTextId(it.id);
                          setFontSize(it.fontSize);
                          setColor(it.color);
                          setFontFamily(it.fontFamily);
                          setIsBold(it.bold);
                          setIsItalic(it.italic);
                        }
                      }}
                      style={{
                        left: `${toPx(it.x - 2)}px`,
                        top: `${toPx(it.y - 2)}px`,
                        width: `${toPx(it.width + 4)}px`,
                        height: `${toPx(it.height + 4)}px`,
                      }}
                      className={`absolute pointer-events-auto rounded transition-all ${
                        toolMode === 'editText' || toolMode === 'select'
                          ? 'hover:ring-2 hover:ring-blue-400 hover:bg-blue-400/20 cursor-pointer z-10'
                          : 'pointer-events-none'
                      }`}
                      title={
                        toolMode === 'editText' || toolMode === 'select'
                          ? `Click to edit "${it.origText}"`
                          : undefined
                      }
                    />
                  );
                })}

                {/* 5. Added Text Boxes */}
                {curPageData.addedTexts.map((txt) => {
                  const isSelected = selectedObj?.id === txt.id;
                  const isEditing = editingTextId === txt.id;

                  return (
                    <div
                      key={txt.id}
                      onMouseDown={(e) => handleObjectMouseDown(e, 'addedText', txt.id)}
                      style={{
                        left: `${toPx(txt.x)}px`,
                        top: `${toPx(txt.y)}px`,
                        minWidth: `${toPx(txt.width)}px`,
                        backgroundColor: txt.bgColor || 'transparent',
                      }}
                      className={`absolute pointer-events-auto rounded px-1.5 py-0.5 cursor-move ${
                        isSelected ? 'ring-2 ring-blue-500 shadow-md bg-white z-30' : 'z-20'
                      }`}
                    >
                      {isEditing ? (
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between text-2xs text-blue-500 font-mono select-none cursor-move mb-0.5 pb-0.5 border-b border-blue-100">
                            <span className="flex items-center gap-1 font-bold">
                              <Move className="w-2.5 h-2.5" /> Drag
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTextId(null);
                              }}
                              className="hover:text-blue-700 font-bold px-1"
                            >
                              Done ✓
                            </button>
                          </div>
                          <textarea
                            data-pdf-editor="added-text-input"
                            value={txt.text}
                            onMouseDown={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const val = e.target.value;
                              updatePageData((page) => ({
                                ...page,
                                addedTexts: page.addedTexts.map((t) =>
                                  t.id === txt.id ? { ...t, text: val } : t
                                ),
                              }));
                            }}
                            autoFocus
                            rows={Math.max(1, txt.text.split('\n').length)}
                            style={{
                              fontSize: `${toPx(txt.fontSize || 14)}px`,
                              color: txt.color || '#0f172a',
                              fontWeight: txt.bold ? 'bold' : 'normal',
                              fontStyle: txt.italic ? 'italic' : 'normal',
                              fontFamily:
                                txt.fontFamily === 'TimesRoman'
                                  ? 'serif'
                                  : txt.fontFamily === 'Courier'
                                  ? 'monospace'
                                  : 'sans-serif',
                            }}
                            className="w-full bg-white outline-none border-b border-blue-500 py-0.5 px-0.5 resize-none"
                          />
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setSelectedObj({ type: 'addedText', id: txt.id });
                            setEditingTextId(txt.id);
                          }}
                          style={{
                            fontSize: `${toPx(txt.fontSize || 14)}px`,
                            color: txt.color || '#0f172a',
                            fontWeight: txt.bold ? 'bold' : 'normal',
                            fontStyle: txt.italic ? 'italic' : 'normal',
                            fontFamily:
                              txt.fontFamily === 'TimesRoman'
                                ? 'serif'
                                : txt.fontFamily === 'Courier'
                                ? 'monospace'
                                : 'sans-serif',
                          }}
                          className="cursor-text whitespace-pre-wrap select-text"
                        >
                          {txt.text}
                        </div>
                      )}

                      {isSelected && (
                        <div
                          onMouseDown={(e) => handleResizeMouseDown(e, 'addedText', txt.id)}
                          className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full cursor-nwse-resize"
                        />
                      )}
                    </div>
                  );
                })}

                {/* 6. Images */}
                {curPageData.images.map((img) => {
                  const isSelected = selectedObj?.id === img.id;
                  return (
                    <div
                      key={img.id}
                      onMouseDown={(e) => handleObjectMouseDown(e, 'image', img.id)}
                      style={{
                        left: `${toPx(img.x)}px`,
                        top: `${toPx(img.y)}px`,
                        width: `${toPx(img.width)}px`,
                        height: `${toPx(img.height)}px`,
                      }}
                      className={`absolute pointer-events-auto cursor-move ${
                        isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''
                      }`}
                    >
                      <img
                        src={img.dataUrl}
                        alt="Inserted Image"
                        className="w-full h-full object-contain pointer-events-none"
                      />
                      {isSelected && (
                        <div
                          onMouseDown={(e) => handleResizeMouseDown(e, 'image', img.id)}
                          className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full cursor-nwse-resize"
                        />
                      )}
                    </div>
                  );
                })}

                {/* 7. Signatures */}
                {curPageData.signatures.map((sig) => {
                  const isSelected = selectedObj?.id === sig.id;
                  return (
                    <div
                      key={sig.id}
                      onMouseDown={(e) => handleObjectMouseDown(e, 'signature', sig.id)}
                      style={{
                        left: `${toPx(sig.x)}px`,
                        top: `${toPx(sig.y)}px`,
                        width: `${toPx(sig.width)}px`,
                        height: `${toPx(sig.height)}px`,
                      }}
                      className={`absolute pointer-events-auto cursor-move ${
                        isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''
                      }`}
                    >
                      <img
                        src={sig.dataUrl}
                        alt="Signature"
                        className="w-full h-full object-contain pointer-events-none"
                      />
                      {isSelected && (
                        <div
                          onMouseDown={(e) => handleResizeMouseDown(e, 'signature', sig.id)}
                          className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full cursor-nwse-resize"
                        />
                      )}
                    </div>
                  );
                })}

                {/* 8. Stamps */}
                {curPageData.stamps.map((st) => {
                  const isSelected = selectedObj?.id === st.id;
                  return (
                    <div
                      key={st.id}
                      onMouseDown={(e) => handleObjectMouseDown(e, 'stamp', st.id)}
                      style={{
                        left: `${toPx(st.x)}px`,
                        top: `${toPx(st.y)}px`,
                        width: `${toPx(st.width)}px`,
                        height: `${toPx(st.height)}px`,
                        transform: `rotate(${st.rotation || -12}deg)`,
                        borderColor: st.color || '#16a34a',
                        color: st.color || '#16a34a',
                      }}
                      className={`absolute pointer-events-auto cursor-move border-3 border-dashed rounded-lg flex items-center justify-center font-black tracking-widest uppercase select-none transition-transform ${
                        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
                      }`}
                    >
                      <span className="text-base sm:text-lg">{st.text}</span>
                      {isSelected && (
                        <div
                          onMouseDown={(e) => handleResizeMouseDown(e, 'stamp', st.id)}
                          className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full cursor-nwse-resize"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      <SignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onSave={handleSaveSignature}
      />
    </div>
  );
}
