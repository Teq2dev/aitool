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

  const title = `${tool.name} - Best Free AI Tool | Reviews & Features`;
  const description = tool.shortDescription || tool.description?.substring(0, 160);
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const url = `${baseUrl}/tools/${tool.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
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

  return (
    <ToolDetailClient 
      initialTool={tool} 
      initialRelatedTools={relatedTools} 
    />
  );
}
