import Link from 'next/link';
import { ExternalLink, Edit2, Star } from 'lucide-react';

export default function ToolSemanticClusters({ relatedCats, relatedBlogs, strongSimilar, relatedTools, effectiveLang }) {
  const getLangUrl = (path) => effectiveLang === 'en' ? path : `/${effectiveLang}${path}`;

  return (
    <div className="mt-12 space-y-8 border-t border-gray-100 pt-8">
      
      {relatedCats && relatedCats.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-700 p-1.5 rounded-lg mr-2">
              <ExternalLink className="w-5 h-5" />
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
              <Edit2 className="w-5 h-5" />
            </span>
            Relevant Reads
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedBlogs.map(rb => (
              <Link key={rb.slug} href={`/blogs/${rb.slug}`} className="p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition bg-white group">
                <h4 className="font-semibold text-gray-900 group-hover:text-green-700 transition">{rb.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}

      {((strongSimilar && strongSimilar.length > 0) || (relatedTools && relatedTools.length > 0)) && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-700 p-1.5 rounded-lg mr-2">
              <Star className="w-5 h-5" />
            </span>
            Related AI Tools
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {(strongSimilar || []).concat(relatedTools || []).slice(0, 10).map((st, i) => (
              <Link key={st.slug + i} href={getLangUrl(`/tools/${st.slug}`)} className="flex items-center p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition bg-white group">
                {st.logo && <img src={st.logo} alt={st.name} className="w-10 h-10 rounded-lg mr-3 object-cover" />}
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition">{st.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1">{st.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
