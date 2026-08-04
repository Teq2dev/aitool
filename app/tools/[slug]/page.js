import { getToolBySlug, getTools } from '@/lib/getTools';
import ToolDetailClient from './ToolDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const tool = await getToolBySlug(params.slug);
  
  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  const categoryName = tool.categories?.[0] ? tool.categories[0].replace(/-/g, ' ') : 'AI';
  const title = `${tool.name} Review & Alternatives (2026) - Best Free ${categoryName} AI Tool`;
  const description = tool.shortDescription || tool.description?.substring(0, 160);
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const url = `${baseUrl}/tools/${tool.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${baseUrl}/tools/${tool.slug}`,
        'en': `${baseUrl}/tools/${tool.slug}`,
        'es': `${baseUrl}/es/tools/${tool.slug}`,
        'fr': `${baseUrl}/fr/tools/${tool.slug}`,
        'de': `${baseUrl}/de/tools/${tool.slug}`,
        'pt': `${baseUrl}/pt/tools/${tool.slug}`,
        'ar': `${baseUrl}/ar/tools/${tool.slug}`,
        'ru': `${baseUrl}/ru/tools/${tool.slug}`,
        'ja': `${baseUrl}/ja/tools/${tool.slug}`,
        'zh': `${baseUrl}/zh/tools/${tool.slug}`,
        'it': `${baseUrl}/it/tools/${tool.slug}`,
        'nl': `${baseUrl}/nl/tools/${tool.slug}`,
      }
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: tool.logo,
          width: 800,
          height: 800,
          alt: tool.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [tool.logo],
    },
  };
}

export default async function ToolPage({ params }) {
  const tool = await getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  // Fetch related tools on the server for faster loading and better SEO
  const relatedToolsData = await getTools({ 
    category: tool.categories?.[0], 
    limit: 4 
  });
  
  const relatedTools = relatedToolsData.tools?.filter(t => t.slug !== tool.slug).slice(0, 3) || [];
  const primaryCategory = tool.categories?.[0] || 'general';
  const baseUrl = 'https://www.bestaitoolsfree.com';

  // Server-rendered Graph Schema for Rich Snippets (Star Ratings, Breadcrumbs, FAQs)
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.description || tool.shortDescription,
        url: `${baseUrl}/tools/${tool.slug}`,
        applicationCategory: 'AI Tool',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: tool.pricing === 'Free' ? '0' : undefined,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: tool.rating || 4.5,
          ratingCount: tool.votes || 12,
          bestRating: 5,
          worstRating: 1
        },
        image: tool.logo,
        author: {
          '@type': 'Organization',
          name: 'Best AI Tools Free'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: `${baseUrl}/tools`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: primaryCategory.replace(/-/g, ' '),
            item: `${baseUrl}/tools?category=${encodeURIComponent(primaryCategory)}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: tool.name,
            item: `${baseUrl}/tools/${tool.slug}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Is ${tool.name} free to use?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${tool.name} is available as a ${tool.pricing || 'Free'} AI tool. Discover full pricing options, features, and user reviews on Best AI Tools Free.`
            }
          },
          {
            '@type': 'Question',
            name: `What is ${tool.name} best used for?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${tool.name} is designed for ${primaryCategory.replace(/-/g, ' ')} tasks, offering automated AI workflows and intuitive features.`
            }
          },
          {
            '@type': 'Question',
            name: `Where can I find alternatives to ${tool.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `You can browse top-rated free and paid alternatives to ${tool.name} in the ${primaryCategory.replace(/-/g, ' ')} directory on Best AI Tools Free.`
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <ToolDetailClient 
        initialTool={tool} 
        initialRelatedTools={relatedTools} 
      />
    </>
  );
}
