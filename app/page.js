import { getFeaturedTools, getTrendingTools, getCategories, getTools } from '@/lib/getTools';
import HomeClient from './HomeClient';
import Script from 'next/script';

export const metadata = {
  title: 'Best AI Tools Free - Discover 3000+ Top AI Tools Directory',
  description: 'Explore the most comprehensive directory of best free AI tools. Browse, compare, and discover trending AI solutions for writing, image generation, business, and more.',
  alternates: {
    canonical: 'https://www.bestaitoolsfree.com',
  },
};

export const revalidate = 3600; // Revalidate home page every hour

export default async function HomePage() {
  // Fetch all data for the homepage on the server
  // This is better for SEO as the content is pre-rendered
  const [featured, trending, categories, latestData] = await Promise.all([
    getFeaturedTools(6),
    getTrendingTools(8),
    getCategories(),
    getTools({ sort: 'newest', limit: 6 })
  ]);

  // Homepage Schema
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best AI Tools Free - Discovery Home',
    description: 'Explore 3000+ top free AI tools across multiple categories.',
    url: 'https://www.bestaitoolsfree.com',
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

  // FAQ Schema for Homepage
  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an AI tool and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An AI tool is software powered by artificial intelligence models—such as Large Language Models (LLMs), diffusion models, or neural networks—designed to automate tasks, generate content, analyze complex data, or enhance human workflows.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are there genuinely free AI tools available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many AI tools offer completely free plans, open-source access, or generous freemium tiers with recurring monthly allowances. Best AI Tools Free highlights exact pricing structures for all listed tools.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I choose the best AI tool for my specific needs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Define your objective, then evaluate tools based on output quality, ease of use, pricing transparency, free tier limits, and software ecosystem integrations.'
        }
      },
      {
        '@type': 'Question',
        name: 'What categories of AI software can I explore on Best AI Tools Free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our directory features dozens of categories, including AI Writing, Text-to-Image Generation, Video Editing, Developer Tools, Audio & Voice, SEO, Productivity, and Business Automation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are AI tools safe to use with sensitive business or personal data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Security varies by provider. Established AI platforms provide data encryption and enterprise privacy controls that prevent user inputs from being used for public model training.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use outputs from AI tools for commercial projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In most cases, yes. Leading AI platforms grant full commercial usage rights for content generated on their platforms under standard terms.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does an AI directory save time compared to standard search engines?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An organized AI directory categorizes software by verified use cases, displays honest feature summaries, highlights pricing tiers, and enables direct comparison without navigating sponsored search clutter.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often are new AI tools added and verified on Best AI Tools Free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our editorial team and community review and publish newly launched AI applications on an ongoing basis after verifying active endpoints and pricing.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can founders and developers submit their AI tools to this directory?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Creators and development teams can easily submit their AI products via our Submit Tool page for moderation and publication.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need programming skills or technical experience to use AI software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The vast majority of modern AI tools feature intuitive web interfaces, natural language prompt inputs, and drag-and-drop dashboards that require zero coding knowledge.'
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Script
        id="home-faq-schema"
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

