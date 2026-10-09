export default function CalculatorInput({
  id,
  label,
  value,
  onChange,
  type = 'number',
  placeholder = '',
  prefix,
  suffix,
  min,
  max,
  step = 'any',
  helperText,
  error,
  required = false,
  className = '',
  disabled = false
}) {
  const getPrefixPad = (p) => {
    if (!p) return 'pl-3.5';
    const len = String(p).length;
    if (len > 3) return 'pl-16';
    if (len > 2) return 'pl-14';
    if (len > 1) return 'pl-11';
    return 'pl-8';
  };

  const getSuffixPad = (s) => {
    if (!s) return 'pr-3.5';
    const len = String(s).length;
    if (len > 6) return 'pr-20'; // e.g. hrs/day (7), minutes (7)
    if (len > 4) return 'pr-16'; // e.g. Watts (5), /kWh (5), years (5)
    if (len > 2) return 'pr-14'; // e.g. days (4), lbs (3)
    if (len > 1) return 'pr-12'; // e.g. cm (2), kg (2), ft (2), in (2)
    return 'pr-9'; // e.g. % (1)
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-medium text-sm">
            {prefix}
          </div>
        )}

        <input
          id={id}
          name={id}
          type={type}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`w-full rounded-xl border bg-white text-slate-900 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${getPrefixPad(prefix)} ${getSuffixPad(suffix)} py-2.5 ${
            error
              ? 'border-rose-300 ring-rose-200'
              : 'border-slate-300 hover:border-slate-400'
          }`}
        />

        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500 font-medium text-xs sm:text-sm">
            {suffix}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs font-medium text-rose-600 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
