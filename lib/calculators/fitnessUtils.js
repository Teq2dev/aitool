/**
 * lib/calculators/fitnessUtils.js
 * Calculation utilities for BMI and Running/Walking Pace.
 */

// --- 1. BMI CALCULATOR ---

export function calculateBmi({ unitSystem = 'metric', heightCm, heightFt, heightIn, weightKg, weightLbs }) {
  let heightMeters = 0;
  let weightKilograms = 0;

  if (unitSystem === 'metric') {
    const cm = Number(heightCm);
    const kg = Number(weightKg);
    if (isNaN(cm) || isNaN(kg) || cm <= 0 || kg <= 0) return null;
    heightMeters = cm / 100;
    weightKilograms = kg;
  } else {
    // Imperial: ft/in + lbs
    const ft = Number(heightFt) || 0;
    const inch = Number(heightIn) || 0;
    const totalInches = ft * 12 + inch;
    const lbs = Number(weightLbs);
    if (totalInches <= 0 || isNaN(lbs) || lbs <= 0) return null;
    heightMeters = totalInches * 0.0254;
    weightKilograms = lbs * 0.45359237;
  }

  const bmi = weightKilograms / (heightMeters * heightMeters);
  const roundedBmi = Number(bmi.toFixed(1));

  let category = '';
  let color = '';
  if (roundedBmi < 18.5) {
    category = 'Underweight';
    color = 'text-amber-600 bg-amber-50 border-amber-200';
  } else if (roundedBmi < 25.0) {
    category = 'Normal Weight';
    color = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  } else if (roundedBmi < 30.0) {
    category = 'Overweight';
    color = 'text-orange-600 bg-orange-50 border-orange-200';
  } else if (roundedBmi < 35.0) {
    category = 'Obesity Class I';
    color = 'text-rose-600 bg-rose-50 border-rose-200';
  } else if (roundedBmi < 40.0) {
    category = 'Obesity Class II';
    color = 'text-red-700 bg-red-50 border-red-200';
  } else {
    category = 'Obesity Class III';
    color = 'text-purple-700 bg-purple-50 border-purple-200';
  }

  // Normal weight range for this height (BMI 18.5 - 24.9)
  const minNormalKg = Number((18.5 * heightMeters * heightMeters).toFixed(1));
  const maxNormalKg = Number((24.9 * heightMeters * heightMeters).toFixed(1));
  const minNormalLbs = Number((minNormalKg * 2.20462).toFixed(1));
  const maxNormalLbs = Number((maxNormalKg * 2.20462).toFixed(1));

  return {
    bmi: roundedBmi,
    category,
    color,
    healthyRangeMetric: `${minNormalKg} kg – ${maxNormalKg} kg`,
    healthyRangeImperial: `${minNormalLbs} lbs – ${maxNormalLbs} lbs`,
    prime: Number((roundedBmi / 25).toFixed(2))
  };
}


// --- 2. PACE CALCULATOR ---

export function calculatePace({ distance, distanceUnit = 'km', hours = 0, minutes = 0, seconds = 0 }) {
  const dist = Number(distance);
  const h = Number(hours) || 0;
  const m = Number(minutes) || 0;
  const s = Number(seconds) || 0;

  const totalSeconds = h * 3600 + m * 60 + s;

  if (isNaN(dist) || dist <= 0 || totalSeconds <= 0) return null;

  // Convert distance to km and miles
  const distInKm = distanceUnit === 'km' ? dist : dist * 1.609344;
  const distInMiles = distanceUnit === 'miles' ? dist : dist / 1.609344;

  const secPerKm = totalSeconds / distInKm;
  const secPerMile = totalSeconds / distInMiles;

  const formatPace = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.round(sec % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const speedKmh = Number(((distInKm / totalSeconds) * 3600).toFixed(2));
  const speedMph = Number(((distInMiles / totalSeconds) * 3600).toFixed(2));

  return {
    pacePerKm: `${formatPace(secPerKm)} min/km`,
    pacePerMile: `${formatPace(secPerMile)} min/mi`,
    speedKmh: `${speedKmh} km/h`,
    speedMph: `${speedMph} mph`,
    totalTimeFormatted: `${h > 0 ? `${h}h ` : ''}${m}m ${s}s`
  };
}
