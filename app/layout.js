import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Best AI Tools Free - Discover Top AI Tools Directory',
  description: 'Browse 3000+ Best Free AI Tools across multiple categories. Find the perfect AI tool for your needs. Compare AI tools, read reviews, and discover trending AI solutions.',
  keywords: 'best ai tools, free ai tools, ai tools directory, artificial intelligence tools, ai software, machine learning tools, chatgpt alternatives, ai image generators, ai writing tools',
  authors: [{ name: 'Best AI Tools Free' }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Best AI Tools Free - Top AI Tools Directory',
    description: 'Discover 3000+ best free AI tools. Compare and find the perfect AI solution for your needs.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Best AI Tools Free',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools Free - AI Tools Directory',
    description: 'Browse 3000+ best free AI tools and discover the perfect solution.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'G-4LG9W041CP',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Best AI Tools Free',
    description: 'Browse 3000+ Best Free AI Tools across multiple categories',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://bestaitoolsfree.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://bestaitoolsfree.com'}/tools?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
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
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-MQ7PGG3N"
              height="0" 
              width="0" 
              style={{display: 'none', visibility: 'hidden'}}
            />
          </noscript>
          
          <div className="min-h-screen bg-white">
            <Navigation />
            <main>{children}</main>

            <footer className="border-t bg-gray-50 mt-20">
              <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold">AI</span>
                      </div>
                      <span className="font-bold text-lg">Best AI Tools Free</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Discover and explore the best free AI tools for your needs.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Platform</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="/tools" className="hover:text-blue-600">Browse Tools</a></li>
                      <li><a href="/categories" className="hover:text-blue-600">Categories</a></li>
                      <li><a href="/blogs" className="hover:text-blue-600">Blogs</a></li>
                      <li><a href="/submit" className="hover:text-blue-600">Submit Tool</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Resources</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                      <li><a href="#" className="hover:text-blue-600">Contact</a></li>
                      <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
                  <p>© 2026 Best AI Tools Free. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
