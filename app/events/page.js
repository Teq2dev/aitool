import { getAllEvents, getEventStats, getAllCountries } from '@/lib/events/eventUtils.js';
import { generateEventsHubMetadata, generateEventsHubJsonLd } from '@/lib/events/eventSeo.js';
import EventsHubClient from '@/components/events/EventsHubClient';
import EventBreadcrumb from '@/components/events/EventBreadcrumb';
import { Sparkles, CalendarDays, ShieldCheck } from 'lucide-react';

export async function generateMetadata({ searchParams }) {
  const sParams = await searchParams;
  const lang = sParams?.lang || 'en';
  return generateEventsHubMetadata(lang);
}

export default async function EventsHubPage({ searchParams }) {
  const sParams = await searchParams;
  const lang = sParams?.lang || 'en';

  const events = getAllEvents();
  const stats = getEventStats();
  const countries = getAllCountries();
  const { breadcrumbSchema, collectionSchema } = generateEventsHubJsonLd(events, lang);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className="min-h-screen bg-slate-50/60 pb-20">
        {/* Hero Header */}
        <section className="bg-gradient-to-b from-blue-50/50 via-white to-slate-50/60 border-b border-slate-200/70 pt-8 pb-10 sm:py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <EventBreadcrumb />

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                <span>Verified Global AI Event Calendar 2026</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                AI Events & Conferences Worldwide
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Discover major artificial intelligence conferences, academic symposia, summits, and developer expos taking place globally in 2026. Every listing features verified schedules, venues, and official links.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>100% Fact-Checked Official Sources</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  <span>Real-Time Status & Date Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Listing Body */}
        <div className="container mx-auto px-4 max-w-6xl mt-8">
          <EventsHubClient
            initialEvents={events}
            countries={countries}
            stats={stats}
          />
        </div>
      </main>
    </>
  );
}
