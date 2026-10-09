import EventCard from './EventCard';

export default function RelatedEvents({ relatedEvents = [] }) {
  if (!relatedEvents || relatedEvents.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-slate-200">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Related AI Events & Conferences
        </h2>
        <p className="text-sm text-slate-600">
          Discover other upcoming summits, research gatherings, and technology conventions in similar fields.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {relatedEvents.map((evt) => (
          <EventCard key={evt.id} event={evt} />
        ))}
      </div>
    </section>
  );
}
