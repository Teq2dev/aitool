import { getToolUiTranslation } from '@/lib/toolUiDictionary';
import Link from 'next/link';
import {
  Files,
  Scissors,
  RotateCw,
  Trash2,
  FileText,
  Layers,
  Image as ImageIcon,
  FileImage,
  Minimize2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
  Presentation,
  FileSpreadsheet,
  FileCheck,
  PenTool,
  Cpu,
} from 'lucide-react';
import { PDF_CATEGORIES, PDF_TOOLS } from '@/lib/pdfConfig';
import { PDF_TOOLS_DATA } from '@/lib/pdfToolData';
import { PDF_HUB_DATA } from '@/lib/hubData';
import { generatePdfToolSchemas } from '@/lib/pdfSchemaHelper';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const localizedData = PDF_HUB_DATA[lang] || PDF_HUB_DATA['en'];
  
  const BASE_URL = 'https://www.bestaitoolsfree.com';
  const canonicalUrl = lang === 'en' ? `${BASE_URL}/pdf-tools` : `${BASE_URL}/${lang}/pdf-tools`;
  
  const languages = {
    'en': `${BASE_URL}/pdf-tools`,
    'es': `${BASE_URL}/es/pdf-tools`,
    'fr': `${BASE_URL}/fr/pdf-tools`,
    'de': `${BASE_URL}/de/pdf-tools`,
    'pt': `${BASE_URL}/pt/pdf-tools`,
    'ar': `${BASE_URL}/ar/pdf-tools`,
    'ru': `${BASE_URL}/ru/pdf-tools`,
    'ja': `${BASE_URL}/ja/pdf-tools`,
    'zh': `${BASE_URL}/zh/pdf-tools`,
    'it': `${BASE_URL}/it/pdf-tools`,
    'nl': `${BASE_URL}/nl/pdf-tools`,
    'x-default': `${BASE_URL}/pdf-tools`
  };

  return {
    title: localizedData.seoTitle || 'Free Online PDF Tools: Edit, Convert, Merge & Secure PDFs',
    description: localizedData.seoDescription || 'Access 17 free online PDF tools for professionals & students. Merge, split, convert, compress, and secure your PDFs with privacy-first, client-side processing.',
    alternates: { 
      canonical: canonicalUrl,
      languages: languages
    },
    openGraph: {
      title: localizedData.seoTitle || 'Free Online PDF Tools - BestAIToolsFree',
      description: localizedData.seoDescription || 'Privacy-first, fast, client-side PDF tools.',
      url: canonicalUrl,
      siteName: 'BestAIToolsFree',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedData.seoTitle || 'Free Online PDF Tools - BestAIToolsFree',
      description: localizedData.seoDescription || 'Privacy-first, fast, client-side PDF tools.',
    },
  };
}

const iconMap = {
  Files,
  Scissors,
  RotateCw,
  Trash2,
  FileText,
  Layers,
  Image: ImageIcon,
  FileImage,
  Minimize2,
  Unlock,
  Presentation,
  Sheet: FileSpreadsheet,
  FileCheck,
  PenTool,
};



export default async function PdfToolsHubPage({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const hubBase = PDF_HUB_DATA['en'];
  const localizedData = PDF_HUB_DATA[lang] || hubBase;
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

      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* Hub Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 rounded-full text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Privacy-First Architecture · In-Browser Tools & Temporary Conversion Cleanup
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {localizedData.h1 || "Free Online PDF Tools"}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {localizedData.subtitle || "Fast, modern document tools designed for privacy and precision. Merge, split, rotate, convert, and optimize PDFs directly in your browser or through automated cleanup pipelines."}
          </p>
        </div>

        {/* Categorized Tools Grid */}
        <div className="space-y-12 md:space-y-16">
                    {PDF_CATEGORIES.map((cat) => {
            const categoryTools = PDF_TOOLS.filter((t) => t.category === cat.id);
            const localizedCat = localizedData.categories?.[cat.id] || cat;

            return (
              <section key={cat.id} className="space-y-5">
                <div className="flex items-baseline justify-between border-b border-slate-200/80 pb-3">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                      {localizedCat.label || cat.label}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">{localizedCat.description || cat.description}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    {categoryTools.length} {categoryTools.length === 1 ? 'tool' : 'tools'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                                    {categoryTools.map((tool) => {
                    const Icon = iconMap[tool.iconName] || FileText;
                    const toolData = PDF_TOOLS_DATA[tool.slug] || {};
                    const locTool = toolData.translations?.[lang] || toolData;

                    return (
                      <Link
                        key={tool.slug}
                        href={`${langPrefix}/${tool.slug}`}
                        className="group relative bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs">
                              <Icon className="w-5 h-5" />
                            </div>

                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                                tool.badge === 'Beta'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                                  : tool.badge === 'Popular'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {tool.badge}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                            {locTool.h1 ? locTool.h1.split(":")[0] : tool.name}
                          </h3>

                          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                            {locTool.heroSubtitle || ""}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                          <span>{lang === "es" ? "Abrir" : lang === "fr" ? "Ouvrir" : lang === "de" ? "Öffnen" : "Open Tool"}</span>
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

        {/* Browser Security & Privacy Feature Block */}
        <div className="mt-20 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Document Architecture & Privacy Standard
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Built for Technical Integrity & Transparency
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We separate tools into explicit processing categories: core PDF manipulation tools run entirely in client browser memory with zero file uploads, while format conversion tools utilize temporary worker staging deleted during the post-conversion cleanup stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-white block">Client-Side Tools</span>
              <p className="text-slate-400">Merge, Split, Rotate, Delete, Compress, and Image conversions operate locally in your browser memory.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white block">Conversion Cleanup</span>
              <p className="text-slate-400">Office formats (Word, Excel, PowerPoint) process on dedicated workers and are deleted in the cleanup phase.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white block">Zero Permanent Retention</span>
              <p className="text-slate-400">Documents are not permanently archived, cataloged, or repurposed for artificial intelligence training.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
