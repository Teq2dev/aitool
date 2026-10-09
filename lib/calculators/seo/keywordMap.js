/**
 * lib/calculators/seo/keywordMap.js
 * Comprehensive SEO Keyword Mapping for all 24 calculators + the /calculators hub.
 * Structured by search intent, primary keywords, secondary variants, and long-tail query concepts.
 */

export const CALCULATOR_KEYWORD_MAP = {
  'hub': {
    slug: 'hub',
    route: '/calculators',
    name: 'Free Online Calculators Hub',
    searchIntent: 'navigational_commercial',
    primaryKeyword: 'free online calculators',
    secondaryKeywords: [
      'online calculator suite',
      'free math calculators',
      'financial calculator online',
      'all in one calculator',
      'everyday math tools',
      'mobile friendly calculators',
      'browser based calculators',
      'free calculation tools'
    ],
    longTailQueries: [
      'best free online calculators without ads',
      'accurate financial and mortgage calculators online',
      'how to calculate loan payments and compound interest free',
      'fast client-side online calculators mobile friendly',
      'collection of math finance and fitness calculators'
    ],
    topicalAngle: 'Comprehensive, zero-registration browser calculator directory with instant client-side math and privacy-first calculation.',
    relatedEntities: ['Amortization', 'Compound Interest', 'Percentages', 'Body Mass Index', 'Unit Conversions', 'Time Tracking']
  },

  'percentage-calculator': {
    slug: 'percentage-calculator',
    route: '/calculators/percentage-calculator',
    name: 'Percentage Calculator',
    searchIntent: 'informational_utility',
    primaryKeyword: 'percentage calculator',
    secondaryKeywords: [
      'percent calculator',
      'calculate percentage of a number',
      'percentage increase calculator',
      'percentage decrease calculator',
      'percentage difference calculator',
      'how to find percentage',
      'percent change calculator',
      'what percent of a is b'
    ],
    longTailQueries: [
      'how to calculate percentage of two numbers',
      'formula for percent increase and decrease',
      'how to calculate percentage difference between two values',
      'what is x percent of y calculator',
      'easy way to calculate percentages online without sign in'
    ],
    topicalAngle: 'Multi-mode percentage calculator supporting basic percentages, percentage change, relative difference, and reciprocal percentage calculations.',
    relatedEntities: ['Ratios', 'Fractions', 'Discounts', 'Profit Margins', 'Markups']
  },

  'age-calculator': {
    slug: 'age-calculator',
    route: '/calculators/age-calculator',
    name: 'Age Calculator',
    searchIntent: 'informational_utility',
    primaryKeyword: 'age calculator',
    secondaryKeywords: [
      'chronological age calculator',
      'date of birth calculator',
      'calculate age from date of birth',
      'how old am i calculator',
      'age in months and days',
      'exact age calculator',
      'age difference calculator'
    ],
    longTailQueries: [
      'how old am i in days hours and minutes',
      'calculate exact chronological age today',
      'how many days until my next birthday',
      'calculate age between two dates online',
      'accurate leap year age calculation'
    ],
    topicalAngle: 'Precise chronological calendar calculation accounting for leap years, variable month lengths, and exact milestone time breakdowns.',
    relatedEntities: ['Calendar Days', 'Leap Years', 'Date of Birth', 'Time Duration', 'Birthdays']
  },

  'bmi-calculator': {
    slug: 'bmi-calculator',
    route: '/calculators/bmi-calculator',
    name: 'BMI Calculator',
    searchIntent: 'informational_health',
    primaryKeyword: 'BMI calculator',
    secondaryKeywords: [
      'body mass index calculator',
      'calculate BMI online',
      'BMI calculator metric and imperial',
      'healthy weight range calculator',
      'BMI chart adults',
      'BMI categories WHO',
      'ideal body weight'
    ],
    longTailQueries: [
      'how is body mass index calculated from height and weight',
      'what is a healthy BMI for men and women',
      'BMI calculator kg and cm vs lbs and inches',
      'underweight normal overweight obesity BMI thresholds',
      'is BMI accurate for athletes with high muscle mass'
    ],
    topicalAngle: 'World Health Organization (WHO) standardized Body Mass Index evaluations with dual metric and imperial input support and transparent weight status classifications.',
    relatedEntities: ['Body Mass Index', 'WHO Weight Classifications', 'Height and Weight', 'Basal Metabolic Rate', 'Body Composition']
  },

  'loan-calculator': {
    slug: 'loan-calculator',
    route: '/calculators/loan-calculator',
    name: 'Loan Calculator',
    searchIntent: 'transactional_financial',
    primaryKeyword: 'loan calculator',
    secondaryKeywords: [
      'loan payment calculator',
      'monthly loan payment calculator',
      'personal loan calculator',
      'auto loan calculator',
      'loan interest calculator',
      'amortization schedule calculator',
      'installment loan calculator'
    ],
    longTailQueries: [
      'how to calculate monthly payment on personal loan',
      'how much interest will i pay on a car loan',
      'loan amortization schedule monthly breakdown',
      'calculate loan payoff with fixed interest rate',
      'difference between loan interest rate and APR'
    ],
    topicalAngle: 'Standard fixed-rate amortized installment loan computations with detailed principal vs interest breakdowns and complete amortization scheduling.',
    relatedEntities: ['Principal', 'APR', 'Amortization Schedule', 'Monthly Installment', 'Loan Term']
  },

  'emi-calculator': {
    slug: 'emi-calculator',
    route: '/calculators/emi-calculator',
    name: 'EMI Calculator',
    searchIntent: 'transactional_financial',
    primaryKeyword: 'EMI calculator',
    secondaryKeywords: [
      'equated monthly installment calculator',
      'home loan EMI calculator',
      'car loan EMI calculator',
      'personal loan EMI',
      'bank EMI calculation formula',
      'monthly installment calculator',
      'housing loan repayment calculator'
    ],
    longTailQueries: [
      'how to calculate EMI on home loan online',
      'equated monthly installment mathematical formula explained',
      'how does loan tenure affect monthly EMI amount',
      'prepayment impact on home loan EMI and interest',
      'loan interest payment vs principal repayment graph'
    ],
    topicalAngle: 'Global Equated Monthly Installment calculation using diminishing balance formulas with comprehensive total interest and tenure evaluations.',
    relatedEntities: ['Diminishing Balance', 'Tenure', 'Fixed Installment', 'Home Financing', 'Interest Rate']
  },

  'mortgage-calculator': {
    slug: 'mortgage-calculator',
    route: '/calculators/mortgage-calculator',
    name: 'Mortgage Calculator',
    searchIntent: 'transactional_financial',
    primaryKeyword: 'mortgage calculator',
    secondaryKeywords: [
      'home mortgage calculator',
      'monthly mortgage payment calculator',
      'housing payment calculator',
      'mortgage loan calculator with taxes',
      'fixed rate mortgage calculator',
      'home loan payment estimator',
      'mortgage amortization'
    ],
    longTailQueries: [
      'calculate monthly mortgage payment including principal and interest',
      'how much mortgage can i afford on my income',
      '15 year vs 30 year fixed mortgage payment comparison',
      'how does down payment percentage lower mortgage interest',
      'total cost of purchasing a home over 30 years'
    ],
    topicalAngle: 'Comprehensive residential real estate mortgage forecasting with configurable term options, down payment deductions, and complete amortization curves.',
    relatedEntities: ['Down Payment', 'Principal & Interest', 'Home Equity', 'Amortization Table', 'Escrow']
  },

  'compound-interest-calculator': {
    slug: 'compound-interest-calculator',
    route: '/calculators/compound-interest-calculator',
    name: 'Compound Interest Calculator',
    searchIntent: 'informational_investment',
    primaryKeyword: 'compound interest calculator',
    secondaryKeywords: [
      'compound growth calculator',
      'investment interest calculator',
      'compounding calculator online',
      'savings compound interest',
      'annual compound interest calculator',
      'monthly compounding calculator',
      'wealth accumulation calculator'
    ],
    longTailQueries: [
      'how does compounding frequency affect investment returns',
      'formula for compound interest with regular contributions',
      'how to calculate future value of an investment with compound interest',
      'difference between simple interest and compound interest',
      'compound interest calculation over 10 20 30 years'
    ],
    topicalAngle: 'Long-term investment compounding mechanics illustrating the exponential velocity of returns across daily, monthly, quarterly, and annual intervals.',
    relatedEntities: ['Future Value', 'Compounding Frequency', 'Principal Growth', 'Annual Percentage Yield', 'Rule of 72']
  },

  'simple-interest-calculator': {
    slug: 'simple-interest-calculator',
    route: '/calculators/simple-interest-calculator',
    name: 'Simple Interest Calculator',
    searchIntent: 'informational_financial',
    primaryKeyword: 'simple interest calculator',
    secondaryKeywords: [
      'calculate simple interest online',
      'interest formula PRT calculator',
      'short term loan interest calculator',
      'flat interest rate calculator',
      'simple interest yield calculator',
      'total amount simple interest'
    ],
    longTailQueries: [
      'how to calculate simple interest using P x R x T',
      'what is the formula for simple interest on a promissory note',
      'calculate total repayment on simple interest loan',
      'difference between flat rate simple interest and compounding',
      'calculate simple interest for days months and years'
    ],
    topicalAngle: 'Transparent linear interest determination based on principal, annual rate, and duration for promissory notes, short-term advances, and flat-rate lending.',
    relatedEntities: ['PRT Formula', 'Flat Rate Interest', 'Promissory Note', 'Nominal Rate', 'Time Period']
  },

  'gst-calculator': {
    slug: 'gst-calculator',
    route: '/calculators/gst-calculator',
    name: 'GST Calculator',
    searchIntent: 'commercial_financial',
    primaryKeyword: 'GST calculator',
    secondaryKeywords: [
      'goods and services tax calculator',
      'calculate GST online',
      'GST inclusive calculator',
      'GST exclusive calculator',
      'reverse GST calculator',
      'sales tax GST calculator',
      'GST tax rate finder'
    ],
    longTailQueries: [
      'how to calculate GST from gross price inclusive',
      'formula to add GST and remove GST from an invoice',
      'calculate 5% 12% 18% 28% GST online',
      'how to find net base price before GST was added',
      'international GST and VAT calculation differences'
    ],
    topicalAngle: 'Dual-mode taxation calculation enabling instant addition (exclusive) and reverse extraction (inclusive) of Goods and Services Tax across custom and standard rate brackets.',
    relatedEntities: ['Value Added Tax', 'Inclusive Price', 'Exclusive Price', 'Tax Bracket', 'Commercial Invoicing']
  },

  'tax-calculator': {
    slug: 'tax-calculator',
    route: '/calculators/tax-calculator',
    name: 'Tax Calculator',
    searchIntent: 'commercial_financial',
    primaryKeyword: 'tax calculator',
    secondaryKeywords: [
      'sales tax calculator',
      'income tax estimator',
      'flat tax calculator',
      'effective tax rate calculator',
      'total price with tax',
      'tax deduction calculator',
      'calculate tax amount'
    ],
    longTailQueries: [
      'how to calculate total price after sales tax',
      'formula for determining net amount after tax deductions',
      'how to calculate effective tax percentage on total income',
      'calculate state and local sales tax on retail purchases',
      'pre-tax price vs post-tax total mathematical relationship'
    ],
    topicalAngle: 'Flexible multi-rate tax computing module for retail sales tax additions, gross-to-net withholdings, and proportional tax bracket assessments.',
    relatedEntities: ['Sales Tax', 'Gross Income', 'Net Income', 'Effective Rate', 'Withholding']
  },

  'discount-calculator': {
    slug: 'discount-calculator',
    route: '/calculators/discount-calculator',
    name: 'Discount Calculator',
    searchIntent: 'commercial_utility',
    primaryKeyword: 'discount calculator',
    secondaryKeywords: [
      'sale price calculator',
      'percentage off calculator',
      'calculate discount price',
      'retail markdown calculator',
      'savings calculator shopping',
      'double discount calculator',
      'how much do i save'
    ],
    longTailQueries: [
      'how to calculate percentage discount off original price',
      'calculate total money saved on black friday sale',
      'what is 20 percent off 50 dollars calculator',
      'formula to calculate final price after percentage markdown',
      'how to calculate original price before discount was applied'
    ],
    topicalAngle: 'Fast consumer shopping markdown evaluation computing final sale price, total currency savings, and percentage discounts.',
    relatedEntities: ['Retail Markdown', 'List Price', 'Sale Price', 'Coupon Savings', 'Net Cost']
  },

  'profit-margin-calculator': {
    slug: 'profit-margin-calculator',
    route: '/calculators/profit-margin-calculator',
    name: 'Profit Margin Calculator',
    searchIntent: 'commercial_business',
    primaryKeyword: 'profit margin calculator',
    secondaryKeywords: [
      'gross margin calculator',
      'markup calculator',
      'margin vs markup calculator',
      'operating margin calculator',
      'business profit percentage',
      'cost and selling price calculator',
      'net margin calculator'
    ],
    longTailQueries: [
      'difference between profit margin and markup percentage explained',
      'how to calculate gross margin from cost and revenue',
      'formula to calculate selling price for a target profit margin',
      'how to price products for retail profit margin',
      'calculate gross profit and net margin percentage online'
    ],
    topicalAngle: 'Essential commerce unit economics tool distinguishing gross margin from cost markup to prevent under-pricing and margin erosion.',
    relatedEntities: ['Gross Margin', 'Cost Markup', 'Cost of Goods Sold', 'Revenue', 'Operating Profit']
  },

  'salary-calculator': {
    slug: 'salary-calculator',
    route: '/calculators/salary-calculator',
    name: 'Salary Calculator',
    searchIntent: 'informational_career',
    primaryKeyword: 'salary calculator',
    secondaryKeywords: [
      'hourly to salary calculator',
      'salary to hourly wage calculator',
      'annual income to monthly pay',
      'weekly paycheck calculator',
      'wage converter',
      'gross salary breakdown',
      'daily wage calculator'
    ],
    longTailQueries: [
      'how to convert hourly wage to annual salary based on 40 hours',
      'how much is 25 dollars an hour annually full time',
      'calculate gross bi-weekly and monthly pay from annual salary',
      'how many working hours in a standard full time year',
      'convert monthly paycheck to equivalent hourly wage'
    ],
    topicalAngle: 'Multi-cadence compensation conversion mapping annual, monthly, semi-monthly, bi-weekly, weekly, and hourly pay based on configurable weekly hours.',
    relatedEntities: ['Hourly Wage', 'Gross Pay', 'Annual Salary', 'Pay Periods', 'Overtime Baseline']
  },

  'time-calculator': {
    slug: 'time-calculator',
    route: '/calculators/time-calculator',
    name: 'Time Calculator',
    searchIntent: 'informational_utility',
    primaryKeyword: 'time calculator',
    secondaryKeywords: [
      'add time calculator',
      'subtract time calculator',
      'hours and minutes calculator',
      'time duration calculator',
      'time difference calculator',
      'elapsed time calculator',
      'time sum calculator'
    ],
    longTailQueries: [
      'how to add hours minutes and seconds together',
      'calculate duration between two clock times online',
      'convert decimal hours into hours minutes and seconds',
      'how many hours and minutes between 9:30 AM and 5:15 PM',
      'cumulative time tracker calculator for tasks and audio'
    ],
    topicalAngle: 'Sexagesimal (base-60) arithmetic engine for adding, subtracting, and normalizing hours, minutes, and seconds without fractional rounding errors.',
    relatedEntities: ['Base-60 Math', 'Elapsed Time', 'Clock Time', 'Decimal Hours', 'Time Intervals']
  },

  'date-calculator': {
    slug: 'date-calculator',
    route: '/calculators/date-calculator',
    name: 'Date Calculator',
    searchIntent: 'informational_utility',
    primaryKeyword: 'date calculator',
    secondaryKeywords: [
      'days between dates calculator',
      'date difference calculator',
      'add days to date calculator',
      'calendar day counter',
      'calendar duration calculator',
      'how many days until date',
      'business days calculator'
    ],
    longTailQueries: [
      'how many days between two calendar dates',
      'calculate date 90 days from today',
      'exact weeks and days between two dates',
      'subtract days from specific calendar date',
      'accurate leap year calendar date counter'
    ],
    topicalAngle: 'Calendar duration module supporting interval spans between two historical/future dates as well as offset arithmetic (adding/subtracting days).',
    relatedEntities: ['Gregorian Calendar', 'Leap Years', 'Day Count', 'Calendar Span', 'Target Date']
  },

  'hours-calculator': {
    slug: 'hours-calculator',
    route: '/calculators/hours-calculator',
    name: 'Hours Calculator',
    searchIntent: 'commercial_work',
    primaryKeyword: 'hours calculator',
    secondaryKeywords: [
      'work hours calculator',
      'timesheet calculator',
      'time card calculator',
      'calculate hours worked',
      'clock in clock out calculator',
      'work hours with break calculator',
      'weekly work hours tracker'
    ],
    longTailQueries: [
      'how to calculate total hours worked with lunch break subtracted',
      'calculate time card hours from start time to end time',
      'how many billable hours between 8:30 AM and 5:00 PM with 45 min break',
      'convert work hours and minutes to decimal hours for payroll',
      'free timesheet hours calculator mobile friendly'
    ],
    topicalAngle: 'Workplace timesheet productivity tool computing net billable hours between clock-in and clock-out with automatic unpaid break deduction.',
    relatedEntities: ['Timesheet', 'Billable Hours', 'Unpaid Break', 'Decimal Hours', 'Payroll']
  },

  'pace-calculator': {
    slug: 'pace-calculator',
    route: '/calculators/pace-calculator',
    name: 'Pace Calculator',
    searchIntent: 'informational_fitness',
    primaryKeyword: 'pace calculator',
    secondaryKeywords: [
      'running pace calculator',
      'running speed calculator',
      'marathon pace calculator',
      '5k pace calculator',
      'min per km to min per mile',
      'swim pace calculator',
      'cycling speed calculator'
    ],
    longTailQueries: [
      'how to calculate running pace from distance and finish time',
      'convert minutes per kilometer to minutes per mile running',
      'what pace is needed to run a sub 4 hour marathon',
      'calculate target 5k and 10k race pace from training time',
      'relationship between pace in min/km and speed in km/h'
    ],
    topicalAngle: 'Athletic endurance training tool computing time per unit distance (min/km and min/mile) with two-way speed conversion across standard racing distances.',
    relatedEntities: ['Pace vs Speed', 'Marathon Splits', 'Minutes per Kilometer', 'Minutes per Mile', 'Race Time']
  },

  'fuel-cost-calculator': {
    slug: 'fuel-cost-calculator',
    route: '/calculators/fuel-cost-calculator',
    name: 'Fuel Cost Calculator',
    searchIntent: 'commercial_travel',
    primaryKeyword: 'fuel cost calculator',
    secondaryKeywords: [
      'gas cost calculator',
      'trip gas calculator',
      'fuel expense calculator',
      'petrol cost calculator for trip',
      'mileage cost calculator',
      'fuel consumption calculator',
      'road trip cost estimator'
    ],
    longTailQueries: [
      'how to calculate fuel cost for a road trip driving',
      'calculate gas money needed based on distance and MPG',
      'formula to calculate total petrol expense for kilometers driven',
      'how much does driving 500 miles cost in gas',
      'compare fuel consumption in L/100km vs miles per gallon'
    ],
    topicalAngle: 'Vehicle journey budgeting tool supporting dual measurement frameworks (miles/MPG vs kilometers/L-per-100km) with passenger split sharing.',
    relatedEntities: ['Fuel Economy', 'Miles Per Gallon (MPG)', 'Liters per 100km', 'Trip Budget', 'Gas Price']
  },

  'electricity-cost-calculator': {
    slug: 'electricity-cost-calculator',
    route: '/calculators/electricity-cost-calculator',
    name: 'Electricity Cost Calculator',
    searchIntent: 'informational_utility',
    primaryKeyword: 'electricity cost calculator',
    secondaryKeywords: [
      'appliance electricity cost',
      'power consumption calculator',
      'kWh cost calculator',
      'electric bill calculator',
      'kilowatt hour cost calculator',
      'appliance running cost',
      'home energy cost estimator'
    ],
    longTailQueries: [
      'how to calculate the cost to run an air conditioner or space heater',
      'how to convert wattage into kWh on electric bill',
      'formula to calculate daily monthly and yearly appliance electricity cost',
      'how much does a 1500 watt space heater cost to run per hour',
      'calculate electricity expenses using utility rate per kilowatt hour'
    ],
    topicalAngle: 'Household energy efficiency calculator converting appliance wattage and hours of daily usage into periodic electricity bill forecasts.',
    relatedEntities: ['Kilowatt-Hour (kWh)', 'Wattage', 'Utility Electric Rate', 'Appliance Consumption', 'Energy Efficiency']
  },

  'currency-calculator': {
    slug: 'currency-calculator',
    route: '/calculators/currency-calculator',
    name: 'Currency Calculator',
    searchIntent: 'transactional_financial',
    primaryKeyword: 'currency calculator',
    secondaryKeywords: [
      'currency converter online',
      'foreign exchange calculator',
      'forex conversion calculator',
      'live exchange rate converter',
      'money converter calculator',
      'USD to EUR calculator',
      'daily currency exchange rate'
    ],
    longTailQueries: [
      'how to convert foreign currency using official exchange rates',
      'accurate currency conversion using European Central Bank reference rates',
      'calculate direct rate and inverse exchange rate between currencies',
      'how does currency conversion rate rounding work',
      'daily updated currency converter with date transparency'
    ],
    topicalAngle: 'Authoritative international foreign exchange converter powered by European Central Bank reference datasets with complete inverse rates and date stamps.',
    relatedEntities: ['Exchange Rate', 'ECB Reference Rates', 'Direct Rate', 'Inverse Rate', 'Foreign Exchange (Forex)']
  },

  'ratio-calculator': {
    slug: 'ratio-calculator',
    route: '/calculators/ratio-calculator',
    name: 'Ratio Calculator',
    searchIntent: 'informational_math',
    primaryKeyword: 'ratio calculator',
    secondaryKeywords: [
      'simplify ratio calculator',
      'equivalent ratio calculator',
      'proportion calculator',
      'solve for x in ratio',
      'aspect ratio calculator',
      'ratio simplifier online',
      'ratio comparison calculator'
    ],
    longTailQueries: [
      'how to simplify a ratio to lowest terms using greatest common divisor',
      'how to solve proportions A:B = C:D for missing variable X',
      'formula for finding equivalent ratios in math and design',
      'how to calculate aspect ratios for video and screens',
      'step by step ratio simplification calculator online'
    ],
    topicalAngle: 'Mathematical proportion and ratio simplifier utilizing Euclidean GCD algorithms to reduce ratios to lowest integer terms and solve cross-multiplications.',
    relatedEntities: ['Greatest Common Divisor (GCD)', 'Proportions', 'Cross Multiplication', 'Aspect Ratios', 'Equivalent Ratios']
  },

  'fraction-calculator': {
    slug: 'fraction-calculator',
    route: '/calculators/fraction-calculator',
    name: 'Fraction Calculator',
    searchIntent: 'informational_math',
    primaryKeyword: 'fraction calculator',
    secondaryKeywords: [
      'add fractions calculator',
      'fraction simplifier',
      'multiplying fractions calculator',
      'fraction to decimal calculator',
      'subtract fractions calculator',
      'dividing fractions calculator',
      'mixed number fraction calculator'
    ],
    longTailQueries: [
      'how to add and subtract fractions with unlike denominators step by step',
      'find least common denominator LCD for two fractions',
      'how to multiply and divide fractions formula explained',
      'convert improper fractions to mixed numbers and decimals',
      'free fraction calculator with step by step solution steps'
    ],
    topicalAngle: 'Exact rational arithmetic processor executing addition, subtraction, multiplication, and division with Least Common Multiple (LCM) denominator normalization.',
    relatedEntities: ['Numerator and Denominator', 'Least Common Multiple (LCM)', 'Improper Fractions', 'Mixed Numbers', 'GCD Reduction']
  },

  'gpa-calculator': {
    slug: 'gpa-calculator',
    route: '/calculators/gpa-calculator',
    name: 'GPA Calculator',
    searchIntent: 'informational_education',
    primaryKeyword: 'GPA calculator',
    secondaryKeywords: [
      'college GPA calculator',
      'high school GPA calculator',
      'calculate cumulative GPA',
      '4.0 scale GPA calculator',
      'weighted GPA calculator',
      'semester GPA calculator',
      'grade point average online'
    ],
    longTailQueries: [
      'how is grade point average GPA calculated from letter grades',
      'formula to calculate weighted GPA using credit hours',
      'calculate cumulative GPA across multiple college semesters',
      'convert letter grades A B C D F into 4.0 grade points',
      'how do credit hours affect overall GPA calculation'
    ],
    topicalAngle: 'Standard 4.0 collegiate Grade Point Average engine multiplying letter grade points by course credit units to compute exact weighted and cumulative averages.',
    relatedEntities: ['Credit Hours', 'Quality Points', '4.0 Scale', 'Cumulative GPA', 'Semester GPA']
  },

  'grade-calculator': {
    slug: 'grade-calculator',
    route: '/calculators/grade-calculator',
    name: 'Grade Calculator',
    searchIntent: 'informational_education',
    primaryKeyword: 'grade calculator',
    secondaryKeywords: [
      'final grade calculator',
      'test grade calculator',
      'weighted grade calculator',
      'class grade calculator',
      'calculate what i need on my final exam',
      'percentage grade calculator',
      'overall course grade'
    ],
    longTailQueries: [
      'how to calculate current course grade with weighted assignments',
      'what grade do i need on my final exam to pass with an A or B',
      'how to calculate weighted average of homework tests and quizzes',
      'calculate test score percentage from points earned and total points',
      'easy weighted grade calculator for high school and college'
    ],
    topicalAngle: 'Course syllabus weighted average calculator determining current academic standing and target final exam scores required to achieve desired letter grades.',
    relatedEntities: ['Weighted Categories', 'Final Exam Target', 'Letter Grade Scale', 'Syllabus Weights', 'Course Average']
  }
};
