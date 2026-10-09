/**
 * lib/calculatorData/utilities.js
 * Comprehensive SEO metadata and educational content for Daily Utility calculators.
 */

export const UTILITIES_CALCULATORS = {
  'fuel-cost-calculator': {
    slug: 'fuel-cost-calculator',
    name: 'Fuel Cost Calculator',
    category: 'utilities',
    badge: 'Trip & Gas Budget',
    icon: 'Fuel',
    h1: 'Fuel Cost Calculator',
    seoTitle: 'Fuel Cost Calculator – Gas Trip and Mileage Cost Calculator',
    seoDescription: 'Free online fuel cost calculator. Calculate total gas trip expense, fuel volume needed, and cost per mile or kilometer based on vehicle efficiency and fuel price.',
    primaryKeyword: 'fuel cost calculator',
    secondaryKeywords: ['gas cost calculator', 'fuel consumption calculator', 'trip fuel calculator', 'mileage cost calculator', 'driving cost calculator'],
    heroSubtitle: 'Estimate your road trip fuel costs, calculate liters or gallons needed, and find your cost per kilometer or mile before you travel.',
    about: [
      'The Fuel Cost Calculator helps commuters, road-trippers, and logistics operators forecast fuel expenses for any driving distance. Fuel is one of the highest variable expenses of vehicle ownership, influenced by fluctuating pump prices, highway speeds, and engine efficiency.',
      'This tool supports kilometers with km/L or L/100km, as well as miles with Miles Per Gallon (MPG). It breaks down total fuel volume required, overall trip expenditure, and unit cost per kilometer or mile.'
    ],
    formula: {
      title: 'Fuel Consumption and Cost Formula',
      formulaText: 'Fuel Required (L) = Distance (km) / Efficiency (km/L)\nTotal Trip Cost = Fuel Required × Fuel Price per Unit\nCost per Distance = Total Trip Cost / Distance',
      explanation: 'Divide the total trip distance by vehicle fuel efficiency to find fuel quantity, then multiply by local pump fuel price.',
      variables: [
        { name: 'Distance', desc: 'Length of the journey in kilometers or miles' },
        { name: 'Efficiency', desc: 'Vehicle mileage rating (km/L, L/100km, or MPG)' },
        { name: 'Fuel Price', desc: 'Cost of petrol, diesel, or gas per liter or gallon' }
      ]
    },
    howToCalculate: [
      'Enter total trip Distance (e.g., 350 km).',
      'Select your vehicle efficiency unit (km/L, L/100km, or MPG) and enter your vehicle rating.',
      'Enter the pump fuel price per liter or per gallon.',
      'Click Calculate to see total fuel required, total trip expense, and cost per unit distance.'
    ],
    example: {
      problem: 'What is the fuel cost for a 400 km trip in a car achieving 16 km/L with fuel priced at $1.50 per liter?',
      steps: [
        'Step 1: Fuel needed = 400 km ÷ 16 km/L = 25 liters.',
        'Step 2: Total cost = 25 liters × $1.50/L = $37.50.',
        'Step 3: Cost per kilometer = $37.50 ÷ 400 km = $0.094 per km.'
      ],
      result: 'The trip requires 25 liters of fuel and costs $37.50 ($0.094/km).'
    },
    notes: [
      'Aggressive acceleration, heavy cargo loads, and roof racks can reduce highway fuel efficiency by 15% to 25%.',
      'To convert L/100km to km/L: divide 100 by the L/100km figure (e.g., 8 L/100km = 100 / 8 = 12.5 km/L).',
      'For round trips, multiply one-way distance by 2 before calculating.'
    ],
    faqs: [
      {
        question: 'How do I calculate fuel cost for a road trip?',
        answer: 'Divide the distance by your vehicle’s mileage (km/L or MPG) to find fuel volume needed, then multiply that volume by the fuel price per liter or gallon.'
      },
      {
        question: 'How do you convert MPG to km/L?',
        answer: '1 US MPG is approximately 0.425 km/L. To convert MPG to km/L, multiply the MPG number by 0.425144.'
      },
      {
        question: 'How can I improve my vehicle’s fuel efficiency?',
        answer: 'Maintain recommended tire pressure, observe steady highway speed limits, remove excess trunk weight, and avoid rapid braking and acceleration.'
      }
    ],
    relatedSlugs: ['electricity-cost-calculator', 'pace-calculator', 'time-calculator', 'discount-calculator']
  },

  'electricity-cost-calculator': {
    slug: 'electricity-cost-calculator',
    name: 'Electricity Cost Calculator',
    category: 'utilities',
    badge: 'Appliance & Power Bill',
    icon: 'Zap',
    h1: 'Electricity Cost Calculator',
    seoTitle: 'Electricity Cost Calculator – Appliance Power and Energy Bill Calculator',
    seoDescription: 'Free online electricity cost calculator. Calculate power consumption in kWh and estimated monthly & yearly power bills for home appliances based on wattage.',
    primaryKeyword: 'electricity cost calculator',
    secondaryKeywords: ['electricity usage calculator', 'appliance electricity calculator', 'kWh calculator', 'energy cost calculator', 'power bill calculator'],
    heroSubtitle: 'Calculate power consumption in kilowatt-hours (kWh) and estimate monthly and annual electricity costs for any home appliance.',
    about: [
      'The Electricity Cost Calculator helps homeowners, renters, and facility managers quantify how much electricity household appliances consume and what they cost to run. From air conditioners and space heaters to crypto mining rigs and refrigerator compressors, power consumption can dramatically inflate utility bills.',
      'Enter the appliance wattage, daily runtime hours, and your utility electricity tariff rate per kilowatt-hour (kWh) to receive daily, monthly, and yearly cost projections.'
    ],
    formula: {
      title: 'Kilowatt-Hour and Energy Cost Formulas',
      formulaText: 'Daily Energy (kWh) = (Appliance Watts × Hours per Day) / 1000\nCost = Energy (kWh) × Electricity Rate per kWh\nMonthly Cost = Daily Cost × 30 days\nYearly Cost = Daily Cost × 365 days',
      explanation: 'Convert appliance power rating in watts to kilowatts by dividing by 1,000, multiply by hours of daily operation, and multiply by utility rate per kWh.',
      variables: [
        { name: 'Wattage', desc: 'Rated power consumption of the appliance in Watts (W)' },
        { name: 'Hours/Day', desc: 'Average active runtime per 24-hour cycle' },
        { name: 'Rate ($/kWh)', desc: 'Electricity utility cost per kilowatt-hour' }
      ]
    },
    howToCalculate: [
      'Locate the wattage rating on the appliance label or manual (e.g., 1500W for a space heater).',
      'Enter the estimated hours the appliance operates each day.',
      'Enter your local utility cost per kWh (check your monthly electric bill; standard US rate is ~$0.16/kWh, UK ~£0.28/kWh).',
      'Click Calculate to see daily, monthly, and yearly consumption in kWh and monetary cost.'
    ],
    example: {
      problem: 'What does it cost to run a 1,200 Watt air conditioner for 8 hours daily at a rate of $0.15 per kWh for a 30-day month?',
      steps: [
        'Step 1: Daily kWh: (1,200 W × 8 hours) ÷ 1,000 = 9.6 kWh/day.',
        'Step 2: Monthly energy: 9.6 kWh × 30 days = 288 kWh.',
        'Step 3: Monthly cost: 288 kWh × $0.15/kWh = $43.20.',
        'Step 4: Annual cost: 9.6 kWh × 365 days × $0.15 = $525.60.'
      ],
      result: 'The air conditioner uses 288 kWh per month and costs $43.20 monthly ($525.60 annually).'
    },
    notes: [
      'Appliance labels list maximum peak wattage; appliances with thermostats (like refrigerators and ACs) cycle on and off, reducing average consumption.',
      '1 Kilowatt (kW) = 1,000 Watts (W). 1 Megawatt (MW) = 1,000,000 Watts.',
      'Check your utility bill for tiered or peak time-of-use (TOU) rates during summer and winter.'
    ],
    faqs: [
      {
        question: 'How do you calculate appliance power cost?',
        answer: 'Multiply appliance wattage by daily hours, divide by 1,000 to get daily kWh, and multiply by your utility rate per kWh.'
      },
      {
        question: 'Where can I find the wattage of an appliance?',
        answer: 'Appliance wattage is typically stamped on an electrical certification label located on the back or bottom of the device, or inside the instruction handbook.'
      },
      {
        question: 'Which home appliances use the most electricity?',
        answer: 'Heating and cooling systems (central AC and heat pumps), water heaters, clothes dryers, and electric ovens consume the highest amount of household power.'
      }
    ],
    relatedSlugs: ['fuel-cost-calculator', 'salary-calculator', 'tax-calculator', 'discount-calculator']
  }
};
