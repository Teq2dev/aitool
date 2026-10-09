/**
 * AI Events Directory - Utility & Query Helpers
 * BestAIToolsFree.com
 */

import { EVENTS_DATA } from './eventData.js';
import { EVENT_STATUS } from './eventTypes.js';

/**
 * Returns all events, sorted by startDate ascending by default
 */
export function getAllEvents() {
  return [...EVENTS_DATA].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

/**
 * Find a single event by slug
 */
export function getEventBySlug(slug) {
  if (!slug) return null;
  const normalized = slug.trim().toLowerCase();
  return EVENTS_DATA.find((e) => e.slug.toLowerCase() === normalized) || null;
}

/**
 * Returns upcoming events sorted chronologically
 */
export function getUpcomingEvents() {
  return EVENTS_DATA
    .filter((e) => e.status === EVENT_STATUS.UPCOMING || e.status === EVENT_STATUS.ONGOING)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

/**
 * Returns completed/past events sorted reverse chronologically (most recent first)
 */
export function getCompletedEvents() {
  return EVENTS_DATA
    .filter((e) => e.status === EVENT_STATUS.COMPLETED)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
}

/**
 * Filter events based on multi-faceted query params
 */
export function filterEvents(events = EVENTS_DATA, {
  search = '',
  status = 'all',
  category = 'all',
  country = 'all',
  region = 'all',
  eventType = 'all',
  dateFilter = 'all'
} = {}) {
  let filtered = [...events];

  // Search filter (name, shortName, city, country, organizer, topics, categories)
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter((e) => {
      const matchName = e.name?.toLowerCase().includes(q);
      const matchShortName = e.shortName?.toLowerCase().includes(q);
      const matchCity = e.venue?.city?.toLowerCase().includes(q);
      const matchCountry = e.venue?.country?.toLowerCase().includes(q);
      const matchOrganizer = e.organizer?.name?.toLowerCase().includes(q);
      const matchCategory = e.categories?.some((c) => c.toLowerCase().includes(q));
      const matchTopic = e.topics?.some((t) => t.toLowerCase().includes(q));
      return (
        matchName ||
        matchShortName ||
        matchCity ||
        matchCountry ||
        matchOrganizer ||
        matchCategory ||
        matchTopic
      );
    });
  }

  // Status filter
  if (status && status !== 'all') {
    filtered = filtered.filter((e) => e.status.toLowerCase() === status.toLowerCase());
  }

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter((e) =>
      e.categories?.some((c) => c.toLowerCase() === category.toLowerCase())
    );
  }

  // Country filter
  if (country && country !== 'all') {
    filtered = filtered.filter(
      (e) => e.venue?.country?.toLowerCase() === country.toLowerCase()
    );
  }

  // Region filter
  if (region && region !== 'all') {
    filtered = filtered.filter(
      (e) => e.region?.toLowerCase() === region.toLowerCase()
    );
  }

  // Format / Event Type filter (e.g., Conference, Summit, Expo)
  if (eventType && eventType !== 'all') {
    filtered = filtered.filter(
      (e) => e.eventType?.toLowerCase() === eventType.toLowerCase()
    );
  }

  // Date Filter
  if (dateFilter && dateFilter !== 'all') {
    const now = new Date('2026-10-08T00:00:00Z');
    const currentYear = 2026;
    const currentMonth = 9; // October (0-indexed: 9)

    if (dateFilter === 'upcoming') {
      filtered = filtered.filter((e) => new Date(e.startDate) >= now || e.status === EVENT_STATUS.UPCOMING);
    } else if (dateFilter === 'this_month') {
      filtered = filtered.filter((e) => {
        const start = new Date(e.startDate);
        return start.getUTCFullYear() === currentYear && start.getUTCMonth() === currentMonth;
      });
    } else if (dateFilter === 'this_year') {
      filtered = filtered.filter((e) => {
        const start = new Date(e.startDate);
        return start.getUTCFullYear() === currentYear;
      });
    } else if (dateFilter === 'past') {
      filtered = filtered.filter((e) => e.status === EVENT_STATUS.COMPLETED);
    }
  }

  return filtered;
}

/**
 * Get related events for a given event
 */
export function getRelatedEvents(currentEvent, limit = 3) {
  if (!currentEvent) return [];

  const others = EVENTS_DATA.filter((e) => e.slug !== currentEvent.slug);

  // Score candidates based on relevance
  const scored = others.map((e) => {
    let score = 0;
    // Shared categories (+3 points per match)
    const sharedCategories = e.categories?.filter((c) =>
      currentEvent.categories?.includes(c)
    ).length || 0;
    score += sharedCategories * 3;

    // Same country (+2 points)
    if (e.venue?.country && currentEvent.venue?.country && e.venue.country === currentEvent.venue.country) {
      score += 2;
    }

    // Same region (+1 point)
    if (e.region && currentEvent.region && e.region === currentEvent.region) {
      score += 1;
    }

    // Same event type (+1 point)
    if (e.eventType === currentEvent.eventType) {
      score += 1;
    }

    // Upcoming events get slight preference (+1.5 points)
    if (e.status === EVENT_STATUS.UPCOMING) {
      score += 1.5;
    }

    return { event: e, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.event);
}

/**
 * Aggregate summary statistics for directory display
 */
export function getEventStats() {
  const total = EVENTS_DATA.length;
  const upcoming = EVENTS_DATA.filter((e) => e.status === EVENT_STATUS.UPCOMING).length;
  const completed = EVENTS_DATA.filter((e) => e.status === EVENT_STATUS.COMPLETED).length;

  const countriesSet = new Set(
    EVENTS_DATA.map((e) => e.venue?.country).filter(Boolean)
  );

  const categoriesSet = new Set(
    EVENTS_DATA.flatMap((e) => e.categories || [])
  );

  return {
    total,
    upcoming,
    completed,
    countriesCount: countriesSet.size,
    categoriesCount: categoriesSet.size
  };
}

/**
 * List unique countries with event counts
 */
export function getAllCountries() {
  const counts = {};
  EVENTS_DATA.forEach((e) => {
    const c = e.venue?.country;
    if (c) {
      counts[c] = (counts[c] || 0) + 1;
    }
  });

  return Object.keys(counts)
    .sort()
    .map((country) => ({
      country,
      count: counts[country]
    }));
}

/**
 * List unique categories with event counts
 */
export function getAllCategories() {
  const counts = {};
  EVENTS_DATA.forEach((e) => {
    e.categories?.forEach((cat) => {
      counts[cat] = (counts[cat] || 0) + 1;
    });
  });

  return Object.keys(counts)
    .sort()
    .map((name) => ({
      name,
      count: counts[name]
    }));
}

/**
 * Formats start and end dates nicely, e.g. "Dec 6–12, 2026" or "Jun 10–11, 2026"
 */
export function formatEventDates(startDateStr, endDateStr) {
  if (!startDateStr) return '';
  const start = new Date(startDateStr);
  const end = endDateStr ? new Date(endDateStr) : null;

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const startMonth = monthNames[start.getUTCMonth()];
  const startDay = start.getUTCDate();
  const startYear = start.getUTCFullYear();

  if (!end || startDateStr === endDateStr) {
    return `${startMonth} ${startDay}, ${startYear}`;
  }

  const endMonth = monthNames[end.getUTCMonth()];
  const endDay = end.getUTCDate();
  const endYear = end.getUTCFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}–${endDay}, ${startYear}`;
    }
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`;
  }

  return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
}
