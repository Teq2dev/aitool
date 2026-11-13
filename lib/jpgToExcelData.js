/**
 * lib/jpgToExcelData.js
 * 
 * Centralized SEO metadata, 11-language localization strings, FAQ schema,
 * and structured data generator for the AI JPG-to-Excel tool.
 */

export const TOOL_SLUG = 'jpg-to-excel';
export const BASE_URL = 'https://www.bestaitoolsfree.com';

export const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];

export const LOCALIZED_SEO = {
  en: {
    name: 'AI JPG to Excel Converter',
    seoTitle: 'AI JPG to Excel Converter – Convert Images to Excel Spreadsheets Free',
    metaDescription: 'Convert tables in JPG, JPEG, and PNG images into editable Microsoft Excel (.xlsx) spreadsheets using AI-powered table recognition. Fast, accurate, and free.',
    badge: 'Powered by AI',
    h1: 'AI JPG to Excel Converter',
    description: 'Convert tables in images into editable Excel spreadsheets.',
  },
  es: {
    name: 'Convertidor IA de JPG a Excel',
    seoTitle: 'Convertidor IA de JPG a Excel – Imágenes a Hojas de Cálculo Gratis',
    metaDescription: 'Convierte tablas en imágenes JPG y PNG en hojas de cálculo editables de Excel (.xlsx) con IA avanzada. Rápido y gratuito.',
    badge: 'Impulsado por IA',
    h1: 'Convertidor IA de JPG a Excel',
    description: 'Convierte tablas en imágenes en hojas de cálculo de Excel editables utilizando IA avanzada.',
  },
  fr: {
    name: 'Convertisseur IA JPG en Excel',
    seoTitle: 'Convertisseur IA JPG en Excel – Convertir Images en Tableaux Excel',
    metaDescription: "Convertissez les tableaux d'images JPG et PNG en feuilles de calcul Excel (.xlsx) modifiables grâce à l'IA avancée. Gratuit et sécurisé.",
    badge: 'Propulsé par IA',
    h1: 'Convertisseur IA JPG en Excel',
    description: "Convertissez des tableaux d'images en feuilles de calcul Excel modifiables avec l'IA avancée.",
  },
  de: {
    name: 'KI JPG in Excel Konverter',
    seoTitle: 'KI JPG in Excel Konverter – Bilder in Excel-Tabellen umwandeln',
    metaDescription: 'Konvertieren Sie Tabellen in JPG- und PNG-Bildern mit fortschrittlicher KI in bearbeitbare Excel-Tabellen (.xlsx). Schnell, präzise und kostenlos.',
    badge: 'Unterstützt von KI',
    h1: 'KI JPG in Excel Konverter',
    description: 'Konvertieren Sie Tabellen in Bildern mit fortschrittlicher KI in bearbeitbare Excel-Tabellen.',
  },
  pt: {
    name: 'Conversor IA de JPG para Excel',
    seoTitle: 'Conversor IA de JPG para Excel – Imagens em Planilhas Online Grátis',
    metaDescription: 'Converta tabelas em imagens JPG e PNG em planilhas editáveis do Excel (.xlsx) usando IA avançada. Rápido, seguro e gratuito.',
    badge: 'Com tecnologia IA',
    h1: 'Conversor IA de JPG para Excel',
    description: 'Converta tabelas de imagens em planilhas editáveis do Excel usando IA avançada.',
  },
  ar: {
    name: 'محول JPG إلى إكسيل بالذكاء الاصطناعي',
    seoTitle: 'محول JPG إلى إكسيل بالذكاء الاصطناعي – تحويل الصور إلى جداول إكسيل مجاناً',
    metaDescription: 'تحويل الجداول في صور JPG وPNG إلى جداول إكسيل (.xlsx) قابلة للتعديل باستخدام الذكاء الاصطناعي المتطور. سريع ومجاني وآمن.',
    badge: 'مدعوم بالذكاء الاصطناعي',
    h1: 'محول JPG إلى إكسيل بالذكاء الاصطناعي',
    description: 'تحويل الجداول في الصور إلى جداول إكسيل قابلة للتعديل باستخدام الذكاء الاصطناعي المتطور.',
  },
  ru: {
    name: 'ИИ Конвертер JPG в Excel',
    seoTitle: 'ИИ Конвертер JPG в Excel – Перевод изображений в таблицы Excel Онлайн',
    metaDescription: 'Конвертируйте таблицы из изображений JPG и PNG в редактируемые таблицы Excel (.xlsx) с помощью продвинутого ИИ. Быстро и бесплатно.',
    badge: 'На базе ИИ',
    h1: 'ИИ Конвертер JPG в Excel',
    description: 'Преобразуйте таблицы на изображениях в редактируемые таблицы Excel с помощью продвинутого ИИ.',
  },
  ja: {
    name: 'AI JPG Excel 変換',
    seoTitle: 'AI JPG Excel 変換 – 画像の表をエクセル形式に無料変換',
    metaDescription: '高度なAIビジョンを使用してJPGやPNG画像の表を高精度で編集可能なExcel（.xlsx）スプレッドシートに変換。安全で完全無料。',
    badge: 'AIビジョン搭載',
    h1: 'AI JPG to Excel Converter',
    description: '高度なAIビジョンを使用して画像の表を編集可能なExcelスプレッドシートに変換します。',
  },
  zh: {
    name: 'AI JPG转Excel转换器',
    seoTitle: 'AI JPG转Excel转换器 – 免费将图片表格转换为Excel电子表格',
    metaDescription: '使用先进AI视觉技术将JPG和PNG图片中的表格直接转换为可编辑的Excel（.xlsx）表格。高精度且完全免费。',
    badge: '由AI视觉驱动',
    h1: 'AI JPG转Excel转换器',
    description: '使用先进AI视觉技术将图片中的表格转换为可编辑的Excel电子表格。',
  },
  it: {
    name: 'Convertitore IA da JPG a Excel',
    seoTitle: 'Convertitore IA da JPG a Excel – Immagini in Fogli Excel Gratis',
    metaDescription: 'Converti tabelle da immagini JPG e PNG in fogli di calcolo Excel (.xlsx) modificabili con IA avanzata. Veloce, sicuro e gratuito.',
    badge: 'Alimentato da IA',
    h1: 'Convertitore IA da JPG a Excel',
    description: 'Converti tabelle presenti nelle immagini in fogli di calcolo Excel modificabili utilizzando IA avanzata.',
  },
  nl: {
    name: 'AI JPG naar Excel Converter',
    seoTitle: 'AI JPG naar Excel Converter – Afbeeldingen naar Excel Werkbladen',
    metaDescription: 'Converteer tabellen in JPG- en PNG-afbeeldingen naar bewerkbare Excel-spreadsheets (.xlsx) met geavanceerde AI. Snel en gratis.',
    badge: 'Aangedreven door AI',
    h1: 'AI JPG naar Excel Converter',
    description: 'Converteer tabellen in afbeeldingen naar bewerkbare Excel-spreadsheets met geavanceerde AI.',
  },
};

export const FAQS = [
  {
    q: 'How does this AI JPG to Excel converter work?',
    a: 'Our converter analyzes your uploaded image securely using multimodal Vision AI. It evaluates the visual table layout, reconstructs rows and columns, transcribes values faithfully, and outputs structured data that is converted into a genuine Microsoft Excel (.xlsx) workbook.',
  },
  {
    q: 'Does this tool generate a real .xlsx workbook or just a CSV renamed to XLSX?',
    a: 'It generates a genuine Microsoft Excel (.xlsx) workbook using OpenXML standards. It includes formatted header rows, auto-sized columns, clean cell borders, and proper numeric formatting.',
  },
  {
    q: 'Can the AI extract multiple tables from a single image?',
    a: 'Yes! Our Vision AI detects all visible tables in the image. In our interactive preview, you can toggle between tables, and the exported workbook places separate tables onto distinct worksheets.',
  },
  {
    q: 'How does the tool handle blurry or ambiguous text?',
    a: 'Rather than hallucinating or silently guessing values, the AI explicitly flags low-confidence or blurry cells. These cells are highlighted in amber within the interactive preview so you can verify and edit them before downloading.',
  },
  {
    q: 'What should I do if an image has merged header cells or unusual alignment?',
    a: 'The AI recognizes merged headers across columns and attempts to preserve hierarchical structure. If a complex column aligns unexpectedly, use the interactive grid preview to adjust cell values, add/remove columns, or correct labels before exporting.',
  },
  {
    q: 'Are my financial statements or receipts stored on your servers?',
    a: 'No. No files are stored on our servers or written to disk; images are processed ephemerally in memory for structured extraction.',
  },
  {
    q: 'Is this AI JPG to Excel tool free to use?',
    a: 'Yes, 100% free with no account creation, no subscriptions, no credit cards, and no watermarks.',
  },
];

export function getJpgToExcelMetadata(lang = 'en') {
  const safeLang = SUPPORTED_LOCALES.includes(lang) ? lang : 'en';
  const data = LOCALIZED_SEO[safeLang] || LOCALIZED_SEO.en;
  const langPrefix = safeLang === 'en' ? '' : `/${safeLang}`;
  const slug = TOOL_SLUG;

  const languages = {
    'x-default': `${BASE_URL}/${slug}`,
  };
  for (const l of SUPPORTED_LOCALES) {
    const pfx = l === 'en' ? '' : `/${l}`;
    languages[l] = `${BASE_URL}${pfx}/${slug}`;
  }

  return {
    title: data.seoTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `${BASE_URL}${langPrefix}/${slug}`,
      languages,
    },
    openGraph: {
      title: data.seoTitle,
      description: data.metaDescription,
      url: `${BASE_URL}${langPrefix}/${slug}`,
      type: 'website',
    },
  };
}

export function generateJpgToExcelSchemas(lang = 'en') {
  const safeLang = SUPPORTED_LOCALES.includes(lang) ? lang : 'en';
  const data = LOCALIZED_SEO[safeLang] || LOCALIZED_SEO.en;
  const langPrefix = safeLang === 'en' ? '' : `/${safeLang}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: data.name,
      url: `${BASE_URL}${langPrefix}/${TOOL_SLUG}`,
      description: data.metaDescription,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'AI-Powered Table Recognition',
        'Convert JPG and PNG images to Excel spreadsheets',
        'Automatic Multi-Table and Multi-Worksheet support',
        'Formula injection protection',
        'Interactive in-browser spreadsheet preview with cell editing',
        'Genuine downloadable Microsoft Excel (.xlsx) workbooks',
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
          item: `${BASE_URL}${langPrefix}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Image Tools',
          item: `${BASE_URL}${langPrefix}/image-tools`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: data.name,
          item: `${BASE_URL}${langPrefix}/${TOOL_SLUG}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];
}
