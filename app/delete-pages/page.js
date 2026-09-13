import { getToolUiTranslation } from '@/lib/toolUiDictionary';
﻿import dynamic from 'next/dynamic';
import PdfToolSkeleton from '@/components/pdf-tools/PdfToolSkeleton';
import PdfBreadcrumb from '@/components/pdf-tools/PdfBreadcrumb';
import PdfRelatedTools from '@/components/pdf-tools/PdfRelatedTools';
import PdfToolContentSection from '@/components/pdf-tools/PdfToolContentSection';
import { getPdfToolData } from '@/lib/pdfToolData';
import { generatePdfToolSchemas } from '@/lib/pdfSchemaHelper';
import { Sparkles } from 'lucide-react';

const toolData = getPdfToolData('delete-pages');
const schemas = generatePdfToolSchemas(toolData);

export const metadata = {
  title: toolData.seoTitle,
  description: toolData.seoDescription,
  alternates: { canonical: 'https://www.bestaitoolsfree.com/delete-pages' },
  openGraph: {
    title: toolData.seoTitle,
    description: toolData.seoDescription,
    url: 'https://www.bestaitoolsfree.com/delete-pages',
    type: 'website',
  },
};

const ToolClientComponent = dynamic(() => import('./DeletePagesClient'), {
  
  loading: () => <PdfToolSkeleton />,
});

export default async function DeletePagesPage({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const localizedData = toolData.translations?.[lang] || toolData;
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
        <PdfBreadcrumb lang={lang} items={[{ label: toolData.h1 || toolData.seoTitle.split('â€“')[0].trim() }]} />

        {/* Hero Header */}
        <div className="text-center mb-8 md:mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 rounded-full text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {toolData.badge}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {toolData.h1}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {toolData.heroSubtitle}
          </p>
        </div>

        {/* Tool Studio Workspace */}
        <ToolClientComponent  />

        {/* Educational SEO Content Section */}
        <PdfToolContentSection tool={localizedData} lang={lang} />

        {/* Related PDF Utilities */}
        <PdfRelatedTools currentSlug="delete-pages"  lang={lang} />
      </div>
    </>
  );
}

