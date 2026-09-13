import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, RefreshCw, FileImage } from 'lucide-react';
import { getRelatedTools } from '@/lib/toolConfig';

export default function RelatedTools({ currentSlug, title = 'Explore More Image Tools' }) {
  const tools = getRelatedTools(currentSlug, 4);

  if (tools.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-slate-200/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider">Ecosystem</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">{title}</h2>
        </div>
        <Link
          href="/image-tools"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
        >
          View all utilities <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group relative bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  {tool.badge || 'Tool'}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                {tool.tagline || tool.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-blue-600">
              Open Tool →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
