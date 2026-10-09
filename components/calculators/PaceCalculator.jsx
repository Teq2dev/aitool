'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculatePace } from '@/lib/calculators/fitnessUtils';

export default function PaceCalculator() {
  const idPrefix = useId();

  const [distance, setDistance] = useState('10');
  const [distanceUnit, setDistanceUnit] = useState('km'); // 'km' | 'miles'
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('50');
  const [seconds, setSeconds] = useState('0');

  const [result, setResult] = useState(() =>
    calculatePace({ distance: 10, distanceUnit: 'km', hours: 0, minutes: 50, seconds: 0 })
  );

  const setPreset = (dist, unit) => {
    setDistance(String(dist));
    setDistanceUnit(unit);
    setResult(calculatePace({ distance: dist, distanceUnit: unit, hours, minutes, seconds }));
  };

  const handleCalculate = () => {
    const res = calculatePace({ distance, distanceUnit, hours, minutes, seconds });
    setResult(res);
  };

  const handleReset = () => {
    setDistance('');
    setHours('0');
    setMinutes('');
    setSeconds('0');
    setResult(null);
  };

  return (
    <CalculatorShell title="Running & Walking Pace Calculator" badge="Race Splits & Speed">
      {/* Race Presets */}
      <div className="mb-4">
        <span className="text-xs font-bold uppercase text-slate-500 block mb-2">
          Popular Race Distances
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '5K (5 km)', dist: 5, unit: 'km' },
            { label: '10K (10 km)', dist: 10, unit: 'km' },
            { label: 'Half Marathon (21.1 km)', dist: 21.0975, unit: 'km' },
            { label: 'Marathon (42.2 km)', dist: 42.195, unit: 'km' }
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setPreset(preset.dist, preset.unit)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <div className="sm:col-span-2 grid grid-cols-2 gap-2">
          <CalculatorInput
            id={`${idPrefix}-dist`}
            label="Distance"
            value={distance}
            onChange={(val) => {
              setDistance(val);
              if (val && (hours || minutes || seconds)) {
                setResult(calculatePace({ distance: val, distanceUnit, hours, minutes, seconds }));
              }
            }}
            placeholder="e.g. 10"
            required
          />
          <CalculatorSelect
            id={`${idPrefix}-dist-unit`}
            label="Unit"
            value={distanceUnit}
            onChange={(val) => {
              setDistanceUnit(val);
              if (distance) {
                setResult(calculatePace({ distance, distanceUnit: val, hours, minutes, seconds }));
              }
            }}
            options={[
              { value: 'km', label: 'Kilometers' },
              { value: 'miles', label: 'Miles' }
            ]}
          />
        </div>

        <div className="sm:col-span-3 grid grid-cols-3 gap-2">
          <CalculatorInput
            id={`${idPrefix}-h`}
            label="Hours"
            value={hours}
            onChange={(val) => setHours(val)}
            placeholder="0"
            min="0"
          />
          <CalculatorInput
            id={`${idPrefix}-m`}
            label="Minutes"
            value={minutes}
            onChange={(val) => setMinutes(val)}
            placeholder="e.g. 50"
            min="0"
            max="59"
          />
          <CalculatorInput
            id={`${idPrefix}-s`}
            label="Seconds"
            value={seconds}
            onChange={(val) => setSeconds(val)}
            placeholder="0"
            min="0"
            max="59"
          />
        </div>
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Required Running Pace"
          primaryValue={distanceUnit === 'km' ? result.pacePerKm : result.pacePerMile}
          copyValue={`Pace: ${result.pacePerKm} (${result.pacePerMile}), Speed: ${result.speedKmh}`}
          secondaryItems={[
            {
              label: 'Pace per Kilometer',
              value: result.pacePerKm,
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Pace per Mile',
              value: result.pacePerMile,
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Speed (km/h)',
              value: result.speedKmh
            },
            {
              label: 'Speed (mph)',
              value: result.speedMph
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
