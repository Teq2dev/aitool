import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

export default function RelatedCalculators({ calculators = [] }) {
  if (!calculators || calculators.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-14 pt-10 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            Explore More Tools
          </span>
          <h2 id="related-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Related Calculators
          </h2>
        </div>
        <Link
          href="/calculators"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          <span>View All 24 Calculators</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="group block p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Calculator className="w-5 h-5" />
            </div>

            <div className="text-xs font-semibold text-blue-600 mb-1">
              {calc.badge || 'Calculator'}
            </div>

            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
              {calc.name}
            </h3>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {calc.seoDescription}
            </p>

            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              <span>Calculate now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/calculators"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <span>Browse All 24 Free Calculators</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
