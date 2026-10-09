/**
 * AI Events Directory - SEO, Metadata & Schema.org Helpers
 * BestAIToolsFree.com
 */

import { EVENT_STATUS, ATTENDANCE_MODE } from './eventTypes.js';
import { formatEventDates } from './eventUtils.js';

const BASE_URL = 'https://www.bestaitoolsfree.com';

const SUPPORTED_LANGS = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];

/**
 * Builds standard 11-language hreflang alternates map
 */
export function buildHreflangMap(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const map = {
    'x-default': `${BASE_URL}${cleanPath}`,
    'en': `${BASE_URL}${cleanPath}`,
  };

  SUPPORTED_LANGS.filter((l) => l !== 'en').forEach((lang) => {
    map[lang] = `${BASE_URL}/${lang}${cleanPath}`;
  });

  return map;
}

/**
 * Generate metadata for the /events hub page
 */
export function generateEventsHubMetadata(lang = 'en') {
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const canonicalUrl = `${BASE_URL}${langPrefix}/events`;
  const languages = buildHreflangMap('/events');

  const title = 'AI Events & Conferences Worldwide 2026 — Best AI Tools Free';
  const description =
    'Discover premier artificial intelligence conferences, global AI summits, ML research gatherings, and developer expos worldwide in 2026. Verified dates, locations, and official sources.';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Best AI Tools Free',
      locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate metadata for an individual event detail page
 */
export function generateEventMetadata(event, lang = 'en') {
  if (!event) {
    return {
      title: 'AI Event Not Found | Best AI Tools Free',
      description: 'The requested artificial intelligence event could not be found.',
    };
  }

  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const canonicalUrl = `${BASE_URL}${langPrefix}/events/${event.slug}`;
  const languages = buildHreflangMap(`/events/${event.slug}`);

  const formattedDate = formatEventDates(event.startDate, event.endDate);
  const locationStr = event.venue
    ? `${event.venue.city}, ${event.venue.country}`
    : 'Virtual / Online';

  const title = `${event.shortName || event.name} — Dates, Venue & Event Details (${event.year})`;
  const description = `${event.name} takes place ${formattedDate} in ${locationStr}. Organized by ${event.organizer?.name || 'the official committee'}. Verified schedule, venue info, and official links.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Best AI Tools Free',
      locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate Schema.org JSON-LD for event detail page
 */
export function generateEventJsonLd(event, lang = 'en') {
  if (!event) return null;

  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const eventUrl = `${BASE_URL}${langPrefix}/events/${event.slug}`;
  const hubUrl = `${BASE_URL}${langPrefix}/events`;
  const homeUrl = `${BASE_URL}${langPrefix}/`;

  // Map Schema attendance mode
  let schemaAttendanceMode = 'https://schema.org/OfflineEventAttendanceMode';
  if (event.attendanceMode === ATTENDANCE_MODE.ONLINE) {
    schemaAttendanceMode = 'https://schema.org/OnlineEventAttendanceMode';
  } else if (event.attendanceMode === ATTENDANCE_MODE.MIXED) {
    schemaAttendanceMode = 'https://schema.org/MixedEventAttendanceMode';
  }

  // Map Schema event status
  let schemaStatus = 'https://schema.org/EventScheduled';
  if (event.status === EVENT_STATUS.CANCELLED) {
    schemaStatus = 'https://schema.org/EventCancelled';
  } else if (event.status === EVENT_STATUS.POSTPONED) {
    schemaStatus = 'https://schema.org/EventPostponed';
  }

  // Schema Location
  let locationNode = null;
  if (event.venue) {
    locationNode = {
      '@type': 'Place',
      name: event.venue.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venue.address || event.venue.name,
        addressLocality: event.venue.city,
        addressCountry: event.venue.countryCode || event.venue.country,
      },
    };
  } else {
    locationNode = {
      '@type': 'VirtualLocation',
      url: event.officialUrl,
    };
  }

  // Primary Event Schema
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: schemaStatus,
    eventAttendanceMode: schemaAttendanceMode,
    location: locationNode,
    description: event.description,
    url: eventUrl,
  };

  if (event.organizer?.name) {
    eventSchema.organizer = {
      '@type': 'Organization',
      name: event.organizer.name,
      url: event.organizer.url || event.officialUrl,
    };
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Events',
        item: hubUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: event.shortName || event.name,
        item: eventUrl,
      },
    ],
  };

  // FAQPage Schema (only if faqs exist)
  let faqSchema = null;
  if (event.faqs && event.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: event.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  return {
    eventSchema,
    breadcrumbSchema,
    faqSchema,
  };
}

/**
 * Generate Schema.org JSON-LD for events hub page
 */
export function generateEventsHubJsonLd(events = [], lang = 'en') {
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const hubUrl = `${BASE_URL}${langPrefix}/events`;
  const homeUrl = `${BASE_URL}${langPrefix}/`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Events',
        item: hubUrl,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Events & Conferences Worldwide',
    description:
      'A directory of major global artificial intelligence conferences, academic symposia, and enterprise tech events.',
    url: hubUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: events.length,
      itemListElement: events.slice(0, 30).map((event, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: event.name,
        url: `${BASE_URL}${langPrefix}/events/${event.slug}`,
      })),
    },
  };

  return {
    breadcrumbSchema,
    collectionSchema,
  };
}
