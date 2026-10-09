/**
 * lib/calculators/mathUtils.js
 * Pure mathematical calculation utilities for Percentage, Ratio, and Fraction calculators.
 * Prevents NaN, Infinity, division-by-zero, and malformed outputs.
 */

// Helper to ensure input is a genuine number and not null, undefined, or empty string
function isValidNumber(val) {
  if (val === null || val === undefined || val === '') return false;
  const num = Number(val);
  return !isNaN(num) && isFinite(num);
}

// --- 1. PERCENTAGE CALCULATOR UTILITIES ---

/**
 * 1. What is X% of Y?
 * Formula: (X / 100) * Y
 */
export function calculatePercentOf(percent, total) {
  if (!isValidNumber(percent) || !isValidNumber(total)) return null;
  const p = Number(percent);
  const t = Number(total);
  const result = (p / 100) * t;
  return {
    result: Number(result.toFixed(4)),
    formatted: Number(result.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 4 }),
    formula: `(${p} / 100) × ${t} = ${result.toFixed(2)}`
  };
}

/**
 * 2. X is what percentage of Y?
 * Formula: (X / Y) * 100
 */
export function calculateWhatPercentOf(part, whole) {
  if (!isValidNumber(part) || !isValidNumber(whole)) return null;
  const x = Number(part);
  const y = Number(whole);
  if (y === 0) return null;
  const result = (x / y) * 100;
  return {
    result: Number(result.toFixed(4)),
    formatted: `${Number(result.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 4 })}%`,
    formula: `(${x} / ${y}) × 100 = ${result.toFixed(2)}%`
  };
}

/**
 * 3. Percentage Increase / Decrease from V1 to V2
 * Formula: ((V2 - V1) / |V1|) * 100
 */
export function calculatePercentChange(initialValue, finalValue) {
  if (!isValidNumber(initialValue) || !isValidNumber(finalValue)) return null;
  const v1 = Number(initialValue);
  const v2 = Number(finalValue);
  if (v1 === 0) return null;
  const diff = v2 - v1;
  const change = (diff / Math.abs(v1)) * 100;
  const isIncrease = diff >= 0;
  return {
    difference: Number(diff.toFixed(4)),
    percentChange: Number(Math.abs(change).toFixed(4)),
    isIncrease,
    type: isIncrease ? 'increase' : 'decrease',
    formatted: `${isIncrease ? '+' : '-'}${Math.abs(change).toFixed(2)}%`,
    formula: `((${v2} - ${v1}) / |${v1}|) × 100 = ${change.toFixed(2)}%`
  };
}

/**
 * 4. Percentage Difference between two values
 * Formula: (|V1 - V2| / ((V1 + V2) / 2)) * 100
 */
export function calculatePercentDifference(val1, val2) {
  if (!isValidNumber(val1) || !isValidNumber(val2)) return null;
  const v1 = Number(val1);
  const v2 = Number(val2);
  const avg = (v1 + v2) / 2;
  if (avg === 0) return null;
  const diff = Math.abs(v1 - v2);
  const result = (diff / Math.abs(avg)) * 100;
  return {
    result: Number(result.toFixed(4)),
    formatted: `${result.toFixed(2)}%`,
    formula: `(|${v1} - ${v2}| / ((${v1} + ${v2}) / 2)) × 100 = ${result.toFixed(2)}%`
  };
}


// --- 2. RATIO CALCULATOR UTILITIES ---

function gcd(a, b) {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

/**
 * Simplify a:b ratio
 */
export function simplifyRatio(a, b) {
  if (!isValidNumber(a) || !isValidNumber(b)) return null;
  const nA = Number(a);
  const nB = Number(b);
  if (nA <= 0 || nB <= 0) return null;
  
  // Handle decimals by scaling
  const decA = (nA.toString().split('.')[1] || '').length;
  const decB = (nB.toString().split('.')[1] || '').length;
  const factor = Math.pow(10, Math.max(decA, decB));
  
  const intA = Math.round(nA * factor);
  const intB = Math.round(nB * factor);
  
  const divisor = gcd(intA, intB);
  const simpA = intA / divisor;
  const simpB = intB / divisor;
  const decimalValue = Number((nA / nB).toFixed(4));
  
  return {
    simplifiedA: simpA,
    simplifiedB: simpB,
    simplifiedString: `${simpA} : ${simpB}`,
    decimal: decimalValue,
    divisor
  };
}

/**
 * Solve for missing value in A : B = C : D
 * If any one is missing (null/empty), solves for it.
 */
export function solveProportion(a, b, c, d) {
  const nA = a !== '' && a !== null ? Number(a) : null;
  const nB = b !== '' && b !== null ? Number(b) : null;
  const nC = c !== '' && c !== null ? Number(c) : null;
  const nD = d !== '' && d !== null ? Number(d) : null;
  
  const values = [nA, nB, nC, nD];
  const nullCount = values.filter(v => v === null || isNaN(v)).length;
  if (nullCount !== 1) return null;

  let missingVar = '';
  let solvedVal = 0;

  if (nA === null) {
    if (nD === 0) return null;
    solvedVal = (nB * nC) / nD;
    missingVar = 'A';
  } else if (nB === null) {
    if (nC === 0) return null;
    solvedVal = (nA * nD) / nC;
    missingVar = 'B';
  } else if (nC === null) {
    if (nB === 0) return null;
    solvedVal = (nA * nD) / nB;
    missingVar = 'C';
  } else if (nD === null) {
    if (nA === 0) return null;
    solvedVal = (nB * nC) / nA;
    missingVar = 'D';
  }

  return {
    missingVar,
    solvedVal: Number(solvedVal.toFixed(4)),
    formatted: Number(solvedVal.toFixed(4)).toString()
  };
}


// --- 3. FRACTION CALCULATOR UTILITIES ---

/**
 * Fraction arithmetic (add, subtract, multiply, divide)
 */
export function calculateFractions(n1, d1, n2, d2, operation) {
  const num1 = parseInt(n1, 10);
  const den1 = parseInt(d1, 10);
  const num2 = parseInt(n2, 10);
  const den2 = parseInt(d2, 10);

  if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2)) return null;
  if (den1 === 0 || den2 === 0) return null;

  let resNum = 0;
  let resDen = 1;

  switch (operation) {
    case 'add':
      resNum = num1 * den2 + num2 * den1;
      resDen = den1 * den2;
      break;
    case 'subtract':
      resNum = num1 * den2 - num2 * den1;
      resDen = den1 * den2;
      break;
    case 'multiply':
      resNum = num1 * num2;
      resDen = den1 * den2;
      break;
    case 'divide':
      if (num2 === 0) return null; // Division by zero
      resNum = num1 * den2;
      resDen = den1 * num2;
      break;
    default:
      return null;
  }

  // Handle negative signs
  if (resDen < 0) {
    resNum = -resNum;
    resDen = -resDen;
  }

  const divisor = gcd(resNum, resDen);
  const simpNum = resNum / divisor;
  const simpDen = resDen / divisor;

  const decimalVal = Number((simpNum / simpDen).toFixed(6));

  // Mixed number calculation
  let mixed = null;
  if (Math.abs(simpNum) >= simpDen && simpDen !== 1) {
    const whole = Math.trunc(simpNum / simpDen);
    const rem = Math.abs(simpNum % simpDen);
    if (rem !== 0) {
      mixed = `${whole} ${rem}/${simpDen}`;
    }
  }

  return {
    numerator: simpNum,
    denominator: simpDen,
    fractionString: simpDen === 1 ? `${simpNum}` : `${simpNum}/${simpDen}`,
    decimal: decimalVal,
    mixed: mixed || (simpDen === 1 ? `${simpNum}` : null),
    isImproper: Math.abs(simpNum) > simpDen
  };
}
