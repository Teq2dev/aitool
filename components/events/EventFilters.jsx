'use client';

import { Search, X, RotateCcw } from 'lucide-react';
import { EVENT_CATEGORIES, EVENT_TYPE } from '@/lib/events/eventTypes.js';

export default function EventFilters({
  search,
  setSearch,
  category,
  setCategory,
  country,
  setCountry,
  eventType,
  setEventType,
  countries = [],
  resetFilters,
  hasActiveFilters,
  filteredCount,
  totalCount,
}) {
  const eventTypesList = Object.values(EVENT_TYPE);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 mb-8 shadow-xs">
      {/* Search Input */}
      <div className="relative mb-4">
        <label htmlFor="event-search" className="sr-only">
          Search AI events, cities, organizers, topics
        </label>
        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="event-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by event name, city, country, organizer, or topic (e.g. NeurIPS, London, GTC, Robotics)..."
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Dropdowns Grid: Category, Country, Event Type */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
        {/* Category Dropdown */}
        <div>
          <label htmlFor="filter-category" className="block text-xs font-semibold text-slate-700 mb-1">
            Category
          </label>
          <select
            id="filter-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {EVENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Country Dropdown */}
        <div>
          <label htmlFor="filter-country" className="block text-xs font-semibold text-slate-700 mb-1">
            Country / Location
          </label>
          <select
            id="filter-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Countries</option>
            {countries.map((c) => (
              <option key={c.country} value={c.country}>
                {c.country} ({c.count})
              </option>
            ))}
          </select>
        </div>

        {/* Event Type Dropdown */}
        <div>
          <label htmlFor="filter-type" className="block text-xs font-semibold text-slate-700 mb-1">
            Format / Event Type
          </label>
          <select
            id="filter-type"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Formats</option>
            {eventTypesList.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Stats & Reset */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-900">{filteredCount}</strong> of {totalCount} events in this view
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
