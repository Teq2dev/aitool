'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateGst } from '@/lib/calculators/financeUtils';

export default function GstCalculator() {
  const idPrefix = useId();

  const [amount, setAmount] = useState('1000');
  const [gstRate, setGstRate] = useState('18');
  const [mode, setMode] = useState('exclusive'); // 'exclusive' (add GST) | 'inclusive' (remove GST)

  const [result, setResult] = useState(() =>
    calculateGst({ amount: 1000, gstRate: 18, mode: 'exclusive' })
  );

  const handleCalculate = () => {
    const res = calculateGst({ amount, gstRate, mode });
    setResult(res);
  };

  const handleReset = () => {
    setAmount('');
    setGstRate('18');
    setResult(null);
  };

  const standardRates = ['5', '12', '18', '28'];

  const formatNum = (val) =>
    Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorShell title="Goods & Services Tax (GST) Calculator" badge="Tax Invoice Tool">
      {/* Mode Switcher */}
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => {
            setMode('exclusive');
            setResult(calculateGst({ amount: amount || 1000, gstRate, mode: 'exclusive' }));
          }}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'exclusive'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          GST Exclusive (Add Tax to Base)
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('inclusive');
            setResult(calculateGst({ amount: amount || 1180, gstRate, mode: 'inclusive' }));
          }}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'inclusive'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          GST Inclusive (Extract Tax from Gross)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalculatorInput
          id={`${idPrefix}-amount`}
          label={mode === 'exclusive' ? 'Net Base Amount' : 'Gross Total Amount (with Tax)'}
          value={amount}
          onChange={(val) => {
            setAmount(val);
            if (val && gstRate) {
              setResult(calculateGst({ amount: val, gstRate, mode }));
            }
          }}
          placeholder="e.g. 1000"
          required
        />

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            GST Tax Slab Rate
          </label>
          <div className="flex gap-1.5 mb-2">
            {standardRates.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setGstRate(r);
                  if (amount) {
                    setResult(calculateGst({ amount, gstRate: r, mode }));
                  }
                }}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  gstRate === r
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {r}%
              </button>
            ))}
          </div>
          <CalculatorInput
            id={`${idPrefix}-custom-rate`}
            value={gstRate}
            onChange={(val) => {
              setGstRate(val);
              if (amount && val) {
                setResult(calculateGst({ amount, gstRate: val, mode }));
              }
            }}
            suffix="%"
            placeholder="Custom rate %"
          />
        </div>
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel={mode === 'exclusive' ? 'Total Invoice Amount (Gross)' : 'Net Base Amount (Pre-Tax)'}
          primaryValue={formatNum(mode === 'exclusive' ? result.totalAmount : result.baseAmount)}
          copyValue={formatNum(mode === 'exclusive' ? result.totalAmount : result.baseAmount)}
          secondaryItems={[
            {
              label: 'Total GST Charged',
              value: formatNum(result.gstAmount),
              color: 'text-blue-600 font-bold'
            },
            {
              label: `CGST (${result.rate / 2}%)`,
              value: formatNum(result.cgst)
            },
            {
              label: `SGST (${result.rate / 2}%)`,
              value: formatNum(result.sgst)
            },
            {
              label: mode === 'exclusive' ? 'Original Net Base Amount' : 'Calculated Pre-Tax Amount',
              value: formatNum(result.baseAmount)
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
