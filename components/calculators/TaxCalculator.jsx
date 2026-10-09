'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateTax } from '@/lib/calculators/financeUtils';

export default function TaxCalculator() {
  const idPrefix = useId();

  const [income, setIncome] = useState('75000');
  const [deductions, setDeductions] = useState('14600'); // Standard deduction reference

  const [result, setResult] = useState(() =>
    calculateTax({ income: 75000, deductions: 14600 })
  );

  const handleCalculate = () => {
    const res = calculateTax({ income, deductions });
    setResult(res);
  };

  const handleReset = () => {
    setIncome('');
    setDeductions('');
    setResult(null);
  };

  const formatNum = (val) =>
    Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorShell title="Income Tax Estimator" badge="Progressive Tax Brackets">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalculatorInput
          id={`${idPrefix}-income`}
          label="Gross Annual Income"
          value={income}
          onChange={(val) => {
            setIncome(val);
            if (val) {
              setResult(calculateTax({ income: val, deductions }));
            }
          }}
          placeholder="e.g. 75000"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-deductions`}
          label="Allowable Deductions / Exemptions"
          value={deductions}
          onChange={(val) => {
            setDeductions(val);
            if (income) {
              setResult(calculateTax({ income, deductions: val }));
            }
          }}
          placeholder="e.g. 14600"
          helperText="Reference: Standard individual deduction"
        />
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Estimated Annual Take-Home Income"
          primaryValue={formatNum(result.afterTaxIncome)}
          copyValue={formatNum(result.afterTaxIncome)}
          note="Educational estimate only: Calculations do not constitute certified tax, legal, or accounting advice. FICA, state, and provincial taxes are not included."
          secondaryItems={[
            {
              label: 'Estimated Annual Tax',
              value: formatNum(result.estimatedTax),
              color: 'text-rose-600 font-bold'
            },
            {
              label: 'Effective Tax Rate',
              value: `${result.effectiveRate}%`
            },
            {
              label: 'Net Monthly Take-Home',
              value: formatNum(result.monthlyTakeHome),
              color: 'text-emerald-600 font-bold'
            },
            {
              label: 'Net Taxable Income',
              value: formatNum(result.taxableIncome)
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
