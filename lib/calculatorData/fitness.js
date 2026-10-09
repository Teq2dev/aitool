/**
 * lib/calculatorData/fitness.js
 * Comprehensive SEO metadata and educational content for Fitness & Health calculators.
 */

export const FITNESS_CALCULATORS = {
  'bmi-calculator': {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'fitness',
    badge: 'Body Mass Index',
    icon: 'Activity',
    h1: 'BMI Calculator',
    seoTitle: 'BMI Calculator – Calculate Your Body Mass Index Online',
    seoDescription: 'Free online BMI calculator. Calculate Body Mass Index for adults using metric (cm/kg) or imperial (ft/in/lbs) units. View WHO weight categories & healthy ranges.',
    primaryKeyword: 'BMI calculator',
    secondaryKeywords: ['calculate BMI', 'body mass index calculator', 'BMI calculator for adults', 'healthy weight range', 'metric BMI calculator'],
    heroSubtitle: 'Calculate your Body Mass Index (BMI) using metric or imperial measurements to understand your weight category and healthy weight targets.',
    about: [
      'The Body Mass Index (BMI) Calculator is a standardized screening metric established by the World Health Organization (WHO) to categorize individuals by weight status relative to height. It is widely utilized in epidemiology, general healthcare checkups, and personal fitness monitoring.',
      'BMI is calculated by dividing body weight in kilograms by height in meters squared. The calculator presents your exact score, official WHO classification (underweight, normal weight, overweight, or obesity class), and computes your personalized healthy weight target range.'
    ],
    formula: {
      title: 'Standard BMI Formulas',
      formulaText: 'Metric Formula: BMI = Weight (kg) / [Height (m)]²\nImperial Formula: BMI = 703 × Weight (lbs) / [Height (inches)]²',
      explanation: 'Divide weight by the square of height. For imperial units (pounds and inches), multiply the ratio by conversion factor 703.',
      variables: [
        { name: 'Weight', desc: 'Body weight in kilograms (kg) or pounds (lbs)' },
        { name: 'Height', desc: 'Standing height in centimeters (cm) or feet & inches' },
        { name: '703 Factor', desc: 'Imperial conversion multiplier standard' }
      ]
    },
    howToCalculate: [
      'Choose your preferred unit system: Metric (cm and kg) or Imperial (feet, inches, and pounds).',
      'Input your current standing height and body weight.',
      'Click Calculate to see your BMI score, WHO category, and healthy target weight bracket.',
      'Review the healthy weight range designed for your specific height.'
    ],
    example: {
      problem: 'What is the BMI of an individual who is 175 cm (1.75 m) tall and weighs 70 kg?',
      steps: [
        'Step 1: Square the height in meters: 1.75 × 1.75 = 3.0625 m².',
        'Step 2: Divide weight by squared height: 70 ÷ 3.0625 = 22.86.',
        'Step 3: Compare against WHO thresholds: 22.9 falls within 18.5 – 24.9 (Normal Weight).'
      ],
      result: 'The individual has a BMI of 22.9, which is classified as Normal Weight.'
    },
    notes: [
      'BMI is a population screening indicator and does not differentiate between lean muscle mass and fat tissue.',
      'Athletes, bodybuilders, and pregnant women may register elevated BMI scores that do not reflect excess body fat.',
      'This tool is intended for general educational awareness and should not replace professional clinical evaluation.'
    ],
    faqs: [
      {
        question: 'What is considered a healthy BMI range?',
        answer: 'According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered the normal or healthy weight category for adults.'
      },
      {
        question: 'Why can BMI be misleading for muscular athletes?',
        answer: 'BMI measures total weight relative to height and cannot differentiate muscle from adipose fat. Because muscle is denser than fat, muscular individuals often classify as overweight or obese despite having low body fat.'
      },
      {
        question: 'How do I calculate BMI using pounds and inches?',
        answer: 'Multiply your weight in pounds by 703, then divide by your height in inches squared: BMI = (lbs × 703) / (inches × inches).'
      }
    ],
    relatedSlugs: ['pace-calculator', 'age-calculator', 'percentage-calculator', 'time-calculator']
  },

  'pace-calculator': {
    slug: 'pace-calculator',
    name: 'Pace Calculator',
    category: 'fitness',
    badge: 'Running & Walking',
    icon: 'Footprints',
    h1: 'Pace Calculator',
    seoTitle: 'Pace Calculator – Running Pace, Speed, and Time Calculator',
    seoDescription: 'Free online running pace calculator. Calculate pace per kilometer (min/km), pace per mile (min/mi), and speed (km/h, mph) for 5K, 10K, half marathon, and marathon races.',
    primaryKeyword: 'pace calculator',
    secondaryKeywords: ['running pace calculator', 'marathon pace calculator', 'running speed calculator', '5k pace calculator', 'min per km calculator'],
    heroSubtitle: 'Calculate running and walking pace per kilometer and mile, determine required race splits, and convert between speed and pace instantly.',
    about: [
      'The Pace Calculator is built for runners, joggers, triathletes, and walkers who want to plan training runs or predict race finishes. Pace measures the time required to cover a unit of distance (such as minutes per kilometer or minutes per mile), while speed measures distance covered per unit of time (km/h or mph).',
      'The calculator supports standard race distances including 5K, 10K, Half Marathon (21.0975 km), and Full Marathon (42.195 km), allowing you to determine the target pace needed to achieve your personal best finish goal.'
    ],
    formula: {
      title: 'Pace and Speed Formulas',
      formulaText: 'Pace = Time (seconds) / Distance\nSpeed (km/h) = Distance (km) / Time (hours)\nSpeed (mph) = Distance (miles) / Time (hours)',
      explanation: 'Pace is the inverse of speed: divide total elapsed time in minutes by the total distance covered in kilometers or miles.',
      variables: [
        { name: 'Time', desc: 'Total elapsed duration in hours, minutes, and seconds' },
        { name: 'Distance', desc: 'Total course length in kilometers or miles' },
        { name: 'Pace', desc: 'Time taken per unit distance (min/km or min/mi)' }
      ]
    },
    howToCalculate: [
      'Enter your total course Distance and select the unit (km or miles).',
      'Enter the elapsed or targeted Time (hours, minutes, and seconds).',
      'Click Calculate to view your average pace per kilometer, pace per mile, and speed in km/h and mph.',
      'Adjust times to forecast split requirements for upcoming running races.'
    ],
    example: {
      problem: 'What pace is needed to complete a 10K (10 kilometers) race in 50 minutes?',
      steps: [
        'Step 1: Total time = 50 minutes = 3,000 seconds.',
        'Step 2: Pace per km: 50 minutes ÷ 10 km = 5:00 minutes per kilometer.',
        'Step 3: Distance in miles: 10 km ÷ 1.60934 = 6.2137 miles.',
        'Step 4: Pace per mile: 50 minutes ÷ 6.2137 miles = 8:03 minutes per mile (Speed: 12.0 km/h or 7.46 mph).'
      ],
      result: 'The target pace is 5:00 min/km or 8:03 min/mile.'
    },
    notes: [
      '1 mile equals approximately 1.60934 kilometers. 1 kilometer equals 0.621371 miles.',
      'Pace is formatted as MM:SS (e.g., 4:30 min/km means 4 minutes and 30 seconds).',
      'To convert pace to speed: Speed (km/h) = 60 ÷ Pace (in decimal minutes per km).'
    ],
    faqs: [
      {
        question: 'What is the difference between pace and speed?',
        answer: 'Speed indicates how far you travel in a given time (e.g., kilometers per hour), whereas pace indicates how much time it takes to travel a fixed distance (e.g., minutes per kilometer).'
      },
      {
        question: 'What pace is needed for a sub-4 hour marathon?',
        answer: 'To finish a full marathon (42.195 km / 26.219 miles) under 4 hours, you need an average pace faster than 5:41 min/km or 9:09 min/mile.'
      },
      {
        question: 'How do I convert min/km to min/mile?',
        answer: 'Multiply your pace in minutes per kilometer by 1.60934. For example, 5:00 min/km (5.0) × 1.60934 = 8.046 minutes per mile, which is approximately 8:03 min/mile.'
      }
    ],
    relatedSlugs: ['time-calculator', 'bmi-calculator', 'fuel-cost-calculator', 'hours-calculator']
  }
};
