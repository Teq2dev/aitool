/**
 * lib/calculatorData/timeDate.js
 * Comprehensive SEO metadata and educational content for Time & Date calculators.
 */

export const TIME_DATE_CALCULATORS = {
  'age-calculator': {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'time-date',
    badge: 'Exact Age & Days',
    icon: 'Calendar',
    h1: 'Age Calculator',
    seoTitle: 'Age Calculator – Calculate Your Exact Age by Date of Birth',
    seoDescription: 'Free online age calculator. Find your exact age in years, months, weeks, days, and hours from your birth date to today or any target date.',
    primaryKeyword: 'age calculator',
    secondaryKeywords: ['calculate age', 'how old am i', 'age calculator by date of birth', 'birthday calculator', 'chronological age calculator'],
    heroSubtitle: 'Calculate your exact age in years, months, days, hours, and find the countdown to your next birthday with calendar precision.',
    about: [
      'The Age Calculator computes your precise chronological age based on your date of birth. While conventional age is stated simply in years, this calculator breaks down your life span into exact years, calendar months, and remaining days, accounting for leap years and fluctuating month lengths.',
      'In addition to current age, the tool allows you to measure age at any specified past or future date—useful for school admissions, legal age verifications, retirement milestones, and passport or visa applications.'
    ],
    formula: {
      title: 'Chronological Age Calculation Method',
      formulaText: 'Years = Target Year - Birth Year (adjusted for month/day)\nMonths = Target Month - Birth Month (adjusted for day)\nDays = Target Day - Birth Day (borrowing days from previous month if negative)',
      explanation: 'Calendar-accurate age calculation accounts for differing month durations (28 to 31 days) and quadrennial leap years, ensuring day-to-day precision.',
      variables: [
        { name: 'Birth Date', desc: 'The starting date of birth' },
        { name: 'Target Date', desc: 'The benchmark date of evaluation (defaults to today)' }
      ]
    },
    howToCalculate: [
      'Enter your date of birth using the day, month, and year selectors.',
      'Optionally specify a target evaluation date (default is today’s date).',
      'Click Calculate to see your exact age in years, months, and days.',
      'Explore total lifespan summaries in months, weeks, days, and the countdown to your next birthday.'
    ],
    example: {
      problem: 'What is the exact age of someone born on June 15, 1995 evaluated on October 8, 2026?',
      steps: [
        'Step 1: Difference in years: 2026 - 1995 = 31 years.',
        'Step 2: Difference in months: October (month 10) - June (month 6) = 4 months.',
        'Step 3: Difference in days: 8 - 15 is negative (-7), so borrow 1 month (leaving 3 months) and add September days (30): 8 + 30 - 15 = 23 days.'
      ],
      result: 'The person is exactly 31 years, 3 months, and 23 days old.'
    },
    notes: [
      'Western age reckoning considers a person 0 years old at birth and increments on each birthday anniversary.',
      'Leap years contain 366 days instead of 365 days; the calculator includes February 29th whenever traversed.',
      'Total hours and total days are computed using standard astronomical calendar day intervals.'
    ],
    faqs: [
      {
        question: 'How does the age calculator handle leap years?',
        answer: 'The calculator checks every calendar year in the range and properly includes February 29th in leap years, ensuring total days and anniversaries are 100% accurate.'
      },
      {
        question: 'Can I calculate how old I will be in a future year?',
        answer: 'Yes. Change the "Age at the Date of" field to any future date to find out your exact age on that date.'
      },
      {
        question: 'How is the next birthday countdown determined?',
        answer: 'The calculator compares today’s date against your upcoming birthday in the current or subsequent calendar year to compute exact days remaining.'
      }
    ],
    relatedSlugs: ['date-calculator', 'time-calculator', 'hours-calculator', 'bmi-calculator']
  },

  'time-calculator': {
    slug: 'time-calculator',
    name: 'Time Calculator',
    category: 'time-date',
    badge: 'Add & Subtract Time',
    icon: 'Clock',
    h1: 'Time Calculator',
    seoTitle: 'Time Calculator – Add and Subtract Hours, Minutes & Seconds',
    seoDescription: 'Free online time calculator. Easily add or subtract time durations in hours, minutes, and seconds. Convert time to decimal hours and clean timecodes.',
    primaryKeyword: 'time calculator',
    secondaryKeywords: ['time duration calculator', 'add time calculator', 'subtract time calculator', 'hours minutes seconds calculator', 'time addition'],
    heroSubtitle: 'Add and subtract time durations in hours, minutes, and seconds with automatic unit overflow and decimal hour conversions.',
    about: [
      'The Time Calculator enables fast addition and subtraction of time intervals expressed in hours, minutes, and seconds. Because time uses base-60 (sexagesimal) arithmetic rather than base-10, adding hours and minutes manually frequently leads to regrouping errors.',
      'This tool automatically handles 60-second and 60-minute rollovers, making it ideal for video editors calculating footage runtime, project managers tracking billable tasks, pilots logging flight durations, and athletes analyzing workout splits.'
    ],
    formula: {
      title: 'Sexagesimal Time Summation Formula',
      formulaText: 'Total Seconds = (H1 × 3600 + M1 × 60 + S1) ± (H2 × 3600 + M2 × 60 + S2)\nHours = ⌊Total Seconds / 3600⌋\nMinutes = ⌊(Total Seconds mod 3600) / 60⌋\nSeconds = Total Seconds mod 60',
      explanation: 'All input time blocks are converted to total seconds, added or subtracted, and then converted back into normalized hours, minutes, and seconds.',
      variables: [
        { name: 'H1, M1, S1', desc: 'Hours, minutes, and seconds of the first duration' },
        { name: 'H2, M2, S2', desc: 'Hours, minutes, and seconds of the second duration' }
      ]
    },
    howToCalculate: [
      'Enter hours, minutes, and seconds for Time 1.',
      'Choose the operation: Add (+) or Subtract (-).',
      'Enter hours, minutes, and seconds for Time 2.',
      'Click Calculate to see the consolidated hours, minutes, seconds, and total decimal hours.'
    ],
    example: {
      problem: 'Add 2 hours 45 minutes 30 seconds and 3 hours 35 minutes 45 seconds.',
      steps: [
        'Step 1: Seconds: 30 + 45 = 75 seconds = 1 minute and 15 seconds.',
        'Step 2: Minutes: 45 + 35 + 1 (carried over) = 81 minutes = 1 hour and 21 minutes.',
        'Step 3: Hours: 2 + 3 + 1 (carried over) = 6 hours.'
      ],
      result: 'The total duration is 6 hours, 21 minutes, and 15 seconds (6.3542 decimal hours).'
    },
    notes: [
      'There are 60 seconds in a minute and 60 minutes in an hour.',
      'To convert minutes to decimal hours, divide the minutes by 60 (e.g., 30 minutes = 0.5 hours).',
      'If subtracting a larger time from a smaller time, the result is displayed as a negative time offset.'
    ],
    faqs: [
      {
        question: 'How do you convert minutes into decimal hours?',
        answer: 'Divide the number of minutes by 60. For example, 45 minutes divided by 60 is 0.75 hours. Therefore, 2 hours and 45 minutes equals 2.75 decimal hours.'
      },
      {
        question: 'What happens when seconds exceed 60?',
        answer: 'Every block of 60 seconds automatically converts into 1 minute and carries over into the minutes column.'
      },
      {
        question: 'Can this tool calculate flight or video editing timecodes?',
        answer: 'Yes. It precisely sums multiple takes, clips, or flight legs in hours, minutes, and seconds.'
      }
    ],
    relatedSlugs: ['hours-calculator', 'date-calculator', 'pace-calculator', 'age-calculator']
  },

  'date-calculator': {
    slug: 'date-calculator',
    name: 'Date Calculator',
    category: 'time-date',
    badge: 'Days Between Dates',
    icon: 'Calendar',
    h1: 'Date Calculator',
    seoTitle: 'Date Calculator – Days Between Dates & Add/Subtract Days',
    seoDescription: 'Free online date calculator. Calculate the exact number of days, weeks, and business days between two dates, or add/subtract days from any date.',
    primaryKeyword: 'date calculator',
    secondaryKeywords: ['date difference calculator', 'days between dates', 'date duration calculator', 'business days calculator', 'add days to date'],
    heroSubtitle: 'Calculate exact calendar days and working business days between two dates, or project future dates by adding or subtracting days.',
    about: [
      'The Date Calculator solves common calendar queries: finding how many days remain between two specific dates, or determining what date occurs a given number of days, weeks, or months into the future or past.',
      'Unlike simple calendar counting, this tool accurately reflects month-end boundary variations, leap years, and separates standard weekend days from Monday-through-Friday business working days—essential for project planning, legal deadlines, notice periods, and event countdowns.'
    ],
    formula: {
      title: 'Date Duration Math',
      formulaText: 'Total Days = (End Date (ms) - Start Date (ms)) / (1000 × 60 × 60 × 24)\nWeeks = ⌊Total Days / 7⌋\nRemaining Days = Total Days mod 7',
      explanation: 'Calculates the epoch timestamp delta between midnight UTC timestamps and counts intervening Monday-through-Friday days for business intervals.',
      variables: [
        { name: 'Start Date', desc: 'The reference beginning date' },
        { name: 'End Date', desc: 'The target completion date' },
        { name: 'Business Days', desc: 'Count of weekdays (Monday through Friday) excluding weekends' }
      ]
    },
    howToCalculate: [
      'Choose Mode: "Days Between Dates" or "Add / Subtract Days".',
      'For Date Difference: Select your Start Date and End Date.',
      'Check "Include End Day" if your timeline requires inclusive boundary counting.',
      'View total days, weeks, remaining days, and Monday-to-Friday business days.'
    ],
    example: {
      problem: 'How many days and business days exist between January 5, 2026 and February 20, 2026?',
      steps: [
        'Step 1: Total calendar days elapsed = 46 days.',
        'Step 2: Equivalent to 6 full weeks and 4 calendar days.',
        'Step 3: Excluding Saturday and Sunday weekends yields 34 business weekdays.'
      ],
      result: 'There are 46 calendar days (34 business days) between the two dates.'
    },
    notes: [
      'Standard date difference calculates full days elapsed between two dates.',
      'Leap years are automatically factored in (2028, 2032, etc. have 29 days in February).',
      'Business day counts do not include official national public holidays as those vary by country.'
    ],
    faqs: [
      {
        question: 'Does the date calculator count both the start date and end date?',
        answer: 'By default, the calculator counts the interval from the start date up to the end date (elapsed time). You can toggle "Include end day" to include both boundary days.'
      },
      {
        question: 'How are business days defined?',
        answer: 'Business days represent Monday through Friday. Saturdays and Sundays are excluded as weekend days.'
      },
      {
        question: 'Can I add business days only?',
        answer: 'The addition tool adds calendar days; to calculate business day project deliverables, factor in 2 weekend days per 5 business days.'
      }
    ],
    relatedSlugs: ['age-calculator', 'time-calculator', 'hours-calculator', 'salary-calculator']
  },

  'hours-calculator': {
    slug: 'hours-calculator',
    name: 'Hours Calculator',
    category: 'time-date',
    badge: 'Time Card & Pay',
    icon: 'Timer',
    h1: 'Hours Calculator',
    seoTitle: 'Hours Calculator – Work Hours and Time Card Calculator',
    seoDescription: 'Free online hours calculator. Calculate total work hours, lunch breaks, decimal hours, and gross pay between start and end times for timesheets.',
    primaryKeyword: 'hours calculator',
    secondaryKeywords: ['time card calculator', 'work hours calculator', 'hours worked calculator', 'timesheet calculator', 'calculate hours between times'],
    heroSubtitle: 'Calculate daily work hours, deduct lunch and rest breaks, convert times to decimal hours, and compute gross earnings for payroll.',
    about: [
      'The Hours Calculator simplifies time tracking for hourly employees, contractors, freelancers, and payroll managers. Converting clock hours into decimal hours (e.g., 7 hours 45 minutes into 7.75 hours) is essential for multiplying by hourly wage rates.',
      'The calculator supports overnight shifts spanning past midnight (such as 10:00 PM to 6:00 AM) and automatically deducts unpaid breaks or lunches to report clean payable hours.'
    ],
    formula: {
      title: 'Time Card Hours & Wage Formula',
      formulaText: 'Gross Minutes = End Time - Start Time (adjusted for overnight shifts)\nNet Minutes = Gross Minutes - Break Minutes\nDecimal Hours = Net Minutes / 60\nTotal Pay = Decimal Hours × Hourly Rate',
      explanation: 'Subtract start time from end time, subtract unpaid break minutes, divide by 60 to obtain decimal hours, and multiply by hourly pay rate.',
      variables: [
        { name: 'Start Time', desc: 'Clock-in time' },
        { name: 'End Time', desc: 'Clock-out time' },
        { name: 'Break', desc: 'Unpaid rest or lunch duration in minutes' },
        { name: 'Hourly Rate', desc: 'Base hourly wage in dollars or local currency' }
      ]
    },
    howToCalculate: [
      'Enter your shift Start Time (e.g., 08:30).',
      'Enter your shift End Time (e.g., 17:00).',
      'Specify any unpaid break time in minutes (e.g., 45 minutes for lunch).',
      'Optionally enter your hourly wage rate to estimate gross pay.',
      'Click Calculate to view net hours, minutes, decimal hours, and total earnings.'
    ],
    example: {
      problem: 'An employee clocks in at 08:30, clocks out at 17:15, takes a 45-minute lunch, and earns $24/hour.',
      steps: [
        'Step 1: Total gross time between 08:30 and 17:15 = 8 hours and 45 minutes (525 minutes).',
        'Step 2: Deduct 45-minute lunch: 525 - 45 = 480 net minutes.',
        'Step 3: Convert to decimal: 480 ÷ 60 = 8.00 decimal hours.',
        'Step 4: Multiply by wage: 8.00 × $24 = $192.00.'
      ],
      result: 'The employee worked 8.00 hours and earned $192.00.'
    },
    notes: [
      'Payroll systems require decimal hours (e.g., 8.25 hours) rather than clock format (8h 15m).',
      'Shifts crossing midnight are detected and calculated seamlessly without negative numbers.',
      'Calculations represent gross wages before statutory income tax and payroll deductions.'
    ],
    faqs: [
      {
        question: 'How do you convert work minutes to decimal hours?',
        answer: 'Divide the number of minutes by 60. For example, 15 minutes is 15/60 = 0.25 hours; 30 minutes is 0.5 hours; and 45 minutes is 0.75 hours.'
      },
      {
        question: 'How does the calculator handle night shifts that cross midnight?',
        answer: 'If the end time is numerically earlier than the start time (e.g., 11:00 PM to 7:00 AM), the calculator automatically adds 24 hours to determine the correct overnight span.'
      },
      {
        question: 'Can I calculate weekly pay using this tool?',
        answer: 'You can calculate each daily shift or use the Salary Calculator for consolidated multi-week pay projections.'
      }
    ],
    relatedSlugs: ['time-calculator', 'salary-calculator', 'date-calculator', 'age-calculator']
  }
};
