'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PdfProcessingProgress({
  progress = 0,
  statusText = 'Processing document in browser memory…',
  className,
}) {
  return (
    <div className={cn('p-6 bg-blue-50/70 border border-blue-200/80 rounded-3xl space-y-3.5', className)}>
      <div className="flex items-center justify-between text-xs font-bold text-blue-900">
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          {statusText}
        </span>
        <span className="font-mono">{progress}%</span>
      </div>

      <div className="w-full h-2.5 bg-blue-100/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300 progress-striped"
          style={{ width: `${Math.max(5, Math.min(100, progress))}%` }}
        />
      </div>

      <p className="text-[11px] text-blue-700/80 font-medium text-center">
        Encapsulated within browser RAM · No data is sent over the network
      </p>
    </div>
  );
}
