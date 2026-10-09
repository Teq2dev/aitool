'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateSalary } from '@/lib/calculators/financeUtils';
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY, formatCurrency } from '@/lib/calculators/currencyUtils';

export default function SalaryCalculator() {
  const idPrefix = useId();

  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [amount, setAmount] = useState('75000');
  const [payType, setPayType] = useState('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [weeksPerYear, setWeeksPerYear] = useState('52');

  const [result, setResult] = useState(() =>
    calculateSalary({ amount: 75000, type: 'annual', hoursPerWeek: 40, weeksPerYear: 52 })
  );

  const handleCalculate = () => {
    const res = calculateSalary({ amount, type: payType, hoursPerWeek, weeksPerYear });
    setResult(res);
  };

  const handleReset = () => {
    setAmount('');
    setResult(null);
  };

  return (
    <CalculatorShell title="Salary & Wage Converter" badge="Payroll Calculator">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-1">
          <CalculatorSelect
            id={`${idPrefix}-curr`}
            label="Currency"
            value={currency}
            onChange={(val) => setCurrency(val)}
            options={SUPPORTED_CURRENCIES.map(c => ({ value: c.code, label: `${c.code} (${c.symbol})` }))}
          />
        </div>

        <div className="lg:col-span-1">
          <CalculatorInput
            id={`${idPrefix}-amount`}
            label="Compensation"
            value={amount}
            onChange={(val) => {
              setAmount(val);
              if (val) {
                setResult(calculateSalary({ amount: val, type: payType, hoursPerWeek, weeksPerYear }));
              }
            }}
            placeholder="e.g. 75000"
            required
          />
        </div>

        <div className="lg:col-span-1">
          <CalculatorSelect
            id={`${idPrefix}-type`}
            label="Pay Frequency"
            value={payType}
            onChange={(val) => {
              setPayType(val);
              if (amount) {
                setResult(calculateSalary({ amount, type: val, hoursPerWeek, weeksPerYear }));
              }
            }}
            options={[
              { value: 'annual', label: 'Per Year (Annual)' },
              { value: 'monthly', label: 'Per Month' },
              { value: 'biweekly', label: 'Bi-Weekly (2 Wks)' },
              { value: 'weekly', label: 'Per Week' },
              { value: 'daily', label: 'Per Day' },
              { value: 'hourly', label: 'Per Hour' }
            ]}
          />
        </div>

        <div className="lg:col-span-1">
          <CalculatorInput
            id={`${idPrefix}-hpw`}
            label="Hours / Week"
            value={hoursPerWeek}
            onChange={(val) => {
              setHoursPerWeek(val);
              if (amount) {
                setResult(calculateSalary({ amount, type: payType, hoursPerWeek: val, weeksPerYear }));
              }
            }}
            placeholder="e.g. 40"
          />
        </div>

        <div className="lg:col-span-1">
          <CalculatorInput
            id={`${idPrefix}-wpy`}
            label="Weeks / Year"
            value={weeksPerYear}
            onChange={(val) => {
              setWeeksPerYear(val);
              if (amount) {
                setResult(calculateSalary({ amount, type: payType, hoursPerWeek, weeksPerYear: val }));
              }
            }}
            placeholder="e.g. 52"
          />
        </div>
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Equivalent Annual Salary"
          primaryValue={formatCurrency(result.annual, currency)}
          copyValue={`Annual: ${formatCurrency(result.annual, currency)}, Hourly: ${formatCurrency(result.hourly, currency)}/hr`}
          secondaryItems={[
            {
              label: 'Monthly Pay',
              value: formatCurrency(result.monthly, currency),
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Bi-Weekly Pay (26/yr)',
              value: formatCurrency(result.biweekly, currency)
            },
            {
              label: 'Weekly Pay (52/yr)',
              value: formatCurrency(result.weekly, currency)
            },
            {
              label: 'Daily Rate (8 hrs)',
              value: formatCurrency(result.daily, currency)
            },
            {
              label: 'Equivalent Hourly Wage',
              value: `${formatCurrency(result.hourly, currency)}/hr`,
              color: 'text-emerald-600 font-bold'
            }
          ]}
          note="Note: Represents gross compensation before statutory payroll taxes, pension contributions, and healthcare withholdings."
        />
      )}
    </CalculatorShell>
  );
}
