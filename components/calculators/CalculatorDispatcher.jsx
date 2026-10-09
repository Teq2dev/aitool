'use client';

import dynamic from 'next/dynamic';

// Dynamic lazy imports with skeleton fallbacks for optimal loading speed
const PercentageCalculator = dynamic(() => import('./PercentageCalculator'), { ssr: false });
const AgeCalculator = dynamic(() => import('./AgeCalculator'), { ssr: false });
const BmiCalculator = dynamic(() => import('./BmiCalculator'), { ssr: false });
const LoanCalculator = dynamic(() => import('./LoanCalculator'), { ssr: false });
const EmiCalculator = dynamic(() => import('./EmiCalculator'), { ssr: false });
const MortgageCalculator = dynamic(() => import('./MortgageCalculator'), { ssr: false });
const CompoundInterestCalculator = dynamic(() => import('./CompoundInterestCalculator'), { ssr: false });
const SimpleInterestCalculator = dynamic(() => import('./SimpleInterestCalculator'), { ssr: false });
const GstCalculator = dynamic(() => import('./GstCalculator'), { ssr: false });
const TaxCalculator = dynamic(() => import('./TaxCalculator'), { ssr: false });
const DiscountCalculator = dynamic(() => import('./DiscountCalculator'), { ssr: false });
const ProfitMarginCalculator = dynamic(() => import('./ProfitMarginCalculator'), { ssr: false });
const SalaryCalculator = dynamic(() => import('./SalaryCalculator'), { ssr: false });
const TimeCalculator = dynamic(() => import('./TimeCalculator'), { ssr: false });
const DateCalculator = dynamic(() => import('./DateCalculator'), { ssr: false });
const HoursCalculator = dynamic(() => import('./HoursCalculator'), { ssr: false });
const PaceCalculator = dynamic(() => import('./PaceCalculator'), { ssr: false });
const FuelCostCalculator = dynamic(() => import('./FuelCostCalculator'), { ssr: false });
const ElectricityCostCalculator = dynamic(() => import('./ElectricityCostCalculator'), { ssr: false });
const CurrencyCalculator = dynamic(() => import('./CurrencyCalculator'), { ssr: false });
const RatioCalculator = dynamic(() => import('./RatioCalculator'), { ssr: false });
const FractionCalculator = dynamic(() => import('./FractionCalculator'), { ssr: false });
const GpaCalculator = dynamic(() => import('./GpaCalculator'), { ssr: false });
const GradeCalculator = dynamic(() => import('./GradeCalculator'), { ssr: false });

export default function CalculatorDispatcher({ slug }) {
  switch (slug) {
    case 'percentage-calculator':
      return <PercentageCalculator />;
    case 'age-calculator':
      return <AgeCalculator />;
    case 'bmi-calculator':
      return <BmiCalculator />;
    case 'loan-calculator':
      return <LoanCalculator />;
    case 'emi-calculator':
      return <EmiCalculator />;
    case 'mortgage-calculator':
      return <MortgageCalculator />;
    case 'compound-interest-calculator':
      return <CompoundInterestCalculator />;
    case 'simple-interest-calculator':
      return <SimpleInterestCalculator />;
    case 'gst-calculator':
      return <GstCalculator />;
    case 'tax-calculator':
      return <TaxCalculator />;
    case 'discount-calculator':
      return <DiscountCalculator />;
    case 'profit-margin-calculator':
      return <ProfitMarginCalculator />;
    case 'salary-calculator':
      return <SalaryCalculator />;
    case 'time-calculator':
      return <TimeCalculator />;
    case 'date-calculator':
      return <DateCalculator />;
    case 'hours-calculator':
      return <HoursCalculator />;
    case 'pace-calculator':
      return <PaceCalculator />;
    case 'fuel-cost-calculator':
      return <FuelCostCalculator />;
    case 'electricity-cost-calculator':
      return <ElectricityCostCalculator />;
    case 'currency-calculator':
      return <CurrencyCalculator />;
    case 'ratio-calculator':
      return <RatioCalculator />;
    case 'fraction-calculator':
      return <FractionCalculator />;
    case 'gpa-calculator':
      return <GpaCalculator />;
    case 'grade-calculator':
      return <GradeCalculator />;
    default:
      return null;
  }
}
