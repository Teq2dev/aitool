'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateDateDifference, addOrSubtractDays } from '@/lib/calculators/dateUtils';

export default function DateCalculator() {
  const idPrefix = useId();
  const todayStr = new Date().toISOString().split('T')[0];

  const [mode, setMode] = useState('diff'); // 'diff' | 'add_sub'

  // Diff Mode
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [includeEndDay, setIncludeEndDay] = useState(false);

  // Add/Subtract Mode
  const [baseDate, setBaseDate] = useState(todayStr);
  const [amount, setAmount] = useState('30');
  const [unit, setUnit] = useState('days'); // 'days' | 'weeks' | 'months' | 'years'
  const [operation, setOperation] = useState('add'); // 'add' | 'subtract'

  const [result, setResult] = useState(() =>
    calculateDateDifference(todayStr, new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0], false)
  );

  const handleCalculate = () => {
    if (mode === 'diff') {
      setResult(calculateDateDifference(startDate, endDate, includeEndDay));
    } else {
      setResult(addOrSubtractDays(baseDate, amount, unit, operation));
    }
  };

  const handleReset = () => {
    if (mode === 'diff') {
      setStartDate(todayStr);
      setEndDate(todayStr);
    } else {
      setBaseDate(todayStr);
      setAmount('30');
    }
    setResult(null);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'diff') {
      setResult(calculateDateDifference(startDate, endDate, includeEndDay));
    } else {
      setResult(addOrSubtractDays(baseDate, amount, unit, operation));
    }
  };

  return (
    <CalculatorShell title="Date & Calendar Duration Calculator" badge="Calendar Precision">
      {/* Mode Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => handleModeChange('diff')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'diff'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Days Between Dates
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('add_sub')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'add_sub'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Add / Subtract from Date
        </button>
      </div>

      {mode === 'diff' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalculatorInput
              id={`${idPrefix}-start`}
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(val) => {
                setStartDate(val);
                if (val && endDate) setResult(calculateDateDifference(val, endDate, includeEndDay));
              }}
              required
            />
            <CalculatorInput
              id={`${idPrefix}-end`}
              label="End Date"
              type="date"
              value={endDate}
              onChange={(val) => {
                setEndDate(val);
                if (startDate && val) setResult(calculateDateDifference(startDate, val, includeEndDay));
              }}
              required
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              id={`${idPrefix}-inc`}
              type="checkbox"
              checked={includeEndDay}
              onChange={(e) => {
                setIncludeEndDay(e.target.checked);
                if (startDate && endDate) setResult(calculateDateDifference(startDate, endDate, e.target.checked));
              }}
              className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor={`${idPrefix}-inc`} className="text-xs sm:text-sm text-slate-700 cursor-pointer">
              Include end date in calculation (add 1 day)
            </label>
          </div>
        </div>
      )}

      {mode === 'add_sub' && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <CalculatorInput
            id={`${idPrefix}-base`}
            label="Starting Date"
            type="date"
            value={baseDate}
            onChange={(val) => setBaseDate(val)}
            required
          />
          <CalculatorSelect
            id={`${idPrefix}-subop`}
            label="Operation"
            value={operation}
            onChange={(val) => setOperation(val)}
            options={[
              { value: 'add', label: '+ Add to Date' },
              { value: 'subtract', label: '− Subtract from Date' }
            ]}
          />
          <CalculatorInput
            id={`${idPrefix}-count`}
            label="Amount"
            value={amount}
            onChange={(val) => setAmount(val)}
            placeholder="e.g. 30"
            required
          />
          <CalculatorSelect
            id={`${idPrefix}-unit`}
            label="Unit"
            value={unit}
            onChange={(val) => setUnit(val)}
            options={[
              { value: 'days', label: 'Days' },
              { value: 'weeks', label: 'Weeks' },
              { value: 'months', label: 'Months' },
              { value: 'years', label: 'Years' }
            ]}
          />
        </div>
      )}

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && mode === 'diff' && (
        <CalculatorResultCard
          primaryLabel="Total Calendar Days Between Dates"
          primaryValue={`${result.totalDays} Days`}
          copyValue={`${result.totalDays} days (${result.weeks} weeks and ${result.remainingDays} days)`}
          secondaryItems={[
            {
              label: 'Weeks & Days Breakdown',
              value: `${result.weeks} wks, ${result.remainingDays} days`
            },
            {
              label: 'Business Days (Mon-Fri)',
              value: `${result.businessDays} working days`,
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Weekend Days',
              value: `${result.weekendDays} days`
            }
          ]}
        />
      )}

      {result && mode === 'add_sub' && (
        <CalculatorResultCard
          primaryLabel="Calculated Target Date"
          primaryValue={result.formatted}
          copyValue={result.formatted}
          secondaryItems={[
            { label: 'ISO Format', value: result.resultDate }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
