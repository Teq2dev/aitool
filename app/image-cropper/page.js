import { getToolUiTranslation } from '@/lib/toolUiDictionary';
﻿import dynamic from 'next/dynamic';
import Breadcrumb from '@/components/image-tools/Breadcrumb';
import ImageToolContentSection from '@/components/image-tools/ImageToolContentSection';
import { getImageToolData } from '@/lib/imageToolData';
import { getImageToolSchema } from '@/lib/imageSchemaHelper';
import { Crop, Shield, Zap } from 'lucide-react';

const ImageCropperClient = dynamic(() => import('./ImageCropperClient'), {
  
  loading: () => (
    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-14 flex flex-col items-center gap-4 bg-slate-50 dark:bg-slate-900 animate-pulse">
      <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      <div className="h-5 w-44 bg-slate-200 dark:bg-slate-800 rounded-full" />
      <div className="h-4 w-36 bg-slate-100 dark:bg-slate-800 rounded-full" />
    </div>
  ),
});

const TOOL_SLUG = 'image-cropper';
const tool = getImageToolData(TOOL_SLUG);


export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const localizedData = tool.translations?.[lang] || tool;
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const slug = 'image-cropper';
  return {
    title: localizedData.seoTitle || localizedData.name,
    description: localizedData.metaDescription || localizedData.description,
    alternates: { 
      canonical: `https://www.bestaitoolsfree.com${langPrefix}/${slug}`,
      languages: {
        'x-default': `https://www.bestaitoolsfree.com/${slug}`,
        'en': `https://www.bestaitoolsfree.com/${slug}`,
        'es': `https://www.bestaitoolsfree.com/es/${slug}`,
        'fr': `https://www.bestaitoolsfree.com/fr/${slug}`,
        'de': `https://www.bestaitoolsfree.com/de/${slug}`,
        'pt': `https://www.bestaitoolsfree.com/pt/${slug}`,
        'ar': `https://www.bestaitoolsfree.com/ar/${slug}`,
        'ru': `https://www.bestaitoolsfree.com/ru/${slug}`,
        'ja': `https://www.bestaitoolsfree.com/ja/${slug}`,
        'zh': `https://www.bestaitoolsfree.com/zh/${slug}`,
        'it': `https://www.bestaitoolsfree.com/it/${slug}`,
        'nl': `https://www.bestaitoolsfree.com/nl/${slug}`
      }
    },
    openGraph: {
      title: localizedData.seoTitle || localizedData.name,
      description: localizedData.metaDescription || localizedData.description,
      url: `https://www.bestaitoolsfree.com${langPrefix}/${slug}`,
      type: 'website',
    },
  };
}

export default async function ImageCropperPage({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const localizedData = tool.translations?.[lang] || tool;
  const schemas = getImageToolSchema('image-cropper', lang, localizedData);

  

  return (
    <>
      {/* Native SSR JSON-LD Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
        <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <Breadcrumb
              items={[
                { label: 'Image Tools', href: '/image-tools' },
                { label: localizedData.name, active: true },
              ]}
            />
          </div>
        </div>

        <section className="max-w-5xl mx-auto px-4 pt-10 pb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4">
            <Crop className="w-3.5 h-3.5" />
            <span>Precise Aspect Ratio & Pixel Cropping</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {localizedData.h1}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            {localizedData.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              {getToolUiTranslation(lang, 'inBrowserRam')}
            </span>
            <span>â€¢</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              {getToolUiTranslation(lang, 'zeroUploadWaiting')}
            </span>
            <span>â€¢</span>
            <span>{getToolUiTranslation(lang, 'max50mbPerFile')}</span>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <ImageCropperClient />
        </div>

        <div className="max-w-5xl mx-auto px-4 mt-16">
          <ImageToolContentSection slug={TOOL_SLUG} lang={lang} />
        </div>
      </div>
    </>
  );
}

