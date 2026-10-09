'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { simplifyRatio, solveProportion } from '@/lib/calculators/mathUtils';

export default function RatioCalculator() {
  const idPrefix = useId();
  const [mode, setMode] = useState('simplify'); // 'simplify' | 'proportion'

  // Mode 1: Simplify A : B
  const [simA, setSimA] = useState('12');
  const [simB, setSimB] = useState('18');

  // Mode 2: Proportion A : B = C : D
  const [propA, setPropA] = useState('4');
  const [propB, setPropB] = useState('5');
  const [propC, setPropC] = useState('');
  const [propD, setPropD] = useState('25');

  const [result, setResult] = useState(() => simplifyRatio(12, 18));

  const handleCalculate = () => {
    if (mode === 'simplify') {
      setResult(simplifyRatio(simA, simB));
    } else {
      setResult(solveProportion(propA, propB, propC, propD));
    }
  };

  const handleReset = () => {
    if (mode === 'simplify') {
      setSimA('');
      setSimB('');
    } else {
      setPropA('');
      setPropB('');
      setPropC('');
      setPropD('');
    }
    setResult(null);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'simplify') {
      setResult(simplifyRatio(simA || 12, simB || 18));
    } else {
      setResult(solveProportion(propA || 4, propB || 5, propC || '', propD || 25));
    }
  };

  return (
    <CalculatorShell title="Ratio & Proportion Calculator" badge="Algebraic Reducer">
      {/* Mode Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => handleModeChange('simplify')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'simplify'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Simplify Ratio (A : B)
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('proportion')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'proportion'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Solve Proportion (A : B = C : D)
        </button>
      </div>

      {mode === 'simplify' && (
        <div className="grid grid-cols-2 gap-4">
          <CalculatorInput
            id={`${idPrefix}-sim-a`}
            label="Value A"
            value={simA}
            onChange={(val) => {
              setSimA(val);
              setResult(simplifyRatio(val, simB));
            }}
            placeholder="e.g. 12"
          />
          <CalculatorInput
            id={`${idPrefix}-sim-b`}
            label="Value B"
            value={simB}
            onChange={(val) => {
              setSimB(val);
              setResult(simplifyRatio(simA, val));
            }}
            placeholder="e.g. 18"
          />
        </div>
      )}

      {mode === 'proportion' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 mb-2">
            Leave any <strong>one</strong> field blank to solve for the missing term:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-center">
            <CalculatorInput
              id={`${idPrefix}-p-a`}
              label="A"
              value={propA}
              onChange={(val) => setPropA(val)}
              placeholder="e.g. 4"
            />
            <CalculatorInput
              id={`${idPrefix}-p-b`}
              label="B"
              value={propB}
              onChange={(val) => setPropB(val)}
              placeholder="e.g. 5"
            />
            <CalculatorInput
              id={`${idPrefix}-p-c`}
              label="C (leave blank to solve)"
              value={propC}
              onChange={(val) => setPropC(val)}
              placeholder="Solve for C"
            />
            <CalculatorInput
              id={`${idPrefix}-p-d`}
              label="D"
              value={propD}
              onChange={(val) => setPropD(val)}
              placeholder="e.g. 25"
            />
          </div>
        </div>
      )}

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && mode === 'simplify' && (
        <CalculatorResultCard
          primaryLabel="Simplified Integer Ratio"
          primaryValue={result.simplifiedString}
          secondaryItems={[
            { label: 'Decimal Equivalent', value: result.decimal },
            { label: 'Greatest Common Divisor (GCD)', value: result.divisor }
          ]}
        />
      )}

      {result && mode === 'proportion' && (
        <CalculatorResultCard
          primaryLabel={`Solved Value for Variable ${result.missingVar}`}
          primaryValue={result.formatted}
          note={`Full Equivalent Proportion: ${result.missingVar === 'A' ? result.formatted : propA} : ${result.missingVar === 'B' ? result.formatted : propB} = ${result.missingVar === 'C' ? result.formatted : propC} : ${result.missingVar === 'D' ? result.formatted : propD}`}
        />
      )}
    </CalculatorShell>
  );
}
