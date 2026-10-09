'use client';

import { useState, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateElectricityCost } from '@/lib/calculators/utilityUtils';
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY, formatCurrency } from '@/lib/calculators/currencyUtils';

export default function ElectricityCostCalculator() {
  const idPrefix = useId();

  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [wattage, setWattage] = useState('1500'); // e.g. Space heater / AC
  const [hoursPerDay, setHoursPerDay] = useState('6');
  const [daysCount, setDaysCount] = useState('30');
  const [rate, setRate] = useState('0.16'); // Standard utility tariff rate

  const [result, setResult] = useState(() =>
    calculateElectricityCost({ wattage: 1500, hoursPerDay: 6, daysCount: 30, electricityRateKwh: 0.16 })
  );

  const handleCalculate = () => {
    const res = calculateElectricityCost({
      wattage,
      hoursPerDay,
      daysCount,
      electricityRateKwh: rate
    });
    setResult(res);
  };

  const handleReset = () => {
    setWattage('');
    setHoursPerDay('');
    setRate('0.16');
    setResult(null);
  };

  return (
    <CalculatorShell title="Appliance Electricity Cost Calculator" badge="Power & Utility Bills">
      {/* Appliance & Usage Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <CalculatorInput
          id={`${idPrefix}-watts`}
          label="Appliance Power"
          suffix="Watts"
          value={wattage}
          onChange={(val) => {
            setWattage(val);
            if (val && hoursPerDay && rate) {
              setResult(calculateElectricityCost({ wattage: val, hoursPerDay, daysCount, electricityRateKwh: rate }));
            }
          }}
          placeholder="e.g. 1500"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-hours`}
          label="Daily Runtime"
          suffix="hrs/day"
          value={hoursPerDay}
          onChange={(val) => {
            setHoursPerDay(val);
            if (wattage && val && rate) {
              setResult(calculateElectricityCost({ wattage, hoursPerDay: val, daysCount, electricityRateKwh: rate }));
            }
          }}
          placeholder="e.g. 6"
          min="0"
          max="24"
          required
        />

        <CalculatorInput
          id={`${idPrefix}-days`}
          label="Billing Period"
          suffix="days"
          value={daysCount}
          onChange={(val) => {
            setDaysCount(val);
            if (wattage && hoursPerDay && rate) {
              setResult(calculateElectricityCost({ wattage, hoursPerDay, daysCount: val, electricityRateKwh: rate }));
            }
          }}
          placeholder="e.g. 30"
          min="1"
          max="365"
        />
      </div>

      {/* Electricity Tariff & Pricing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalculatorSelect
          id={`${idPrefix}-curr`}
          label="Billing Currency"
          value={currency}
          onChange={(val) => setCurrency(val)}
          options={SUPPORTED_CURRENCIES.map((c) => ({
            value: c.code,
            label: `${c.code} – ${c.name} (${c.symbol})`
          }))}
        />

        <CalculatorInput
          id={`${idPrefix}-rate`}
          label="Electricity Rate (per kWh)"
          suffix="/kWh"
          value={rate}
          onChange={(val) => {
            setRate(val);
            if (wattage && hoursPerDay && val) {
              setResult(calculateElectricityCost({ wattage, hoursPerDay, daysCount, electricityRateKwh: val }));
            }
          }}
          placeholder="e.g. 0.16"
          required
          helperText="Utility rate per kilowatt-hour from electric bill"
        />
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel={`Estimated Cost for ${daysCount} Days`}
          primaryValue={formatCurrency(result.totalCost, currency)}
          copyValue={`Electricity Cost: ${formatCurrency(result.totalCost, currency)} (${result.totalKwh} kWh)`}
          secondaryItems={[
            {
              label: 'Monthly Cost (30 days)',
              value: formatCurrency(result.monthlyCost, currency),
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Annual Cost (365 days)',
              value: formatCurrency(result.annualCost, currency),
              color: 'text-amber-600 font-bold'
            },
            {
              label: 'Daily Power Consumption',
              value: `${result.dailyKwh} kWh/day`
            },
            {
              label: 'Period Total Energy',
              value: `${result.totalKwh} kWh`
            }
          ]}
        />
      )}
    </CalculatorShell>
  );
}
