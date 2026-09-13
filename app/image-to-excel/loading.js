export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl space-y-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-20 bg-slate-200 rounded-md" />
        <div className="h-4 w-3 bg-slate-200 rounded-md" />
        <div className="h-4 w-28 bg-slate-200 rounded-md" />
      </div>

      {/* Header Skeleton */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="h-6 w-48 bg-blue-100 rounded-full mx-auto" />
        <div className="h-10 w-80 bg-slate-200 rounded-2xl mx-auto" />
        <div className="h-4 w-full bg-slate-100 rounded-full mx-auto" />
      </div>

      {/* Upload Zone Skeleton */}
      <div className="border-2 border-dashed border-slate-200 rounded-3xl p-14 flex flex-col items-center gap-4 bg-slate-50">
        <div className="w-20 h-20 bg-slate-200 rounded-2xl" />
        <div className="h-6 w-64 bg-slate-200 rounded-full" />
        <div className="h-4 w-40 bg-slate-100 rounded-full" />
      </div>
    </div>
  );
}
