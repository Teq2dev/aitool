'use client';

import { useState } from 'react';
import { Sliders, Sparkles, ChevronDown, ChevronUp, Check, Info } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const PRESETS = [
  {
    id: 'low',
    label: 'Best Quality',
    quality: 88,
    badge: 'Near-Lossless',
    desc: 'Retains 99% original detail with light size reduction',
  },
  {
    id: 'medium',
    label: 'Balanced',
    quality: 80,
    badge: 'Standard',
    desc: 'TinyPNG-grade optimization — 40–60% size cut with zero visible loss',
  },
  {
    id: 'high',
    label: 'Max Compression',
    quality: 68,
    badge: 'Recommended',
    desc: 'Maximum file reduction for high-speed web and mobile delivery',
    isDefault: true,
  },
];

export default function CompressionControls({
  quality,
  onQualityChange,
  outputMime,
  onOutputMimeChange,
  showFormatSelector = false,
  availableFormats = [],
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const activePreset = PRESETS.find((p) => {
    if (quality >= 85) return p.id === 'low';
    if (quality >= 75) return p.id === 'medium';
    return p.id === 'high';
  });

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 md:p-6 shadow-xs space-y-5 transition-all">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Compression Engine</h3>
            <p className="text-xs text-slate-500">Fine-tune compression ratio vs visual quality</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Target Quality:</span>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200/60 font-mono">
            {quality}%
          </span>
        </div>
      </div>

      {/* Modern Segmented Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Compression Preset</span>
          {activePreset && (
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              {activePreset.desc}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60">
          {PRESETS.map((preset) => {
            const isSelected = activePreset?.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onQualityChange(preset.quality)}
                className={cn(
                  'relative flex flex-col items-start p-3 rounded-xl transition-all duration-200 cursor-pointer select-none text-left',
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 ring-2 ring-blue-600/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                )}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-sm font-bold flex items-center gap-1.5">
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
                    {preset.label}
                  </span>
                  {preset.isDefault ? (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-md shadow-2xs">
                      <Sparkles className="w-2.5 h-2.5" />
                      Default
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                      {preset.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 leading-tight">
                  {preset.desc.split('—')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Output Format Picker (if enabled) */}
      {showFormatSelector && availableFormats.length > 0 && (
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Output Format</span>
          <div className="flex flex-wrap gap-2">
            {availableFormats.map((fmt) => {
              const isSelected = outputMime === fmt.mime;
              return (
                <button
                  key={fmt.mime ?? 'auto'}
                  type="button"
                  onClick={() => onOutputMimeChange(fmt.mime)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border',
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
                  )}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Advanced Precision Slider */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {showAdvanced ? 'Hide custom quality slider' : 'Custom quality slider (manual precision)'}
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
              <span>Higher Compression</span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-900 shadow-2xs">
                {quality}% Quality
              </span>
              <span>Maximum Fidelity</span>
            </div>
            <Slider
              min={15}
              max={100}
              step={1}
              value={[quality]}
              onValueChange={([v]) => onQualityChange(v)}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>30%</span>
              <span>50%</span>
              <span>80% (Sweet spot)</span>
              <span>90%</span>
              <span>100%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
