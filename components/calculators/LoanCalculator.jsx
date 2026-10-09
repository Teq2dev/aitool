'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateLoanOrEmi } from '@/lib/calculators/financeUtils';

export default function LoanCalculator() {
  const idPrefix = useId();

  const [principal, setPrincipal] = useState('25000');
  const [rate, setRate] = useState('6.5');
  const [term, setTerm] = useState('5');
  const [termUnit, setTermUnit] = useState('years'); // 'years' | 'months'
  const [showSchedule, setShowSchedule] = useState(false);

  const [result, setResult] = useState(() =>
    calculateLoanOrEmi({
      principal: 25000,
      annualRate: 6.5,
      termValue: 5,
      termUnit: 'years'
    })
  );

  const handleCalculate = () => {
    const res = calculateLoanOrEmi({
      principal,
      annualRate: rate,
      termValue: term,
      termUnit
    });
    setResult(res);
  };

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTerm('');
    setResult(null);
    setShowSchedule(false);
  };

  const formatNum = (val) =>
    Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorShell title="Loan Payment Calculator" badge="Amortized Financing">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalculatorInput
          id={`${idPrefix}-principal`}
          label="Loan Amount (Principal)"
          value={principal}
          onChange={(val) => {
            setPrincipal(val);
            if (val && rate && term) {
              setResult(calculateLoanOrEmi({ principal: val, annualRate: rate, termValue: term, termUnit }));
            }
          }}
          placeholder="e.g. 25000"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-rate`}
          label="Annual Interest Rate (APR)"
          suffix="%"
          value={rate}
          onChange={(val) => {
            setRate(val);
            if (principal && val && term) {
              setResult(calculateLoanOrEmi({ principal, annualRate: val, termValue: term, termUnit }));
            }
          }}
          placeholder="e.g. 6.5"
          required
        />

        <div className="grid grid-cols-2 gap-2">
          <CalculatorInput
            id={`${idPrefix}-term`}
            label="Loan Term"
            value={term}
            onChange={(val) => {
              setTerm(val);
              if (principal && rate && val) {
                setResult(calculateLoanOrEmi({ principal, annualRate: rate, termValue: val, termUnit }));
              }
            }}
            placeholder="e.g. 5"
            required
          />
          <CalculatorSelect
            id={`${idPrefix}-term-unit`}
            label="Period"
            value={termUnit}
            onChange={(val) => {
              setTermUnit(val);
              if (principal && rate && term) {
                setResult(calculateLoanOrEmi({ principal, annualRate: rate, termValue: term, termUnit: val }));
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
        <>
          <CalculatorResultCard
            primaryLabel="Estimated Monthly Payment"
            primaryValue={formatNum(result.monthlyPayment)}
            copyValue={`${formatNum(result.monthlyPayment)} per month`}
            secondaryItems={[
              {
                label: 'Total Interest Payable',
                value: formatNum(result.totalInterest),
                color: 'text-amber-600'
              },
              {
                label: 'Total Repayment Cost',
                value: formatNum(result.totalPayment)
              },
              {
                label: 'Principal vs Interest Ratio',
                value: `${result.principalRatio}% / ${result.interestRatio}%`
              }
            ]}
          />

          {result.schedule && result.schedule.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowSchedule(!showSchedule)}
                className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1.5"
              >
                <span>{showSchedule ? '▲ Hide' : '▼ View'} First Year Amortization Schedule</span>
              </button>

              {showSchedule && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200 font-semibold">
                      <tr>
                        <th className="px-4 py-2.5">Month</th>
                        <th className="px-4 py-2.5">Payment</th>
                        <th className="px-4 py-2.5">Principal</th>
                        <th className="px-4 py-2.5">Interest</th>
                        <th className="px-4 py-2.5">Remaining Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {result.schedule.slice(0, 12).map((row) => (
                        <tr key={row.month} className="hover:bg-slate-50/60">
                          <td className="px-4 py-2 font-medium">{row.month}</td>
                          <td className="px-4 py-2 font-semibold text-slate-900">{formatNum(row.payment)}</td>
                          <td className="px-4 py-2 text-emerald-600">{formatNum(row.principal)}</td>
                          <td className="px-4 py-2 text-amber-600">{formatNum(row.interest)}</td>
                          <td className="px-4 py-2 font-mono">{formatNum(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </CalculatorShell>
  );
}
