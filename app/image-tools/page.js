import { getToolUiTranslation } from '@/lib/toolUiDictionary';
import Link from 'next/link';
import {
  Minimize2,
  Maximize2,
  Crop,
  RotateCw,
  RefreshCw,
  FileImage,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  FileText,
  Layers,
  CheckCircle2,
  Cpu,
  Lock,
} from 'lucide-react';
import { IMAGE_CATEGORIES, IMAGE_TOOL_DATA } from '@/lib/imageToolData';
import { IMG_HUB_DATA } from '@/lib/hubData';

function getImageHubSchemas(localizedData, lang) {
  const BASE_URL = 'https://www.bestaitoolsfree.com';
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const hubUrl = `${BASE_URL}${langPrefix}/image-tools`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: localizedData.seoTitle || 'Free Online Image Tools',
      url: hubUrl,
      description: localizedData.seoDescription || 'Compress, resize, crop and convert images for free.',
      isPartOf: { '@type': 'WebSite', url: BASE_URL, name: 'BestAIToolsFree' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}${langPrefix}` },
        { '@type': 'ListItem', position: 2, name: 'Image Tools', item: hubUrl },
      ],
    },
  ];
}

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const localizedData = IMG_HUB_DATA[lang] || IMG_HUB_DATA['en'];
  
  const BASE_URL = 'https://www.bestaitoolsfree.com';
  const canonicalUrl = lang === 'en' ? `${BASE_URL}/image-tools` : `${BASE_URL}/${lang}/image-tools`;
  
  const languages = {
    'en': `${BASE_URL}/image-tools`,
    'es': `${BASE_URL}/es/image-tools`,
    'fr': `${BASE_URL}/fr/image-tools`,
    'de': `${BASE_URL}/de/image-tools`,
    'pt': `${BASE_URL}/pt/image-tools`,
    'ar': `${BASE_URL}/ar/image-tools`,
    'ru': `${BASE_URL}/ru/image-tools`,
    'ja': `${BASE_URL}/ja/image-tools`,
    'zh': `${BASE_URL}/zh/image-tools`,
    'it': `${BASE_URL}/it/image-tools`,
    'nl': `${BASE_URL}/nl/image-tools`,
    'x-default': `${BASE_URL}/image-tools`
  };

  return {
    title: localizedData.seoTitle || 'Free Online Image Tools: Optimize, Convert, Resize, Crop Photos',
    description: localizedData.seoDescription || 'Access 11 free online image tools for optimization, resizing, cropping, and format conversion. Process JPG, PNG, WebP files securely in your browser with zero uploads. Fast & private.',
    alternates: { 
      canonical: canonicalUrl,
      languages: languages
    },
    openGraph: {
      title: localizedData.seoTitle || 'Free Online Image Tools - BestAIToolsFree',
      description: localizedData.seoDescription || 'Fast, privacy-first image utilities. 100% in-browser processing with zero server uploads.',
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedData.seoTitle || 'Free Online Image Tools - BestAIToolsFree',
      description: localizedData.seoDescription || 'Fast, privacy-first image utilities. 100% in-browser processing with zero server uploads.',
    },
  };
}

const iconMap = {
  'image-compressor': Minimize2,
  'image-resizer': Maximize2,
  'image-cropper': Crop,
  'image-rotator': RotateCw,
  'image-converter': RefreshCw,
  'jpg-to-png': FileImage,
  'png-to-jpg': FileImage,
  'jpg-to-webp': Sparkles,
  'png-to-webp': Sparkles,
  'webp-to-jpg': RefreshCw,
  'webp-to-png': RefreshCw,
};

const badgeMap = {
  'image-compressor': 'Popular',
  'image-resizer': 'New',
  'image-cropper': 'New',
  'image-rotator': 'New',
  'image-converter': 'New',
  'jpg-to-png': 'Fast',
  'png-to-jpg': 'Essential',
  'jpg-to-webp': 'Next-Gen',
  'png-to-webp': 'Alpha',
  'webp-to-jpg': 'Universal',
  'webp-to-png': 'Lossless',
};

const colorMap = {
  'image-compressor': 'from-amber-500 to-orange-500',
  'image-resizer': 'from-blue-500 to-indigo-500',
  'image-cropper': 'from-emerald-500 to-teal-500',
  'image-rotator': 'from-violet-500 to-purple-500',
  'image-converter': 'from-purple-500 to-pink-500',
  'jpg-to-png': 'from-blue-500 to-cyan-500',
  'png-to-jpg': 'from-amber-500 to-yellow-500',
  'jpg-to-webp': 'from-indigo-500 to-purple-500',
  'png-to-webp': 'from-teal-500 to-emerald-500',
  'webp-to-jpg': 'from-orange-500 to-red-500',
  'webp-to-png': 'from-blue-500 to-indigo-500',
};



export default async function ImageToolsHubPage({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const hubBase = IMG_HUB_DATA['en'];
  const localizedData = IMG_HUB_DATA[lang] || hubBase;
  const schemas = getImageHubSchemas(localizedData, lang);

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* Hub Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            {localizedData.whyChooseItems?.[0]?.title || "100% In-Browser RAM Execution"} · {localizedData.whyChooseItems?.[0]?.description?.substring(0,30) || "Zero Server Uploads Guaranteed"}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {localizedData.h1 || "Free Online Image Tools"}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {localizedData.subtitle || "High-precision image utilities designed for speed, privacy, and visual clarity. Compress, resize, crop, rotate, and convert JPG, PNG, and WebP graphics directly inside your browser memory."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-2">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              11 Specialized Tools
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-500" />
              Instant Hardware Acceleration
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock className="w-4 h-4 text-blue-500" />
              Zero Cloud Uploads
            </span>
          </div>
        </div>

        {/* Categorized Tools Grid */}
        <div className="space-y-12 md:space-y-16">
          
          {IMAGE_CATEGORIES.map((cat) => {
            const categoryTools = cat.toolSlugs
              .map((slug) => IMAGE_TOOL_DATA[slug])
              .filter(Boolean);

            const catKeyMap = {
              'optimization': 'optimization',
              'editing': 'dimensions',
              'conversion-standard': 'format',
              'conversion-webp': 'format'
            };
            const mappedKey = catKeyMap[cat.id];
            const localizedCat = localizedData.categories?.[mappedKey] || cat;


            return (
              <section key={cat.id} className="space-y-5">
                <div className="flex items-baseline justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {localizedCat.label || cat.label}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">{localizedCat.description || cat.description}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    {categoryTools.length} {categoryTools.length === 1 ? 'tool' : 'tools'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {categoryTools.map((tool) => {
                    const Icon = iconMap[tool.slug] || FileImage;
                    const badge = badgeMap[tool.slug] || 'Free';
                    const gradient = colorMap[tool.slug] || 'from-indigo-500 to-purple-500';

                    return (
                      <Link
                        key={tool.slug}
                        href={`${langPrefix}/${tool.slug}`}
                        className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 md:p-6 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm`}>
                              <Icon className="w-5 h-5" />
                            </div>

                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                                badge === 'Popular'
                                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800'
                                  : badge === 'New'
                                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800'
                                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                              }`}
                            >
                              {badge}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {tool.translations?.[lang]?.name || tool.name}
                          </h3>

                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                            {tool.translations?.[lang]?.tagline || tool.tagline}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          <span>{lang === "es" ? "Abrir" : lang === "fr" ? "Ouvrir" : lang === "de" ? "Öffnen" : "Launch Tool"}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Cross-Category Workflows: Image ↔ PDF Integration */}
        <div className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Cross-Product Workflows
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Seamless PDF ↔ Image Pipelines
              </h2>
            </div>
            <Link
              href="/pdf-tools"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
            >
              <span>Explore All 17 PDF Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/pdf-to-jpg"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600">
                  PDF to JPG
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Extract high-resolution JPG pictures from PDF documents in browser RAM.
              </p>
            </Link>

            <Link
              href="/pdf-to-png"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600">
                  <FileImage className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600">
                  PDF to PNG
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Render crisp, lossless PNG pages from PDF files with crisp vector rendering.
              </p>
            </Link>

            <Link
              href="/jpg-to-pdf"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600">
                  JPG to PDF
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Bundle individual photos into a multi-page PDF document with custom margins.
              </p>
            </Link>

            <Link
              href="/compress-pdf"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
                  <Minimize2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600">
                  Compress PDF
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Shrink newly compiled PDF documents for email attachments or web uploads.
              </p>
            </Link>
          </div>
        </div>

        {/* Technical Architecture & Privacy Block */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Privacy & Local Processing Architecture
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              100% In-Browser RAM Execution
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every image tool in this suite executes entirely within your browser memory using HTML5 Canvas 2D and Web Workers. Your personal photos, scans, and graphic designs never leave your local device and are never uploaded to any remote server or database.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-white block">Zero Server Uploads</span>
              <p className="text-slate-400">Files are read directly into browser memory buffers and transformed locally.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white block">Automatic Memory Safety</span>
              <p className="text-slate-400">Object URLs and bitmap buffers are actively released to prevent browser memory leaks.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white block">Universal Compatibility</span>
              <p className="text-slate-400">Supported across modern Chrome, Edge, Safari, Firefox, and mobile browsers.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
