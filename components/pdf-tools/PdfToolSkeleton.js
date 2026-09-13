// Shared skeleton shown instantly while the PDF client JS bundle loads
export default function PdfToolSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-3.5 w-16 bg-slate-200 rounded-full" />
        <div className="h-3.5 w-3 bg-slate-200 rounded-full" />
        <div className="h-3.5 w-24 bg-slate-200 rounded-full" />
      </div>

      {/* Hero badge */}
      <div className="flex justify-center mb-4">
        <div className="h-7 w-56 bg-blue-100 rounded-full" />
      </div>

      {/* Title */}
      <div className="flex flex-col items-center gap-3 mb-4">
        <div className="h-10 w-3/4 bg-slate-200 rounded-xl" />
        <div className="h-10 w-1/2 bg-slate-200 rounded-xl" />
      </div>

      {/* Subtitle */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <div className="h-4 w-2/3 bg-slate-100 rounded-full" />
        <div className="h-4 w-1/2 bg-slate-100 rounded-full" />
      </div>

      {/* Upload zone skeleton */}
      <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center gap-4 bg-slate-50 mb-6">
        <div className="w-14 h-14 bg-slate-200 rounded-2xl" />
        <div className="h-5 w-48 bg-slate-200 rounded-full" />
        <div className="h-4 w-36 bg-slate-100 rounded-full" />
        <div className="h-10 w-36 bg-blue-100 rounded-xl mt-2" />
      </div>

      {/* Related tools skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
