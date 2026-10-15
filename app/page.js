import { getFeaturedTools, getTrendingTools, getCategories, getTools } from '@/lib/getTools';
import HomeClient from './HomeClient';
import Script from 'next/script';
import { getTranslation } from '@/lib/translations';

const VALID_LANGS = ['es', 'fr', 'de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];
const BASE_URL = 'https://www.bestaitoolsfree.com';

const HOME_TITLES = {
  en: 'Best Free Online Tools & AI Directory | BestAIToolsFree',
  es: 'Mejores Herramientas Online Gratuitas y Directorio de IA | BestAIToolsFree',
  fr: 'Meilleurs Outils en Ligne Gratuits et Annuaire IA | BestAIToolsFree',
  de: 'Beste kostenlose Online-Tools & KI-Verzeichnis | BestAIToolsFree',
  pt: 'Melhores Ferramentas Online Gratuitas e Diretório de IA | BestAIToolsFree',
  ar: 'أفضل أدوات مجانية على الإنترنت ودليل الذكاء الاصطناعي | BestAIToolsFree',
  ru: 'Лучшие бесплатные онлайн-инструменты и каталог ИИ | BestAIToolsFree',
  ja: '最高の無料オンラインツール＆AIディレクトリ | BestAIToolsFree',
  zh: '最佳免费在线工具与精选AI工具导航目录 | BestAIToolsFree',
  it: 'Migliori Strumenti Online Gratuiti e Directory IA | BestAIToolsFree',
  nl: 'Beste Gratis Online Tools & AI Directory | BestAIToolsFree',
};

const HOME_DESCRIPTIONS = {
  en: 'Access 100% free online tools in your browser: compress images, merge PDFs, and calculate finance metrics. Plus explore 1,400+ curated AI tools.',
  es: 'Accede a herramientas online 100% gratuitas en tu navegador: comprime imágenes, une PDFs y calcula finanzas. Además, explora +1.400 herramientas de IA.',
  fr: 'Accédez à des outils 100% gratuits dans votre navigateur : compressez des images, fusionnez des PDF et calculez vos finances. Plus de 1 400 outils IA.',
  de: '100% kostenlose Browser-Tools: Bilder komprimieren, PDFs zusammenfügen und Finanzen berechnen. Entdecken Sie über 1.400 geprüfte KI-Tools.',
  pt: 'Acesse ferramentas online 100% gratuitas no seu navegador: comprima imagens, junte PDFs e calcule finanças. Explore mais de 1.400 ferramentas de IA.',
  ar: 'استخدم أدوات مجانية 100% في متصفحك: ضغط الصور، دمج ملفات PDF، وحساب التمويل، بالإضافة إلى استكشاف أكثر من 1400 أداة ذكاء اصطناعي.',
  ru: 'Бесплатные онлайн-инструменты в браузере: сжатие изображений, объединение PDF и финансовые расчеты. Каталог из более чем 1400 инструментов ИИ.',
  ja: 'ブラウザで使える100%無料オンラインツール：画像圧縮、PDF結合、金融計算。さらに1,400以上の厳選AIツールを探索。',
  zh: '在浏览器中使用100%免费的在线实用工具：压缩图片、合并PDF、财务计算，并探索1,400+精选AI人工智能工具。',
  it: 'Accedi a strumenti online gratuiti al 100% nel browser: comprimi immagini, unisci PDF e calcola finanze. Esplora oltre 1.400 strumenti di IA.',
  nl: 'Krijg toegang tot 100% gratis online tools in je browser: comprimeer afbeeldingen, voeg PDF\'s samen en bereken financiën. Ontdek 1.400+ AI-tools.',
};

export async function generateMetadata({ searchParams }) {
  const sParams = await searchParams;
  let lang = 'en';
  if (sParams?.lang && VALID_LANGS.includes(sParams.lang)) {
    lang = sParams.lang;
  }

  const title = HOME_TITLES[lang] || HOME_TITLES.en;
  const description = HOME_DESCRIPTIONS[lang] || HOME_DESCRIPTIONS.en;
  const canonicalUrl = lang === 'en' ? BASE_URL : `${BASE_URL}/${lang}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': BASE_URL,
        'en': BASE_URL,
        'es': `${BASE_URL}/es`,
        'fr': `${BASE_URL}/fr`,
        'de': `${BASE_URL}/de`,
        'pt': `${BASE_URL}/pt`,
        'ar': `${BASE_URL}/ar`,
        'ru': `${BASE_URL}/ru`,
        'ja': `${BASE_URL}/ja`,
        'zh': `${BASE_URL}/zh`,
        'it': `${BASE_URL}/it`,
        'nl': `${BASE_URL}/nl`,
      }
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Best AI Tools Free',
      locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`,
      type: 'website',
      images: [
        {
          url: '/logo.jpg',
          width: 1200,
          height: 630,
          alt: 'Best AI Tools Free Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.jpg'],
    },
  };
}

export const revalidate = 3600; // Revalidate home page every hour

export default async function HomePage({ searchParams }) {
  const sParams = await searchParams;
  const lang = sParams?.lang && VALID_LANGS.includes(sParams.lang) ? sParams.lang : 'en';
  const canonicalUrl = lang === 'en' ? BASE_URL : `${BASE_URL}/${lang}`;
  // Fetch all data for the homepage on the server
  // This is better for SEO as the content is pre-rendered
  const [featured, trending, categories, latestData, dict] = await Promise.all([
    getFeaturedTools(6),
    getTrendingTools(8),
    getCategories(),
    getTools({ sort: 'newest', limit: 6 }),
    getTranslation(lang)
  ]);

  // Homepage Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Free Online Tools & AI Directory',
    description: 'Access free in-browser utilities for images, PDFs, and calculations, plus explore 1,400+ curated AI tools across multiple categories.',
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: featured.length,
      itemListElement: featured.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: tool.name,
          description: tool.shortDescription || tool.description,
          url: `https://www.bestaitoolsfree.com/tools/${tool.slug}`,
          applicationCategory: 'AI Tool',
          image: tool.logo,
          offers: {
            '@type': 'Offer',
            price: tool.pricing === 'Free' ? '0' : undefined,
            priceCurrency: 'USD'
          }
        }
      }))
    }
  };

  // FAQ Schema for Homepage (Localized 1:1 with visible content)
  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: dict.faqQ1 || 'Are the online utilities on BestAIToolsFree completely free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faqA1 || 'Yes. All featured client-side utilities—including the Image Compressor, Merge PDF, Image Converter, and all 24 interactive calculators—are 100% free with no sign-up, subscriptions, or hidden paywalls.'
        }
      },
      {
        '@type': 'Question',
        name: dict.faqQ2 || 'How do in-browser PDF and image tools protect my personal data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faqA2 || 'Tools like the Smart Image Compressor, PDF Merger, and Image Converter execute locally in your web browser memory using HTML5 Canvas, Web Workers, and pdf-lib. Your documents and photos are never uploaded to remote servers or stored in any database.'
        }
      },
      {
        '@type': 'Question',
        name: dict.faqQ3 || 'Do I need an account or email to use the calculators or converters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faqA3 || 'No. All utilities, format converters, and financial calculators can be used immediately without creating an account or providing personal details.'
        }
      },
      {
        '@type': 'Question',
        name: dict.faqQ4 || 'What file size limits apply to the free in-browser utilities?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faqA4 || 'For optimal browser memory performance, our client-side tools support single and batch image files up to 20MB (with up to 50-megapixel image resolution) and PDF files up to 100MB or 500 pages.'
        }
      },
      {
        '@type': 'Question',
        name: dict.faqQ5 || 'Can I combine outputs from AI tools with these free utilities?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faqA5 || 'Yes. A common workflow is generating high-resolution imagery or text with AI software, then using our Image Compressor to optimize file sizes for the web, our Image Converter to change formats, or our PDF tools to assemble professional documents.'
        }
      },
      {
        '@type': 'Question',
        name: dict.faqQ6 || 'What is an AI tool and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faqA6 || 'An AI tool is software powered by artificial intelligence models—such as Large Language Models (LLMs), diffusion models, or neural networks—designed to automate tasks, generate content, analyze complex data, or enhance human workflows.'
        }
      },
      {
        '@type': 'Question',
        name: dict.faqQ7 || 'How do I choose the best AI tool for my specific needs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faqA7 || 'Define your objective, then evaluate candidate tools based on output quality, ease of use, pricing transparency, free tier limits, and software ecosystem integrations.'
        }
      },
      {
        '@type': 'Question',
        name: dict.faqQ8 || 'What categories of AI software can I explore on Best AI Tools Free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faqA8 || 'Our directory features dozens of categories, including AI Writing, Text-to-Image Generation, Video Editing, Developer Tools, Audio & Voice, SEO, Productivity, and Business Automation.'
        }
      },
      {
        '@type': 'Question',
        name: dict.faqQ9 || 'How often are new AI tools added and verified on Best AI Tools Free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faqA9 || 'Our editorial team and community review and publish newly launched AI applications on an ongoing basis after verifying active endpoints, features, and pricing.'
        }
      },
      {
        '@type': 'Question',
        name: dict.faqQ10 || 'Can founders and developers submit their AI tools to this directory?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faqA10 || 'Yes. Creators and development teams can easily submit their AI products via our Submit Tool page for editorial moderation and community publication.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <HomeClient 
        initialFeatured={featured}
        initialTrending={trending}
        initialCategories={categories}
        initialLatest={latestData.tools || []}
      />
    </>
  );
}

