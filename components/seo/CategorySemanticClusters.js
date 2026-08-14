import Link from 'next/link';

export default function CategorySemanticClusters({ relatedCats, relatedBlogs, effectiveLang }) {
  const getLangUrl = (path) => effectiveLang === 'en' ? path : `/${effectiveLang}${path}`;

  return (
    <div className="mt-12 space-y-8 border-t border-gray-100 pt-8">
      {relatedCats && relatedCats.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-700 p-1.5 rounded-lg mr-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </span>
            Related Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedCats.map(rc => (
              <Link key={rc} href={getLangUrl(`/categories/${rc}`)} className="px-4 py-2 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-full text-sm font-medium transition-colors border border-gray-100">
                {rc.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedBlogs && relatedBlogs.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-green-100 text-green-700 p-1.5 rounded-lg mr-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </span>
            Relevant Reads
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedBlogs.map(rb => (
              <Link key={rb.slug} href={getLangUrl(`/blogs/${rb.slug}`)} className="p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition bg-white group">
                <h4 className="font-semibold text-gray-900 group-hover:text-green-700 transition">{rb.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
