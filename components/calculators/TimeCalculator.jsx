'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateTimeDuration } from '@/lib/calculators/dateUtils';

export default function TimeCalculator() {
  const idPrefix = useId();

  const [h1, setH1] = useState('2');
  const [m1, setM1] = useState('35');
  const [s1, setS1] = useState('0');

  const [operation, setOperation] = useState('add'); // 'add' | 'subtract'

  const [h2, setH2] = useState('1');
  const [m2, setM2] = useState('45');
  const [s2, setS2] = useState('0');

  const [result, setResult] = useState(() =>
    calculateTimeDuration({ h1: 2, m1: 35, s1: 0, h2: 1, m2: 45, s2: 0, operation: 'add' })
  );

  const handleCalculate = () => {
    const res = calculateTimeDuration({ h1, m1, s1, h2, m2, s2, operation });
    setResult(res);
  };

  const handleReset = () => {
    setH1('');
    setM1('');
    setS1('');
    setH2('');
    setM2('');
    setS2('');
    setResult(null);
  };

  return (
    <CalculatorShell title="Time Duration Calculator" badge="Hours, Mins, Secs">
      <div className="space-y-4">
        {/* Time 1 */}
        <div>
          <span className="text-xs font-bold uppercase text-slate-500 block mb-2">
            First Time Duration
          </span>
          <div className="grid grid-cols-3 gap-3">
            <CalculatorInput
              id={`${idPrefix}-h1`}
              label="Hours"
              value={h1}
              onChange={(val) => setH1(val)}
              suffix="hrs"
              placeholder="e.g. 2"
            />
            <CalculatorInput
              id={`${idPrefix}-m1`}
              label="Minutes"
              value={m1}
              onChange={(val) => setM1(val)}
              suffix="min"
              placeholder="e.g. 35"
              min="0"
              max="59"
            />
            <CalculatorInput
              id={`${idPrefix}-s1`}
              label="Seconds"
              value={s1}
              onChange={(val) => setS1(val)}
              suffix="sec"
              placeholder="e.g. 0"
              min="0"
              max="59"
            />
          </div>
        </div>

        {/* Operation */}
        <div className="max-w-xs mx-auto">
          <CalculatorSelect
            id={`${idPrefix}-op`}
            label="Operation"
            value={operation}
            onChange={(val) => setOperation(val)}
            options={[
              { value: 'add', label: '+ Add Durations' },
              { value: 'subtract', label: '− Subtract Duration' }
            ]}
          />
        </div>

        {/* Time 2 */}
        <div>
          <span className="text-xs font-bold uppercase text-slate-500 block mb-2">
            Second Time Duration
          </span>
          <div className="grid grid-cols-3 gap-3">
            <CalculatorInput
              id={`${idPrefix}-h2`}
              label="Hours"
              value={h2}
              onChange={(val) => setH2(val)}
              suffix="hrs"
              placeholder="e.g. 1"
            />
            <CalculatorInput
              id={`${idPrefix}-m2`}
              label="Minutes"
              value={m2}
              onChange={(val) => setM2(val)}
              suffix="min"
              placeholder="e.g. 45"
              min="0"
              max="59"
            />
            <CalculatorInput
              id={`${idPrefix}-s2`}
              label="Seconds"
              value={s2}
              onChange={(val) => setS2(val)}
              suffix="sec"
              placeholder="e.g. 0"
              min="0"
              max="59"
            />
          </div>
        </div>
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Total Combined Duration"
          primaryValue={result.formatted}
          copyValue={result.formatted}
          secondaryItems={[
            {
              label: 'Decimal Hours',
              value: `${result.decimalHours} hrs`,
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Timecode (HH:MM:SS)',
              value: result.timeCode
            },
            {
              label: 'Total Seconds',
              value: `${result.totalSeconds.toLocaleString()} s`
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
