'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Building2, ArrowRight, Laptop, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import EventStatusBadge from './EventStatusBadge';
import { formatEventDates } from '@/lib/events/eventUtils.js';

export default function EventCard({ event }) {
  const { getLangUrl } = useLanguage();
  const [logoFailed, setLogoFailed] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  if (!event) return null;

  const isUpcoming = event.status === 'upcoming' || event.status === 'ongoing';
  const formattedDate = formatEventDates(event.startDate, event.endDate);
  const detailUrl = getLangUrl(`/events/${event.slug}`);

  // Fallback banner gradient based on category
  const getBannerGradient = () => {
    if (!isUpcoming) {
      return 'from-slate-700 via-slate-800 to-slate-900';
    }
    const cat = event.categories?.[0] || '';
    if (cat.includes('Research') || cat.includes('Learning')) {
      return 'from-blue-600 via-indigo-600 to-purple-700';
    }
    if (cat.includes('Generative') || cat.includes('Developer')) {
      return 'from-indigo-600 via-blue-600 to-cyan-600';
    }
    if (cat.includes('Business') || cat.includes('Summit')) {
      return 'from-slate-900 via-blue-900 to-indigo-900';
    }
    if (cat.includes('Hardware') || cat.includes('Robotics')) {
      return 'from-emerald-700 via-teal-700 to-cyan-800';
    }
    return 'from-blue-700 via-indigo-700 to-slate-900';
  };

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl overflow-hidden transition-all duration-300 ${
        isUpcoming
          ? 'bg-white border-2 border-emerald-500/25 hover:border-emerald-500 shadow-xs hover:shadow-xl ring-1 ring-emerald-500/10'
          : 'bg-slate-50/90 border border-slate-300 hover:border-slate-400 hover:bg-slate-100/80 shadow-2xs'
      }`}
    >
      {/* Top Visual Accent Stripe */}
      <div
        className={`h-1.5 w-full ${
          isUpcoming
            ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600'
            : 'bg-slate-300'
        }`}
        aria-hidden="true"
      />

      {/* Card Header Banner with Official Website Image / Gradient */}
      <div className={`relative h-28 sm:h-32 w-full overflow-hidden bg-slate-900 ${!isUpcoming ? 'grayscale contrast-75' : ''}`}>
        {event.image && !imgFailed ? (
          <img
            src={event.image}
            alt={`${event.shortName || event.name} banner`}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getBannerGradient()} opacity-90`} />
        )}

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Floating Row: Logo and Status Badge */}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 z-10">
          {/* Official Brand Logo Box */}
          <div className="w-12 h-12 rounded-xl bg-white p-1.5 shadow-md border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            {event.logo && !logoFailed ? (
              <img
                src={event.logo}
                alt={`${event.shortName || event.name} logo`}
                width={36}
                height={36}
                loading="lazy"
                onError={() => setLogoFailed(true)}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <Building2 className="w-6 h-6 text-slate-500" aria-hidden="true" />
            )}
          </div>

          {/* Prominent Status Badge */}
          <div className="shrink-0">
            <EventStatusBadge status={event.status} />
          </div>
        </div>

        {/* Top-Right Event Type Pill */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white border border-white/20">
            {event.eventType}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-base sm:text-lg font-extrabold line-clamp-2 leading-snug mb-3">
            <Link
              href={detailUrl}
              className={`focus:outline-none focus:underline ${
                isUpcoming
                  ? 'text-slate-900 group-hover:text-blue-600 transition-colors'
                  : 'text-slate-700 group-hover:text-slate-900 transition-colors'
              }`}
            >
              {event.shortName || event.name}
            </Link>
          </h3>

          {/* Date & Location Grid */}
          <div className="space-y-2 mb-4 text-xs">
            {/* Date Badge */}
            <div className="flex items-center gap-1.5">
              <Calendar
                className={`w-3.5 h-3.5 shrink-0 ${isUpcoming ? 'text-blue-600' : 'text-slate-400'}`}
                aria-hidden="true"
              />
              <span
                className={`px-2 py-0.5 rounded-md font-bold ${
                  isUpcoming
                    ? 'bg-blue-50 text-blue-800 border border-blue-200/60'
                    : 'bg-slate-200/80 text-slate-700'
                }`}
              >
                {formattedDate}
              </span>
              {!isUpcoming && (
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  (Passed)
                </span>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-slate-600">
              {event.venue ? (
                <>
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" aria-hidden="true" />
                  <span className="truncate font-medium">
                    {event.venue.city}, {event.venue.country}
                  </span>
                </>
              ) : (
                <>
                  <Laptop className="w-3.5 h-3.5 text-violet-500 shrink-0" aria-hidden="true" />
                  <span className="font-medium">Virtual / Online Event</span>
                </>
              )}
            </div>

            {/* Organizer */}
            {event.organizer?.name && (
              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                <span className="truncate">{event.organizer.name}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>

          {/* Category Tags */}
          {event.categories && event.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {event.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                    isUpcoming
                      ? 'bg-slate-50 text-slate-600 border-slate-200/80'
                      : 'bg-slate-200/50 text-slate-600 border-slate-300/60'
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions — Distinct between Upcoming & Concluded */}
        <div
          className={`pt-3.5 border-t flex items-center justify-between ${
            isUpcoming ? 'border-slate-100' : 'border-slate-200'
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-400">
            {isUpcoming ? '2026 Edition' : 'Archived 2026'}
          </span>

          <Link
            href={detailUrl}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
              isUpcoming
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-md'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
            aria-label={`View ${isUpcoming ? 'and register for' : 'archive details of'} ${event.shortName || event.name}`}
          >
            <span>{isUpcoming ? 'Explore & Register' : 'View Archive'}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
