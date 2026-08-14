import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-sm text-gray-600 flex-wrap">
      {data.map((b, i) => {
        const isLast = i === data.length - 1;
        
        return (
          <div key={b.label + i} className="flex items-center space-x-2">
            {!isLast && b.href ? (
              <Link 
                href={b.href} 
                className={`hover:text-blue-600 transition-colors ${b.capitalize ? 'capitalize' : ''}`}
              >
                {b.label}
              </Link>
            ) : (
              <span className={`font-semibold text-gray-900 truncate ${b.capitalize ? 'capitalize' : ''}`}>
                {b.label}
              </span>
            )}
            {!isLast && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
          </div>
        );
      })}
    </nav>
  );
}
