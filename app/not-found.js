import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';

const VALID_LANGS = ['es', 'fr', 'de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];

export default function NotFound() {
  const h = headers();
  const reqLang = h.get('x-invoke-lang');
  const lang = VALID_LANGS.includes(reqLang) ? reqLang : 'en';
  const prefix = lang === 'en' ? '' : `/${lang}`;
  const homeHref = lang === 'en' ? '/' : `${prefix}/`;
  const toolsHref = `${prefix}/tools`;
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 border border-gray-100">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src="/404-robot.jpg"
              alt="Confused Robot 404 Error"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-blue-100 text-blue-600 font-semibold rounded-full text-sm mb-4">
            Error 404
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Oops! Page not found.
          </h1>
          <p className="text-gray-500 mb-8 text-lg">
            Our AI robot looked everywhere, but couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link 
              href={homeHref}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/.svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Back to Home
            </Link>
            <Link 
              href={toolsHref}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all flex items-center justify-center"
            >
              Browse Tools
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
