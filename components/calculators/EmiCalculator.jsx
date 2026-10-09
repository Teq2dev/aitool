'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateLoanOrEmi } from '@/lib/calculators/financeUtils';

export default function EmiCalculator() {
  const idPrefix = useId();

  const [principal, setPrincipal] = useState('1000000');
  const [rate, setRate] = useState('10.5');
  const [tenure, setTenure] = useState('3');
  const [tenureUnit, setTenureUnit] = useState('years');

  const [result, setResult] = useState(() =>
    calculateLoanOrEmi({
      principal: 1000000,
      annualRate: 10.5,
      termValue: 3,
      termUnit: 'years'
    })
  );

  const handleCalculate = () => {
    const res = calculateLoanOrEmi({
      principal,
      annualRate: rate,
      termValue: tenure,
      termUnit: tenureUnit
    });
    setResult(res);
  };

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTenure('');
    setResult(null);
  };

  return (
    <CalculatorShell title="Equated Monthly Installment (EMI) Calculator" badge="Banking Standards">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalculatorInput
          id={`${idPrefix}-principal`}
          label="Loan Principal"
          value={principal}
          onChange={(val) => {
            setPrincipal(val);
            if (val && rate && tenure) {
              setResult(calculateLoanOrEmi({ principal: val, annualRate: rate, termValue: tenure, termUnit: tenureUnit }));
            }
          }}
          placeholder="e.g. 1000000"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-rate`}
          label="Interest Rate (P.A.)"
          suffix="%"
          value={rate}
          onChange={(val) => {
            setRate(val);
            if (principal && val && tenure) {
              setResult(calculateLoanOrEmi({ principal, annualRate: val, termValue: tenure, termUnit: tenureUnit }));
            }
          }}
          placeholder="e.g. 10.5"
          required
        />

        <div className="grid grid-cols-2 gap-2">
          <CalculatorInput
            id={`${idPrefix}-tenure`}
            label="Tenure"
            value={tenure}
            onChange={(val) => {
              setTenure(val);
              if (principal && rate && val) {
                setResult(calculateLoanOrEmi({ principal, annualRate: rate, termValue: val, termUnit: tenureUnit }));
              }
            }}
            placeholder="e.g. 3"
            required
          />
          <CalculatorSelect
            id={`${idPrefix}-tenure-unit`}
            label="Period"
            value={tenureUnit}
            onChange={(val) => {
              setTenureUnit(val);
              if (principal && rate && tenure) {
                setResult(calculateLoanOrEmi({ principal, annualRate: rate, termValue: tenure, termUnit: val }));
              }
            }}
            options={[
              { value: 'years', label: 'Years' },
              { value: 'months', label: 'Months' }
            ]}
          />
        </div>
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Calculated Monthly EMI"
          primaryValue={result.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          copyValue={`${result.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per month`}
          secondaryItems={[
            {
              label: 'Total Interest Payable',
              value: result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
              color: 'text-amber-600'
            },
            {
              label: 'Total Repayment (Principal + Interest)',
              value: result.totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            },
            {
              label: 'Total Loan Tenure',
              value: `${result.totalMonths} Months`
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
