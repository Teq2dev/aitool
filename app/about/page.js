import Breadcrumbs from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | Best AI Tools Free',
  description: 'Learn more about Best AI Tools Free, our mission to curate the best free and freemium artificial intelligence tools, and how we help users discover AI software.',
  alternates: {
    canonical: 'https://www.bestaitoolsfree.com/about',
  },
};

export default function AboutPage() {
  const breadcrumbData = [
    { label: 'Home', href: '/' },
    { label: 'About Us' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs data={breadcrumbData} />
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 mt-6 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              About Best AI Tools Free
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Welcome to <strong>Best AI Tools Free</strong> — the comprehensive, community-driven directory of verified Artificial Intelligence tools, software, and web applications.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              The AI landscape is expanding at an unprecedented speed. Our mission is to make artificial intelligence accessible, transparent, and practical for everyone — from developers and designers to students, marketers, and founders.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We curate, review, categorize, and benchmark thousands of AI tools, highlighting genuine free tiers, freemium options, and open-source models so you can find the perfect software without unnecessary friction.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-950 mb-1">🔍 Comprehensive Directory</h3>
                <p className="text-sm text-slate-600">Over 900+ vetted tools across 50+ specialized categories including writing, video editing, voice cloning, and coding assistants.</p>
              </div>
              <div className="p-4 bg-green-50/50 rounded-xl border border-green-100">
                <h3 className="font-bold text-green-950 mb-1">💰 Transparent Pricing</h3>
                <p className="text-sm text-slate-600">Clear breakdown of free trials, freemium limitations, monthly pricing, and commercial use licenses.</p>
              </div>
              <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-950 mb-1">🌍 Global Multi-Language Access</h3>
                <p className="text-sm text-slate-600">Full localization support across 12 languages to assist global innovators and creators.</p>
              </div>
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <h3 className="font-bold text-amber-950 mb-1">🚀 Founder Submissions</h3>
                <p className="text-sm text-slate-600">A direct launchpad for indie creators and founders to showcase their AI tools to thousands of daily users.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">Have an AI product to share?</h3>
              <p className="text-sm text-slate-500">Submit your tool for review and get featured in our directory.</p>
            </div>
            <Link 
              href="/submit" 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors"
            >
              Submit Your Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
