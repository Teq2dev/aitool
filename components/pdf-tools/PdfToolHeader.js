import { Sparkles, ShieldCheck } from 'lucide-react';

export default function PdfToolHeader({
  badge = '100% Free · Client-Side Processing',
  title,
  subtitle,
  icon: Icon,
}) {
  return (
    <div className="text-center mb-8 md:mb-10 space-y-3">
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 rounded-full text-xs font-bold shadow-2xs">
        {Icon ? <Icon className="w-3.5 h-3.5 text-blue-600" /> : <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
        {badge}
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
