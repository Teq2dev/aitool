import Breadcrumbs from '@/components/seo/Breadcrumbs';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import staticTranslations from '@/lib/static-page-translations.json';

const BASE_URL = 'https://www.bestaitoolsfree.com';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const t = staticTranslations[lang]?.about || staticTranslations.en.about;
  const canonicalUrl = lang === 'en' ? `${BASE_URL}/about` : `${BASE_URL}/${lang}/about`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': `${BASE_URL}/about`,
        'en': `${BASE_URL}/about`,
        'es': `${BASE_URL}/es/about`,
        'fr': `${BASE_URL}/fr/about`,
        'de': `${BASE_URL}/de/about`,
        'pt': `${BASE_URL}/pt/about`,
        'ar': `${BASE_URL}/ar/about`,
        'ru': `${BASE_URL}/ru/about`,
        'ja': `${BASE_URL}/ja/about`,
        'zh': `${BASE_URL}/zh/about`,
        'it': `${BASE_URL}/it/about`,
        'nl': `${BASE_URL}/nl/about`,
      }
    },
  };
}

export default async function AboutPage({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const t = staticTranslations[lang]?.about || staticTranslations.en.about;
  const isRtl = lang === 'ar';

  const breadcrumbData = [
    { label: lang === 'en' ? 'Home' : (staticTranslations[lang]?.about?.h1 ? 'Home' : 'Home'), href: lang === 'en' ? '/' : `/${lang}` },
    { label: t.metaTitle.split('|')[0].trim() }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t.metaTitle,
    description: t.metaDescription,
    url: lang === 'en' ? `${BASE_URL}/about` : `${BASE_URL}/${lang}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'BESTAITOOLSFREE',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.jpg`,
      founder: {
        '@type': 'Person',
        name: 'Dheeraj Parwal',
        jobTitle: 'Founder & CEO',
        image: `${BASE_URL}/dheeraj-parwal.jpg`,
        sameAs: 'https://www.linkedin.com/in/dparwal/',
        description: 'Founder & CEO of BestAIToolsFree, an independent platform providing free online AI utility tools (such as AI JPG to Excel, image and document converters) and a comprehensive curated directory of 1,400+ artificial intelligence tools.'
      }
    }
  };

  return (
    <div className={`bg-gray-50 min-h-screen py-12 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs data={breadcrumbData} />
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 mt-6 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              About BestAIToolsFree
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-3">
              Welcome to <strong>BestAIToolsFree</strong> — a free online AI tools platform and comprehensive directory built to make artificial intelligence and digital utilities accessible to everyone.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We combine powerful, 100% free in-browser AI and utility tools — such as <strong>AI JPG to Excel</strong>, image compression, document converters, and calculators — with an extensive, curated directory of over 1,400+ third-party AI software solutions.
            </p>
          </div>

          {/* Our Mission */}
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              Artificial intelligence and digital productivity tools should be straightforward, practical, and accessible without unnecessary paywalls or technical friction.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our mission is twofold:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>Free Practical AI Utilities:</strong> Provide instant, browser-based tools — including AI-powered OCR for converting JPG and scanned tables to Excel, smart image optimization, and document converters — that work right in your browser without requiring registration or fees.
              </li>
              <li>
                <strong>Intelligent AI Discovery:</strong> Help individuals, creators, developers, and businesses discover, explore, and compare 1,400+ AI tools across 50+ categories with transparent pricing and multilingual access.
              </li>
            </ul>
          </div>

          {/* Meet Our Founder */}
          <div className="border-t border-gray-100 pt-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Meet Our Founder</h2>
              <p className="text-slate-600 text-sm">
                BestAIToolsFree is independently founded and operated by Dheeraj Parwal.
              </p>
            </div>

            <div className="p-6 md:p-8 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Founder Photograph */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-md ring-4 ring-white border border-slate-200/80 bg-slate-100">
                  <img
                    src="/dheeraj-parwal.jpg"
                    alt="Dheeraj Parwal, Founder & CEO of BestAIToolsFree"
                    className="w-full h-full object-cover object-top"
                    width={112}
                    height={112}
                    loading="eager"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900">Dheeraj Parwal</h3>
                      <p className="text-sm font-semibold text-blue-600">Founder & CEO</p>
                    </div>

                    <a
                      href="https://www.linkedin.com/in/dparwal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-300 shadow-sm transition-colors w-fit"
                      aria-label="View Dheeraj Parwal's profile on LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    Dheeraj Parwal is an entrepreneur with over 10 years of experience in UI/UX design and digital product development.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    He founded BestAIToolsFree to solve two fundamental problems: giving everyday users fast, free AI utility tools directly in their browser, and organizing the rapidly growing AI ecosystem into a clear, transparent discovery directory. As a solo founder, he leads product architecture, user experience design, engineering, and operations.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-500 border-t border-slate-200/60 mt-3">
                    <span><strong className="text-slate-700">Business:</strong> BESTAITOOLSFREE</span>
                    <span>•</span>
                    <span><strong className="text-slate-700">Structure:</strong> Sole Proprietorship</span>
                    <span>•</span>
                    <span><strong className="text-slate-700">Registration:</strong> Udyam / MSME</span>
                    <span>•</span>
                    <span><strong className="text-slate-700">Location:</strong> Indore, Madhya Pradesh, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-950 mb-1.5">⚡ Free Online AI & Utility Tools</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Use high-utility browser tools including <strong>AI JPG to Excel</strong>, image compression, image format conversion, PDF utilities, and interactive financial & math calculators without installing software or paying fees.
                </p>
              </div>
              <div className="p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
                <h3 className="font-bold text-indigo-950 mb-1.5">🔍 Curated AI Tools Directory</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Explore over 1,400+ vetted AI tools across 50+ categories including writing assistants, image generators, video creators, audio synthesis, coding assistants, and workflow automation.
                </p>
              </div>
              <div className="p-5 bg-green-50/50 rounded-xl border border-green-100">
                <h3 className="font-bold text-green-950 mb-1.5">💰 Transparent Pricing Insights</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Easily identify 100% free tools, freemium tiers, trial quotas, open-source alternatives, and commercial licensing to make informed decisions before you commit.
                </p>
              </div>
              <div className="p-5 bg-purple-50/50 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-950 mb-1.5">🌍 Multilingual Global Reach</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Access tools and directory listings across 12 supported languages, ensuring global creators, developers, and founders can utilize AI without language barriers.
                </p>
              </div>
            </div>
          </div>

          {/* Our Vision */}
          <div className="border-t border-gray-100 pt-6 space-y-3">
            <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              We aim to be the go-to destination where users can immediately perform everyday AI tasks — like converting image tables to Excel or optimizing documents — while also discovering the most innovative software across the broader AI ecosystem.
            </p>
            <p className="text-sm font-medium text-slate-700 pt-1">
              Practical free tools. Smarter AI discovery. Built for everyone.
            </p>
          </div>

          {/* CTA */}
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">Have an AI Tool to Share?</h3>
              <p className="text-sm text-slate-500">Are you building an AI product? Submit your tool for review and help thousands of creators discover your product.</p>
            </div>
            <Link 
              href={lang === 'en' ? '/submit' : `/${lang}/submit`} 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors shrink-0"
            >
              Submit Your Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
