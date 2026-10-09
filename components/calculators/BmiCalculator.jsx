'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateBmi } from '@/lib/calculators/fitnessUtils';

export default function BmiCalculator() {
  const idPrefix = useId();
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' | 'imperial'

  // Metric values
  const [heightCm, setHeightCm] = useState('175');
  const [weightKg, setWeightKg] = useState('70');

  // Imperial values
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');
  const [weightLbs, setWeightLbs] = useState('155');

  const [result, setResult] = useState(() =>
    calculateBmi({ unitSystem: 'metric', heightCm: 175, weightKg: 70 })
  );

  const handleCalculate = () => {
    const res = calculateBmi({
      unitSystem,
      heightCm,
      heightFt,
      heightIn,
      weightKg,
      weightLbs
    });
    setResult(res);
  };

  const handleReset = () => {
    if (unitSystem === 'metric') {
      setHeightCm('');
      setWeightKg('');
    } else {
      setHeightFt('');
      setHeightIn('');
      setWeightLbs('');
    }
    setResult(null);
  };

  const handleUnitToggle = (unit) => {
    setUnitSystem(unit);
    if (unit === 'metric') {
      setResult(calculateBmi({ unitSystem: 'metric', heightCm: heightCm || 175, weightKg: weightKg || 70 }));
    } else {
      setResult(calculateBmi({ unitSystem: 'imperial', heightFt: heightFt || 5, heightIn: heightIn || 9, weightLbs: weightLbs || 155 }));
    }
  };

  return (
    <CalculatorShell title="Body Mass Index (BMI) Calculator" badge="WHO Standards">
      {/* Unit Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => handleUnitToggle('metric')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            unitSystem === 'metric'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Metric (cm / kg)
        </button>
        <button
          type="button"
          onClick={() => handleUnitToggle('imperial')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            unitSystem === 'imperial'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Imperial (ft / in / lbs)
        </button>
      </div>

      {/* Metric Inputs */}
      {unitSystem === 'metric' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInput
            id={`${idPrefix}-cm`}
            label="Height (Centimeters)"
            value={heightCm}
            onChange={(val) => {
              setHeightCm(val);
              setResult(calculateBmi({ unitSystem: 'metric', heightCm: val, weightKg }));
            }}
            suffix="cm"
            placeholder="e.g. 175"
            min="50"
            max="260"
          />
          <CalculatorInput
            id={`${idPrefix}-kg`}
            label="Weight (Kilograms)"
            value={weightKg}
            onChange={(val) => {
              setWeightKg(val);
              setResult(calculateBmi({ unitSystem: 'metric', heightCm, weightKg: val }));
            }}
            suffix="kg"
            placeholder="e.g. 70"
            min="20"
            max="350"
          />
        </div>
      )}

      {/* Imperial Inputs */}
      {unitSystem === 'imperial' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <CalculatorInput
              id={`${idPrefix}-ft`}
              label="Height (Feet)"
              value={heightFt}
              onChange={(val) => {
                setHeightFt(val);
                setResult(calculateBmi({ unitSystem: 'imperial', heightFt: val, heightIn, weightLbs }));
              }}
              suffix="ft"
              placeholder="e.g. 5"
              min="2"
              max="8"
            />
            <CalculatorInput
              id={`${idPrefix}-in`}
              label="Height (Inches)"
              value={heightIn}
              onChange={(val) => {
                setHeightIn(val);
                setResult(calculateBmi({ unitSystem: 'imperial', heightFt, heightIn: val, weightLbs }));
              }}
              suffix="in"
              placeholder="e.g. 9"
              min="0"
              max="11"
            />
          </div>
          <CalculatorInput
            id={`${idPrefix}-lbs`}
            label="Weight (Pounds)"
            value={weightLbs}
            onChange={(val) => {
              setWeightLbs(val);
              setResult(calculateBmi({ unitSystem: 'imperial', heightFt, heightIn, weightLbs: val }));
            }}
            suffix="lbs"
            placeholder="e.g. 155"
            min="40"
            max="700"
          />
        </div>
      )}

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Calculated BMI Score"
          primaryValue={result.bmi}
          note="Educational screening indicator: BMI is not a clinical medical diagnostic tool. Please consult a licensed healthcare professional for personalized health advice."
          secondaryItems={[
            {
              label: 'WHO Classification',
              value: result.category,
              color: result.category === 'Normal Weight' ? 'text-emerald-600' : 'text-blue-600'
            },
            {
              label: 'Healthy Weight Range',
              value: unitSystem === 'metric' ? result.healthyRangeMetric : result.healthyRangeImperial
            },
            {
              label: 'BMI Prime',
              value: `${result.prime} (target < 1.0)`
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
