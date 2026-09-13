'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const CONVERTER_ITEMS = [
  { label: 'JPG to PNG', href: '/jpg-to-png', from: 'JPG', to: 'PNG' },
  { label: 'PNG to JPG', href: '/png-to-jpg', from: 'PNG', to: 'JPG' },
  { label: 'JPG to WebP', href: '/jpg-to-webp', from: 'JPG', to: 'WebP' },
  { label: 'PNG to WebP', href: '/png-to-webp', from: 'PNG', to: 'WebP' },
  { label: 'WebP to JPG', href: '/webp-to-jpg', from: 'WebP', to: 'JPG' },
  { label: 'WebP to PNG', href: '/webp-to-png', from: 'WebP', to: 'PNG' },
];

export default function ConverterNav({ currentSlug }) {
  const pathname = usePathname();

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
          Quick Switch Converter
        </span>
        <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
          Fast In-Browser Format Conversion
        </span>
      </div>

      <div className="p-1.5 bg-slate-100/90 border border-slate-200/80 rounded-2xl overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {CONVERTER_ITEMS.map((item) => {
            const isActive = pathname === item.href || currentSlug === item.href.replace('/', '');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 select-none whitespace-nowrap',
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/90 ring-2 ring-blue-600/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                )}
              >
                <span>{item.from}</span>
                <span className={cn('text-[10px]', isActive ? 'text-blue-500' : 'text-slate-400')}>→</span>
                <span>{item.to}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse ml-0.5" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
