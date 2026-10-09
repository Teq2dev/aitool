'use client';

import { useState, useMemo } from 'react';
import { Calendar, Globe2, Layers, CheckCircle2, SearchX, Sparkles, Archive, ListFilter } from 'lucide-react';
import EventCard from './EventCard';
import EventFilters from './EventFilters';
import { filterEvents } from '@/lib/events/eventUtils.js';

export default function EventsHubClient({ initialEvents = [], countries = [], stats = {} }) {
  // Main view tab: 'upcoming' by default to avoid confusion!
  const [activeTab, setActiveTab] = useState('upcoming');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [country, setCountry] = useState('all');
  const [eventType, setEventType] = useState('all');
  const [status, setStatus] = useState('all');

  const upcomingCount = useMemo(() => {
    return initialEvents.filter((e) => e.status === 'upcoming' || e.status === 'ongoing').length;
  }, [initialEvents]);

  const completedCount = useMemo(() => {
    return initialEvents.filter((e) => e.status === 'completed').length;
  }, [initialEvents]);

  // Compute status override based on activeTab
  const effectiveStatus = useMemo(() => {
    if (activeTab === 'upcoming') return 'upcoming';
    if (activeTab === 'completed') return 'completed';
    return status;
  }, [activeTab, status]);

  const hasActiveFilters = Boolean(
    search.trim() ||
    category !== 'all' ||
    country !== 'all' ||
    eventType !== 'all' ||
    (activeTab === 'all' && status !== 'all')
  );

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setCountry('all');
    setEventType('all');
    setStatus('all');
  };

  const filteredEvents = useMemo(() => {
    return filterEvents(initialEvents, {
      search,
      category,
      country,
      eventType,
      status: effectiveStatus,
    });
  }, [initialEvents, search, category, country, eventType, effectiveStatus]);

  return (
    <div>
      {/* Quick Directory Stats Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
              {stats.total || initialEvents.length}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Total Verified Events</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
              {upcomingCount}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Upcoming in 2026</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Globe2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
              {stats.countriesCount || countries.length}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Countries</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
              {stats.categoriesCount || 12}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">AI Categories</div>
          </div>
        </div>
      </div>

      {/* Primary Discovery Segmented Tabs: Upcoming vs Completed vs All */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-2 sm:p-2.5 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1 bg-slate-100 rounded-xl">
            {/* Upcoming Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('upcoming');
                setStatus('all');
              }}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-white text-emerald-800 shadow-sm border border-emerald-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span>Upcoming Events</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] bg-emerald-100 text-emerald-800">
                {upcomingCount}
              </span>
            </button>

            {/* Completed Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('completed');
                setStatus('all');
              }}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'completed'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Archive className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span>Past / Completed</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] bg-slate-200 text-slate-700">
                {completedCount}
              </span>
            </button>

            {/* All Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
              }}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-blue-700 shadow-sm border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              <span>All Events</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] bg-blue-100 text-blue-800">
                {initialEvents.length}
              </span>
            </button>
          </div>

          {/* Quick Context Subtext */}
          <div className="text-xs text-slate-500 font-medium px-2">
            {activeTab === 'upcoming' && (
              <span className="text-emerald-700 font-semibold">
                ● Showing upcoming 2026 events open for registration
              </span>
            )}
            {activeTab === 'completed' && (
              <span className="text-slate-600 font-semibold">
                ● Showing past 2026 events (archive & summaries)
              </span>
            )}
            {activeTab === 'all' && (
              <span className="text-blue-700 font-semibold">
                ● Showing all {initialEvents.length} verified events
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <EventFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        country={country}
        setCountry={setCountry}
        eventType={eventType}
        setEventType={setEventType}
        countries={countries}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        filteredCount={filteredEvents.length}
        totalCount={initialEvents.length}
      />

      {/* Results Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-7 h-7" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No AI Events Found</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            We couldn't find any events matching your selected criteria in this tab. Try clearing your filters or viewing all events.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
            >
              Reset Filters
            </button>
            {activeTab !== 'all' && (
              <button
                type="button"
                onClick={() => {
                  setActiveTab('all');
                  resetFilters();
                }}
                className="inline-flex items-center justify-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
              >
                View All Events ({initialEvents.length})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
