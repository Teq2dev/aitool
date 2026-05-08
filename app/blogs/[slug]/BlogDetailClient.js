'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function BlogDetailClient({ initialBlog }) {
  const [blog] = useState(initialBlog);

  if (!blog) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Schema for BlogPosting
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.content?.substring(0, 160),
    url: `https://www.bestaitoolsfree.com/blogs/${blog.slug}`,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      '@type': 'Person',
      name: blog.author || 'Best AI Tools Free'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Best AI Tools Free',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.bestaitoolsfree.com/logo.jpg'
      }
    },
    image: blog.coverImage || 'https://www.bestaitoolsfree.com/logo.jpg',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.bestaitoolsfree.com/blogs/${blog.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link href="/blogs">
            <Button variant="ghost" className="mb-6 hover:bg-white/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>

          {/* Cover Image */}
          <div className="aspect-video w-full overflow-hidden rounded-3xl mb-8 shadow-xl border-4 border-white">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Blog Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge className="bg-blue-600 px-4 py-1 rounded-full">{blog.category}</Badge>
              {blog.featured && (
                <Badge className="bg-yellow-500 text-black px-4 py-1 rounded-full">Featured</Badge>
              )}
              {blog.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="px-4 py-1 rounded-full bg-white border-gray-200">#{tag}</Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Published</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Read Time</p>
                  <p className="text-sm font-semibold text-gray-800">{blog.readTime} min read</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Views</p>
                  <p className="text-sm font-semibold text-gray-800">{blog.views.toLocaleString()} reads</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-6 px-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xl">
                  {blog.author?.charAt(0) || 'B'}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Article by</p>
                  <p className="text-lg font-bold text-gray-900">{blog.author || 'Best AI Tools Free'}</p>
                </div>
              </div>
              <Button variant="outline" className="rounded-full px-6" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Post
              </Button>
            </div>
          </div>

          {/* Blog Content */}
          <article className="mb-12">
            <Card className="shadow-lg border-none rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg prose-blue max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed space-y-4">
                    {blog.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-3xl border-none shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            <CardContent className="p-12 text-center relative z-10">
              <h3 className="text-3xl font-extrabold mb-4">Are you an AI Expert?</h3>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Join our community of contributors! Share your insights about the latest AI trends and tools with our growing audience.
              </p>
              <Link href="/submit-blog">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-10 py-7 rounded-2xl text-lg shadow-xl transition-all hover:scale-105 active:scale-95">
                  Start Writing Today
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}