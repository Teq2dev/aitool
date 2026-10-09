'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateAge } from '@/lib/calculators/dateUtils';

export default function AgeCalculator() {
  const idPrefix = useId();
  const todayStr = new Date().toISOString().split('T')[0];

  const [birthDate, setBirthDate] = useState('1995-06-15');
  const [targetDate, setTargetDate] = useState(todayStr);
  const [error, setError] = useState('');
  const [result, setResult] = useState(() => calculateAge('1995-06-15', todayStr));

  const handleCalculate = () => {
    setError('');
    if (!birthDate) {
      setError('Please select your date of birth.');
      setResult(null);
      return;
    }

    if (new Date(targetDate) < new Date(birthDate)) {
      setError('The target date cannot be earlier than your date of birth.');
      setResult(null);
      return;
    }

    const res = calculateAge(birthDate, targetDate);
    if (!res) {
      setError('Invalid date entered. Please check your inputs.');
      setResult(null);
    } else {
      setResult(res);
    }
  };

  const handleReset = () => {
    setBirthDate('');
    setTargetDate(todayStr);
    setError('');
    setResult(null);
  };

  return (
    <CalculatorShell title="Age Calculator" badge="Calendar Precision">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalculatorInput
          id={`${idPrefix}-dob`}
          label="Date of Birth"
          type="date"
          value={birthDate}
          onChange={(val) => {
            setBirthDate(val);
            setError('');
            if (val && targetDate && new Date(targetDate) >= new Date(val)) {
              setResult(calculateAge(val, targetDate));
            }
          }}
          required
          error={error}
        />

        <CalculatorInput
          id={`${idPrefix}-target`}
          label="Age at the Date of"
          type="date"
          value={targetDate}
          onChange={(val) => {
            setTargetDate(val);
            setError('');
            if (birthDate && val && new Date(val) >= new Date(birthDate)) {
              setResult(calculateAge(birthDate, val));
            }
          }}
          helperText="Defaults to today’s date"
        />
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Your Chronological Age"
          primaryValue={`${result.years} years, ${result.months} months, ${result.days} days`}
          copyValue={`${result.years} years, ${result.months} months, and ${result.days} days old`}
          secondaryItems={[
            { label: 'Total Months', value: result.totalMonths.toLocaleString() },
            { label: 'Total Weeks', value: result.totalWeeks.toLocaleString() },
            { label: 'Total Days', value: result.totalDays.toLocaleString() },
            { label: 'Total Hours', value: result.totalHours.toLocaleString() },
            {
              label: 'Next Birthday In',
              value: typeof result.daysUntilBirthday === 'number'
                ? `${result.daysUntilBirthday} days`
                : result.daysUntilBirthday,
              color: 'text-blue-600 font-extrabold'
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
