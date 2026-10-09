import { EVENT_STATUS, STATUS_LABELS } from '@/lib/events/eventTypes.js';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function EventStatusBadge({ status, className = '' }) {
  const normalized = (status || EVENT_STATUS.UPCOMING).toLowerCase();

  if (normalized === EVENT_STATUS.UPCOMING) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-emerald-50 text-emerald-800 border-2 border-emerald-500/40 shadow-xs ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
        </span>
        <span>Upcoming · Open</span>
      </span>
    );
  }

  if (normalized === EVENT_STATUS.COMPLETED) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-slate-800 text-slate-100 border border-slate-700 shadow-xs ${className}`}
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
        <span>Concluded / Past</span>
      </span>
    );
  }

  if (normalized === EVENT_STATUS.ONGOING) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-blue-50 text-blue-800 border-2 border-blue-500/40 shadow-xs ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
        </span>
        <span>Happening Now</span>
      </span>
    );
  }

  if (normalized === EVENT_STATUS.POSTPONED) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-amber-50 text-amber-800 border border-amber-300 ${className}`}
      >
        <Clock className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
        <span>Postponed</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-rose-50 text-rose-800 border border-rose-300 ${className}`}
    >
      <AlertCircle className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
      <span>Cancelled</span>
    </span>
  );
}
