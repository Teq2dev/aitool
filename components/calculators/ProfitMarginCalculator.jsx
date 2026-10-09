'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateProfitMargin } from '@/lib/calculators/financeUtils';

export default function ProfitMarginCalculator() {
  const idPrefix = useId();

  const [cost, setCost] = useState('50');
  const [revenue, setRevenue] = useState('80');

  const [result, setResult] = useState(() =>
    calculateProfitMargin({ cost: 50, revenue: 80 })
  );

  const handleCalculate = () => {
    const res = calculateProfitMargin({ cost, revenue });
    setResult(res);
  };

  const handleReset = () => {
    setCost('');
    setRevenue('');
    setResult(null);
  };

  const formatNum = (val) =>
    Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorShell title="Profit Margin & Markup Calculator" badge="Business & E-Commerce">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalculatorInput
          id={`${idPrefix}-cost`}
          label="Cost of Goods Sold (COGS)"
          value={cost}
          onChange={(val) => {
            setCost(val);
            if (val && revenue) {
              setResult(calculateProfitMargin({ cost: val, revenue }));
            }
          }}
          placeholder="e.g. 50"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-rev`}
          label="Selling Price (Revenue)"
          value={revenue}
          onChange={(val) => {
            setRevenue(val);
            if (cost && val) {
              setResult(calculateProfitMargin({ cost, revenue: val }));
            }
          }}
          placeholder="e.g. 80"
          required
        />
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Gross Profit Margin"
          primaryValue={`${result.profitMargin}%`}
          copyValue={`${result.profitMargin}% margin, ${result.markup}% markup`}
          secondaryItems={[
            {
              label: 'Gross Profit per Unit',
              value: formatNum(result.grossProfit),
              color: result.isProfitable ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'
            },
            {
              label: 'Required Markup',
              value: `${result.markup}%`,
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Status',
              value: result.isProfitable ? 'Profitable' : 'Loss-Making'
            }
          ]}
          note="Key Difference: Margin is profit divided by revenue. Markup is profit divided by cost."
        />
      )}
    </CalculatorShell>
  );
}
