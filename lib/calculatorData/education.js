/**
 * lib/calculatorData/education.js
 * Comprehensive SEO metadata and educational content for Education calculators.
 */

export const EDUCATION_CALCULATORS = {
  'gpa-calculator': {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'education',
    badge: 'Grade Point Average',
    icon: 'GraduationCap',
    h1: 'GPA Calculator',
    seoTitle: 'GPA Calculator – Calculate College & High School 4.0 GPA',
    seoDescription: 'Free online GPA calculator. Calculate your semester and cumulative Grade Point Average on a 4.0 scale with credit weights and letter grades.',
    primaryKeyword: 'GPA calculator',
    secondaryKeywords: ['college GPA calculator', 'semester GPA calculator', 'grade point average calculator', 'cumulative GPA calculator', '4.0 GPA scale'],
    heroSubtitle: 'Calculate semester and cumulative Grade Point Average (GPA) on a standard 4.0 scale using letter grades and course credits.',
    about: [
      'The Grade Point Average (GPA) Calculator computes your academic standing on the standard 4.0 collegiate grading scale. Colleges, universities, high schools, scholarship committees, and graduate programs use cumulative GPA as a primary benchmark for honors, academic probation, and admissions.',
      'Unlike a simple average of grades, GPA is weighted by course credit hours—meaning a 4-credit course has double the influence on your final GPA compared to a 2-credit elective course.'
    ],
    formula: {
      title: 'Weighted GPA Formula',
      formulaText: 'Grade Points per Course = Course Credits × Grade Scale Value\nGPA = Total Grade Points / Total Course Credits',
      explanation: 'Multiply each course credit hour by the numeric equivalent of its letter grade, sum the total grade points, and divide by total credits attempted.',
      variables: [
        { name: 'Grade Scale (4.0)', desc: 'A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0' },
        { name: 'Credits', desc: 'Credit hours or semester units assigned to each course' }
      ]
    },
    howToCalculate: [
      'Add each course taken during your semester or term.',
      'Select the earned Letter Grade (e.g., A, B+, B, C) or enter numeric grade points.',
      'Enter the course Credit Hours (e.g., 3 or 4 credits).',
      'Click Calculate to see your weighted GPA, total credit hours, and total grade points earned.'
    ],
    example: {
      problem: 'Calculate the semester GPA for 4 courses: Math (4 credits, A), History (3 credits, B), Biology (4 credits, B+), English (3 credits, A-).',
      steps: [
        'Step 1: Math: 4 credits × 4.0 (A) = 16.0 points.',
        'Step 2: History: 3 credits × 3.0 (B) = 9.0 points.',
        'Step 3: Biology: 4 credits × 3.3 (B+) = 13.2 points.',
        'Step 4: English: 3 credits × 3.7 (A-) = 11.1 points.',
        'Step 5: Total points = 16.0 + 9.0 + 13.2 + 11.1 = 49.3 points.',
        'Step 6: Total credits = 4 + 3 + 4 + 3 = 14 credits. GPA = 49.3 ÷ 14 = 3.52.'
      ],
      result: 'The semester GPA is 3.52.'
    },
    notes: [
      'Pass/Fail or Audit courses are typically excluded from both grade points and credit hour totals in GPA calculations.',
      'Some high schools use weighted 5.0 scales for AP or Honors courses; standard university GPA uses the unweighted 4.0 benchmark.',
      'A cumulative GPA combines all semesters by dividing all lifetime earned grade points by all lifetime credits.'
    ],
    faqs: [
      {
        question: 'What is the standard 4.0 GPA scale?',
        answer: 'The standard 4.0 scale maps: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, and F = 0.0.'
      },
      {
        question: 'Why are course credits included in GPA calculation?',
        answer: 'Course credits represent the rigor and weekly instructional hours of a class. Weighting by credits ensures that a major 4-credit lecture impacts your academic standing more than a 1-credit lab.'
      },
      {
        question: 'How do I raise my cumulative GPA?',
        answer: 'Earning high grades (A or A-) in courses with higher credit counts will have the largest upward impact on your overall cumulative GPA.'
      }
    ],
    relatedSlugs: ['grade-calculator', 'percentage-calculator', 'ratio-calculator', 'hours-calculator']
  },

  'grade-calculator': {
    slug: 'grade-calculator',
    name: 'Grade Calculator',
    category: 'education',
    badge: 'Weighted & Final Exam',
    icon: 'Award',
    h1: 'Grade Calculator',
    seoTitle: 'Grade Calculator – Weighted Course Grade & Final Exam Calculator',
    seoDescription: 'Free online grade calculator. Calculate current weighted course grades and find what score you need on your final exam to earn your target class grade.',
    primaryKeyword: 'grade calculator',
    secondaryKeywords: ['final grade calculator', 'what grade do I need', 'weighted grade calculator', 'class grade calculator', 'exam grade calculator'],
    heroSubtitle: 'Calculate current weighted course averages and determine the exact score needed on your final exam to achieve your target class grade.',
    about: [
      'The Grade Calculator features two vital academic modes: a Weighted Grade Calculator for combining assignments, quizzes, midterms, and participation, and a Final Exam Calculator that answers the question: "What score do I need on the final exam to get an A (or pass)?"',
      'Teachers and university professors frequently grade courses using percentages with assigned category weights (such as Homework 20%, Midterms 30%, Final 50%). This calculator automates weighted distribution math so you can plan your study time effectively.'
    ],
    formula: {
      title: 'Weighted Grade & Final Exam Formulas',
      formulaText: 'Current Grade = ∑(Assignment Score × Weight) / ∑(Weights)\nRequired Final Score = [Target Grade - (Current Grade × (1 - Final Weight%))] / Final Weight%',
      explanation: 'Multiply each earned score by its category percentage weight. To find the required final score, isolate the remaining uncompleted weight percentage against your target grade.',
      variables: [
        { name: 'Current Grade', desc: 'Average percentage earned on completed coursework' },
        { name: 'Target Grade', desc: 'The minimum course percentage desired (e.g., 90% for an A, 70% for a C)' },
        { name: 'Final Weight', desc: 'Percentage of the overall class grade determined by the final exam' }
      ]
    },
    howToCalculate: [
      'To calculate current course grade: Enter assignments with scores (%) and their respective category weights (%).',
      'To calculate what you need on the final: Switch to "Final Exam Mode", enter your Current Grade, Target Grade, and Final Exam Weight.',
      'Click Calculate to view your required exam score and whether that score is attainable.'
    ],
    example: {
      problem: 'You currently have an 84% in Chemistry. The final exam is worth 25% of your grade. What do you need on the final to finish with an A (90%)?',
      steps: [
        'Step 1: Current grade weight = 100% - 25% = 75% (0.75).',
        'Step 2: Target grade = 90%. Current contribution = 84% × 0.75 = 63%.',
        'Step 3: Points needed from final: 90% - 63% = 27%.',
        'Step 4: Divide by final exam weight: 27% ÷ 0.25 = 108%.'
      ],
      result: 'You need 108% on the final exam (which requires extra credit) to achieve an overall 90% in the class.'
    },
    notes: [
      'If the required final score is over 100%, the target grade is mathematically impossible without extra credit curve points.',
      'Make sure that all category weights sum up to 100% for full syllabus balance.',
      'Different colleges apply different grade boundaries; check your syllabus for specific letter cutoffs.'
    ],
    faqs: [
      {
        question: 'How do you calculate a weighted class grade?',
        answer: 'Multiply each grade category by its weight percentage in decimal form, add all the resulting products together, and divide by the total weight sum.'
      },
      {
        question: 'What do I do if my weights do not add up to 100%?',
        answer: 'The calculator automatically normalizes your entered weights by dividing the total weighted points by the sum of weights entered so far.'
      },
      {
        question: 'How is the final exam score calculated?',
        answer: 'Subtract the grade points you have already secured from your target course grade, then divide the remaining points by the final exam’s weight percentage.'
      }
    ],
    relatedSlugs: ['gpa-calculator', 'percentage-calculator', 'fraction-calculator', 'hours-calculator']
  }
};
