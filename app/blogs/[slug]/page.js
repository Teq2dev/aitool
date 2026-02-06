'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${params.slug}`);
      if (!res.ok) {
        router.push('/blogs');
        return;
      }
      const data = await res.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      router.push('/blogs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link href="/blogs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </Link>

        {/* Cover Image */}
        <div className="aspect-video w-full overflow-hidden rounded-xl mb-8">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-blue-600">{blog.category}</Badge>
            {blog.featured && (
              <Badge className="bg-yellow-500 text-black">Featured</Badge>
            )}
            {blog.tags?.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-black mb-4">{blog.title}</h1>

          <div className="flex items-center gap-6 text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{blog.views} views</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-y py-4">
            <div>
              <p className="text-sm text-gray-600">Written by</p>
              <p className="font-semibold text-black">{blog.author}</p>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Blog Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {blog.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-black mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-blue-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Want to share your knowledge?</h3>
            <p className="text-blue-100 mb-4">Write a blog post and help others learn about AI tools</p>
            <Link href="/submit-blog">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Write a Blog Post
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}