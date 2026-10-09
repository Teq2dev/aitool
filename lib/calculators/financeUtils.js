/**
 * lib/calculators/financeUtils.js
 * Comprehensive financial calculation utilities for Loan, EMI, Mortgage,
 * Compound Interest, Simple Interest, GST, Tax, Discount, Profit Margin, Salary, and Currency.
 */

// --- 1. LOAN & EMI CALCULATORS ---

export function calculateLoanOrEmi({ principal, annualRate, termValue, termUnit = 'years', frequency = 'monthly' }) {
  const P = Number(principal);
  const R = Number(annualRate);
  const term = Number(termValue);

  if (isNaN(P) || isNaN(R) || isNaN(term) || P <= 0 || term <= 0 || R < 0) {
    return null;
  }

  // Convert term to months
  const totalMonths = termUnit === 'years' ? Math.round(term * 12) : Math.round(term);
  if (totalMonths <= 0) return null;

  // Monthly rate
  const monthlyRate = (R / 100) / 12;

  let emi = 0;
  if (monthlyRate === 0) {
    emi = P / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    emi = (P * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - P);

  // Generate 12-month summary amortization schedule
  const schedule = [];
  let balance = P;
  for (let m = 1; m <= Math.min(totalMonths, 60); m++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = emi - interestPayment;
    balance = Math.max(0, balance - principalPayment);
    schedule.push({
      month: m,
      payment: Number(emi.toFixed(2)),
      principal: Number(principalPayment.toFixed(2)),
      interest: Number(interestPayment.toFixed(2)),
      balance: Number(balance.toFixed(2))
    });
  }

  return {
    monthlyPayment: Number(emi.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    principal: P,
    interestRatio: Number(((totalInterest / totalPayment) * 100).toFixed(1)),
    principalRatio: Number(((P / totalPayment) * 100).toFixed(1)),
    totalMonths,
    schedule
  };
}


// --- 2. MORTGAGE CALCULATOR ---

export function calculateMortgage({ homePrice, downPayment, downPaymentType = 'amount', annualRate, loanTermYears, propertyTaxYearly = 0, insuranceYearly = 0, hoaMonthly = 0 }) {
  const price = Number(homePrice);
  const dpVal = Number(downPayment);
  const rate = Number(annualRate);
  const termYears = Number(loanTermYears);

  const propTax = Number(propertyTaxYearly) || 0;
  const insYear = Number(insuranceYearly) || 0;
  const hoa = Number(hoaMonthly) || 0;

  if (isNaN(price) || isNaN(rate) || isNaN(termYears) || price <= 0 || termYears <= 0 || rate < 0 || propTax < 0 || insYear < 0 || hoa < 0) {
    return null;
  }

  const downPaymentAmount = downPaymentType === 'percent'
    ? (price * (dpVal / 100))
    : (isNaN(dpVal) ? 0 : dpVal);

  if (downPaymentAmount < 0 || downPaymentAmount >= price) {
    return null;
  }

  const principal = price - downPaymentAmount;

  const baseLoan = calculateLoanOrEmi({
    principal,
    annualRate: rate,
    termValue: termYears,
    termUnit: 'years'
  });

  if (!baseLoan) return null;

  const monthlyTax = propTax / 12;
  const monthlyInsurance = insYear / 12;
  const monthlyHoa = hoa;

  const totalMonthlyCost = baseLoan.monthlyPayment + monthlyTax + monthlyInsurance + monthlyHoa;

  return {
    principalAndInterest: baseLoan.monthlyPayment,
    monthlyTax: Number(monthlyTax.toFixed(2)),
    monthlyInsurance: Number(monthlyInsurance.toFixed(2)),
    monthlyHoa: Number(monthlyHoa.toFixed(2)),
    totalMonthlyPayment: Number(totalMonthlyCost.toFixed(2)),
    loanPrincipal: principal,
    downPaymentAmount: Number(downPaymentAmount.toFixed(2)),
    downPaymentPercent: Number(((downPaymentAmount / price) * 100).toFixed(1)),
    totalInterest: baseLoan.totalInterest,
    totalMortgageCost: Number((totalMonthlyCost * termYears * 12).toFixed(2))
  };
}


// --- 3. COMPOUND INTEREST CALCULATOR ---

export function calculateCompoundInterest({ principal, annualRate, timeYears, compoundingFreq = 12, additionalContribution = 0, contributionFreq = 'monthly' }) {
  const P = Number(principal);
  const r = Number(annualRate) / 100;
  const t = Number(timeYears);
  const rawN = Number(compoundingFreq);
  const n = (isNaN(rawN) || rawN <= 0) ? 12 : rawN;
  const PMT = Number(additionalContribution) || 0;

  if (isNaN(P) || isNaN(r) || isNaN(t) || P < 0 || t <= 0 || r < 0 || PMT < 0) {
    return null;
  }

  // Monthly breakdown simulation
  const months = Math.round(t * 12);
  let currentBalance = P;
  let totalDeposited = P;

  const yearlyBreakdown = [];
  const ratePerMonth = r === 0 ? 0 : Math.pow(1 + r / n, n / 12) - 1;

  for (let m = 1; m <= months; m++) {
    currentBalance += PMT;
    totalDeposited += PMT;
    currentBalance *= (1 + ratePerMonth);

    if (m % 12 === 0 || m === months) {
      yearlyBreakdown.push({
        year: Math.ceil(m / 12),
        balance: Number(currentBalance.toFixed(2)),
        deposited: Number(totalDeposited.toFixed(2)),
        interest: Number((currentBalance - totalDeposited).toFixed(2))
      });
    }
  }

  const futureValue = currentBalance;
  const totalInterest = Math.max(0, futureValue - totalDeposited);

  return {
    futureValue: Number(futureValue.toFixed(2)),
    totalDeposited: Number(totalDeposited.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    interestRatio: futureValue > 0 ? Number(((totalInterest / futureValue) * 100).toFixed(1)) : 0,
    yearlyBreakdown
  };
}


// --- 4. SIMPLE INTEREST CALCULATOR ---

export function calculateSimpleInterest({ principal, annualRate, timeYears }) {
  const P = Number(principal);
  const R = Number(annualRate);
  const T = Number(timeYears);

  if (isNaN(P) || isNaN(R) || isNaN(T) || P < 0 || R < 0 || T < 0) {
    return null;
  }

  const interest = (P * R * T) / 100;
  const totalAmount = P + interest;

  return {
    interest: Number(interest.toFixed(2)),
    totalAmount: Number(totalAmount.toFixed(2)),
    principal: P,
    formula: `(${P} × ${R}% × ${T}) / 100 = ${interest.toFixed(2)}`
  };
}


// --- 5. GST CALCULATOR ---

export function calculateGst({ amount, gstRate, mode = 'exclusive' }) {
  const amt = Number(amount);
  const rate = Number(gstRate);

  if (isNaN(amt) || isNaN(rate) || amt < 0 || rate < 0) {
    return null;
  }

  if (mode === 'inclusive') {
    // Amount includes GST
    const baseAmount = amt / (1 + rate / 100);
    const gstAmount = amt - baseAmount;
    return {
      baseAmount: Number(baseAmount.toFixed(2)),
      gstAmount: Number(gstAmount.toFixed(2)),
      totalAmount: Number(amt.toFixed(2)),
      cgst: Number((gstAmount / 2).toFixed(2)),
      sgst: Number((gstAmount / 2).toFixed(2)),
      rate
    };
  } else {
    // Amount excludes GST (Exclusive)
    const gstAmount = amt * (rate / 100);
    const totalAmount = amt + gstAmount;
    return {
      baseAmount: Number(amt.toFixed(2)),
      gstAmount: Number(gstAmount.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      cgst: Number((gstAmount / 2).toFixed(2)),
      sgst: Number((gstAmount / 2).toFixed(2)),
      rate
    };
  }
}


// --- 6. TAX CALCULATOR (GENERIC ESTIMATOR) ---

export function calculateTax({ income, deductions = 0, filingStatus = 'single' }) {
  const inc = Number(income);
  const ded = Number(deductions) || 0;

  if (isNaN(inc) || inc < 0 || ded < 0) return null;

  const taxableIncome = Math.max(0, inc - ded);

  // Standard progressive benchmark brackets
  const brackets = [
    { threshold: 11600, rate: 0.10 },
    { threshold: 47150, rate: 0.12 },
    { threshold: 100525, rate: 0.22 },
    { threshold: 191950, rate: 0.24 },
    { threshold: 243725, rate: 0.32 },
    { threshold: Infinity, rate: 0.35 }
  ];

  let estimatedTax = 0;
  let prevThreshold = 0;

  for (const b of brackets) {
    if (taxableIncome > prevThreshold) {
      const taxableInBracket = Math.min(taxableIncome, b.threshold) - prevThreshold;
      estimatedTax += taxableInBracket * b.rate;
      prevThreshold = b.threshold;
    } else {
      break;
    }
  }

  const afterTax = Math.max(0, inc - estimatedTax);
  const effectiveRate = inc > 0 ? (estimatedTax / inc) * 100 : 0;

  return {
    grossIncome: inc,
    deductions: ded,
    taxableIncome: Number(taxableIncome.toFixed(2)),
    estimatedTax: Number(estimatedTax.toFixed(2)),
    afterTaxIncome: Number(afterTax.toFixed(2)),
    effectiveRate: Number(effectiveRate.toFixed(2)),
    monthlyTakeHome: Number((afterTax / 12).toFixed(2))
  };
}


// --- 7. DISCOUNT CALCULATOR ---

export function calculateDiscount({ originalPrice, discountPercent, taxRate = 0 }) {
  const price = Number(originalPrice);
  const disc = Number(discountPercent);
  const tax = Number(taxRate) || 0;

  if (isNaN(price) || isNaN(disc) || isNaN(tax) || price < 0 || disc < 0 || disc > 100 || tax < 0) {
    return null;
  }

  const savings = price * (disc / 100);
  const discountedPrice = price - savings;
  const taxAmount = discountedPrice * (tax / 100);
  const finalPrice = discountedPrice + taxAmount;

  return {
    originalPrice: price,
    discountPercent: disc,
    amountSaved: Number(savings.toFixed(2)),
    discountedPrice: Number(discountedPrice.toFixed(2)),
    taxAmount: Number(taxAmount.toFixed(2)),
    finalPrice: Number(finalPrice.toFixed(2))
  };
}


// --- 8. PROFIT MARGIN CALCULATOR ---

export function calculateProfitMargin({ cost, revenue }) {
  const c = Number(cost);
  const r = Number(revenue);

  if (isNaN(c) || isNaN(r) || c < 0 || r <= 0) {
    return null;
  }

  const grossProfit = r - c;
  const marginPercent = (grossProfit / r) * 100;
  const markupPercent = c > 0 ? (grossProfit / c) * 100 : 0;

  return {
    cost: c,
    revenue: r,
    grossProfit: Number(grossProfit.toFixed(2)),
    profitMargin: Number(marginPercent.toFixed(2)),
    markup: Number(markupPercent.toFixed(2)),
    isProfitable: grossProfit >= 0
  };
}


// --- 9. SALARY CALCULATOR ---

export function calculateSalary({ amount, type = 'annual', hoursPerWeek = 40, weeksPerYear = 52 }) {
  const val = Number(amount);
  const hPerWk = Number(hoursPerWeek) || 40;
  const wPerYr = Number(weeksPerYear) || 52;

  if (isNaN(val) || val <= 0 || hPerWk <= 0 || wPerYr <= 0) {
    return null;
  }

  const totalAnnualHours = hPerWk * wPerYr;
  let annual = 0;

  switch (type) {
    case 'annual':
      annual = val;
      break;
    case 'monthly':
      annual = val * 12;
      break;
    case 'biweekly':
      annual = val * 26;
      break;
    case 'weekly':
      annual = val * wPerYr;
      break;
    case 'daily':
      annual = val * (hPerWk / 8) * wPerYr;
      break;
    case 'hourly':
      annual = val * totalAnnualHours;
      break;
    default:
      annual = val;
  }

  const monthly = annual / 12;
  const biweekly = annual / 26;
  const weekly = annual / wPerYr;
  const daily = weekly / (hPerWk / 8 || 5);
  const hourly = annual / totalAnnualHours;

  return {
    annual: Number(annual.toFixed(2)),
    monthly: Number(monthly.toFixed(2)),
    biweekly: Number(biweekly.toFixed(2)),
    weekly: Number(weekly.toFixed(2)),
    daily: Number(daily.toFixed(2)),
    hourly: Number(hourly.toFixed(2)),
    hoursPerWeek: hPerWk,
    weeksPerYear: wPerYr
  };
}


// --- 10. CURRENCY CALCULATOR ---
import { convertCurrencyWithRates } from '../currencyRates.js';

export function calculateCurrencyConversion({
  amount,
  fromCurrency = 'USD',
  toCurrency = 'EUR',
  rates,
  rateDate,
  provider,
  customRates
}) {
  const amt = Number(amount);
  if (isNaN(amt) || amt < 0) return null;

  const activeRates = rates || customRates;
  const dataset = activeRates
    ? {
        rates: activeRates,
        rateDate: rateDate || '2026-10-07',
        provider: provider || 'European Central Bank (ECB)'
      }
    : undefined;

  return convertCurrencyWithRates({
    amount: amt,
    fromCurrency,
    toCurrency,
    rateDataset: dataset
  });
}
