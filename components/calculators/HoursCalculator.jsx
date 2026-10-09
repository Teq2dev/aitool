'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateWorkHours } from '@/lib/calculators/dateUtils';

export default function HoursCalculator() {
  const idPrefix = useId();

  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:30');
  const [breakMins, setBreakMins] = useState('30');
  const [hourlyRate, setHourlyRate] = useState('25');

  const [result, setResult] = useState(() =>
    calculateWorkHours({ startTime: '09:00', endTime: '17:30', breakMinutes: 30, hourlyRate: 25 })
  );

  const handleCalculate = () => {
    const res = calculateWorkHours({
      startTime,
      endTime,
      breakMinutes: breakMins,
      hourlyRate
    });
    setResult(res);
  };

  const handleReset = () => {
    setStartTime('');
    setEndTime('');
    setBreakMins('0');
    setHourlyRate('');
    setResult(null);
  };

  const formatNum = (val) =>
    Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorShell title="Work Hours & Time Card Calculator" badge="Timesheet & Wages">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalculatorInput
          id={`${idPrefix}-start`}
          label="Start Time (Clock In)"
          type="time"
          value={startTime}
          onChange={(val) => {
            setStartTime(val);
            if (val && endTime) setResult(calculateWorkHours({ startTime: val, endTime, breakMinutes: breakMins, hourlyRate }));
          }}
          required
        />

        <CalculatorInput
          id={`${idPrefix}-end`}
          label="End Time (Clock Out)"
          type="time"
          value={endTime}
          onChange={(val) => {
            setEndTime(val);
            if (startTime && val) setResult(calculateWorkHours({ startTime, endTime: val, breakMinutes: breakMins, hourlyRate }));
          }}
          required
          helperText="Overnight shifts past midnight supported"
        />

        <CalculatorInput
          id={`${idPrefix}-break`}
          label="Unpaid Break"
          suffix="minutes"
          value={breakMins}
          onChange={(val) => {
            setBreakMins(val);
            if (startTime && endTime) setResult(calculateWorkHours({ startTime, endTime, breakMinutes: val, hourlyRate }));
          }}
          placeholder="e.g. 30"
          min="0"
        />

        <CalculatorInput
          id={`${idPrefix}-rate`}
          label="Hourly Wage (Optional)"
          value={hourlyRate}
          onChange={(val) => {
            setHourlyRate(val);
            if (startTime && endTime) setResult(calculateWorkHours({ startTime, endTime, breakMinutes: breakMins, hourlyRate: val }));
          }}
          placeholder="e.g. 25"
          min="0"
        />
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Net Payable Work Time"
          primaryValue={result.formatted}
          copyValue={`${result.hours} hrs ${result.minutes} mins (${result.decimalHours} decimal hours)`}
          secondaryItems={[
            {
              label: 'Decimal Hours (for Payroll)',
              value: `${result.decimalHours} hrs`,
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Estimated Gross Pay',
              value: result.totalPay !== null ? formatNum(result.totalPay) : 'N/A (No rate entered)',
              color: 'text-emerald-600 font-bold'
            },
            {
              label: 'Unpaid Break Deducted',
              value: `${result.breakMinutes} mins`
            },
            {
              label: 'Total Shift Elapsed',
              value: `${Math.floor(result.rawMinutes / 60)}h ${result.rawMinutes % 60}m`
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
