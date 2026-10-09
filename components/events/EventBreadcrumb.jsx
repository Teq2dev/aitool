'use client';

import Link from 'next/link';
import { ChevronRight, Home, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function EventBreadcrumb({ eventName, eventSlug }) {
  const { getLangUrl } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto py-1">
      <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 whitespace-nowrap">
        <li>
          <Link
            href={getLangUrl('/')}
            className="flex items-center text-slate-500 hover:text-blue-600 transition-colors focus:outline-none focus:underline"
          >
            <Home className="w-3.5 h-3.5 mr-1 text-slate-400" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <Link
            href={getLangUrl('/events')}
            className="flex items-center text-slate-500 hover:text-blue-600 transition-colors focus:outline-none focus:underline"
          >
            <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" aria-hidden="true" />
            <span>AI Events</span>
          </Link>
        </li>
        {eventName && (
          <li className="flex items-center space-x-2" aria-current="page">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {eventName}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}
