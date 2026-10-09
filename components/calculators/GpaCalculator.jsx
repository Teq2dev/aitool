'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateGpa, GRADE_SCALE_4_0 } from '@/lib/calculators/educationUtils';
import { GPA_SCALES } from '@/lib/calculators/unitUtils';
import { Plus, Trash2 } from 'lucide-react';

export default function GpaCalculator() {
  const idPrefix = useId();

  const [scale, setScale] = useState('4.0');
  const [courses, setCourses] = useState([
    { id: 1, name: 'Course 1', credits: '4', grade: 'A' },
    { id: 2, name: 'Course 2', credits: '3', grade: 'B+' },
    { id: 3, name: 'Course 3', credits: '4', grade: 'A-' },
    { id: 4, name: 'Course 4', credits: '3', grade: 'B' }
  ]);

  const [result, setResult] = useState(() =>
    calculateGpa([
      { credits: 4, grade: 'A' },
      { credits: 3, grade: 'B+' },
      { credits: 4, grade: 'A-' },
      { credits: 3, grade: 'B' }
    ], '4.0')
  );

  const currentScaleConfig = GPA_SCALES[scale] || GPA_SCALES['4.0'];
  const gradeOptions = Object.keys(currentScaleConfig.grades || GRADE_SCALE_4_0);

  const handleScaleChange = (newScale) => {
    setScale(newScale);
    const targetScaleConfig = GPA_SCALES[newScale] || GPA_SCALES['4.0'];
    const validGrades = Object.keys(targetScaleConfig.grades);
    const fallbackGrade = validGrades[0] || 'A';
    
    // Ensure all course grades exist in the new scale
    const updatedCourses = courses.map(c => ({
      ...c,
      grade: targetScaleConfig.grades[c.grade] !== undefined ? c.grade : fallbackGrade
    }));
    setCourses(updatedCourses);
    setResult(calculateGpa(updatedCourses, newScale));
  };

  const addCourse = () => {
    const nextId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const defaultGrade = gradeOptions.includes('A') ? 'A' : gradeOptions[0];
    setCourses([...courses, { id: nextId, name: `Course ${nextId}`, credits: '3', grade: defaultGrade }]);
  };

  const removeCourse = (id) => {
    if (courses.length <= 1) return;
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    setResult(calculateGpa(updated, scale));
  };

  const updateCourse = (id, field, value) => {
    const updated = courses.map(c => c.id === id ? { ...c, [field]: value } : c);
    setCourses(updated);
    setResult(calculateGpa(updated, scale));
  };

  const handleCalculate = () => {
    setResult(calculateGpa(courses, scale));
  };

  const handleReset = () => {
    const defaultGradeA = gradeOptions.includes('A') ? 'A' : gradeOptions[0];
    const defaultGradeB = gradeOptions.includes('B') ? 'B' : gradeOptions[1] || gradeOptions[0];
    const resetCourses = [
      { id: 1, name: 'Course 1', credits: '3', grade: defaultGradeA },
      { id: 2, name: 'Course 2', credits: '3', grade: defaultGradeB }
    ];
    setCourses(resetCourses);
    setResult(calculateGpa(resetCourses, scale));
  };

  return (
    <CalculatorShell title="Grade Point Average (GPA) Calculator" badge={`${scale} Scale System`}>
      <div className="flex justify-end mb-4">
        <div className="w-full sm:w-64">
          <CalculatorSelect
            id={`${idPrefix}-scale`}
            label="Grading Scale"
            value={scale}
            onChange={handleScaleChange}
            options={[
              { value: '4.0', label: '4.0 Scale (US / International Standard)' },
              { value: '5.0', label: '5.0 Scale (Weighted / Honors High School)' },
              { value: '10.0', label: '10.0 Scale (European / Asian 10-Point)' }
            ]}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="hidden sm:grid grid-cols-12 gap-3 text-xs font-bold uppercase tracking-wider text-slate-500 px-2">
          <div className="col-span-5">Course Name</div>
          <div className="col-span-3">Credits</div>
          <div className="col-span-3">Letter Grade</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        {courses.map((course, idx) => (
          <div key={course.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-50/80 p-3 sm:p-2.5 rounded-xl border border-slate-200">
            <div className="sm:col-span-5">
              <label className="sm:hidden text-xs font-bold text-slate-500 block mb-1">Course Name</label>
              <input
                type="text"
                value={course.name}
                onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                placeholder={`Course ${idx + 1}`}
                className="w-full text-sm font-medium rounded-lg border border-slate-300 bg-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="sm:hidden text-xs font-bold text-slate-500 block mb-1">Credits</label>
              <input
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                value={course.credits}
                onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                placeholder="Credits"
                className="w-full text-sm font-medium rounded-lg border border-slate-300 bg-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="sm:hidden text-xs font-bold text-slate-500 block mb-1">Grade</label>
              <select
                value={course.grade}
                onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                className="w-full text-sm font-medium rounded-lg border border-slate-300 bg-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {gradeOptions.map(g => (
                  <option key={g} value={g}>
                    {g} ({currentScaleConfig.grades[g]?.toFixed(1)})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-1 flex justify-end sm:justify-center">
              <button
                type="button"
                onClick={() => removeCourse(course.id)}
                disabled={courses.length <= 1}
                className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                title="Remove course"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <button
            type="button"
            onClick={addCourse}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Course</span>
          </button>
        </div>
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel={`Calculated GPA (${scale} Max Scale)`}
          primaryValue={`${result.gpa.toFixed(2)} / ${Number(scale).toFixed(1)}`}
          copyValue={`GPA: ${result.gpa.toFixed(2)} on a ${scale} scale (${result.totalCredits} credits)`}
          secondaryItems={[
            {
              label: 'Total Credit Hours',
              value: `${result.totalCredits} credits`,
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Total Quality Points',
              value: `${result.totalPoints}`,
              color: 'text-emerald-600 font-bold'
            },
            {
              label: 'Detailed Decimal GPA',
              value: `${result.gpaDetailed}`
            },
            {
              label: 'Grading Scale Selected',
              value: currentScaleConfig.name
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
