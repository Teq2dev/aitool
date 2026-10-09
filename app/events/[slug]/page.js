import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Building2,
  ExternalLink,
  Laptop,
  Clock,
  Users,
  CheckCircle2,
  ShieldCheck,
  Tag,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { getAllEvents, getEventBySlug, getRelatedEvents, formatEventDates } from '@/lib/events/eventUtils.js';
import { generateEventMetadata, generateEventJsonLd } from '@/lib/events/eventSeo.js';
import EventBreadcrumb from '@/components/events/EventBreadcrumb';
import EventStatusBadge from '@/components/events/EventStatusBadge';
import RelatedEvents from '@/components/events/RelatedEvents';

export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const lang = sParams?.lang || 'en';

  const event = getEventBySlug(slug);
  if (!event) {
    return {
      title: 'Event Not Found | Best AI Tools Free',
      description: 'The requested event could not be found.',
    };
  }

  return generateEventMetadata(event, lang);
}

export default async function EventDetailPage({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const lang = sParams?.lang || 'en';

  const event = getEventBySlug(slug);
  if (!event) {
    notFound();
  }

  const relatedEvents = getRelatedEvents(event, 3);
  const formattedDates = formatEventDates(event.startDate, event.endDate);
  const { eventSchema, breadcrumbSchema, faqSchema } = generateEventJsonLd(event, lang);

  const attendanceLabels = {
    offline: 'In-Person Event',
    online: 'Virtual / Online',
    mixed: 'Hybrid (In-Person & Virtual)',
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="min-h-screen bg-slate-50/60 pb-20">
        {/* Top Header Section */}
        <section className="bg-gradient-to-b from-blue-50/40 via-white to-slate-50/60 border-b border-slate-200/70 pt-8 pb-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <EventBreadcrumb eventName={event.shortName || event.name} eventSlug={event.slug} />

            {/* Clear Status Notice Banner */}
            {!event.status || event.status === 'completed' ? (
              <div className="mb-6 p-4 rounded-xl bg-slate-100 border border-slate-300/80 text-slate-700 text-xs sm:text-sm flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-700" aria-hidden="true" />
                </div>
                <div>
                  <strong className="font-bold text-slate-900 block mb-0.5">Event Concluded</strong>
                  <span>
                    This event was held on {formattedDates} in {event.venue ? `${event.venue.city}, ${event.venue.country}` : 'online format'}. This official directory page is maintained as an archive of topics covered, audience focus, and organizer details.
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                  </span>
                </div>
                <div>
                  <strong className="font-bold text-emerald-950 block mb-0.5">Upcoming Event — Open for Registration</strong>
                  <span>
                    Scheduled to take place on {formattedDates} in {event.venue ? `${event.venue.city}, ${event.venue.country}` : 'online format'}. Official registration and attendance passes are currently available.
                  </span>
                </div>
              </div>
            )}

            {/* Main Header Container with Logo & Title */}
            <div className="flex flex-col sm:flex-row items-start gap-5 mb-5">
              {/* Event Official Logo Box */}
              <div className="w-20 h-20 rounded-2xl bg-white p-2.5 shadow-md border border-slate-200/80 flex items-center justify-center shrink-0">
                <img
                  src={event.logo || `https://www.google.com/s2/favicons?domain=${new URL(event.officialUrl).hostname}&sz=128`}
                  alt={`${event.shortName || event.name} logo`}
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain"
                />
              </div>

              <div className="flex-1">
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <EventStatusBadge status={event.status} />
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
                    {event.eventType}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {event.region}
                  </span>
                </div>

                {/* Main H1 Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                  {event.name}
                </h1>
              </div>
            </div>

            {/* Concise Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              {event.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={event.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all ${
                  event.status === 'completed'
                    ? 'bg-slate-800 hover:bg-slate-900 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span>{event.status === 'completed' ? 'Visit Official Event Archive' : 'Visit Official Event Website & Register'}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>

              {event.registrationUrl && event.status !== 'completed' && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-sm font-semibold rounded-xl border border-slate-200 shadow-xs transition-all"
                >
                  <span>Official Registration & Passes</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Content Body */}
        <div className="container mx-auto px-4 max-w-5xl mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Main Information */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* About Section */}
              <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" aria-hidden="true" />
                  <span>About {event.shortName || event.name}</span>
                </h2>
                <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                  {event.about}
                </div>
              </section>

              {/* Target Audience */}
              {event.targetAudience && event.targetAudience.length > 0 && (
                <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                    <span>Who Should Attend</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4">
                    Based on official event tracks, this gathering is specifically tailored for:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {event.targetAudience.map((role) => (
                      <div
                        key={role}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                        <span className="font-medium">{role}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Topics / Subject Areas */}
              {event.topics && event.topics.length > 0 && (
                <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-amber-600" aria-hidden="true" />
                    <span>Topics & Focus Areas</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {event.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50/70 text-blue-800 border border-blue-200/50"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Frequently Asked Questions (1:1 with FAQPage Schema) */}
              {event.faqs && event.faqs.length > 0 && (
                <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    <span>Frequently Asked Questions</span>
                  </h2>
                  <div className="space-y-4">
                    {event.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50/80 border border-slate-100"
                      >
                        <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                          {faq.question}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Verification & Transparency Box */}
              <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <div className="font-semibold text-slate-900">
                    Source Verified: {event.source?.name}
                  </div>
                  <div>
                    Last checked for accuracy: <time dateTime={event.source?.lastVerified}>{event.source?.lastVerified}</time>. Event dates and venue details are verified against official announcements.
                  </div>
                  {event.source?.url && (
                    <div>
                      <a
                        href={event.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View Official Verification Source ↗
                      </a>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Col: Quick Event Info Card */}
            <div className="space-y-6">
              <aside className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs sticky top-24">
                <h2 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  Event Information
                </h2>

                <dl className="space-y-4 text-xs sm:text-sm">
                  {/* Dates */}
                  <div>
                    <dt className="text-slate-500 font-medium mb-1 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      <span>Dates</span>
                    </dt>
                    <dd className="font-semibold text-slate-900">
                      {formattedDates}
                    </dd>
                  </div>

                  {/* Location / Venue */}
                  <div>
                    <dt className="text-slate-500 font-medium mb-1 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-600" aria-hidden="true" />
                      <span>Location</span>
                    </dt>
                    <dd className="font-semibold text-slate-900">
                      {event.venue ? (
                        <>
                          <div>{event.venue.name}</div>
                          <div className="text-slate-600 font-normal mt-0.5">
                            {event.venue.city}, {event.venue.country}
                          </div>
                          {event.venue.address && (
                            <div className="text-slate-400 text-xs mt-0.5">
                              {event.venue.address}
                            </div>
                          )}
                        </>
                      ) : (
                        <div>Online / Virtual</div>
                      )}
                    </dd>
                  </div>

                  {/* Attendance Mode */}
                  <div>
                    <dt className="text-slate-500 font-medium mb-1 flex items-center gap-1.5">
                      <Laptop className="w-4 h-4 text-violet-600" aria-hidden="true" />
                      <span>Attendance Format</span>
                    </dt>
                    <dd className="font-semibold text-slate-900">
                      {attendanceLabels[event.attendanceMode] || event.attendanceMode}
                    </dd>
                  </div>

                  {/* Timezone */}
                  {event.timezone && (
                    <div>
                      <dt className="text-slate-500 font-medium mb-1 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-600" aria-hidden="true" />
                        <span>Local Timezone</span>
                      </dt>
                      <dd className="font-semibold text-slate-900">
                        {event.timezone}
                      </dd>
                    </div>
                  )}

                  {/* Organizer */}
                  {event.organizer?.name && (
                    <div>
                      <dt className="text-slate-500 font-medium mb-1 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-slate-500" aria-hidden="true" />
                        <span>Organizer</span>
                      </dt>
                      <dd className="font-semibold text-slate-900">
                        {event.organizer.url ? (
                          <a
                            href={event.organizer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline inline-flex items-center gap-1"
                          >
                            <span>{event.organizer.name}</span>
                            <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          </a>
                        ) : (
                          event.organizer.name
                        )}
                      </dd>
                    </div>
                  )}
                </dl>

                {/* Sidebar Official Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={event.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
                  >
                    <span>Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </aside>
            </div>

          </div>

          {/* Related Events Section */}
          <RelatedEvents relatedEvents={relatedEvents} />
        </div>
      </main>
    </>
  );
}
