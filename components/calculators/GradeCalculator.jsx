'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateWeightedGrade, calculateRequiredFinalGrade } from '@/lib/calculators/educationUtils';
import { Plus, Trash2 } from 'lucide-react';

export default function GradeCalculator() {
  const idPrefix = useId();
  const [mode, setMode] = useState('weighted'); // 'weighted' | 'final'

  // Weighted Mode
  const [assignments, setAssignments] = useState([
    { id: 1, name: 'Homework', score: '95', weight: '20' },
    { id: 2, name: 'Midterm Exam', score: '82', weight: '30' },
    { id: 3, name: 'Projects', score: '90', weight: '20' }
  ]);

  // Final Exam Mode
  const [currentGrade, setCurrentGrade] = useState('85');
  const [targetGrade, setTargetGrade] = useState('90');
  const [finalWeight, setFinalWeight] = useState('25');

  const [result, setResult] = useState(() =>
    calculateWeightedGrade([
      { score: 95, weight: 20 },
      { score: 82, weight: 30 },
      { score: 90, weight: 20 }
    ])
  );

  const addAssignment = () => {
    const nextId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
    setAssignments([...assignments, { id: nextId, name: `Assignment ${nextId}`, score: '90', weight: '15' }]);
  };

  const removeAssignment = (id) => {
    if (assignments.length <= 1) return;
    const updated = assignments.filter(a => a.id !== id);
    setAssignments(updated);
    setResult(calculateWeightedGrade(updated));
  };

  const updateAssignment = (id, field, value) => {
    const updated = assignments.map(a => a.id === id ? { ...a, [field]: value } : a);
    setAssignments(updated);
    setResult(calculateWeightedGrade(updated));
  };

  const handleCalculate = () => {
    if (mode === 'weighted') {
      setResult(calculateWeightedGrade(assignments));
    } else {
      setResult(calculateRequiredFinalGrade({ currentGrade, targetGrade, finalExamWeight: finalWeight }));
    }
  };

  const handleReset = () => {
    if (mode === 'weighted') {
      setAssignments([
        { id: 1, name: 'Homework', score: '', weight: '25' },
        { id: 2, name: 'Midterm', score: '', weight: '25' }
      ]);
    } else {
      setCurrentGrade('');
      setTargetGrade('');
      setFinalWeight('');
    }
    setResult(null);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'weighted') {
      setResult(calculateWeightedGrade(assignments));
    } else {
      setResult(calculateRequiredFinalGrade({ currentGrade: currentGrade || 85, targetGrade: targetGrade || 90, finalExamWeight: finalWeight || 25 }));
    }
  };

  return (
    <CalculatorShell title="Grade & Final Exam Calculator" badge="Weighted Academic Scoring">
      {/* Mode Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => handleModeChange('weighted')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'weighted'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Weighted Course Grade
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('final')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'final'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Final Exam Target Score
        </button>
      </div>

      {mode === 'weighted' && (
        <div className="space-y-3">
          <div className="hidden sm:grid grid-cols-12 gap-3 text-xs font-bold uppercase tracking-wider text-slate-500 px-2">
            <div className="col-span-5">Assignment / Assessment</div>
            <div className="col-span-3">Score Earned (%)</div>
            <div className="col-span-3">Category Weight (%)</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {assignments.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-50/80 p-3 sm:p-2.5 rounded-xl border border-slate-200">
              <div className="sm:col-span-5">
                <label className="sm:hidden text-xs font-bold text-slate-500 block mb-1">Assignment</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateAssignment(item.id, 'name', e.target.value)}
                  placeholder={`Assignment ${idx + 1}`}
                  className="w-full text-sm font-medium rounded-lg border border-slate-300 bg-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="sm:hidden text-xs font-bold text-slate-500 block mb-1">Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={item.score}
                  onChange={(e) => updateAssignment(item.id, 'score', e.target.value)}
                  placeholder="e.g. 95"
                  className="w-full text-sm font-medium rounded-lg border border-slate-300 bg-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="sm:hidden text-xs font-bold text-slate-500 block mb-1">Weight (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={item.weight}
                  onChange={(e) => updateAssignment(item.id, 'weight', e.target.value)}
                  placeholder="e.g. 25"
                  className="w-full text-sm font-medium rounded-lg border border-slate-300 bg-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-1 flex justify-end sm:justify-center">
                <button
                  type="button"
                  onClick={() => removeAssignment(item.id)}
                  disabled={assignments.length <= 1}
                  className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 transition-colors cursor-pointer"
                  title="Remove assignment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <button
              type="button"
              onClick={addAssignment}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Assessment</span>
            </button>
          </div>
        </div>
      )}

      {mode === 'final' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CalculatorInput
            id={`${idPrefix}-current`}
            label="Current Course Grade"
            suffix="%"
            value={currentGrade}
            onChange={(val) => {
              setCurrentGrade(val);
              if (val && targetGrade && finalWeight) {
                setResult(calculateRequiredFinalGrade({ currentGrade: val, targetGrade, finalExamWeight: finalWeight }));
              }
            }}
            placeholder="e.g. 85"
            required
          />

          <CalculatorInput
            id={`${idPrefix}-target`}
            label="Target Desired Grade"
            suffix="%"
            value={targetGrade}
            onChange={(val) => {
              setTargetGrade(val);
              if (currentGrade && val && finalWeight) {
                setResult(calculateRequiredFinalGrade({ currentGrade, targetGrade: val, finalExamWeight: finalWeight }));
              }
            }}
            placeholder="e.g. 90"
            required
          />

          <CalculatorInput
            id={`${idPrefix}-final-w`}
            label="Final Exam Weight"
            suffix="%"
            value={finalWeight}
            onChange={(val) => {
              setFinalWeight(val);
              if (currentGrade && targetGrade && val) {
                setResult(calculateRequiredFinalGrade({ currentGrade, targetGrade, finalExamWeight: val }));
              }
            }}
            placeholder="e.g. 25"
            required
          />
        </div>
      )}

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && mode === 'weighted' && (
        <CalculatorResultCard
          primaryLabel="Weighted Current Grade Average"
          primaryValue={result.percentageScore}
          copyValue={`Current Weighted Grade: ${result.percentageScore}`}
          secondaryItems={[
            {
              label: 'Total Accounted Weight',
              value: `${result.totalWeight}%`
            },
            {
              label: 'Numeric Average',
              value: result.currentGrade
            }
          ]}
        />
      )}

      {result && mode === 'final' && (
        <CalculatorResultCard
          primaryLabel="Required Final Exam Score"
          primaryValue={`${result.requiredGrade}%`}
          copyValue={`Score Needed on Final: ${result.requiredGrade}%`}
          note={
            result.isOver100
              ? 'Warning: The required score exceeds 100%. Achieving your target grade requires extra credit or a curved exam.'
              : 'You can achieve your target grade with this final exam score.'
          }
          secondaryItems={[
            {
              label: 'Target Class Grade',
              value: `${result.targetGrade}%`,
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Current Grade Baseline',
              value: `${result.currentGrade}%`
            },
            {
              label: 'Feasibility Status',
              value: result.isAchievable ? 'Achievable (≤ 100%)' : 'Requires Extra Credit (> 100%)',
              color: result.isAchievable ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
