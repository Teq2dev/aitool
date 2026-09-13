import { getToolUiTranslation } from '@/lib/toolUiDictionary';
﻿import dynamic from 'next/dynamic';
import PdfToolSkeleton from '@/components/pdf-tools/PdfToolSkeleton';
import PdfBreadcrumb from '@/components/pdf-tools/PdfBreadcrumb';
import PdfRelatedTools from '@/components/pdf-tools/PdfRelatedTools';
import PdfToolContentSection from '@/components/pdf-tools/PdfToolContentSection';
import { getPdfToolData } from '@/lib/pdfToolData';
import { generatePdfToolSchemas } from '@/lib/pdfSchemaHelper';
import { Sparkles } from 'lucide-react';

const toolData = getPdfToolData('edit-pdf');



export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const localizedData = toolData.translations?.[lang] || toolData;
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const slug = toolData.slug || 'edit-pdf';
  return {
    title: localizedData.seoTitle,
    description: localizedData.seoDescription,
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
      title: localizedData.seoTitle,
      description: localizedData.seoDescription,
      url: `https://www.bestaitoolsfree.com${langPrefix}/${slug}`,
      type: 'website',
    },
  };
}

const ToolClientComponent = dynamic(() => import('./EditPdfClient'), {
  
  loading: () => <PdfToolSkeleton />,
});

export default async function EditPdfPage({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const localizedData = toolData.translations?.[lang] || toolData;
  const schemas = generatePdfToolSchemas(localizedData, lang);

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <PdfBreadcrumb lang={lang} items={[{ label: localizedData.h1 || localizedData.seoTitle.split('â€“')[0].trim() }]} />

        {/* Hero Header */}
        <div className="text-center mb-8 md:mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 rounded-full text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {localizedData.badge}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {localizedData.h1}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {localizedData.heroSubtitle}
          </p>
        </div>

        {/* Tool Studio Workspace */}
        <ToolClientComponent  />

        {/* Educational SEO Content Section */}
        <PdfToolContentSection tool={localizedData} lang={lang} />

        {/* Related PDF Utilities */}
        <PdfRelatedTools currentSlug="edit-pdf"  lang={lang} />
      </div>
    </>
  );
}

