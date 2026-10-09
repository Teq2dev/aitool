/**
 * lib/calculators/utilityUtils.js
 * Calculation utilities for Fuel Cost and Electricity Cost calculators.
 */

// --- 1. FUEL COST CALCULATOR ---

export function calculateFuelCost({ distance, distanceUnit = 'km', efficiency, efficiencyUnit = 'km_per_l', fuelPrice, priceUnit = 'liter' }) {
  const dist = Number(distance);
  const eff = Number(efficiency);
  const price = Number(fuelPrice);

  if (isNaN(dist) || isNaN(eff) || isNaN(price) || dist <= 0 || eff <= 0 || price < 0) {
    return null;
  }

  let fuelLitersNeeded = 0;

  if (efficiencyUnit === 'km_per_l') {
    // Distance in km / (km/L)
    const distKm = distanceUnit === 'km' ? dist : dist * 1.609344;
    fuelLitersNeeded = distKm / eff;
  } else if (efficiencyUnit === 'l_per_100km') {
    const distKm = distanceUnit === 'km' ? dist : dist * 1.609344;
    fuelLitersNeeded = (distKm / 100) * eff;
  } else if (efficiencyUnit === 'mpg') {
    // US MPG: Miles / MPG = US Gallons -> convert to liters
    const distMiles = distanceUnit === 'miles' ? dist : dist / 1.609344;
    const gallonsNeeded = distMiles / eff;
    fuelLitersNeeded = gallonsNeeded * 3.785411784;
  } else if (efficiencyUnit === 'mpg_imp') {
    // UK Imperial MPG: Miles / MPG = Imperial Gallons -> convert to liters
    const distMiles = distanceUnit === 'miles' ? dist : dist / 1.609344;
    const gallonsNeeded = distMiles / eff;
    fuelLitersNeeded = gallonsNeeded * 4.54609;
  }

  let totalCost = 0;
  if (priceUnit === 'gallon') {
    const gallonsNeeded = fuelLitersNeeded / 3.785411784;
    totalCost = gallonsNeeded * price;
  } else if (priceUnit === 'gallon_imp') {
    const gallonsNeeded = fuelLitersNeeded / 4.54609;
    totalCost = gallonsNeeded * price;
  } else {
    // Default: price per liter
    totalCost = fuelLitersNeeded * price;
  }

  const costPerUnitDistance = totalCost / dist;
  const gallonsUs = fuelLitersNeeded / 3.785411784;

  return {
    fuelNeeded: Number(fuelLitersNeeded.toFixed(2)),
    fuelVolumeGallons: Number(gallonsUs.toFixed(2)),
    totalCost: Number(totalCost.toFixed(2)),
    costPerDistance: Number(costPerUnitDistance.toFixed(3)),
    unit: distanceUnit,
    priceUnit
  };
}


// --- 2. ELECTRICITY COST CALCULATOR ---

export function calculateElectricityCost({ wattage, hoursPerDay = 1, daysCount = 30, electricityRateKwh }) {
  const w = Number(wattage);
  const h = Number(hoursPerDay);
  const days = Number(daysCount) || 30;
  const rate = Number(electricityRateKwh);

  if (isNaN(w) || isNaN(h) || isNaN(rate) || w <= 0 || h <= 0 || rate < 0) {
    return null;
  }

  // Daily kWh = (Watts * hours) / 1000
  const dailyKwh = (w * h) / 1000;
  const totalKwh = dailyKwh * days;
  const totalCost = totalKwh * rate;

  const monthlyKwh = dailyKwh * 30;
  const monthlyCost = monthlyKwh * rate;

  const annualKwh = dailyKwh * 365;
  const annualCost = annualKwh * rate;

  return {
    dailyKwh: Number(dailyKwh.toFixed(3)),
    dailyCost: Number((dailyKwh * rate).toFixed(2)),
    monthlyKwh: Number(monthlyKwh.toFixed(2)),
    monthlyCost: Number(monthlyCost.toFixed(2)),
    annualKwh: Number(annualKwh.toFixed(2)),
    annualCost: Number(annualCost.toFixed(2)),
    totalKwh: Number(totalKwh.toFixed(2)),
    totalCost: Number(totalCost.toFixed(2)),
    days
  };
}
