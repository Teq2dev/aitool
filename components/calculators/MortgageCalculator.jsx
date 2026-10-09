'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateMortgage } from '@/lib/calculators/financeUtils';

export default function MortgageCalculator() {
  const idPrefix = useId();

  const [homePrice, setHomePrice] = useState('400000');
  const [downPayment, setDownPayment] = useState('80000');
  const [rate, setRate] = useState('6.5');
  const [termYears, setTermYears] = useState('30');
  const [taxYearly, setTaxYearly] = useState('4800');
  const [insuranceYearly, setInsuranceYearly] = useState('1200');
  const [hoaMonthly, setHoaMonthly] = useState('0');

  const [result, setResult] = useState(() =>
    calculateMortgage({
      homePrice: 400000,
      downPayment: 80000,
      annualRate: 6.5,
      loanTermYears: 30,
      propertyTaxYearly: 4800,
      insuranceYearly: 1200,
      hoaMonthly: 0
    })
  );

  const handleCalculate = () => {
    const res = calculateMortgage({
      homePrice,
      downPayment,
      annualRate: rate,
      loanTermYears: termYears,
      propertyTaxYearly: taxYearly,
      insuranceYearly,
      hoaMonthly
    });
    setResult(res);
  };

  const handleReset = () => {
    setHomePrice('');
    setDownPayment('');
    setRate('');
    setTaxYearly('');
    setInsuranceYearly('');
    setHoaMonthly('');
    setResult(null);
  };

  const formatNum = (val) =>
    Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorShell title="Mortgage Payment Calculator" badge="Complete Housing Cost">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalculatorInput
          id={`${idPrefix}-price`}
          label="Home Purchase Price"
          value={homePrice}
          onChange={(val) => {
            setHomePrice(val);
            if (val && rate && termYears) {
              setResult(calculateMortgage({ homePrice: val, downPayment, annualRate: rate, loanTermYears: termYears, propertyTaxYearly: taxYearly, insuranceYearly, hoaMonthly }));
            }
          }}
          placeholder="e.g. 400000"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-down`}
          label="Down Payment Amount"
          value={downPayment}
          onChange={(val) => {
            setDownPayment(val);
            if (homePrice && rate && termYears) {
              setResult(calculateMortgage({ homePrice, downPayment: val, annualRate: rate, loanTermYears: termYears, propertyTaxYearly: taxYearly, insuranceYearly, hoaMonthly }));
            }
          }}
          placeholder="e.g. 80000"
        />

        <CalculatorInput
          id={`${idPrefix}-rate`}
          label="Interest Rate"
          suffix="%"
          value={rate}
          onChange={(val) => {
            setRate(val);
            if (homePrice && val && termYears) {
              setResult(calculateMortgage({ homePrice, downPayment, annualRate: val, loanTermYears: termYears, propertyTaxYearly: taxYearly, insuranceYearly, hoaMonthly }));
            }
          }}
          placeholder="e.g. 6.5"
          required
        />

        <CalculatorSelect
          id={`${idPrefix}-term`}
          label="Loan Term"
          value={termYears}
          onChange={(val) => {
            setTermYears(val);
            if (homePrice && rate) {
              setResult(calculateMortgage({ homePrice, downPayment, annualRate: rate, loanTermYears: val, propertyTaxYearly: taxYearly, insuranceYearly, hoaMonthly }));
            }
          }}
          options={[
            { value: '30', label: '30 Years Fixed' },
            { value: '20', label: '20 Years Fixed' },
            { value: '15', label: '15 Years Fixed' },
            { value: '10', label: '10 Years Fixed' }
          ]}
        />
      </div>

      {/* Escrow & HOA details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
        <CalculatorInput
          id={`${idPrefix}-tax`}
          label="Annual Property Tax"
          value={taxYearly}
          onChange={(val) => setTaxYearly(val)}
          placeholder="e.g. 4800"
          helperText="Divided by 12 monthly"
        />

        <CalculatorInput
          id={`${idPrefix}-ins`}
          label="Annual Home Insurance"
          value={insuranceYearly}
          onChange={(val) => setInsuranceYearly(val)}
          placeholder="e.g. 1200"
          helperText="Divided by 12 monthly"
        />

        <CalculatorInput
          id={`${idPrefix}-hoa`}
          label="Monthly HOA / Condo Fee"
          value={hoaMonthly}
          onChange={(val) => setHoaMonthly(val)}
          placeholder="e.g. 0"
        />
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Total Monthly Housing Payment"
          primaryValue={formatNum(result.totalMonthlyPayment)}
          copyValue={`${formatNum(result.totalMonthlyPayment)} per month`}
          secondaryItems={[
            {
              label: 'Principal & Interest (P&I)',
              value: formatNum(result.principalAndInterest),
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Monthly Property Tax',
              value: formatNum(result.monthlyTax)
            },
            {
              label: 'Monthly Insurance',
              value: formatNum(result.monthlyInsurance)
            },
            {
              label: 'Loan Principal Borrowed',
              value: formatNum(result.loanPrincipal)
            },
            {
              label: 'Down Payment Ratio',
              value: `${result.downPaymentPercent}% (${formatNum(result.downPaymentAmount)})`
            },
            {
              label: 'Total Interest over Term',
              value: formatNum(result.totalInterest),
              color: 'text-amber-600'
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
