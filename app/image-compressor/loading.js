export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-3.5 w-12 bg-slate-200 rounded-full" />
        <div className="h-3.5 w-3 bg-slate-200 rounded-full" />
        <div className="h-3.5 w-32 bg-slate-200 rounded-full" />
      </div>

      {/* Title block */}
      <div className="text-center space-y-4 mb-10">
        <div className="flex justify-center"><div className="h-7 w-52 bg-blue-100 rounded-full" /></div>
        <div className="h-11 w-2/3 bg-slate-200 rounded-2xl mx-auto" />
        <div className="h-11 w-1/2 bg-slate-200 rounded-2xl mx-auto" />
        <div className="h-5 w-3/4 bg-slate-100 rounded-full mx-auto" />
        <div className="h-5 w-1/2 bg-slate-100 rounded-full mx-auto" />
      </div>

      {/* Upload zone skeleton */}
      <div className="border-2 border-dashed border-slate-200 rounded-3xl p-14 flex flex-col items-center gap-5 bg-slate-50 mb-6">
        <div className="w-20 h-20 bg-slate-200 rounded-2xl" />
        <div className="h-6 w-52 bg-slate-200 rounded-full" />
        <div className="h-4 w-40 bg-slate-100 rounded-full" />
        <div className="flex gap-2 mt-2">
          {['JPG','PNG','WebP'].map(f => <div key={f} className="h-8 w-14 bg-slate-200 rounded-lg" />)}
        </div>
        <div className="h-7 w-56 bg-emerald-100 rounded-full" />
      </div>

      {/* Trust badges */}
      <div className="flex justify-center gap-6">
        {[...Array(3)].map((_, i) => <div key={i} className="h-5 w-36 bg-slate-100 rounded-full" />)}
      </div>
    </div>
  );
}
