'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PenTool, Type, Upload, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SignatureModal({ isOpen, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState('draw'); // 'draw' | 'type' | 'upload'
  const [typedName, setTypedName] = useState('');
  const [selectedFont, setSelectedFont] = useState('cursive-1');
  const [sigColor, setSigColor] = useState('#0f172a');
  const [uploadedImage, setUploadedImage] = useState(null);

  const drawCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Clear draw canvas
  const handleClearCanvas = () => {
    if (!drawCanvasRef.current) return;
    const canvas = drawCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (isOpen && activeTab === 'draw') {
      setTimeout(() => {
        handleClearCanvas();
      }, 50);
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  // Drawing event handlers
  const getCanvasPos = (e) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const handleStartDraw = (e) => {
    e.preventDefault();
    isDrawingRef.current = true;
    const pos = getCanvasPos(e);
    lastPosRef.current = pos;
  };

  const handleDrawMove = (e) => {
    if (!isDrawingRef.current || !drawCanvasRef.current) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    const ctx = drawCanvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = sigColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    lastPosRef.current = pos;
  };

  const handleEndDraw = (e) => {
    if (e) e.preventDefault();
    isDrawingRef.current = false;
  };

  // Handle image upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate PNG Data URL and save
  const handleConfirm = () => {
    if (activeTab === 'draw') {
      const canvas = drawCanvasRef.current;
      if (!canvas) return;
      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
    } else if (activeTab === 'type') {
      if (!typedName.trim()) return;
      const canvas = document.createElement('canvas');
      canvas.width = 450;
      canvas.height = 140;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = sigColor;
      let fontStyle = "italic 44px 'Brush Script MT', 'Dancing Script', cursive";
      if (selectedFont === 'cursive-2') {
        fontStyle = "italic 38px 'Segoe Script', 'Lucida Handwriting', cursive";
      } else if (selectedFont === 'cursive-3') {
        fontStyle = "italic 40px 'Caveat', 'Great Vibes', cursive";
      }
      ctx.font = fontStyle;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(typedName.trim(), canvas.width / 2, canvas.height / 2);

      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
    } else if (activeTab === 'upload') {
      if (!uploadedImage) return;
      onSave(uploadedImage);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <PenTool className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Create Signature</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center border-b border-slate-200 bg-slate-100/60 p-1.5 gap-1.5 mx-6 mt-4 rounded-xl">
          <button
            onClick={() => setActiveTab('draw')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'draw'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            Draw
          </button>
          <button
            onClick={() => setActiveTab('type')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'type'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            Type
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {activeTab === 'draw' && (
            <div className="space-y-4">
              <div className="relative border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden">
                <canvas
                  ref={drawCanvasRef}
                  width={450}
                  height={160}
                  onMouseDown={handleStartDraw}
                  onMouseMove={handleDrawMove}
                  onMouseUp={handleEndDraw}
                  onMouseLeave={handleEndDraw}
                  onTouchStart={handleStartDraw}
                  onTouchMove={handleDrawMove}
                  onTouchEnd={handleEndDraw}
                  className="w-full h-40 bg-white cursor-crosshair touch-none block"
                />
                <button
                  type="button"
                  onClick={handleClearCanvas}
                  className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-500 bg-white/90 hover:bg-slate-100 hover:text-rose-600 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              </div>

              {/* Color options */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Pen Ink:</span>
                <div className="flex items-center gap-2">
                  {['#0f172a', '#1e40af', '#047857', '#b91c1c'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSigColor(c)}
                      className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                        sigColor === c ? 'scale-125 ring-2 ring-blue-500 ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'type' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Type Your Name
                </label>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="e.g. Priyanka Garg"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Style options */}
              <div className="space-y-2">
                <span className="text-xs text-slate-500 font-medium">Choose Script Style:</span>
                {[
                  { id: 'cursive-1', label: 'Classic Script', font: "'Brush Script MT', 'Dancing Script', cursive" },
                  { id: 'cursive-2', label: 'Modern Elegant', font: "'Segoe Script', 'Lucida Handwriting', cursive" },
                  { id: 'cursive-3', label: 'Artistic Freehand', font: "'Caveat', 'Great Vibes', cursive" },
                ].map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setSelectedFont(st.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedFont === st.id
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span
                      style={{ fontFamily: st.font, color: sigColor }}
                      className="text-2xl italic tracking-wide"
                    >
                      {typedName.trim() || 'Signature Preview'}
                    </span>
                    {selectedFont === st.id && (
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Color options */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500 font-medium">Ink Color:</span>
                <div className="flex items-center gap-2">
                  {['#0f172a', '#1e40af', '#047857', '#b91c1c'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSigColor(c)}
                      className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                        sigColor === c ? 'scale-125 ring-2 ring-blue-500 ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50/50">
                {uploadedImage ? (
                  <div className="space-y-3">
                    <img
                      src={uploadedImage}
                      alt="Uploaded Signature"
                      className="max-h-28 mx-auto object-contain bg-white border border-slate-200 rounded-lg p-2"
                    />
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="text-xs text-rose-600 font-semibold hover:underline cursor-pointer"
                    >
                      Remove & Choose Another
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-700 mb-1">
                      Upload an image of your signature
                    </p>
                    <p className="text-xs text-slate-400 mb-3">PNG, JPG, or SVG supported</p>
                    <label className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs text-slate-600 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl px-4 cursor-pointer"
          >
            Apply Signature
          </Button>
        </div>
      </div>
    </div>
  );
}
