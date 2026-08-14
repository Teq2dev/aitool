'use client';

import { useLanguage } from '@/context/LanguageContext';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

export default function CategoryDetailClient({ category, popularTools, freeTools, newTools, allTools, relatedCats = [], relatedBlogs = [] }) {
  const { t, currentLang, getLangUrl } = useLanguage();
  
  const translationOverride = category.translations?.[currentLang] || {};
  const displayName = translationOverride.name || category.name;
  const displayDescription = translationOverride.longDescription || translationOverride.description || category.longDescription || category.description;
  const displayBuyingGuide = translationOverride.buyingGuide || category.buyingGuide;
  
  let displayFaqs = category.faqs;
  if (currentLang !== 'en' && translationOverride.faqs && translationOverride.faqs.length > 0) {
    displayFaqs = translationOverride.faqs;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4 text-sm text-gray-500">
            <Link href={getLangUrl('/')} className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href={getLangUrl('/categories')} className="hover:text-blue-600">Categories</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{displayName}</span>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-5xl">{category.icon}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {displayName} Tools
            </h1>
          </div>
          {category.contentStatus === 'draft' && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
              <strong>Draft Mode:</strong> This page is using placeholder content for UI testing and is currently hidden from search engines (noindex). 
            </div>
          )}
          <div 
            className="prose prose-blue max-w-4xl text-gray-600 text-lg leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(displayDescription) }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Buying Guide */}
            {displayBuyingGuide && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Choose the Right {displayName} Tool</h2>
                <div 
                  className="prose prose-blue max-w-none text-gray-600 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(displayBuyingGuide) }}
                />
              </section>
            )}

            {/* Popular Tools Segment */}
            {popularTools.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Popular {displayName} Tools</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {popularTools.map((tool) => (
                    <ToolCard key={tool._id} tool={tool} />
                  ))}
                </div>
              </section>
            )}

            {/* Free Tools Segment */}
            {freeTools.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Best Free {displayName} Tools</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {freeTools.map((tool) => (
                    <ToolCard key={tool._id} tool={tool} />
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {displayFaqs && displayFaqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {displayFaqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <div 
                        className="text-gray-600 leading-relaxed whitespace-pre-wrap prose prose-blue"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer) }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Internal Links: Semantic Clusters */}
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
                      <Link key={rc} href={`/${currentLang === 'en' ? '' : currentLang + '/'}categories/${rc}`} className="px-4 py-2 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-full text-sm font-medium transition-colors border border-gray-100">
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
                      <Link key={rb.slug} href={`/blogs/${rb.slug}`} className="p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition bg-white group">
                        <h4 className="font-semibold text-gray-900 group-hover:text-green-700 transition">{rb.title}</h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Latest Arrivals</h3>
              <div className="space-y-4">
                {newTools.map((tool) => (
                  <Link href={getLangUrl(`/tools/${tool.slug}`)} key={tool._id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition">
                    <img src={tool.logo} alt={tool.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{tool.name}</h4>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{tool.pricing}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
