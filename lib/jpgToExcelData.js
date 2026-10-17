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
    metaDescription: 'Convert tables in JPG, JPEG, and PNG images into editable Microsoft Excel (.xlsx) spreadsheets using Google Gemini AI. Fast, accurate, and free.',
    badge: 'Powered by Gemini AI',
    h1: 'AI JPG to Excel Converter',
    description: 'Convert tables in images into editable Excel spreadsheets using Google Gemini AI.',
  },
  es: {
    name: 'Convertidor IA de JPG a Excel',
    seoTitle: 'Convertidor IA de JPG a Excel – Imágenes a Hojas de Cálculo Gratis',
    metaDescription: 'Convierte tablas en imágenes JPG y PNG en hojas de cálculo editables de Excel (.xlsx) con Google Gemini AI. Rápido y gratuito.',
    badge: 'Impulsado por Gemini AI',
    h1: 'Convertidor IA de JPG a Excel',
    description: 'Convierte tablas en imágenes en hojas de cálculo de Excel editables utilizando Google Gemini AI.',
  },
  fr: {
    name: 'Convertisseur IA JPG en Excel',
    seoTitle: 'Convertisseur IA JPG en Excel – Convertir Images en Tableaux Excel',
    metaDescription: "Convertissez les tableaux d'images JPG et PNG en feuilles de calcul Excel (.xlsx) modifiables grâce à Google Gemini AI. Gratuit et sécurisé.",
    badge: 'Propulsé par Gemini AI',
    h1: 'Convertisseur IA JPG en Excel',
    description: "Convertissez des tableaux d'images en feuilles de calcul Excel modifiables avec Google Gemini AI.",
  },
  de: {
    name: 'KI JPG in Excel Konverter',
    seoTitle: 'KI JPG in Excel Konverter – Bilder in Excel-Tabellen umwandeln',
    metaDescription: 'Konvertieren Sie Tabellen in JPG- und PNG-Bildern mit Google Gemini KI in bearbeitbare Excel-Tabellen (.xlsx). Schnell, präzise und kostenlos.',
    badge: 'Unterstützt von Gemini AI',
    h1: 'KI JPG in Excel Konverter',
    description: 'Konvertieren Sie Tabellen in Bildern mit Google Gemini KI in bearbeitbare Excel-Tabellen.',
  },
  pt: {
    name: 'Conversor IA de JPG para Excel',
    seoTitle: 'Conversor IA de JPG para Excel – Imagens em Planilhas Online Grátis',
    metaDescription: 'Converta tabelas em imagens JPG e PNG em planilhas editáveis do Excel (.xlsx) usando Google Gemini AI. Rápido, seguro e gratuito.',
    badge: 'Com tecnologia Gemini AI',
    h1: 'Conversor IA de JPG para Excel',
    description: 'Converta tabelas de imagens em planilhas editáveis do Excel usando o Google Gemini AI.',
  },
  ar: {
    name: 'محول JPG إلى إكسيل بالذكاء الاصطناعي',
    seoTitle: 'محول JPG إلى إكسيل بالذكاء الاصطناعي – تحويل الصور إلى جداول إكسيل مجاناً',
    metaDescription: 'تحويل الجداول في صور JPG وPNG إلى جداول إكسيل (.xlsx) قابلة للتعديل باستخدام Google Gemini AI. سريع ومجاني وآمن.',
    badge: 'مدعوم بواسطة Gemini AI',
    h1: 'محول JPG إلى إكسيل بالذكاء الاصطناعي',
    description: 'تحويل الجداول في الصور إلى جداول إكسيل قابلة للتعديل باستخدام الذكاء الاصطناعي Google Gemini.',
  },
  ru: {
    name: 'ИИ Конвертер JPG в Excel',
    seoTitle: 'ИИ Конвертер JPG в Excel – Перевод изображений в таблицы Excel Онлайн',
    metaDescription: 'Конвертируйте таблицы из изображений JPG и PNG в редактируемые таблицы Excel (.xlsx) с помощью Google Gemini AI. Быстро и бесплатно.',
    badge: 'На базе Gemini AI',
    h1: 'ИИ Конвертер JPG в Excel',
    description: 'Преобразуйте таблицы на изображениях в редактируемые таблицы Excel с помощью Google Gemini AI.',
  },
  ja: {
    name: 'AI JPG Excel 変換',
    seoTitle: 'AI JPG Excel 変換 – 画像の表をエクセル形式に無料変換',
    metaDescription: 'Google Gemini AIを使用してJPGやPNG画像の表を高精度で編集可能なExcel（.xlsx）スプレッドシートに変換。安全で完全無料。',
    badge: 'Gemini AI搭載',
    h1: 'AI JPG to Excel Converter',
    description: 'Google Gemini AIを使用して画像の表を編集可能なExcelスプレッドシートに変換します。',
  },
  zh: {
    name: 'AI JPG转Excel转换器',
    seoTitle: 'AI JPG转Excel转换器 – 免费将图片表格转换为Excel电子表格',
    metaDescription: '使用Google Gemini AI将JPG和PNG图片中的表格直接转换为可编辑的Excel（.xlsx）表格。高精度且完全免费。',
    badge: '由Gemini AI驱动',
    h1: 'AI JPG转Excel转换器',
    description: '使用Google Gemini AI将图片中的表格转换为可编辑的Excel电子表格。',
  },
  it: {
    name: 'Convertitore IA da JPG a Excel',
    seoTitle: 'Convertitore IA da JPG a Excel – Immagini in Fogli Excel Gratis',
    metaDescription: 'Converti tabelle da immagini JPG e PNG in fogli di calcolo Excel (.xlsx) modificabili con Google Gemini AI. Veloce, sicuro e gratuito.',
    badge: 'Alimentato da Gemini AI',
    h1: 'Convertitore IA da JPG a Excel',
    description: 'Converti tabelle presenti nelle immagini in fogli di calcolo Excel modificabili utilizzando Google Gemini AI.',
  },
  nl: {
    name: 'AI JPG naar Excel Converter',
    seoTitle: 'AI JPG naar Excel Converter – Afbeeldingen naar Excel Werkbladen',
    metaDescription: 'Converteer tabellen in JPG- en PNG-afbeeldingen naar bewerkbare Excel-spreadsheets (.xlsx) met Google Gemini AI. Snel en gratis.',
    badge: 'Aangedreven door Gemini AI',
    h1: 'AI JPG naar Excel Converter',
    description: 'Converteer tabellen in afbeeldingen naar bewerkbare Excel-spreadsheets met Google Gemini AI.',
  },
};

export const FAQS = [
  {
    q: 'How does this AI JPG to Excel converter work?',
    a: 'Our converter sends your uploaded image securely to Google Gemini Vision AI via Vertex AI. Gemini analyzes the visual table layout, reconstructs rows and columns, transcribes values faithfully, and outputs structured JSON that is converted into a genuine Microsoft Excel (.xlsx) workbook.',
  },
  {
    q: 'Does this tool generate a real .xlsx workbook or just a CSV renamed to XLSX?',
    a: 'It generates a genuine Microsoft Excel (.xlsx) workbook using OpenXML standards. It includes formatted header rows, auto-sized columns, clean cell borders, and proper numeric formatting.',
  },
  {
    q: 'Can the AI extract multiple tables from a single image?',
    a: 'Yes! Google Gemini detects all visible tables in the image. In our interactive preview, you can toggle between tables, and the exported workbook places separate tables onto distinct worksheets.',
  },
  {
    q: 'How does the tool handle blurry or ambiguous text?',
    a: 'Rather than hallucinating or silently guessing values, Gemini explicitly flags low-confidence or blurry cells. These cells are highlighted in amber within the interactive preview so you can verify and edit them before downloading.',
  },
  {
    q: 'Are my financial statements or receipts stored on your servers?',
    a: 'No. Uploaded images are held temporarily in server memory only for the duration of the Gemini extraction request and are never permanently stored in databases, disk storage, or logged.',
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
        'Google Gemini AI Vision Table Extraction',
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
