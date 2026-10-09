'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import {
  calculatePercentOf,
  calculateWhatPercentOf,
  calculatePercentChange,
  calculatePercentDifference
} from '@/lib/calculators/mathUtils';

export default function PercentageCalculator() {
  const idPrefix = useId();
  const [activeTab, setActiveTab] = useState('percent_of'); // 'percent_of', 'what_percent', 'change', 'diff'

  // Tab 1: What is X% of Y?
  const [t1Percent, setT1Percent] = useState('20');
  const [t1Total, setT1Total] = useState('150');

  // Tab 2: X is what % of Y?
  const [t2Part, setT2Part] = useState('30');
  const [t2Whole, setT2Whole] = useState('150');

  // Tab 3: % Change from V1 to V2
  const [t3V1, setT3V1] = useState('100');
  const [t3V2, setT3V2] = useState('135');

  // Tab 4: % Difference between V1 and V2
  const [t4V1, setT4V1] = useState('80');
  const [t4V2, setT4V2] = useState('100');

  const [result, setResult] = useState(() => calculatePercentOf(20, 150));

  const handleCalculate = () => {
    if (activeTab === 'percent_of') {
      setResult(calculatePercentOf(t1Percent, t1Total));
    } else if (activeTab === 'what_percent') {
      setResult(calculateWhatPercentOf(t2Part, t2Whole));
    } else if (activeTab === 'change') {
      setResult(calculatePercentChange(t3V1, t3V2));
    } else if (activeTab === 'diff') {
      setResult(calculatePercentDifference(t4V1, t4V2));
    }
  };

  const handleReset = () => {
    if (activeTab === 'percent_of') {
      setT1Percent('');
      setT1Total('');
    } else if (activeTab === 'what_percent') {
      setT2Part('');
      setT2Whole('');
    } else if (activeTab === 'change') {
      setT3V1('');
      setT3V2('');
    } else if (activeTab === 'diff') {
      setT4V1('');
      setT4V2('');
    }
    setResult(null);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'percent_of') {
      setResult(calculatePercentOf(t1Percent || 20, t1Total || 150));
    } else if (tab === 'what_percent') {
      setResult(calculateWhatPercentOf(t2Part || 30, t2Whole || 150));
    } else if (tab === 'change') {
      setResult(calculatePercentChange(t3V1 || 100, t3V2 || 135));
    } else if (tab === 'diff') {
      setResult(calculatePercentDifference(t4V1 || 80, t4V2 || 100));
    }
  };

  return (
    <CalculatorShell title="Percentage Calculator" badge="Instant Math">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-3">
        {[
          { id: 'percent_of', label: 'X% of Y' },
          { id: 'what_percent', label: 'X is what % of Y' },
          { id: 'change', label: '% Increase / Decrease' },
          { id: 'diff', label: '% Difference' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => switchTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mode 1: What is X% of Y? */}
      {activeTab === 'percent_of' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalculatorInput
              id={`${idPrefix}-t1-p`}
              label="Percentage (X)"
              value={t1Percent}
              onChange={(val) => {
                setT1Percent(val);
                setResult(calculatePercentOf(val, t1Total));
              }}
              suffix="%"
              placeholder="e.g. 20"
            />
            <CalculatorInput
              id={`${idPrefix}-t1-tot`}
              label="Total Value (Y)"
              value={t1Total}
              onChange={(val) => {
                setT1Total(val);
                setResult(calculatePercentOf(t1Percent, val));
              }}
              placeholder="e.g. 150"
            />
          </div>
        </div>
      )}

      {/* Mode 2: X is what % of Y? */}
      {activeTab === 'what_percent' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalculatorInput
              id={`${idPrefix}-t2-part`}
              label="Part (X)"
              value={t2Part}
              onChange={(val) => {
                setT2Part(val);
                setResult(calculateWhatPercentOf(val, t2Whole));
              }}
              placeholder="e.g. 30"
            />
            <CalculatorInput
              id={`${idPrefix}-t2-whole`}
              label="Whole (Y)"
              value={t2Whole}
              onChange={(val) => {
                setT2Whole(val);
                setResult(calculateWhatPercentOf(t2Part, val));
              }}
              placeholder="e.g. 150"
            />
          </div>
        </div>
      )}

      {/* Mode 3: Percentage Increase / Decrease */}
      {activeTab === 'change' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalculatorInput
              id={`${idPrefix}-t3-v1`}
              label="Starting Value (Old)"
              value={t3V1}
              onChange={(val) => {
                setT3V1(val);
                setResult(calculatePercentChange(val, t3V2));
              }}
              placeholder="e.g. 100"
            />
            <CalculatorInput
              id={`${idPrefix}-t3-v2`}
              label="Ending Value (New)"
              value={t3V2}
              onChange={(val) => {
                setT3V2(val);
                setResult(calculatePercentChange(t3V1, val));
              }}
              placeholder="e.g. 135"
            />
          </div>
        </div>
      )}

      {/* Mode 4: Percentage Difference */}
      {activeTab === 'diff' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalculatorInput
              id={`${idPrefix}-t4-v1`}
              label="Value 1"
              value={t4V1}
              onChange={(val) => {
                setT4V1(val);
                setResult(calculatePercentDifference(val, t4V2));
              }}
              placeholder="e.g. 80"
            />
            <CalculatorInput
              id={`${idPrefix}-t4-v2`}
              label="Value 2"
              value={t4V2}
              onChange={(val) => {
                setT4V2(val);
                setResult(calculatePercentDifference(t4V1, val));
              }}
              placeholder="e.g. 100"
            />
          </div>
        </div>
      )}

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {/* Result Card */}
      {result && (
        <CalculatorResultCard
          primaryLabel={
            activeTab === 'percent_of'
              ? `${t1Percent || 0}% of ${t1Total || 0}`
              : activeTab === 'what_percent'
              ? `${t2Part || 0} as a percent of ${t2Whole || 0}`
              : activeTab === 'change'
              ? `Percentage ${result.type}`
              : 'Percentage Difference'
          }
          primaryValue={
            activeTab === 'percent_of'
              ? result.formatted
              : activeTab === 'what_percent'
              ? result.formatted
              : activeTab === 'change'
              ? result.formatted
              : result.formatted
          }
          formulaUsed={result.formula}
          secondaryItems={
            activeTab === 'change'
              ? [
                  { label: 'Absolute Difference', value: Math.abs(result.difference) },
                  { label: 'Direction', value: result.isIncrease ? 'Increase (+)' : 'Decrease (-)' }
                ]
              : []
          }
        />
      )}
    </CalculatorShell>
  );
}
