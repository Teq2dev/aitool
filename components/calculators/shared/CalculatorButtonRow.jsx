import { RotateCcw, Calculator } from 'lucide-react';

export default function CalculatorButtonRow({
  onCalculate,
  onReset,
  calculateText = 'Calculate',
  resetText = 'Reset',
  disabled = false,
  className = ''
}) {
  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 ${className}`}>
      {onCalculate && (
        <button
          type="button"
          onClick={onCalculate}
          disabled={disabled}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Calculator className="w-4 h-4" />
          <span>{calculateText}</span>
        </button>
      )}

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>{resetText}</span>
        </button>
      )}
    </div>
  );
}
