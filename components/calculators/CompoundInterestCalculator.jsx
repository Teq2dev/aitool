'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateCompoundInterest } from '@/lib/calculators/financeUtils';

export default function CompoundInterestCalculator() {
  const idPrefix = useId();

  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('8.0');
  const [timeYears, setTimeYears] = useState('20');
  const [frequency, setFrequency] = useState('12'); // 12=monthly, 1=annually, 4=quarterly, 365=daily
  const [contribution, setContribution] = useState('200');
  const [showTable, setShowTable] = useState(false);

  const [result, setResult] = useState(() =>
    calculateCompoundInterest({
      principal: 10000,
      annualRate: 8.0,
      timeYears: 20,
      compoundingFreq: 12,
      additionalContribution: 200
    })
  );

  const handleCalculate = () => {
    const res = calculateCompoundInterest({
      principal,
      annualRate: rate,
      timeYears,
      compoundingFreq: frequency,
      additionalContribution: contribution
    });
    setResult(res);
  };

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTimeYears('');
    setContribution('');
    setResult(null);
    setShowTable(false);
  };

  const formatNum = (val) =>
    Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorShell title="Compound Interest Calculator" badge="Wealth & Investment">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CalculatorInput
          id={`${idPrefix}-principal`}
          label="Initial Investment (Principal)"
          value={principal}
          onChange={(val) => {
            setPrincipal(val);
            if (val && rate && timeYears) {
              setResult(calculateCompoundInterest({ principal: val, annualRate: rate, timeYears, compoundingFreq: frequency, additionalContribution: contribution }));
            }
          }}
          placeholder="e.g. 10000"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-rate`}
          label="Estimated Annual Return"
          suffix="%"
          value={rate}
          onChange={(val) => {
            setRate(val);
            if (principal && val && timeYears) {
              setResult(calculateCompoundInterest({ principal, annualRate: val, timeYears, compoundingFreq: frequency, additionalContribution: contribution }));
            }
          }}
          placeholder="e.g. 8"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-years`}
          label="Investment Horizon"
          suffix="years"
          value={timeYears}
          onChange={(val) => {
            setTimeYears(val);
            if (principal && rate && val) {
              setResult(calculateCompoundInterest({ principal, annualRate: rate, timeYears: val, compoundingFreq: frequency, additionalContribution: contribution }));
            }
          }}
          placeholder="e.g. 20"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-contrib`}
          label="Monthly Additional Deposit"
          value={contribution}
          onChange={(val) => {
            setContribution(val);
            if (principal && rate && timeYears) {
              setResult(calculateCompoundInterest({ principal, annualRate: rate, timeYears, compoundingFreq: frequency, additionalContribution: val }));
            }
          }}
          placeholder="e.g. 200"
        />

        <CalculatorSelect
          id={`${idPrefix}-freq`}
          label="Compounding Frequency"
          value={frequency}
          onChange={(val) => {
            setFrequency(val);
            if (principal && rate && timeYears) {
              setResult(calculateCompoundInterest({ principal, annualRate: rate, timeYears, compoundingFreq: val, additionalContribution: contribution }));
            }
          }}
          options={[
            { value: '12', label: 'Compounded Monthly (12/yr)' },
            { value: '365', label: 'Compounded Daily (365/yr)' },
            { value: '4', label: 'Compounded Quarterly (4/yr)' },
            { value: '1', label: 'Compounded Annually (1/yr)' }
          ]}
        />
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <>
          <CalculatorResultCard
            primaryLabel="Projected Future Portfolio Value"
            primaryValue={formatNum(result.futureValue)}
            copyValue={formatNum(result.futureValue)}
            secondaryItems={[
              {
                label: 'Total Interest Earned',
                value: formatNum(result.totalInterest),
                color: 'text-emerald-600 font-bold'
              },
              {
                label: 'Total Cash Deposited',
                value: formatNum(result.totalDeposited)
              },
              {
                label: 'Interest Share of Portfolio',
                value: `${result.interestRatio}%`
              }
            ]}
          />

          {result.yearlyBreakdown && result.yearlyBreakdown.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowTable(!showTable)}
                className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1.5"
              >
                <span>{showTable ? '▲ Hide' : '▼ View'} Annual Growth Breakdown</span>
              </button>

              {showTable && (
                <div className="mt-4 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="sticky top-0 bg-slate-50 text-slate-500 uppercase border-b border-slate-200 font-semibold">
                      <tr>
                        <th className="px-4 py-2.5">Year</th>
                        <th className="px-4 py-2.5">Total Deposited</th>
                        <th className="px-4 py-2.5">Interest Earned</th>
                        <th className="px-4 py-2.5">End Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {result.yearlyBreakdown.map((row) => (
                        <tr key={row.year} className="hover:bg-slate-50/60">
                          <td className="px-4 py-2 font-medium">Year {row.year}</td>
                          <td className="px-4 py-2 text-slate-600">{formatNum(row.deposited)}</td>
                          <td className="px-4 py-2 text-emerald-600 font-medium">{formatNum(row.interest)}</td>
                          <td className="px-4 py-2 font-bold text-slate-900">{formatNum(row.balance)}</td>
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
