'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateSimpleInterest } from '@/lib/calculators/financeUtils';

export default function SimpleInterestCalculator() {
  const idPrefix = useId();

  const [principal, setPrincipal] = useState('5000');
  const [rate, setRate] = useState('5.5');
  const [timeYears, setTimeYears] = useState('3');

  const [result, setResult] = useState(() =>
    calculateSimpleInterest({ principal: 5000, annualRate: 5.5, timeYears: 3 })
  );

  const handleCalculate = () => {
    const res = calculateSimpleInterest({ principal, annualRate: rate, timeYears });
    setResult(res);
  };

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTimeYears('');
    setResult(null);
  };

  const formatNum = (val) =>
    Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorShell title="Simple Interest Calculator" badge="Linear Fixed Returns">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalculatorInput
          id={`${idPrefix}-principal`}
          label="Principal Amount"
          value={principal}
          onChange={(val) => {
            setPrincipal(val);
            if (val && rate && timeYears) {
              setResult(calculateSimpleInterest({ principal: val, annualRate: rate, timeYears }));
            }
          }}
          placeholder="e.g. 5000"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-rate`}
          label="Annual Interest Rate"
          suffix="%"
          value={rate}
          onChange={(val) => {
            setRate(val);
            if (principal && val && timeYears) {
              setResult(calculateSimpleInterest({ principal, annualRate: val, timeYears }));
            }
          }}
          placeholder="e.g. 5.5"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-time`}
          label="Time Period"
          suffix="years"
          value={timeYears}
          onChange={(val) => {
            setTimeYears(val);
            if (principal && rate && val) {
              setResult(calculateSimpleInterest({ principal, annualRate: rate, timeYears: val }));
            }
          }}
          placeholder="e.g. 3"
          required
        />
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Total Simple Interest Earned"
          primaryValue={formatNum(result.interest)}
          copyValue={formatNum(result.interest)}
          formulaUsed={result.formula}
          secondaryItems={[
            {
              label: 'Total Maturity Amount (P + I)',
              value: formatNum(result.totalAmount),
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Original Principal',
              value: formatNum(result.principal)
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
