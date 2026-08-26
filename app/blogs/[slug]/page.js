import { getBlogBySlug } from '@/lib/getBlogs';
import BlogDetailClient from './BlogDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams?.slug);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const title = `${blog.title} | Best AI Tools Free Blog`;
  const description = blog.excerpt || blog.content?.substring(0, 160);
  const baseUrl = 'https://www.bestaitoolsfree.com';
  const url = `${baseUrl}/blogs/${blog.slug}`;

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
          url: blog.coverImage || '/logo.jpg',
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [blog.author || 'Best AI Tools Free'],
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [blog.coverImage || '/logo.jpg'],
    },
  };
}

export default async function BlogPage({ params }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams?.slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient initialBlog={blog} />;
}
