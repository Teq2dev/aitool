import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Table,
  HelpCircle,
  Receipt,
  TrendingUp,
  Database,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
} from 'lucide-react';
import Breadcrumb from '@/components/image-tools/Breadcrumb';

export const runtime = 'nodejs';

const JpgToExcelClient = dynamic(() => import('./JpgToExcelClient'), {
  loading: () => (
    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-14 flex flex-col items-center gap-4 bg-slate-50 animate-pulse">
      <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
      <div className="h-5 w-48 bg-slate-200 rounded-full" />
      <div className="h-4 w-36 bg-slate-100 rounded-full" />
    </div>
  ),
});

import {
  TOOL_SLUG,
  BASE_URL,
  LOCALIZED_SEO,
  FAQS,
  getJpgToExcelMetadata,
  generateJpgToExcelSchemas,
} from '@/lib/jpgToExcelData';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  return getJpgToExcelMetadata(lang);
}

export default async function JpgToExcelPage({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const data = LOCALIZED_SEO[lang] || LOCALIZED_SEO.en;
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const isRtl = lang === 'ar';
  const structuredData = generateJpgToExcelSchemas(lang);


  return (
    <>
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className={`container mx-auto px-4 py-8 md:py-12 max-w-5xl space-y-14 ${isRtl ? 'rtl' : 'ltr'}`}>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Image Tools', href: `${langPrefix}/image-tools` },
            { label: data.name },
          ]}
        />

        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200/80 text-emerald-700 rounded-full text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {data.badge}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {data.h1}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-medium">
            {data.description}
          </p>
        </div>

        {/* Client Conversion Workspace */}
        <JpgToExcelClient />

        {/* ── Educational Guide & Technical Architecture ── */}
        <div className="mt-16 space-y-16 text-slate-700">
          {/* How It Works Steps */}
          <section className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> 3 Simple Steps
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How to Convert JPG Image Tables to Excel
              </h2>
              <p className="text-sm text-slate-500">
                Turn printed documents, receipts, and image screenshots into structured spreadsheets in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 font-mono text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Upload Image</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Drag and drop your JPG, JPEG, or PNG table image into the upload box.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 font-mono text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Gemini AI Vision Extraction</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Google Gemini scans the grid layout, rows, columns, and numbers with high precision.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 font-mono text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Download Genuine .xlsx</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Review and edit cells in the interactive spreadsheet preview, then save as a formatted Excel workbook.
                </p>
              </div>
            </div>
          </section>

          {/* Key Advantages */}
          <section className="space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Core Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Engineered for High-Accuracy Table Comprehension
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Unlike legacy OCR engines that struggle with borderless tables or misaligned text, Google Gemini understands tabular spatial context directly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Multimodal Vision</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Understands complex tables, headers, subheaders, and irregular spacing without separate OCR pipelines.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Multi-Table Support</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Automatically detects separate tables on the same page and places them on individual worksheets.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Formula Injection Safe</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sanitizes dangerous formula prefixes to safeguard your desktop Excel spreadsheets from malicious code.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Confidential & Ephemeral</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your uploaded files are never permanently saved on disk or used for public training datasets.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Use Cases */}
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Everyday Workflows
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Common Use Cases for Image to Excel
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Receipts & Invoices</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Convert receipts and invoices into structured accounting sheets with accurate date, quantity, and currency parsing.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Financial Statements</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Digitize balance sheets, P&L statements, and quarterly earnings screenshots into active Excel workbooks.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Table className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Spreadsheet Screenshots</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Extract locked data from presentations, webinars, and image crops without tedious manual typing.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Research & Academic Data</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Capture scientific data tables from journal papers, surveys, and scanned books directly into Excel.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2"
                >
                  <h4 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                    <span className="text-emerald-700 font-bold shrink-0">Q.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Tools Navigation */}
          <section className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Explore Related Free Utilities</h3>
                <p className="text-xs text-slate-500">Fast, in-browser document and photo tools.</p>
              </div>
              <Link
                href={`${langPrefix}/image-tools`}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                View All Image Tools <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <Link
                href={`${langPrefix}/image-compressor`}
                className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-700 flex flex-col justify-between"
              >
                <span>Image Compressor</span>
                <span className="text-[10px] text-slate-400 font-normal">Reduce JPG & PNG</span>
              </Link>
              <Link
                href={`${langPrefix}/image-converter`}
                className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-700 flex flex-col justify-between"
              >
                <span>Image Converter</span>
                <span className="text-[10px] text-slate-400 font-normal">JPG, PNG, WebP</span>
              </Link>
              <Link
                href={`${langPrefix}/pdf-to-excel`}
                className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-700 flex flex-col justify-between"
              >
                <span>PDF to Excel</span>
                <span className="text-[10px] text-slate-400 font-normal">Extract PDF Tables</span>
              </Link>
              <Link
                href={`${langPrefix}/merge-pdf`}
                className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition-all text-xs font-semibold text-slate-700 flex flex-col justify-between"
              >
                <span>Merge PDF</span>
                <span className="text-[10px] text-slate-400 font-normal">Combine Documents</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
