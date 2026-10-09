'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateDiscount } from '@/lib/calculators/financeUtils';

export default function DiscountCalculator() {
  const idPrefix = useId();

  const [originalPrice, setOriginalPrice] = useState('100');
  const [discountPercent, setDiscountPercent] = useState('25');
  const [taxRate, setTaxRate] = useState('0');

  const [result, setResult] = useState(() =>
    calculateDiscount({ originalPrice: 100, discountPercent: 25, taxRate: 0 })
  );

  const handleCalculate = () => {
    const res = calculateDiscount({ originalPrice, discountPercent, taxRate });
    setResult(res);
  };

  const handleReset = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setTaxRate('0');
    setResult(null);
  };

  const formatNum = (val) =>
    Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorShell title="Discount & Sale Price Calculator" badge="Retail Savings">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalculatorInput
          id={`${idPrefix}-price`}
          label="Original Price"
          value={originalPrice}
          onChange={(val) => {
            setOriginalPrice(val);
            if (val && discountPercent) {
              setResult(calculateDiscount({ originalPrice: val, discountPercent, taxRate }));
            }
          }}
          placeholder="e.g. 100"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-discount`}
          label="Discount Percentage"
          suffix="%"
          value={discountPercent}
          onChange={(val) => {
            setDiscountPercent(val);
            if (originalPrice && val) {
              setResult(calculateDiscount({ originalPrice, discountPercent: val, taxRate }));
            }
          }}
          placeholder="e.g. 25"
          min="0"
          max="100"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-tax`}
          label="Sales Tax (Optional)"
          suffix="%"
          value={taxRate}
          onChange={(val) => {
            setTaxRate(val);
            if (originalPrice && discountPercent) {
              setResult(calculateDiscount({ originalPrice, discountPercent, taxRate: val }));
            }
          }}
          placeholder="e.g. 8.5"
          min="0"
        />
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Final Discounted Price"
          primaryValue={formatNum(result.finalPrice)}
          copyValue={formatNum(result.finalPrice)}
          secondaryItems={[
            {
              label: 'Total You Save',
              value: formatNum(result.amountSaved),
              color: 'text-emerald-600 font-bold'
            },
            {
              label: 'Original Sticker Price',
              value: formatNum(result.originalPrice)
            },
            {
              label: 'Sales Tax Amount',
              value: result.taxAmount > 0 ? formatNum(result.taxAmount) : 'None (0.00)'
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
