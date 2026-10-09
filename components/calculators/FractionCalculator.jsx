'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateFractions } from '@/lib/calculators/mathUtils';

export default function FractionCalculator() {
  const idPrefix = useId();

  const [n1, setN1] = useState('3');
  const [d1, setD1] = useState('4');
  const [operation, setOperation] = useState('add'); // 'add', 'subtract', 'multiply', 'divide'
  const [n2, setN2] = useState('2');
  const [d2, setD2] = useState('3');

  const [error, setError] = useState('');
  const [result, setResult] = useState(() => calculateFractions(3, 4, 2, 3, 'add'));

  const handleCalculate = () => {
    setError('');
    if (Number(d1) === 0 || Number(d2) === 0) {
      setError('Denominator cannot be zero.');
      setResult(null);
      return;
    }
    if (operation === 'divide' && Number(n2) === 0) {
      setError('Cannot divide by a fraction with numerator zero.');
      setResult(null);
      return;
    }

    const res = calculateFractions(n1, d1, n2, d2, operation);
    if (!res) {
      setError('Invalid fraction numbers entered.');
      setResult(null);
    } else {
      setResult(res);
    }
  };

  const handleReset = () => {
    setN1('');
    setD1('');
    setN2('');
    setD2('');
    setError('');
    setResult(null);
  };

  return (
    <CalculatorShell title="Fraction Arithmetic Calculator" badge="Step-by-Step Reduction">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
        {/* Fraction 1 */}
        <div className="sm:col-span-2 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
            First Fraction
          </span>
          <CalculatorInput
            id={`${idPrefix}-n1`}
            label="Numerator"
            value={n1}
            onChange={(val) => {
              setN1(val);
              setError('');
            }}
            placeholder="e.g. 3"
          />
          <div className="h-0.5 bg-slate-300 w-full rounded" />
          <CalculatorInput
            id={`${idPrefix}-d1`}
            label="Denominator"
            value={d1}
            onChange={(val) => {
              setD1(val);
              setError('');
            }}
            placeholder="e.g. 4"
          />
        </div>

        {/* Operation Selector */}
        <div className="sm:col-span-1 flex flex-col justify-center">
          <CalculatorSelect
            id={`${idPrefix}-op`}
            label="Operation"
            value={operation}
            onChange={(val) => {
              setOperation(val);
              setError('');
            }}
            options={[
              { value: 'add', label: '+ (Add)' },
              { value: 'subtract', label: '− (Subtract)' },
              { value: 'multiply', label: '× (Multiply)' },
              { value: 'divide', label: '÷ (Divide)' }
            ]}
          />
        </div>

        {/* Fraction 2 */}
        <div className="sm:col-span-2 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
            Second Fraction
          </span>
          <CalculatorInput
            id={`${idPrefix}-n2`}
            label="Numerator"
            value={n2}
            onChange={(val) => {
              setN2(val);
              setError('');
            }}
            placeholder="e.g. 2"
          />
          <div className="h-0.5 bg-slate-300 w-full rounded" />
          <CalculatorInput
            id={`${idPrefix}-d2`}
            label="Denominator"
            value={d2}
            onChange={(val) => {
              setD2(val);
              setError('');
            }}
            placeholder="e.g. 3"
          />
        </div>
      </div>

      {error && (
        <p className="text-xs font-semibold text-rose-600 mt-3">{error}</p>
      )}

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Simplified Result Fraction"
          primaryValue={result.fractionString}
          secondaryItems={[
            {
              label: 'Mixed Number',
              value: result.mixed || 'N/A (Proper Fraction)',
              color: 'text-blue-600'
            },
            { label: 'Decimal Equivalent', value: result.decimal },
            {
              label: 'Fraction Type',
              value: result.isImproper ? 'Improper (> 1)' : 'Proper (< 1)'
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
