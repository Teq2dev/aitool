'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer({ topCategories }) {
  const { getLangUrl } = useLanguage();

  return (
    <footer className="border-t bg-gray-50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.jpg" alt="Best AI Tools Free" className="w-8 h-8 rounded-lg object-cover" />
              <span className="font-bold text-lg">Best AI Tools Free</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              The world's largest directory of free AI tools. Discover, compare, and master the best artificial intelligence solutions for your business and creativity.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Top Categories</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {topCategories?.map(cat => (
                <li key={cat.slug}>
                  <Link href={getLangUrl(`/tools?category=${cat.slug}`)} className="hover:text-blue-600 transition-colors">
                    {cat.name} AI Tools
                  </Link>
                </li>
              ))}
              <li><Link href={getLangUrl('/categories')} className="text-blue-600 font-bold hover:underline">View All Categories →</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href={getLangUrl('/tools')} className="hover:text-blue-600">Browse All Tools</Link></li>
              <li><Link href={getLangUrl('/blogs')} className="hover:text-blue-600">AI Blog & News</Link></li>
              <li><Link href={getLangUrl('/submit')} className="hover:text-blue-600">Submit Your AI Tool</Link></li>
              <li><Link href={getLangUrl('/tools?sort=trending')} className="hover:text-blue-600">Trending Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Legal & Info</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href={getLangUrl('/about')} className="hover:text-blue-600">About Our Directory</Link></li>
              <li><Link href={getLangUrl('/contact')} className="hover:text-blue-600">Contact Us</Link></li>
              <li><Link href={getLangUrl('/privacy')} className="hover:text-blue-600">Privacy & Cookie Policy</Link></li>
              <li><Link href={getLangUrl('/terms')} className="hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>© 2026 Best AI Tools Free. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
