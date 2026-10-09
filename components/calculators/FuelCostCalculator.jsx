'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateFuelCost } from '@/lib/calculators/utilityUtils';
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY, formatCurrency } from '@/lib/calculators/currencyUtils';

export default function FuelCostCalculator() {
  const idPrefix = useId();

  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [distance, setDistance] = useState('400');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [efficiency, setEfficiency] = useState('16');
  const [efficiencyUnit, setEfficiencyUnit] = useState('km_per_l');
  const [priceUnit, setPriceUnit] = useState('liter');
  const [fuelPrice, setFuelPrice] = useState('1.50');

  const [result, setResult] = useState(() =>
    calculateFuelCost({
      distance: 400,
      distanceUnit: 'km',
      efficiency: 16,
      efficiencyUnit: 'km_per_l',
      fuelPrice: 1.50,
      priceUnit: 'liter'
    })
  );

  const handleDistanceUnitChange = (unit) => {
    setDistanceUnit(unit);
    // Suggest sensible efficiency and price defaults when switching unit system
    if (unit === 'miles') {
      if (efficiencyUnit === 'km_per_l' || efficiencyUnit === 'l_per_100km') {
        setEfficiencyUnit('mpg');
        setEfficiency('30');
      }
      setPriceUnit('gallon');
      setFuelPrice('3.50');
      setResult(calculateFuelCost({
        distance: distance || '400',
        distanceUnit: 'miles',
        efficiency: '30',
        efficiencyUnit: 'mpg',
        fuelPrice: '3.50',
        priceUnit: 'gallon'
      }));
    } else {
      if (efficiencyUnit === 'mpg' || efficiencyUnit === 'mpg_imp') {
        setEfficiencyUnit('km_per_l');
        setEfficiency('16');
      }
      setPriceUnit('liter');
      setFuelPrice('1.50');
      setResult(calculateFuelCost({
        distance: distance || '400',
        distanceUnit: 'km',
        efficiency: '16',
        efficiencyUnit: 'km_per_l',
        fuelPrice: '1.50',
        priceUnit: 'liter'
      }));
    }
  };

  const handleCalculate = () => {
    const res = calculateFuelCost({
      distance,
      distanceUnit,
      efficiency,
      efficiencyUnit,
      fuelPrice,
      priceUnit
    });
    setResult(res);
  };

  const handleReset = () => {
    setDistance('');
    setEfficiency('');
    setFuelPrice('');
    setResult(null);
  };

  return (
    <CalculatorShell title="Trip Fuel Cost Calculator" badge="Road Trip & Gas">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Distance + Unit */}
        <div className="grid grid-cols-2 gap-2">
          <CalculatorInput
            id={`${idPrefix}-dist`}
            label="Trip Distance"
            value={distance}
            onChange={(val) => {
              setDistance(val);
              if (val && efficiency && fuelPrice) {
                setResult(calculateFuelCost({ distance: val, distanceUnit, efficiency, efficiencyUnit, fuelPrice, priceUnit }));
              }
            }}
            placeholder="e.g. 400"
            required
          />
          <CalculatorSelect
            id={`${idPrefix}-dist-u`}
            label="Unit"
            value={distanceUnit}
            onChange={handleDistanceUnitChange}
            options={[
              { value: 'km', label: 'Kilometers (km)' },
              { value: 'miles', label: 'Miles (mi)' }
            ]}
          />
        </div>

        {/* Economy + Unit */}
        <div className="grid grid-cols-2 gap-2">
          <CalculatorInput
            id={`${idPrefix}-eff`}
            label="Fuel Economy"
            value={efficiency}
            onChange={(val) => {
              setEfficiency(val);
              if (distance && val && fuelPrice) {
                setResult(calculateFuelCost({ distance, distanceUnit, efficiency: val, efficiencyUnit, fuelPrice, priceUnit }));
              }
            }}
            placeholder="e.g. 16"
            required
          />
          <CalculatorSelect
            id={`${idPrefix}-eff-u`}
            label="Economy Unit"
            value={efficiencyUnit}
            onChange={(val) => {
              setEfficiencyUnit(val);
              if (distance && efficiency && fuelPrice) {
                setResult(calculateFuelCost({ distance, distanceUnit, efficiency, efficiencyUnit: val, fuelPrice, priceUnit }));
              }
            }}
            options={[
              { value: 'km_per_l', label: 'km / Liter' },
              { value: 'l_per_100km', label: 'L / 100km' },
              { value: 'mpg', label: 'US MPG' },
              { value: 'mpg_imp', label: 'UK MPG (Imp)' }
            ]}
          />
        </div>

        {/* Fuel Price + Currency + Price Unit */}
        <div className="grid grid-cols-3 gap-1.5 sm:col-span-2 lg:col-span-1">
          <CalculatorSelect
            id={`${idPrefix}-curr`}
            label="Currency"
            value={currency}
            onChange={(val) => setCurrency(val)}
            options={SUPPORTED_CURRENCIES.map(c => ({ value: c.code, label: `${c.code} (${c.symbol})` }))}
          />

          <CalculatorInput
            id={`${idPrefix}-price`}
            label="Fuel Price"
            value={fuelPrice}
            onChange={(val) => {
              setFuelPrice(val);
              if (distance && efficiency && val) {
                setResult(calculateFuelCost({ distance, distanceUnit, efficiency, efficiencyUnit, fuelPrice: val, priceUnit }));
              }
            }}
            placeholder="e.g. 1.50"
            required
          />

          <CalculatorSelect
            id={`${idPrefix}-price-u`}
            label="Volume Unit"
            value={priceUnit}
            onChange={(val) => {
              setPriceUnit(val);
              if (distance && efficiency && fuelPrice) {
                setResult(calculateFuelCost({ distance, distanceUnit, efficiency, efficiencyUnit, fuelPrice, priceUnit: val }));
              }
            }}
            options={[
              { value: 'liter', label: 'Per Liter' },
              { value: 'gallon', label: 'Per US Gal' },
              { value: 'gallon_imp', label: 'Per UK Gal' }
            ]}
          />
        </div>
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel="Total Estimated Trip Fuel Cost"
          primaryValue={formatCurrency(result.totalCost, currency)}
          copyValue={`Total Trip Fuel Cost: ${formatCurrency(result.totalCost, currency)} (${result.fuelNeeded} Liters / ${result.fuelVolumeGallons} US Gallons)`}
          secondaryItems={[
            {
              label: 'Total Fuel Volume Required',
              value: `${result.fuelNeeded} Liters (${result.fuelVolumeGallons} gal)`,
              color: 'text-blue-600 font-bold'
            },
            {
              label: `Cost per ${result.unit === 'miles' ? 'Mile' : 'Kilometer'}`,
              value: `${formatCurrency(result.costPerDistance, currency)}/${result.unit === 'miles' ? 'mi' : 'km'}`
            },
            {
              label: 'Planned Journey Distance',
              value: `${distance} ${result.unit}`
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
