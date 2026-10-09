/**
 * lib/calculators/seo/seoSpecs.js
 * Centralized SEO Specifications for all 24 calculators and the /calculators hub.
 * Defines search intent, target audience, intent-driven titles, meta descriptions,
 * H1s, formulas, semantic entities, and related calculator clusters.
 */

import { CALCULATOR_KEYWORD_MAP } from './keywordMap.js';

export const CALCULATOR_SEO_SPECS = {
  'hub': {
    slug: 'hub',
    route: '/calculators',
    name: 'Free Online Calculators',
    category: 'hub',
    searchIntent: 'navigational_commercial',
    targetAudience: 'Students, professionals, homeowners, shoppers, and everyday web users seeking fast browser calculations.',
    title: 'Free Online Calculators – Finance, Math, Fitness & Everyday Tools',
    metaDescription: 'Explore 24 free, fast, and mobile-friendly online calculators for finance, loan payments, compound interest, percentages, age, BMI, and time tracking.',
    h1: 'Free Online Calculators',
    intro: 'A curated directory of 24 free, privacy-first online calculators designed for instant mathematical evaluations with zero account sign-up and no hidden limits.',
    uniqueTopic: 'Zero-latency browser calculation with mobile-responsive design and transparent formula documentation.',
    faqTopics: [
      'Free unlimited usage',
      'Client-side confidentiality and zero telemetry on inputs',
      'Mathematical accuracy and reference standards',
      'Cross-platform mobile optimization'
    ],
    relatedCalculators: [
      'loan-calculator',
      'percentage-calculator',
      'compound-interest-calculator',
      'bmi-calculator',
      'currency-calculator',
      'age-calculator'
    ],
    semanticTerms: ['Amortization', 'Diminishing Balance', 'Compounding', 'Decimal Hours', 'Body Mass Index', 'Rational Numbers']
  },

  'percentage-calculator': {
    slug: 'percentage-calculator',
    route: '/calculators/percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    searchIntent: 'informational_utility',
    targetAudience: 'Students, teachers, business analysts, shoppers, and researchers computing proportions and variations.',
    title: 'Percentage Calculator – Calculate Percentages, Increases & Differences',
    metaDescription: 'Free online percentage calculator. Compute what percent one number is of another, percentage increases, percentage decreases, and relative differences instantly.',
    h1: 'Percentage Calculator',
    intro: 'Calculate percentages, rate changes, and relative values with three distinct mathematical modes designed for business, school, and daily calculations.',
    uniqueTopic: 'Multi-mode percentage evaluation separating standard percentages, percentage increase/decrease, and percentage difference.',
    formulaExplanation: 'Percentage of Value = (Percent ÷ 100) × Base; Percent Change = [(New - Old) ÷ Old] × 100; Percent Difference = [|A - B| ÷ ((A + B) ÷ 2)] × 100.',
    exampleConcept: 'Calculating a 15% discount on an $80 purchase and determining the percentage increase when revenue grows from $50,000 to $65,000.',
    faqTopics: [
      'How to calculate percentage of a number',
      'Difference between percentage change and percentage difference',
      'How to compute negative percentage decreases',
      'Converting percentages to decimals and fractions'
    ],
    relatedCalculators: ['discount-calculator', 'profit-margin-calculator', 'gst-calculator', 'ratio-calculator', 'grade-calculator'],
    semanticTerms: ['Base Value', 'Relative Increase', 'Percentage Point', 'Absolute Difference', 'Fractional Value']
  },

  'age-calculator': {
    slug: 'age-calculator',
    route: '/calculators/age-calculator',
    name: 'Age Calculator',
    category: 'timeDate',
    searchIntent: 'informational_utility',
    targetAudience: 'Individuals verifying exact chronological age for official applications, school admissions, or milestone celebrations.',
    title: 'Age Calculator – Calculate Exact Chronological Age Online',
    metaDescription: 'Free online age calculator. Find your exact chronological age in years, months, weeks, days, hours, and minutes with leap year calendar accuracy.',
    h1: 'Age Calculator',
    intro: 'Determine exact chronological age from your date of birth with precise calendar arithmetic accounting for Gregorian leap years and variable month lengths.',
    uniqueTopic: 'Astronomically and legally accurate chronological calendar spans distinguishing true calendar months from approximate 30-day divisions.',
    formulaExplanation: 'Calculated by subtracting birth year, month, and day from target date with chronological borrow-over algorithms across variable calendar month lengths.',
    exampleConcept: 'Determining exact age in years, months, and days for someone born on July 14, 1995 evaluated against current calendar dates.',
    faqTopics: [
      'How does the calculator account for leap years',
      'Calculating age in total days and hours',
      'Determining days remaining until next birthday',
      'Calculating chronological age difference between two individuals'
    ],
    relatedCalculators: ['date-calculator', 'time-calculator', 'hours-calculator', 'bmi-calculator'],
    semanticTerms: ['Chronological Age', 'Date of Birth', 'Calendar Span', 'Leap Year Compensation', 'Next Birthday Countdown']
  },

  'bmi-calculator': {
    slug: 'bmi-calculator',
    route: '/calculators/bmi-calculator',
    name: 'BMI Calculator',
    category: 'fitness',
    searchIntent: 'informational_health',
    targetAudience: 'Health-conscious individuals, fitness enthusiasts, and clinicians evaluating general body mass classifications.',
    title: 'BMI Calculator – Calculate Body Mass Index for Adults',
    metaDescription: 'Free online BMI calculator. Calculate your Body Mass Index (BMI) using metric or imperial measurements and view WHO healthy weight classifications.',
    h1: 'BMI Calculator',
    intro: 'Evaluate Body Mass Index using World Health Organization (WHO) benchmarks with dual metric (kg/cm) and imperial (lbs/inches) unit support.',
    uniqueTopic: 'Quetelet index relationship to adult weight status and clear medical context regarding muscularity, age, and clinical limitations.',
    formulaExplanation: 'Metric: BMI = weight (kg) ÷ [height (m)]²; Imperial: BMI = [weight (lbs) × 703] ÷ [height (in)]².',
    exampleConcept: 'Evaluating an adult weighing 70 kg at a height of 175 cm producing a normal healthy BMI of 22.86.',
    faqTopics: [
      'What is a healthy BMI range according to WHO',
      'How does BMI differ for muscular athletes and bodybuilders',
      'Converting height between centimeters and feet/inches',
      'Is BMI alone sufficient for health assessment'
    ],
    relatedCalculators: ['pace-calculator', 'age-calculator', 'electricity-cost-calculator'],
    semanticTerms: ['Quetelet Index', 'Body Mass Index', 'Underweight Threshold', 'Normal Weight Range', 'Obesity Categories']
  },

  'loan-calculator': {
    slug: 'loan-calculator',
    route: '/calculators/loan-calculator',
    name: 'Loan Calculator',
    category: 'financial',
    searchIntent: 'transactional_financial',
    targetAudience: 'Borrowers comparing auto financing, personal loans, or business credit lines before signing lender agreements.',
    title: 'Loan Calculator – Estimate Monthly Payments & Total Interest',
    metaDescription: 'Free online loan calculator. Calculate monthly loan payments, total interest costs, and view principal repayment schedules for personal, auto, or business loans.',
    h1: 'Loan Calculator',
    intro: 'Estimate monthly installment loan payments and cumulative interest expenses with standard amortized repayment calculations across configurable loan terms.',
    uniqueTopic: 'Amortization mathematics illustrating how interest-heavy early payments transition to principal reduction over the loan life.',
    formulaExplanation: 'Monthly Payment P = [ r × PV × (1 + r)ⁿ ] ÷ [ (1 + r)ⁿ - 1 ]; Total Interest = (P × n) - PV, where r = Annual Rate ÷ 1200.',
    exampleConcept: 'Borrowing $25,000 at 6.0% APR over a 5-year tenure yielding $483.32 monthly and $3,999.20 total interest.',
    faqTopics: [
      'How lenders calculate monthly amortized payments',
      'Difference between nominal interest rate and APR',
      'How making extra principal prepayments shortens loan duration',
      'Impact of loan term length on cumulative interest'
    ],
    relatedCalculators: ['emi-calculator', 'mortgage-calculator', 'compound-interest-calculator', 'simple-interest-calculator'],
    semanticTerms: ['Principal', 'APR', 'Amortization Curve', 'Repayment Schedule', 'Diminishing Balance']
  },

  'emi-calculator': {
    slug: 'emi-calculator',
    route: '/calculators/emi-calculator',
    name: 'EMI Calculator',
    category: 'financial',
    searchIntent: 'transactional_financial',
    targetAudience: 'Prospective home, car, and personal loan borrowers planning monthly cash flow across international and regional banks.',
    title: 'EMI Calculator – Calculate Equated Monthly Installments Online',
    metaDescription: 'Free online EMI calculator. Calculate equated monthly installments for home loans, car loans, and personal loans with interest breakdowns and repayment schedules.',
    h1: 'EMI Calculator',
    intro: 'Calculate Equated Monthly Installments (EMI) and total interest payable for home, vehicle, and personal loans with complete monthly breakdown schedules.',
    uniqueTopic: 'Equated monthly installment diminishing-balance amortization widely adopted by commercial banking systems worldwide.',
    formulaExplanation: 'EMI = [ P × R × (1 + R)ᴺ ] ÷ [ (1 + R)ᴺ - 1 ], where P is Principal, R is monthly interest rate, and N is tenure in months.',
    exampleConcept: 'Calculating monthly EMI for a $50,000 home renovation loan at 8.5% annual interest over a 10-year repayment term.',
    faqTopics: [
      'What is an Equated Monthly Installment (EMI)',
      'How does loan tenure influence the monthly EMI vs total interest',
      'How to calculate prepayments to eliminate debt faster',
      'Understanding fixed rate vs floating rate EMI adjustments'
    ],
    relatedCalculators: ['loan-calculator', 'mortgage-calculator', 'compound-interest-calculator', 'salary-calculator'],
    semanticTerms: ['Equated Installment', 'Tenure Months', 'Diminishing Principal', 'Interest Outflow', 'Debt Service']
  },

  'mortgage-calculator': {
    slug: 'mortgage-calculator',
    route: '/calculators/mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'financial',
    searchIntent: 'transactional_financial',
    targetAudience: 'Prospective homebuyers, property investors, and mortgage refinancers estimating monthly housing expenditures.',
    title: 'Mortgage Calculator – Estimate Monthly Home Loan Payments',
    metaDescription: 'Free online mortgage calculator. Estimate monthly mortgage payments, down payment deductions, total interest, and loan payoffs for 15-year and 30-year terms.',
    h1: 'Mortgage Calculator',
    intro: 'Plan residential home financing with custom loan amounts, down payments, interest rates, and term durations to understand your true monthly payment commitment.',
    uniqueTopic: 'Real estate mortgage mechanics contrasting short-term interest savings (15-year) with lower monthly obligations (30-year).',
    formulaExplanation: 'Monthly Payment M = P × [ r(1 + r)ⁿ ] ÷ [ (1 + r)ⁿ - 1 ], where P is Home Price minus Down Payment, r is monthly rate, and n is total months.',
    exampleConcept: 'Purchasing a $400,000 home with 20% ($80,000) down at a 6.5% interest rate over a 30-year mortgage term.',
    faqTopics: [
      'How down payment percentage protects against high monthly interest',
      'Comparing 15-year vs 30-year mortgage total costs',
      'What costs are excluded from pure principal and interest calculations',
      'How refinancing affects the remaining amortization schedule'
    ],
    relatedCalculators: ['loan-calculator', 'emi-calculator', 'compound-interest-calculator', 'tax-calculator'],
    semanticTerms: ['Down Payment', 'Principal & Interest (P&I)', 'Home Equity', 'Amortization Term', 'Real Estate Financing']
  },

  'compound-interest-calculator': {
    slug: 'compound-interest-calculator',
    route: '/calculators/compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'financial',
    searchIntent: 'informational_investment',
    targetAudience: 'Retirement savers, long-term investors, and financial planners modeling compound asset accumulation.',
    title: 'Compound Interest Calculator – Forecast Investment Growth',
    metaDescription: 'Free online compound interest calculator. Project investment growth, future wealth value, and compound earnings across daily, monthly, and annual intervals.',
    h1: 'Compound Interest Calculator',
    intro: 'Visualize exponential asset growth by projecting future investment values based on principal deposit, interest rate, time horizon, and compounding frequency.',
    uniqueTopic: 'Exponential growth velocity demonstrating the compounding effect where interest earns interest over prolonged investment horizons.',
    formulaExplanation: 'Future Value A = P × (1 + r ÷ n)^(n × t); Compound Interest = A - P, where n is compounding frequency per year and t is time in years.',
    exampleConcept: 'Investing $10,000 at 7.0% annual interest compounded monthly over 20 years yielding $40,387.39 ($30,387.39 in earned compound interest).',
    faqTopics: [
      'How does compounding frequency (monthly vs annual) change total yield',
      'Difference between simple interest and exponential compound growth',
      'Understanding the Rule of 72 for doubling investment capital',
      'Impact of inflation on long-term compound purchasing power'
    ],
    relatedCalculators: ['simple-interest-calculator', 'loan-calculator', 'salary-calculator', 'profit-margin-calculator'],
    semanticTerms: ['Future Value', 'Compounding Frequency', 'Exponential Growth', 'Annual Percentage Yield (APY)', 'Wealth Accumulation']
  },

  'simple-interest-calculator': {
    slug: 'simple-interest-calculator',
    route: '/calculators/simple-interest-calculator',
    name: 'Simple Interest Calculator',
    category: 'financial',
    searchIntent: 'informational_financial',
    targetAudience: 'Students studying basic finance, short-term lenders, and individuals evaluating flat-rate promissory arrangements.',
    title: 'Simple Interest Calculator – Calculate Linear Interest (I = PRT)',
    metaDescription: 'Free online simple interest calculator. Calculate total interest and final balance using the classic PRT formula for loans, bonds, and promissory notes.',
    h1: 'Simple Interest Calculator',
    intro: 'Compute linear non-compounding interest using the foundational PRT formula for short-term loans, certificates, and promissory notes.',
    uniqueTopic: 'Linear interest accrual where interest is earned exclusively on the principal sum without interest reinvestment.',
    formulaExplanation: 'Interest I = P × R × T; Total Balance A = P + I, where P is Principal, R is annual rate in decimal (Rate ÷ 100), and T is time in years.',
    exampleConcept: 'Lending $5,000 at 5.0% annual simple interest for 3 years producing $750 in total interest and a final repayment balance of $5,750.',
    faqTopics: [
      'How is simple interest calculated using the PRT formula',
      'When is simple interest used instead of compound interest',
      'How to calculate simple interest for fractional periods (months or days)',
      'Difference between flat rate interest and APR'
    ],
    relatedCalculators: ['compound-interest-calculator', 'loan-calculator', 'discount-calculator', 'percentage-calculator'],
    semanticTerms: ['PRT Formula', 'Linear Accrual', 'Nominal Rate', 'Maturity Value', 'Flat Rate Interest']
  },

  'gst-calculator': {
    slug: 'gst-calculator',
    route: '/calculators/gst-calculator',
    name: 'GST Calculator',
    category: 'financial',
    searchIntent: 'commercial_financial',
    targetAudience: 'Small business owners, freelance contractors, accountants, and shoppers calculating commercial sales taxes.',
    title: 'GST Calculator – Add or Remove Goods and Services Tax',
    metaDescription: 'Free online GST calculator. Calculate GST inclusive and exclusive prices, extract base costs, and determine sales tax amounts across standard rate tiers.',
    h1: 'GST Calculator',
    intro: 'Add or remove Goods and Services Tax (GST) from retail goods and invoices with dual inclusive and exclusive calculation capabilities.',
    uniqueTopic: 'Forward tax addition versus reverse tax extraction preventing the common accounting mistake of subtracting flat percentages from gross prices.',
    formulaExplanation: 'GST Exclusive (Adding GST): GST = Base × (Rate ÷ 100), Total = Base + GST. GST Inclusive (Removing GST): Base = Total ÷ (1 + Rate ÷ 100), GST = Total - Base.',
    exampleConcept: 'Adding 18% GST to a $500 product equals $590 total; removing 18% GST from a $590 invoice accurately extracts the original $500 base price.',
    faqTopics: [
      'How to remove GST from a tax-inclusive total price',
      'Why you cannot simply subtract the tax rate percentage from the gross price',
      'Difference between GST inclusive and GST exclusive pricing',
      'Applying custom tax rates for international VAT and sales taxes'
    ],
    relatedCalculators: ['tax-calculator', 'discount-calculator', 'profit-margin-calculator', 'percentage-calculator'],
    semanticTerms: ['Goods and Services Tax', 'Inclusive Price', 'Exclusive Price', 'Reverse Tax Extraction', 'Value Added Tax (VAT)']
  },

  'tax-calculator': {
    slug: 'tax-calculator',
    route: '/calculators/tax-calculator',
    name: 'Tax Calculator',
    category: 'financial',
    searchIntent: 'commercial_financial',
    targetAudience: 'Consumers, business operators, and freelancers calculating sales taxes, flat withholding rates, or post-tax totals.',
    title: 'Tax Calculator – Calculate Sales Tax & Net Amounts',
    metaDescription: 'Free online tax calculator. Calculate sales tax additions, tax deductions, effective tax amounts, and pre-tax or post-tax values instantly.',
    h1: 'Tax Calculator',
    intro: 'Determine sales tax additions and gross-to-net tax withholdings across custom rate percentages for commercial sales and personal budgeting.',
    uniqueTopic: 'Proportional tax evaluations for retail checkout additions and percentage income withholding calculations.',
    formulaExplanation: 'Tax Amount = Pre-Tax Amount × (Tax Rate ÷ 100); Total Post-Tax = Pre-Tax Amount + Tax Amount.',
    exampleConcept: 'Calculating an 8.25% municipal sales tax on a $250 purchase resulting in $20.63 tax and a final transaction total of $270.63.',
    faqTopics: [
      'How to calculate sales tax on purchases',
      'Difference between flat sales tax and progressive income tax brackets',
      'Finding the original price before tax was added',
      'How local and state sales taxes combine on retail invoices'
    ],
    relatedCalculators: ['gst-calculator', 'discount-calculator', 'salary-calculator', 'profit-margin-calculator'],
    semanticTerms: ['Sales Tax', 'Tax Bracket', 'Pre-Tax Baseline', 'Net Amount', 'Withholding Rate']
  },

  'discount-calculator': {
    slug: 'discount-calculator',
    route: '/calculators/discount-calculator',
    name: 'Discount Calculator',
    category: 'financial',
    searchIntent: 'commercial_utility',
    targetAudience: 'Shoppers, retail store owners, and ecommerce managers estimating sale prices and promotional markdown savings.',
    title: 'Discount Calculator – Calculate Sale Price & Money Saved',
    metaDescription: 'Free online discount calculator. Calculate final sale prices, percentage off discounts, and total dollar savings on retail purchases and sales promotions.',
    h1: 'Discount Calculator',
    intro: 'Calculate retail sale prices, percentage discounts, and total cash savings instantly to verify promotional markdowns while shopping.',
    uniqueTopic: 'Percentage markdown mathematics translating retail discounts into exact monetary savings.',
    formulaExplanation: 'Savings = Original Price × (Discount % ÷ 100); Final Sale Price = Original Price - Savings.',
    exampleConcept: 'Evaluating a 30% discount on an item originally priced at $120 yielding $36 in savings and a final purchase price of $84.',
    faqTopics: [
      'How to calculate percentage off an original price in your head',
      'How double discounts (stacking coupons) work mathematically',
      'Calculating the original price from the sale price and discount percentage',
      'Understanding percentage discount vs cash rebate'
    ],
    relatedCalculators: ['percentage-calculator', 'gst-calculator', 'tax-calculator', 'profit-margin-calculator'],
    semanticTerms: ['Sale Price', 'List Price', 'Promotional Markdown', 'Dollar Savings', 'Discount Percentage']
  },

  'profit-margin-calculator': {
    slug: 'profit-margin-calculator',
    route: '/calculators/profit-margin-calculator',
    name: 'Profit Margin Calculator',
    category: 'financial',
    searchIntent: 'commercial_business',
    targetAudience: 'Entrepreneurs, ecommerce merchants, wholesalers, and pricing strategists setting commercial product price points.',
    title: 'Profit Margin Calculator – Calculate Gross Margin & Markup',
    metaDescription: 'Free online profit margin calculator. Calculate gross profit margins, cost markups, revenue, and gross profits to price products accurately and protect profits.',
    h1: 'Profit Margin Calculator',
    intro: 'Determine gross profit margin percentage and cost markup to price merchandise accurately and avoid underpricing your products or services.',
    uniqueTopic: 'The critical business distinction between profit margin (profit divided by revenue) and cost markup (profit divided by cost).',
    formulaExplanation: 'Gross Profit = Revenue - Cost; Profit Margin % = (Gross Profit ÷ Revenue) × 100; Markup % = (Gross Profit ÷ Cost) × 100.',
    exampleConcept: 'Producing an item for $60 and selling it for $100 delivers $40 profit, which equals a 40% profit margin and a 66.67% cost markup.',
    faqTopics: [
      'What is the difference between profit margin and markup percentage',
      'Why a 50% markup does not equal a 50% profit margin',
      'How to calculate the required selling price for a target profit margin',
      'Understanding gross margin vs operating net margin'
    ],
    relatedCalculators: ['discount-calculator', 'percentage-calculator', 'gst-calculator', 'salary-calculator'],
    semanticTerms: ['Gross Profit', 'Cost of Goods Sold (COGS)', 'Revenue', 'Cost Markup', 'Margin Erosion']
  },

  'salary-calculator': {
    slug: 'salary-calculator',
    route: '/calculators/salary-calculator',
    name: 'Salary Calculator',
    category: 'financial',
    searchIntent: 'informational_career',
    targetAudience: 'Job seekers, recruiters, freelance contractors, and wage earners converting compensation across hourly and annual intervals.',
    title: 'Salary Calculator – Convert Hourly Wage to Annual Salary',
    metaDescription: 'Free online salary calculator. Convert hourly wages to annual salary, monthly pay, bi-weekly checks, and weekly earnings based on working hours.',
    h1: 'Salary Calculator',
    intro: 'Convert employment earnings across hourly, daily, weekly, bi-weekly, monthly, and annual pay periods based on standard working schedules.',
    uniqueTopic: 'Full-cadence wage conversion mapping standard 2,080 annual working hours (40 hours/week × 52 weeks) to real periodic paychecks.',
    formulaExplanation: 'Annual Salary = Hourly Rate × Hours per Week × 52; Monthly Pay = Annual ÷ 12; Bi-Weekly Pay = Annual ÷ 26; Weekly Pay = Annual ÷ 52.',
    exampleConcept: 'An hourly rate of $35 at 40 hours per week converts to $1,400 weekly, $2,800 bi-weekly, $6,066.67 monthly, and $72,800 annually.',
    faqTopics: [
      'How to convert hourly rate to annual salary',
      'How many working hours are in a standard full-time year (2,080 hours)',
      'Difference between gross salary and take-home pay',
      'How unpaid time off affects annual salary projections'
    ],
    relatedCalculators: ['hours-calculator', 'loan-calculator', 'tax-calculator', 'profit-margin-calculator'],
    semanticTerms: ['Gross Pay', 'Hourly Rate', 'Annual Salary', 'Pay Period', 'Bi-Weekly Cadence']
  },

  'time-calculator': {
    slug: 'time-calculator',
    route: '/calculators/time-calculator',
    name: 'Time Calculator',
    category: 'timeDate',
    searchIntent: 'informational_utility',
    targetAudience: 'Project managers, pilots, audio/video editors, athletes, and students performing time addition and subtraction.',
    title: 'Time Calculator – Add and Subtract Hours, Minutes & Seconds',
    metaDescription: 'Free online time calculator. Add, subtract, and calculate elapsed time in hours, minutes, and seconds with sexagesimal base-60 mathematical precision.',
    h1: 'Time Calculator',
    intro: 'Add, subtract, and compute elapsed durations across hours, minutes, and seconds with exact base-60 sexagesimal arithmetic without decimal errors.',
    uniqueTopic: 'Base-60 mathematical normalization handling minute and second roll-overs across multiple time intervals cleanly.',
    formulaExplanation: 'Time values are converted to total seconds, arithmetic is executed, and results are decomposed: Hours = floor(S ÷ 3600), Minutes = floor((S % 3600) ÷ 60), Seconds = S % 60.',
    exampleConcept: 'Adding 4 hours 45 minutes to 3 hours 30 minutes accurately yields 8 hours 15 minutes (rather than decimal errors like 8.15).',
    faqTopics: [
      'How to add hours and minutes without fractional errors',
      'Converting decimal hours (e.g. 7.5 hours) into hours and minutes (7h 30m)',
      'Calculating elapsed duration between two specific clock times',
      'How base-60 sexagesimal math operates differently from decimal math'
    ],
    relatedCalculators: ['hours-calculator', 'date-calculator', 'age-calculator', 'pace-calculator'],
    semanticTerms: ['Sexagesimal Arithmetic', 'Base-60 Math', 'Elapsed Time', 'Clock Duration', 'Decimal Hours']
  },

  'date-calculator': {
    slug: 'date-calculator',
    route: '/calculators/date-calculator',
    name: 'Date Calculator',
    category: 'timeDate',
    searchIntent: 'informational_utility',
    targetAudience: 'Event coordinators, legal clerks, project planners, and students calculating day intervals and deadline target dates.',
    title: 'Date Calculator – Days Between Dates & Future Date Finder',
    metaDescription: 'Free online date calculator. Calculate the exact number of days between two calendar dates or add and subtract days to find past and future target dates.',
    h1: 'Date Calculator',
    intro: 'Compute exact day counts between any two calendar dates and find target past or future dates by adding or subtracting calendar days.',
    uniqueTopic: 'Gregorian calendar span calculations factoring leap years, variable month lengths, and exact day offsets.',
    formulaExplanation: 'Date Difference = |Date2 - Date1| in milliseconds ÷ (1000 × 60 × 60 × 24); Offset Date = Date ± (Days × 86,400,000 ms).',
    exampleConcept: 'Calculating the exact 112 days between September 1 and December 21, or finding the target date 90 calendar days from today.',
    faqTopics: [
      'How to calculate the exact number of days between two dates',
      'Adding business days vs calendar days to a starting date',
      'How leap years affect calendar interval calculations',
      'Finding what day of the week a future date falls on'
    ],
    relatedCalculators: ['age-calculator', 'time-calculator', 'hours-calculator'],
    semanticTerms: ['Gregorian Calendar', 'Calendar Offset', 'Day Count Fraction', 'Milestone Date', 'Leap Year Compensation']
  },

  'hours-calculator': {
    slug: 'hours-calculator',
    route: '/calculators/hours-calculator',
    name: 'Hours Calculator',
    category: 'timeDate',
    searchIntent: 'commercial_work',
    targetAudience: 'Hourly employees, freelance professionals, payroll administrators, and contractors calculating billable timesheet hours.',
    title: 'Hours Calculator – Calculate Work Hours & Timesheet Breaks',
    metaDescription: 'Free online hours calculator. Calculate total work hours, timesheet entries, and billable time between start and end times with unpaid break deductions.',
    h1: 'Hours Calculator',
    intro: 'Calculate total work shift hours and net billable payroll time from clock-in to clock-out with automatic unpaid break deductions.',
    uniqueTopic: 'Workplace timesheet precision outputting both standard hours/minutes and decimal hours required for payroll processing.',
    formulaExplanation: 'Gross Minutes = End Time Minutes - Start Time Minutes; Net Minutes = Gross Minutes - Break Minutes; Decimal Hours = Net Minutes ÷ 60.',
    exampleConcept: 'Clocking in at 8:30 AM and clocking out at 5:00 PM with a 45-minute unpaid lunch break equals 7 hours 45 minutes (7.75 decimal hours).',
    faqTopics: [
      'How to convert work hours and minutes to decimal hours for payroll',
      'Calculating overnight work shifts that cross midnight',
      'How unpaid lunch breaks are deducted from total timesheet hours',
      'Tracking weekly cumulative billable hours for freelance invoices'
    ],
    relatedCalculators: ['salary-calculator', 'time-calculator', 'date-calculator'],
    semanticTerms: ['Timesheet', 'Billable Hours', 'Clock In Clock Out', 'Decimal Payroll Hours', 'Unpaid Break Deduction']
  },

  'pace-calculator': {
    slug: 'pace-calculator',
    route: '/calculators/pace-calculator',
    name: 'Pace Calculator',
    category: 'fitness',
    searchIntent: 'informational_fitness',
    targetAudience: 'Runners, triathletes, marathoners, coaches, and cyclists calculating race splits and training speeds.',
    title: 'Pace Calculator – Calculate Running Pace, Speed & Finish Times',
    metaDescription: 'Free online pace calculator. Calculate running pace per kilometer and per mile, speed in km/h or mph, and projected race finish times for 5K, 10K, and marathons.',
    h1: 'Pace Calculator',
    intro: 'Calculate running pace, training speed, and finish times across custom distances and standard race events including 5K, 10K, half-marathons, and marathons.',
    uniqueTopic: 'The reciprocal relationship between pace (time per distance) and speed (distance per time) with dual metric and imperial conversion.',
    formulaExplanation: 'Pace (time/dist) = Total Time ÷ Distance; Speed (dist/time) = Distance ÷ Total Time in hours; Min/Mile = Min/Km × 1.60934.',
    exampleConcept: 'Running a 10K (10 km) in 50 minutes equals a pace of 5:00 min/km (8:03 min/mile) and an average speed of 12.0 km/h (7.46 mph).',
    faqTopics: [
      'Difference between running pace (min/km) and running speed (km/h)',
      'How to convert minutes per kilometer to minutes per mile',
      'Pace required to break a 4-hour marathon (5:41 min/km or 9:09 min/mile)',
      'How to use race splits for negative-split pacing strategies'
    ],
    relatedCalculators: ['bmi-calculator', 'time-calculator', 'fuel-cost-calculator'],
    semanticTerms: ['Pace vs Speed', 'Minutes per Kilometer', 'Minutes per Mile', 'Marathon Splits', 'Endurance Training']
  },

  'fuel-cost-calculator': {
    slug: 'fuel-cost-calculator',
    route: '/calculators/fuel-cost-calculator',
    name: 'Fuel Cost Calculator',
    category: 'utilities',
    searchIntent: 'commercial_travel',
    targetAudience: 'Road trip travelers, rideshare drivers, commuters, and fleet operators estimating vehicle fuel expenditures.',
    title: 'Fuel Cost Calculator – Estimate Trip Gas & Petrol Expenses',
    metaDescription: 'Free online fuel cost calculator. Calculate trip gas money, petrol expenses, and fuel consumption based on distance, vehicle fuel efficiency, and gas prices.',
    h1: 'Fuel Cost Calculator',
    intro: 'Calculate total journey fuel costs and fuel volume required based on driving distance, vehicle fuel efficiency, and local fuel prices.',
    uniqueTopic: 'Dual fuel consumption modeling supporting US imperial (Miles & MPG) and metric (Kilometers & Liters per 100km) with passenger split sharing.',
    formulaExplanation: 'Imperial: Gallons = Distance (mi) ÷ MPG, Cost = Gallons × Price/Gal. Metric: Liters = (Distance (km) ÷ 100) × L/100km, Cost = Liters × Price/Liter.',
    exampleConcept: 'Driving a 300-mile trip in a car achieving 25 MPG with gasoline at $3.50/gallon requires 12 gallons and costs $42.00.',
    faqTopics: [
      'How to calculate fuel cost for a road trip',
      'Converting Miles per Gallon (MPG) to Liters per 100 Kilometers (L/100km)',
      'How highway vs city driving efficiency changes trip gas costs',
      'Splitting road trip gas money fairly among multiple passengers'
    ],
    relatedCalculators: ['electricity-cost-calculator', 'pace-calculator', 'currency-calculator'],
    semanticTerms: ['Fuel Economy', 'Miles Per Gallon (MPG)', 'Liters per 100km', 'Gas Price', 'Road Trip Budget']
  },

  'electricity-cost-calculator': {
    slug: 'electricity-cost-calculator',
    route: '/calculators/electricity-cost-calculator',
    name: 'Electricity Cost Calculator',
    category: 'utilities',
    searchIntent: 'informational_utility',
    targetAudience: 'Homeowners, tenants, energy auditors, and remote workers estimating household appliance power consumption costs.',
    title: 'Electricity Cost Calculator – Estimate Appliance Power Costs',
    metaDescription: 'Free online electricity cost calculator. Calculate appliance power consumption in kWh, electric bill costs per hour, day, month, and year from wattage.',
    h1: 'Electricity Cost Calculator',
    intro: 'Calculate how much household appliances, heaters, computers, and AC units cost to operate per hour, day, month, and year based on wattage and utility rates.',
    uniqueTopic: 'Wattage-to-kilowatt-hour (kWh) conversion modeling periodic utility costs to identify high-draw power hogs in residential homes.',
    formulaExplanation: 'Energy (kWh/day) = [Power (Watts) × Hours/day] ÷ 1000; Daily Cost = kWh/day × Rate/kWh; Monthly Cost = Daily Cost × 30.42; Annual Cost = Daily Cost × 365.',
    exampleConcept: 'Operating a 1,500-watt space heater for 6 hours daily at an electric rate of $0.15/kWh uses 9.0 kWh/day costing $1.35 daily ($41.07 monthly).',
    faqTopics: [
      'How to calculate the cost to run an electrical appliance from wattage',
      'How wattage converts to kilowatt-hours (kWh) on utility bills',
      'Typical electricity consumption of refrigerators, air conditioners, and PCs',
      'Strategies to reduce residential appliance electricity costs'
    ],
    relatedCalculators: ['fuel-cost-calculator', 'currency-calculator', 'tax-calculator'],
    semanticTerms: ['Kilowatt-Hour (kWh)', 'Wattage', 'Utility Electricity Rate', 'Power Consumption', 'Energy Efficiency']
  },

  'currency-calculator': {
    slug: 'currency-calculator',
    route: '/calculators/currency-calculator',
    name: 'Currency Calculator',
    category: 'financial',
    searchIntent: 'transactional_financial',
    targetAudience: 'International travelers, ecommerce buyers, remote cross-border freelancers, and forex market observers.',
    title: 'Currency Calculator – Convert Exchange Rates Online',
    metaDescription: 'Free online currency converter. Convert between major global currencies with official European Central Bank reference exchange rates and live rate dates.',
    h1: 'Currency Calculator',
    intro: 'Convert international currencies with institutional exchange rate benchmarks, transparent publication dates, and direct and inverse rate comparisons.',
    uniqueTopic: 'Transparent European Central Bank (ECB) reference rates detailing middle-market benchmarks without hidden retail bank markups.',
    formulaExplanation: 'Converted Amount = Source Amount × (Target Rate ÷ Source Rate); Direct Rate = Target Rate ÷ Source Rate; Inverse Rate = Source Rate ÷ Target Rate.',
    exampleConcept: 'Converting 500 USD to EUR at an ECB reference rate of 0.9200 yields 460.00 EUR with an inverse rate of 1 EUR = 1.0870 USD.',
    faqTopics: [
      'What are European Central Bank (ECB) reference rates',
      'Difference between interbank reference rates and consumer retail exchange rates',
      'How inverse currency rates are calculated',
      'Why weekend exchange rates reflect the preceding business day'
    ],
    relatedCalculators: ['loan-calculator', 'fuel-cost-calculator', 'electricity-cost-calculator', 'salary-calculator'],
    semanticTerms: ['ECB Reference Rate', 'Foreign Exchange (Forex)', 'Direct Exchange Rate', 'Inverse Rate', 'Currency Pair']
  },

  'ratio-calculator': {
    slug: 'ratio-calculator',
    route: '/calculators/ratio-calculator',
    name: 'Ratio Calculator',
    category: 'math',
    searchIntent: 'informational_math',
    targetAudience: 'Students, graphic designers, video editors, bakers, and engineers simplifying ratios and solving proportional equations.',
    title: 'Ratio Calculator – Simplify Ratios & Solve Proportions (A:B = C:D)',
    metaDescription: 'Free online ratio calculator. Simplify ratios to simplest integer terms using GCD and solve for missing variables in proportions (A:B = C:D) with step-by-step math.',
    h1: 'Ratio Calculator',
    intro: 'Simplify ratios to lowest whole number terms using Euclidean GCD algorithms and solve for unknown values in proportions (A:B = C:D) instantly.',
    uniqueTopic: 'Dual-mode proportion solving and integer ratio reduction applied across academic mathematics, screen aspect ratios, and culinary scaling.',
    formulaExplanation: 'Simplification: Reduced A = A ÷ GCD(A, B), Reduced B = B ÷ GCD(A, B). Proportion: If A/B = C/D, then D = (B × C) ÷ A.',
    exampleConcept: 'Simplifying a 24:36 ratio divides both terms by their GCD (12) producing 2:3; solving 4:5 = 12:X yields X = 15.',
    faqTopics: [
      'How to simplify a ratio to lowest terms using the Greatest Common Divisor',
      'How to solve for missing variable X in a proportion equation',
      'Difference between ratios, fractions, and proportions',
      'How aspect ratios (16:9, 4:3) are calculated for screens and video'
    ],
    relatedCalculators: ['fraction-calculator', 'percentage-calculator', 'grade-calculator'],
    semanticTerms: ['Greatest Common Divisor (GCD)', 'Proportions', 'Cross Multiplication', 'Aspect Ratio', 'Lowest Terms']
  },

  'fraction-calculator': {
    slug: 'fraction-calculator',
    route: '/calculators/fraction-calculator',
    name: 'Fraction Calculator',
    category: 'math',
    searchIntent: 'informational_math',
    targetAudience: 'Elementary to college math students, educators, carpenters, and chefs executing precise fractional arithmetic.',
    title: 'Fraction Calculator – Add, Subtract, Multiply & Divide Fractions',
    metaDescription: 'Free online fraction calculator. Add, subtract, multiply, and divide fractions with unlike denominators, LCM normalization, and mixed number simplification.',
    h1: 'Fraction Calculator',
    intro: 'Perform addition, subtraction, multiplication, and division on fractions with automatic Least Common Denominator (LCD) resolution and simplest term reduction.',
    uniqueTopic: 'Exact rational fraction arithmetic maintaining true fractional precision without imprecise floating-point decimals.',
    formulaExplanation: 'Add/Sub: (A/B) ± (C/D) = (A·D ± B·C) ÷ (B·D); Mult: (A/B) × (C/D) = (A·C) ÷ (B·D); Div: (A/B) ÷ (C/D) = (A·D) ÷ (B·C), reduced by GCD.',
    exampleConcept: 'Adding 2/3 and 3/4 normalizes to a common denominator of 12 resulting in (8 + 9)/12 = 17/12 (or 1 and 5/12 as a mixed number).',
    faqTopics: [
      'How to add and subtract fractions with different denominators',
      'How to find the Least Common Multiple (LCM) of two denominators',
      'How multiplying fractions differs from adding fractions',
      'Converting improper fractions to mixed numbers and decimals'
    ],
    relatedCalculators: ['ratio-calculator', 'percentage-calculator', 'grade-calculator'],
    semanticTerms: ['Numerator and Denominator', 'Least Common Multiple (LCM)', 'Improper Fraction', 'Mixed Number', 'Rational Arithmetic']
  },

  'gpa-calculator': {
    slug: 'gpa-calculator',
    route: '/calculators/gpa-calculator',
    name: 'GPA Calculator',
    category: 'education',
    searchIntent: 'informational_education',
    targetAudience: 'High school, college, and university students calculating semester and cumulative Grade Point Averages.',
    title: 'GPA Calculator – Calculate College & High School GPA (4.0 Scale)',
    metaDescription: 'Free online GPA calculator. Calculate semester and cumulative Grade Point Average on the standard 4.0 scale with credit hour weightings and grade point conversions.',
    h1: 'GPA Calculator',
    intro: 'Calculate semester and cumulative Grade Point Average (GPA) on the standard 4.0 collegiate grading scale weighted by course credit hours.',
    uniqueTopic: 'Standard collegiate quality point systems where courses with higher credit units carry proportional weight in overall academic standing.',
    formulaExplanation: 'Grade Points per Course = Course Credits × Grade Value (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0); Overall GPA = Total Grade Points ÷ Total Credit Hours.',
    exampleConcept: 'Completing a 4-credit course with an A (16.0 pts) and a 3-credit course with a B (9.0 pts) totals 25.0 points across 7 credits = 3.57 GPA.',
    faqTopics: [
      'How Grade Point Average (GPA) is calculated using credit hours',
      'Standard letter grade to grade point scale conversions (A, B, C, D, F)',
      'Difference between weighted GPA and unweighted GPA',
      'How to calculate cumulative GPA by combining previous semesters'
    ],
    relatedCalculators: ['grade-calculator', 'percentage-calculator', 'hours-calculator'],
    semanticTerms: ['Grade Point Average', 'Credit Hours', 'Quality Points', '4.0 Grading Scale', 'Cumulative Standing']
  },

  'grade-calculator': {
    slug: 'grade-calculator',
    route: '/calculators/grade-calculator',
    name: 'Grade Calculator',
    category: 'education',
    searchIntent: 'informational_education',
    targetAudience: 'Students tracking course grades and calculating target final exam scores needed to achieve passing or honor grades.',
    title: 'Grade Calculator – Calculate Course Grades & Final Exam Targets',
    metaDescription: 'Free online grade calculator. Calculate current course weighted grades and determine what score you need on your final exam to achieve your target letter grade.',
    h1: 'Grade Calculator',
    intro: 'Determine current course averages across weighted assignments and calculate the exact exam score required on your final test to secure your goal grade.',
    uniqueTopic: 'Weighted syllabus grade mechanics and required final exam target forecasting based on remaining course weight.',
    formulaExplanation: 'Weighted Grade = Σ (Grade_i × Weight_i) ÷ Σ Weight_i; Required Final Exam Score = [ Target Grade - (Current Grade × (1 - Final Weight)) ] ÷ Final Weight.',
    exampleConcept: 'Holding an 85% average going into a final exam worth 25% of the total grade requires an 85% on the final to maintain a B (85%) overall.',
    faqTopics: [
      'How to calculate a weighted course grade using syllabus categories',
      'How to determine what score you need on the final exam to pass or get an A',
      'What happens if course weights do not add up to 100%',
      'Converting percentage scores into letter grades'
    ],
    relatedCalculators: ['gpa-calculator', 'percentage-calculator', 'ratio-calculator'],
    semanticTerms: ['Weighted Average', 'Syllabus Categories', 'Final Exam Target', 'Letter Grade Scale', 'Course Standing']
  }
};
