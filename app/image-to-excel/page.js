import dynamic from 'next/dynamic';
import Breadcrumb from '@/components/image-tools/Breadcrumb';
import {
  Sparkles,
  ShieldCheck,
  Table,
  HelpCircle,
  Receipt,
  TrendingUp,
  Database,
} from 'lucide-react';

const ImageToExcelClient = dynamic(() => import('./ImageToExcelClient'), {
  loading: () => (
    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-14 flex flex-col items-center gap-4 bg-slate-50 animate-pulse">
      <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
      <div className="h-5 w-48 bg-slate-200 rounded-full" />
      <div className="h-4 w-36 bg-slate-100 rounded-full" />
    </div>
  ),
});

const TOOL_SLUG = 'image-to-excel';

const TOOL_DATA = {
  slug: TOOL_SLUG,
  name: 'Image to Excel Converter',
  seoTitle: 'Image to Excel Converter – Extract Tables from Images Free Online',
  metaDescription: 'Extract table data from JPG, JPEG, and PNG images and convert them into editable Microsoft Excel (.xlsx) spreadsheets online. Fast, secure, and free.',
  translations: {
    en: {
      seoTitle: 'Image to Excel Converter – Extract Tables from Images Free Online',
      metaDescription: 'Extract table data from JPG, JPEG, and PNG images and convert them into editable Microsoft Excel (.xlsx) spreadsheets online. Fast, secure, and free.',
    },
    es: {
      seoTitle: 'Convertidor de Imagen a Excel – Extraer Tablas Online Gratis',
      metaDescription: 'Convierte imágenes JPG y PNG en hojas de cálculo editables de Excel (.xlsx) con detección inteligente de tablas. Rápido, seguro y gratuito.',
    },
    fr: {
      seoTitle: 'Convertisseur Image en Excel – Extraire des Tableaux en Ligne Gratuit',
      metaDescription: 'Convertissez des images JPG et PNG en feuilles de calcul Excel (.xlsx) modifiables grâce à la détection de tableaux par IA. Rapide et gratuit.',
    },
    de: {
      seoTitle: 'Bild in Excel Konverter – Tabellen Kostenlos Online Extrahieren',
      metaDescription: 'Konvertieren Sie JPG- und PNG-Bilder online kostenlos in bearbeitbare Excel-Tabellen (.xlsx) mit intelligenter Tabellenerkennung.',
    },
    pt: {
      seoTitle: 'Conversor de Imagem para Excel – Extrair Tabelas Online Grátis',
      metaDescription: 'Converta imagens JPG e PNG em planilhas editáveis do Excel (.xlsx) com detecção inteligente de tabelas por IA. Rápido e gratuito.',
    },
    ar: {
      seoTitle: 'محول الصورة إلى إكسيل – استخراج الجداول أونلاين مجاناً',
      metaDescription: 'تحويل صور JPG وPNG إلى جداول إكسيل (.xlsx) قابلة للتعديل باستخدام الذكاء الاصطناعي. سريع، آمن ومجاني.',
    },
    ru: {
      seoTitle: 'Конвертер Изображений в Excel – Извлечение Таблиц Онлайн',
      metaDescription: 'Конвертируйте изображения JPG и PNG в редактируемые таблицы Excel (.xlsx) с помощью распознавания таблиц ИИ. Бесплатно и безопасно.',
    },
    ja: {
      seoTitle: '画像からExcelへの変換 – 無料で表をオンライン抽出',
      metaDescription: 'JPGやPNG画像をAIによる高精度な表検出で編集可能なExcel（.xlsx）スプレッドシートに変換。安全で完全無料。',
    },
    zh: {
      seoTitle: '图片转Excel转换器 – 免费在线提取表格',
      metaDescription: '利用AI智能表格识别，将JPG和PNG图片快速转换为可编辑的Excel（.xlsx）电子表格。免费且安全。',
    },
    it: {
      seoTitle: 'Convertitore da Immagine a Excel – Estrai Tabelle Online Gratis',
      metaDescription: 'Converti immagini JPG e PNG in fogli di calcolo Excel (.xlsx) modificabili con rilevamento intelligente delle tabelle. Veloce e gratuito.',
    },
    nl: {
      seoTitle: 'Afbeelding naar Excel Converter – Gratis Online Tabellen Extraheren',
      metaDescription: 'Converteer JPG- en PNG-afbeeldingen naar bewerkbare Excel-spreadsheets (.xlsx) met slimme tabeldetectie. Snel en gratis.',
    },
  },
};

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';
  const localizedData = TOOL_DATA.translations?.[lang] || TOOL_DATA;
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const slug = TOOL_SLUG;
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

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image to Excel Converter',
    url: 'https://www.bestaitoolsfree.com/image-to-excel',
    description:
      'Free online tool to extract table data from JPG, JPEG, and PNG images and convert them into editable Microsoft Excel (.xlsx) spreadsheets.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Convert JPG images to Excel',
      'Convert PNG images to Excel',
      'AI-powered optical character recognition (OCR)',
      'Automatic table row and column detection',
      'Editable spreadsheet preview before download',
      'Export formatted .xlsx workbooks',
      '100% client-side processing with zero server uploads',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.bestaitoolsfree.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Image to Excel',
        item: 'https://www.bestaitoolsfree.com/image-to-excel',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I convert an image table into an Excel spreadsheet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upload your JPG, JPEG, or PNG image containing a table into the tool above. Our optical character recognition engine scans the image, reconstructs the table grid, and provides an editable preview that you can download as a formatted .xlsx file.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this tool generate a real .xlsx file or just a CSV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It generates a genuine Microsoft Excel (.xlsx) workbook with styled header rows, auto-sized columns, cell borders, and automatic numeric data type detection.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I edit the extracted table before downloading?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! After extraction, an interactive spreadsheet preview allows you to click and edit any cell, add or remove rows, and add columns before saving the final Excel file.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are my uploaded images or sensitive financial tables stored on your servers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. All OCR extraction and Excel file generation happens locally inside your browser memory. Your images and extracted data are never uploaded to any remote server.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of table images produce the best extraction results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Clear screenshots, high-contrast scanned documents, receipts with aligned columns, and photographs taken in good lighting produce the highest extraction accuracy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this Image to Excel tool free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with no sign-up, no subscriptions, no watermarks, and no usage limits.',
        },
      },
    ],
  },
];

const USE_CASES = [
  {
    icon: Receipt,
    title: 'Receipts & Invoices',
    desc: 'Extract itemized expenses, dates, and amounts from paper receipts and invoices directly into Excel accounting sheets.',
  },
  {
    icon: TrendingUp,
    title: 'Financial Statements',
    desc: 'Digitize balance sheets, revenue summaries, and bank transaction tables from image screenshots in seconds.',
  },
  {
    icon: Table,
    title: 'Spreadsheet Screenshots',
    desc: 'Convert non-copyable images or slides of Excel tables back into editable Microsoft Excel spreadsheets.',
  },
  {
    icon: Database,
    title: 'Reports & Research Data',
    desc: 'Capture structured data tables from scientific research papers, academic PDFs, and business slide decks.',
  },
];

export default async function ImageToExcelPage({ searchParams }) {
  const params = await searchParams;
  const lang = params?.lang || 'en';

  return (
    <>
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl space-y-16">
        {/* ── HERO & CLIENT TOOL ── */}
        <div className="space-y-6">
          <Breadcrumb items={[{ label: 'Image to Excel' }]} lang={lang} />

          {/* Hero Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 rounded-full text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              AI-Powered Table Extraction · 100% Private
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Image to Excel Converter
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
              Convert JPG and PNG images into editable Excel (.xlsx) spreadsheets with smart AI table detection. Free, private, and processed entirely inside your browser.
            </p>
          </div>

          {/* Interactive Tool Studio */}
          <ImageToExcelClient />
        </div>

        {/* ── HOW IT WORKS SECTION ── */}
        <section className="bg-slate-50/80 rounded-3xl p-6 md:p-8 border border-slate-200/80 space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">Simple 3-Step Process</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">How to Convert Image to Excel (.xlsx)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 font-mono font-bold flex items-center justify-center text-xs">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">Upload Table Image</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Drag and drop your JPG, JPEG, or PNG image containing a table, receipt, or financial statement.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 font-mono font-bold flex items-center justify-center text-xs">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">AI Grid Extraction</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our OCR engine scans text, clusters horizontal rows, aligns vertical columns, and generates an editable preview.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 font-mono font-bold flex items-center justify-center text-xs">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">Download Real .XLSX</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Verify and edit cells in the spreadsheet preview, then click Download to get your genuine formatted Excel file.
              </p>
            </div>
          </div>
        </section>

        {/* ── COMMON USE CASES ── */}
        <section className="space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Productive Workflows</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Extract Tables From Any Image Source</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {USE_CASES.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <div key={i} className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{uc.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PRIVACY BANNER ── */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Private In-Browser OCR
          </div>
          <h3 className="text-xl font-bold text-white">Your Financial & Table Data Remains Strictly Private</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Unlike other conversion services that upload your confidential invoices or balance sheets to third-party cloud servers, our optical character recognition and Excel generator run entirely within your local device memory.
          </p>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS ── */}
        <section className="space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
              <HelpCircle className="w-4 h-4" /> Clear Answers
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-2 border border-slate-200/80 rounded-2xl p-2 bg-slate-50/50">
            {structuredData[2].mainEntity.map((item, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-200/70 overflow-hidden shadow-2xs">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-sm text-slate-900 hover:text-blue-600 list-none">
                  <span>{item.name}</span>
                  <span className="ml-4 text-slate-400 group-open:rotate-90 transition-transform text-sm font-mono flex-shrink-0">›</span>
                </summary>
                <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  {item.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

