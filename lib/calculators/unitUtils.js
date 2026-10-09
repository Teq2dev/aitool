/**
 * lib/calculators/unitUtils.js
 * Centralized international physical unit conversion constants and utilities.
 * 
 * Provides exact, authoritative constants for physical conversions across:
 * - Weight (Kilograms vs Pounds)
 * - Height / Length (Centimeters vs Feet/Inches)
 * - Distance (Kilometers vs Miles)
 * - Fuel Volume (Liters vs US Gallons vs Imperial Gallons)
 * - Fuel Economy (km/L, L/100km, US MPG, Imperial MPG)
 * - Pace (min/km vs min/mile)
 * - GPA Scales (4.0, 5.0, 10.0)
 */

// --- 1. EXACT CONVERSION CONSTANTS ---

export const UNIT_CONSTANTS = {
  // Weight: 1 lb = exactly 0.45359237 kg
  LB_TO_KG: 0.45359237,
  KG_TO_LB: 1 / 0.45359237,

  // Length: 1 in = exactly 2.54 cm
  IN_TO_CM: 2.54,
  CM_TO_IN: 1 / 2.54,
  FT_TO_IN: 12,
  FT_TO_CM: 12 * 2.54, // 30.48 cm

  // Distance: 1 international mile = exactly 1.609344 km
  MILE_TO_KM: 1.609344,
  KM_TO_MILE: 1 / 1.609344,

  // Volume:
  // 1 US liquid gallon = 231 cubic inches = exactly 3.785411784 Liters
  US_GAL_TO_LITER: 3.785411784,
  LITER_TO_US_GAL: 1 / 3.785411784,

  // 1 Imperial gallon = exactly 4.54609 Liters
  IMP_GAL_TO_LITER: 4.54609,
  LITER_TO_IMP_GAL: 1 / 4.54609
};


// --- 2. WEIGHT CONVERSIONS ---

export function lbToKg(lb) {
  const n = Number(lb);
  return isNaN(n) ? 0 : n * UNIT_CONSTANTS.LB_TO_KG;
}

export function kgToLb(kg) {
  const n = Number(kg);
  return isNaN(n) ? 0 : n * UNIT_CONSTANTS.KG_TO_LB;
}


// --- 3. HEIGHT / LENGTH CONVERSIONS ---

export function ftInToCm(feet, inches = 0) {
  const ft = Number(feet) || 0;
  const inc = Number(inches) || 0;
  return (ft * 12 + inc) * UNIT_CONSTANTS.IN_TO_CM;
}

export function cmToFtIn(cm) {
  const n = Number(cm);
  if (isNaN(n) || n <= 0) return { feet: 0, inches: 0 };
  const totalInches = n * UNIT_CONSTANTS.CM_TO_IN;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}


// --- 4. DISTANCE CONVERSIONS ---

export function milesToKm(miles) {
  const n = Number(miles);
  return isNaN(n) ? 0 : n * UNIT_CONSTANTS.MILE_TO_KM;
}

export function kmToMiles(km) {
  const n = Number(km);
  return isNaN(n) ? 0 : n * UNIT_CONSTANTS.KM_TO_MILE;
}


// --- 5. FUEL VOLUME & ECONOMY CONVERSIONS ---

export function convertFuelVolume(amount, fromUnit = 'liter', toUnit = 'liter') {
  const n = Number(amount);
  if (isNaN(n) || n <= 0) return 0;
  if (fromUnit === toUnit) return n;

  // Normalize to liters first
  let liters = n;
  if (fromUnit === 'us_gal') liters = n * UNIT_CONSTANTS.US_GAL_TO_LITER;
  else if (fromUnit === 'imp_gal') liters = n * UNIT_CONSTANTS.IMP_GAL_TO_LITER;

  // Convert from liters to target
  if (toUnit === 'us_gal') return liters * UNIT_CONSTANTS.LITER_TO_US_GAL;
  if (toUnit === 'imp_gal') return liters * UNIT_CONSTANTS.LITER_TO_IMP_GAL;
  return liters;
}


// --- 6. GPA GRADING SCALES ---

export const GPA_SCALES = {
  '4.0': {
    name: '4.0 Scale (Standard US / International)',
    maxGpa: 4.0,
    grades: {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    }
  },
  '5.0': {
    name: '5.0 Scale (Honors / Weighted High School)',
    maxGpa: 5.0,
    grades: {
      'A+': 5.0, 'A': 5.0, 'A-': 4.7,
      'B+': 4.3, 'B': 4.0, 'B-': 3.7,
      'C+': 3.3, 'C': 3.0, 'C-': 2.7,
      'D+': 2.3, 'D': 2.0, 'F': 0.0
    }
  },
  '10.0': {
    name: '10.0 Scale (International / European / Asian)',
    maxGpa: 10.0,
    grades: {
      'A+': 10.0, 'A': 9.0, 'A-': 8.5,
      'B+': 8.0, 'B': 7.0, 'B-': 6.5,
      'C+': 6.0, 'C': 5.0, 'C-': 4.5,
      'D+': 4.0, 'D': 3.0, 'F': 0.0
    }
  }
};
