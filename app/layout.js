import { Suspense } from 'react';
import AuthProvider from '@/components/AuthProvider';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Script from 'next/script';
import Link from 'next/link';
import { getCategories } from '@/lib/getTools';
import { LanguageProvider } from '@/context/LanguageContext';
import { LANGUAGES } from '@/lib/languages';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://www.bestaitoolsfree.com'),
  title: {
    default: 'Best AI Tools Free - Discover Top AI Tools Directory',
    template: '%s | Best AI Tools Free'
  },
  description: 'Browse 3000+ Best Free AI Tools across multiple categories. Find the perfect AI tool for your needs. Compare AI tools, read reviews, and discover trending AI solutions.',
  keywords: 'best ai tools, free ai tools, ai tools directory, artificial intelligence tools, ai software, machine learning tools, chatgpt alternatives, ai image generators, ai writing tools',
  authors: [{ name: 'Best AI Tools Free' }],
  alternates: {
    canonical: '/',
    languages: {
      'x-default': 'https://www.bestaitoolsfree.com',
      'en': 'https://www.bestaitoolsfree.com',
      'es': 'https://www.bestaitoolsfree.com?lang=es',
      'fr': 'https://www.bestaitoolsfree.com?lang=fr',
      'de': 'https://www.bestaitoolsfree.com?lang=de',
      'pt': 'https://www.bestaitoolsfree.com?lang=pt',
      'ar': 'https://www.bestaitoolsfree.com?lang=ar',
      'ru': 'https://www.bestaitoolsfree.com?lang=ru',
      'ja': 'https://www.bestaitoolsfree.com?lang=ja',
      'zh': 'https://www.bestaitoolsfree.com?lang=zh',
      'it': 'https://www.bestaitoolsfree.com?lang=it',
      'nl': 'https://www.bestaitoolsfree.com?lang=nl',
    }
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Best AI Tools Free - Top AI Tools Directory',
    description: 'Discover 3000+ best free AI tools. Compare and find the perfect AI solution for your needs.',
    url: 'https://www.bestaitoolsfree.com',
    siteName: 'Best AI Tools Free',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Best AI Tools Free Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools Free - AI Tools Directory',
    description: 'Browse 3000+ best free AI tools and discover the perfect solution.',
    images: ['/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'G-4LG9W041CP',
  },
};

export default async function RootLayout({ children }) {
  const categories = await getCategories();
  const topCategories = (categories || []).slice(0, 6);
  const baseUrl = 'https://www.bestaitoolsfree.com';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        'name': 'Best AI Tools Free',
        'url': baseUrl,
        'logo': `${baseUrl}/logo.jpg`,
        'sameAs': [
          'https://www.facebook.com/bestaitoolsfree',
          'https://twitter.com/bestaitoolsfree',
          'https://www.linkedin.com/company/bestaitoolsfree'
        ],
        'description': 'A curated directory of free AI tools and resources, helping users find the best free artificial intelligence tools online.'
      },
      {
        '@type': 'WebSite',
        'name': 'Best AI Tools Free',
        'url': baseUrl,
        'publisher': {
          '@type': 'Organization',
          'name': 'Best AI Tools Free'
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        },
        'description': 'Explore a comprehensive, updated list of free AI tools for productivity, creativity, marketing, development and more.'
      }
    ]
  };

  return (
    <AuthProvider>
      <html lang="en">
        <head>
          {/* Google International SEO Hreflang Tags */}
          <link rel="alternate" href="https://www.bestaitoolsfree.com" hrefLang="x-default" />
          {LANGUAGES.map(lang => (
            <link 
              key={lang.code} 
              rel="alternate" 
              href={`https://www.bestaitoolsfree.com${lang.code === 'en' ? '' : `/${lang.code}`}`} 
              hrefLang={lang.code} 
            />
          ))}

          {/* Cookiebot - must be as high as possible */}
          <Script 
            id="Cookiebot" 
            src="https://consent.cookiebot.com/uc.js" 
            data-cbid="96f298ad-1d34-44ed-9f9b-820cd59d73be" 
            strategy="beforeInteractive"
          />
          
          {/* Google Tag Manager */}
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MQ7PGG3N');`}
          </Script>
          
          {/* Google Analytics */}
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-4LG9W041CP" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4LG9W041CP');`}
          </Script>
          
          {/* JSON-LD Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className={inter.className}>
          <NextTopLoader color="#2563eb" showSpinner={false} height={3} shadow="0 0 10px #2563eb,0 0 5px #2563eb" />
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-MQ7PGG3N"
              height="0" 
              width="0" 
              style={{display: 'none', visibility: 'hidden'}}
            />
          </noscript>
          
          <LanguageProvider>
            <div className="min-h-screen bg-white">
              <Navigation />
              <main>{children}</main>

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
                        {topCategories.map(cat => (
                          <li key={cat.slug}>
                            <Link href={`/tools?category=${cat.slug}`} className="hover:text-blue-600 transition-colors">
                              {cat.name} AI Tools
                            </Link>
                          </li>
                        ))}
                        <li><Link href="/categories" className="text-blue-600 font-bold hover:underline">View All Categories →</Link></li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Quick Links</h3>
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li><Link href="/tools" className="hover:text-blue-600">Browse All Tools</Link></li>
                        <li><Link href="/blogs" className="hover:text-blue-600">AI Blog & News</Link></li>
                        <li><Link href="/submit" className="hover:text-blue-600">Submit Your AI Tool</Link></li>
                        <li><Link href="/tools?sort=trending" className="hover:text-blue-600">Trending Tools</Link></li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Legal & Info</h3>
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li><Link href="#" className="hover:text-blue-600">About Our Directory</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Contact Us</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Privacy & Cookie Policy</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Terms of Service</Link></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
                    <p>© 2026 Best AI Tools Free. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
          </LanguageProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
