'use client';

import { useState, useEffect, useId } from 'react';
import CalculatorShell from './shared/CalculatorShell';
import CalculatorInput from './shared/CalculatorInput';
import CalculatorSelect from './shared/CalculatorSelect';
import CalculatorButtonRow from './shared/CalculatorButtonRow';
import CalculatorResultCard from './shared/CalculatorResultCard';
import { calculateCurrencyConversion } from '@/lib/calculators/financeUtils';
import { SUPPORTED_CURRENCIES, getCurrencySymbol, formatCurrency } from '@/lib/calculators/currencyUtils';
import { ArrowRightLeft } from 'lucide-react';

export default function CurrencyCalculator() {
  const idPrefix = useId();

  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rateData, setRateData] = useState(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  // Helper to run conversion with either fetched rates or server baseline
  const performConversion = (amt, from, to, currentRateData) => {
    if (!amt || isNaN(Number(amt)) || Number(amt) < 0) return null;
    return calculateCurrencyConversion({
      amount: amt,
      fromCurrency: from,
      toCurrency: to,
      rates: currentRateData?.rates,
      rateDate: currentRateData?.rateDate,
      provider: currentRateData?.provider
    });
  };

  const [result, setResult] = useState(() =>
    performConversion(100, 'USD', 'EUR', null)
  );

  // Fetch latest daily exchange rates from server API on mount
  useEffect(() => {
    let isMounted = true;
    async function loadRates() {
      setIsLoadingRates(true);
      try {
        const res = await fetch('/api/currency-rates');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data?.success && data?.rates) {
            setRateData(data);
            setResult(performConversion(amount, fromCurrency, toCurrency, data));
          }
        }
      } catch (err) {
        console.warn('[CurrencyCalculator] Unable to fetch daily rates, using baseline:', err);
      } finally {
        if (isMounted) setIsLoadingRates(false);
      }
    }
    loadRates();
    return () => {
      isMounted = false;
    };
  }, []);

  const currencyOptions = SUPPORTED_CURRENCIES.map((c) => ({
    value: c.code,
    label: `${c.code} – ${c.name} (${c.symbol})`
  }));

  const handleCalculate = () => {
    const res = performConversion(amount, fromCurrency, toCurrency, rateData);
    setResult(res);
  };

  const handleReset = () => {
    setAmount('');
    setResult(null);
  };

  const swapCurrencies = () => {
    const nextFrom = toCurrency;
    const nextTo = fromCurrency;
    setFromCurrency(nextFrom);
    setToCurrency(nextTo);
    if (amount) {
      setResult(performConversion(amount, nextFrom, nextTo, rateData));
    }
  };

  return (
    <CalculatorShell title="Foreign Exchange Currency Calculator" badge="ECB Reference Rate">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-4">
          <CalculatorInput
            id={`${idPrefix}-amt`}
            label="Amount to Convert"
            prefix={getCurrencySymbol(fromCurrency)}
            value={amount}
            onChange={(val) => {
              setAmount(val);
              if (val) {
                setResult(performConversion(val, fromCurrency, toCurrency, rateData));
              } else {
                setResult(null);
              }
            }}
            placeholder="e.g. 100"
            required
          />
        </div>

        <div className="sm:col-span-3">
          <CalculatorSelect
            id={`${idPrefix}-from`}
            label="From Currency"
            value={fromCurrency}
            onChange={(val) => {
              setFromCurrency(val);
              if (amount) {
                setResult(performConversion(amount, val, toCurrency, rateData));
              }
            }}
            options={currencyOptions}
          />
        </div>

        <div className="sm:col-span-1 flex justify-center pt-5">
          <button
            type="button"
            onClick={swapCurrencies}
            className="p-2.5 rounded-xl border border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all cursor-pointer shadow-2xs"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="sm:col-span-4">
          <CalculatorSelect
            id={`${idPrefix}-to`}
            label="To Currency"
            value={toCurrency}
            onChange={(val) => {
              setToCurrency(val);
              if (amount) {
                setResult(performConversion(amount, fromCurrency, val, rateData));
              }
            }}
            options={currencyOptions}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 px-1 py-1">
        <span>
          Reference provider: {result?.provider || 'European Central Bank (ECB)'}
          {result?.formattedRateDate ? ` • As of ${result.formattedRateDate}` : ''}
        </span>
        {isLoadingRates && <span className="text-blue-600 animate-pulse font-medium">Checking daily rates...</span>}
      </div>

      <CalculatorButtonRow
        onCalculate={handleCalculate}
        onReset={handleReset}
      />

      {result && (
        <CalculatorResultCard
          primaryLabel={`${amount} ${fromCurrency} converts to`}
          primaryValue={`${formatCurrency(result.convertedAmount, toCurrency)} (${result.convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${toCurrency})`}
          copyValue={`${amount} ${fromCurrency} = ${result.convertedAmount} ${toCurrency}`}
          secondaryItems={[
            {
              label: 'Direct Exchange Rate',
              value: `1 ${fromCurrency} = ${result.exchangeRate} ${toCurrency}`,
              color: 'text-blue-600 font-bold'
            },
            {
              label: 'Inverse Rate',
              value: `1 ${toCurrency} = ${result.inverseRate} ${fromCurrency}`
            },
            {
              label: 'Rate Date',
              value: result.formattedRateDate || result.rateDate
            },
            {
              label: 'Rate Provider',
              value: result.provider || 'European Central Bank (ECB)'
            }
          ]}
          note={result.note || "Official ECB daily reference rate. Retail card issuers or cash exchange kiosks may add a 1-3% foreign transaction spread."}
        />
      )}
    </CalculatorShell>
  );
}
