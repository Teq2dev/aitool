/**
 * lib/calculatorData/math.js
 * Comprehensive SEO metadata and educational content for Math calculators.
 */

export const MATH_CALCULATORS = {
  'percentage-calculator': {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    badge: 'Quick Math Tool',
    icon: 'Percent',
    h1: 'Percentage Calculator',
    seoTitle: 'Percentage Calculator – Calculate Percentages Easily Online',
    seoDescription: 'Free online percentage calculator. Calculate percentage of a number, percentage change, increase, decrease, and percentage differences instantly with formulas.',
    primaryKeyword: 'percentage calculator',
    secondaryKeywords: ['calculate percentage', 'percent calculator', 'percentage increase calculator', 'percentage decrease calculator', 'percentage difference'],
    heroSubtitle: 'Calculate percentages of values, percentage increase and decrease, or find what percent one number is of another with instant mathematical precision.',
    about: [
      'The Percentage Calculator is a versatile online tool designed for students, shoppers, accountants, and analysts who need fast, error-free percentage computations. Percentages represent fractions of 100 and form the backbone of everyday quantitative tasks—from calculating sales discounts and retail markups to analyzing financial investment returns and exam test scores.',
      'This tool supports four essential calculation modes: finding a percentage of a total, calculating what percentage one number represents of another, computing the percentage increase or decrease between two numbers, and determining the relative percentage difference between two independent values.'
    ],
    formula: {
      title: 'Standard Percentage Formulas',
      formulaText: 'Percentage = (Part / Whole) × 100\nPercentage of Value = (Percent / 100) × Total\nPercentage Change = ((New Value - Old Value) / |Old Value|) × 100',
      explanation: 'To compute what fraction of a whole a quantity represents, divide the part by the total and multiply by 100. For percentage changes, divide the absolute increase or decrease by the baseline starting value.',
      variables: [
        { name: 'Part', desc: 'The portion or subset value being evaluated' },
        { name: 'Whole', desc: 'The base or total reference quantity' },
        { name: 'Old Value', desc: 'The original baseline quantity before change' },
        { name: 'New Value', desc: 'The updated quantity after change' }
      ]
    },
    howToCalculate: [
      'Select the percentage calculation mode matching your question (e.g., "What is X% of Y" or "Percentage Change").',
      'Enter your known numerical values into the provided input fields.',
      'View the real-time calculated result, formatted formula, and fractional breakdown below.',
      'Use the Copy button to quickly export your result or Reset to perform a new calculation.'
    ],
    example: {
      problem: 'What is 15% of $240, and what is the percentage increase from $200 to $250?',
      steps: [
        'Step 1 (Percentage of value): (15 ÷ 100) × 240 = 0.15 × 240 = 36.',
        'Step 2 (Percentage increase): Difference = 250 - 200 = 50.',
        'Step 3: (50 ÷ 200) × 100 = 0.25 × 100 = 25% increase.'
      ],
      result: '15% of 240 is 36. An increase from 200 to 250 is a 25% gain.'
    },
    notes: [
      'Percentage change always divides by the original starting number, not the final number.',
      'A percentage increase followed by an equivalent percentage decrease does not return to the original value (e.g., +50% then -50% yields 75% of baseline).',
      'To convert a decimal to a percentage, multiply by 100 (e.g., 0.85 = 85%). To convert a percentage to a decimal, divide by 100.'
    ],
    faqs: [
      {
        question: 'How do I calculate a percentage of a number?',
        answer: 'To calculate a percentage of a number, convert the percentage into a decimal by dividing it by 100, then multiply that decimal by the total number. For example, 20% of 150 is (20 / 100) × 150 = 30.'
      },
      {
        question: 'How do I calculate percentage increase between two numbers?',
        answer: 'Subtract the original value from the new value to find the difference. Then divide that difference by the original value and multiply by 100. For instance, from 50 to 75: (75 - 50) / 50 = 25 / 50 = 0.50 × 100 = 50% increase.'
      },
      {
        question: 'What is the difference between percentage change and percentage difference?',
        answer: 'Percentage change is used when there is an "old" and "new" value over time, dividing by the initial value. Percentage difference is used when comparing two concurrent values where neither is the benchmark, dividing the absolute difference by their average.'
      },
      {
        question: 'Can percentage change be negative?',
        answer: 'Yes. If the final value is smaller than the initial value, the percentage change is negative, representing a percentage decrease.'
      }
    ],
    relatedSlugs: ['discount-calculator', 'profit-margin-calculator', 'ratio-calculator', 'gst-calculator']
  },

  'ratio-calculator': {
    slug: 'ratio-calculator',
    name: 'Ratio Calculator',
    category: 'math',
    badge: 'Proportion & Simplification',
    icon: 'Divide',
    h1: 'Ratio Calculator',
    seoTitle: 'Ratio Calculator – Simplify and Solve Ratios Online',
    seoDescription: 'Free online ratio calculator. Simplify ratios to lowest terms, find missing terms in proportions (A:B = C:D), and calculate scaling factors instantly.',
    primaryKeyword: 'ratio calculator',
    secondaryKeywords: ['ratio simplifier', 'simplify ratios', 'equivalent ratio calculator', 'solve proportion', 'aspect ratio calculator'],
    heroSubtitle: 'Simplify two-part ratios to simplest integers, generate equivalent fractions, and solve for missing proportion variables instantly.',
    about: [
      'The Ratio Calculator enables you to simplify ratios to their lowest whole number terms, convert decimal ratios to clean integer proportions, and solve equivalent proportion equations of the form A : B = C : D.',
      'Ratios express the relative size of two or more quantities. They are ubiquitous in recipe scaling, graphic design aspect ratios (such as 16:9 and 4:3), financial balance sheet metrics (current ratio, debt-to-equity), and chemistry solution mixtures.'
    ],
    formula: {
      title: 'Ratio Simplification & Proportion Formulas',
      formulaText: 'Simplified Ratio = (A / GCD(A, B)) : (B / GCD(A, B))\nProportion Equation: A / B = C / D  ⟹  A × D = B × C',
      explanation: 'To simplify a ratio, divide both terms by their Greatest Common Divisor (GCD). In proportions, cross-multiplication allows solving for any single missing variable.',
      variables: [
        { name: 'A & B', desc: 'First antecedent and consequent of the ratio' },
        { name: 'C & D', desc: 'Second antecedent and consequent of the equivalent proportion' },
        { name: 'GCD', desc: 'Greatest Common Divisor between the numbers' }
      ]
    },
    howToCalculate: [
      'To simplify a ratio, input numbers A and B and view the irreducible integer proportion.',
      'To solve a proportion A:B = C:D, enter any three known values and leave the target field empty.',
      'The calculator executes cross-multiplication and reduces terms instantaneously.'
    ],
    example: {
      problem: 'Simplify the ratio 24 : 36, and solve for X in 4 : 5 = X : 25.',
      steps: [
        'Step 1 (Simplification): Find GCD(24, 36) = 12.',
        'Step 2: 24 ÷ 12 = 2, and 36 ÷ 12 = 3. Simplified ratio is 2 : 3.',
        'Step 3 (Proportion): 4 / 5 = X / 25  ⟹  5 × X = 4 × 25 = 100  ⟹  X = 100 ÷ 5 = 20.'
      ],
      result: '24:36 reduces to 2:3. In 4:5 = X:25, X equals 20.'
    },
    notes: [
      'Both sides of a ratio can be multiplied or divided by the same non-zero number without changing its value.',
      'Decimal ratios are automatically multiplied by powers of 10 prior to reduction to guarantee integer outputs.',
      'Ratios represent comparative relationships, not absolute amounts. A 2:3 ratio could describe 2 and 3 items or 200 and 300 items.'
    ],
    faqs: [
      {
        question: 'How do you simplify a ratio to lowest terms?',
        answer: 'Find the Greatest Common Divisor (GCD) of both numbers, then divide both numbers by that GCD. For example, in 15:25, the GCD is 5, so dividing both by 5 gives 3:5.'
      },
      {
        question: 'How do you solve a proportion when one number is unknown?',
        answer: 'Use cross-multiplication: if A/B = C/D, then A × D = B × C. Multiply the diagonal numbers and divide by the remaining number opposite the unknown.'
      },
      {
        question: 'Can ratios contain decimals or fractions?',
        answer: 'While ratios can initially be written with decimals (e.g., 1.5 : 2.5), standard convention is to express them with positive integers by scaling both terms.'
      }
    ],
    relatedSlugs: ['percentage-calculator', 'fraction-calculator', 'pace-calculator', 'profit-margin-calculator']
  },

  'fraction-calculator': {
    slug: 'fraction-calculator',
    name: 'Fraction Calculator',
    category: 'math',
    badge: 'Fraction Operations',
    icon: 'Binary',
    h1: 'Fraction Calculator',
    seoTitle: 'Fraction Calculator – Add, Subtract, Multiply & Divide Fractions',
    seoDescription: 'Free online fraction calculator. Easily add, subtract, multiply, and divide proper, improper, and mixed fractions with step-by-step reduction to simplest form.',
    primaryKeyword: 'fraction calculator',
    secondaryKeywords: ['adding fractions', 'fraction simplifier', 'subtracting fractions', 'multiplying fractions', 'dividing fractions', 'mixed numbers calculator'],
    heroSubtitle: 'Add, subtract, multiply, and divide fractions and mixed numbers with automatic simplification, common denominators, and decimal conversion.',
    about: [
      'The Fraction Calculator provides complete step-by-step solutions for adding, subtracting, multiplying, and dividing mathematical fractions. It handles proper fractions (numerator < denominator), improper fractions (numerator > denominator), and mixed numbers.',
      'Whether you are checking homework, scaling culinary recipes, or computing engineering measurements, this tool reduces results to their simplest irreducible form and displays the decimal equivalent.'
    ],
    formula: {
      title: 'Fraction Arithmetic Rules',
      formulaText: 'Addition: (a/b) + (c/d) = (ad + bc) / bd\nSubtraction: (a/b) - (c/d) = (ad - bc) / bd\nMultiplication: (a/b) × (c/d) = (ac) / (bd)\nDivision: (a/b) ÷ (c/d) = (ad) / (bc)',
      explanation: 'For addition and subtraction, convert to a common denominator before combining numerators. For multiplication, multiply across. For division, multiply by the reciprocal of the second fraction.',
      variables: [
        { name: 'a & c', desc: 'Numerators (top numbers of the fractions)' },
        { name: 'b & d', desc: 'Denominators (bottom numbers, must not equal zero)' }
      ]
    },
    howToCalculate: [
      'Enter the numerator and denominator for your first fraction.',
      'Select the arithmetic operation: Addition (+), Subtraction (-), Multiplication (×), or Division (÷).',
      'Enter the numerator and denominator for your second fraction.',
      'Click Calculate to see the simplified fraction, mixed number, and decimal representation.'
    ],
    example: {
      problem: 'Calculate 3/4 + 2/3.',
      steps: [
        'Step 1: Common denominator is 4 × 3 = 12.',
        'Step 2: Convert numerators: (3 × 3) / 12 = 9/12, and (2 × 4) / 12 = 8/12.',
        'Step 3: Add numerators: 9/12 + 8/12 = 17/12.',
        'Step 4: Convert improper fraction to mixed number: 17 ÷ 12 = 1 with a remainder of 5, giving 1 5/12 (approx 1.4167).'
      ],
      result: '3/4 + 2/3 = 17/12, which equals 1 5/12 or 1.4167.'
    },
    notes: [
      'A denominator can never be zero because division by zero is mathematically undefined.',
      'Negative fractions are standardized with the minus sign in the numerator (e.g., -3/4).',
      'The calculator automatically finds the Greatest Common Divisor to reduce outputs to simplest form.'
    ],
    faqs: [
      {
        question: 'How do you add fractions with different denominators?',
        answer: 'Find a common denominator (often by multiplying the two denominators), adjust both numerators accordingly, add the numerators together, and simplify the resulting fraction.'
      },
      {
        question: 'How do you divide two fractions?',
        answer: 'To divide fractions, multiply the first fraction by the reciprocal (the inverted form) of the second fraction. For example, (1/2) ÷ (3/4) = (1/2) × (4/3) = 4/6 = 2/3.'
      },
      {
        question: 'What is a mixed number?',
        answer: 'A mixed number consists of a whole number combined with a proper fraction, such as 2 1/2, which represents 2 + 1/2 (or 5/2 as an improper fraction).'
      }
    ],
    relatedSlugs: ['percentage-calculator', 'ratio-calculator', 'gpa-calculator', 'grade-calculator']
  }
};
