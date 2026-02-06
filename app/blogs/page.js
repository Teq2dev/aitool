'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Eye, Calendar, Search } from 'lucide-react';
import Link from 'next/link';

export default function BlogsPage() {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [search, pagination.page]);

  const fetchFeaturedBlogs = async () => {
    try {
      const res = await fetch('/api/featured-blogs');
      const data = await res.json();
      setFeaturedBlogs(data);
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: '9',
      });

      if (search) params.append('search', search);

      const res = await fetch(`/api/blogs?${params}`);
      const data = await res.json();

      setBlogs(data.blogs || []);
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
        total: data.total,
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination({ ...pagination, page: 1 });
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black mb-2">AI Tools Blog</h1>
          <p className="text-gray-600">Insights, tutorials, and news about AI tools</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-full"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBlogs.map((blog) => (
                <Link key={blog._id} href={`/blogs/${blog.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500 h-full cursor-pointer">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <Badge className="w-fit mb-2 bg-yellow-500 text-black">Featured</Badge>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{blog.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{blog.readTime} min read</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{blog.views} views</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Blogs */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Latest Articles</h2>
            <Link href="/submit-blog">
              <Button className="bg-blue-600 hover:bg-blue-700">Write a Blog</Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading blogs...</p>
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No blogs found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {blogs.map((blog) => (
                  <Link key={blog._id} href={`/blogs/${blog.slug}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 border hover:border-blue-300 h-full cursor-pointer">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{blog.category}</Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{blog.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{blog.readTime} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{blog.views}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    disabled={pagination.page === 1}
                    onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  >
                    Previous
                  </Button>
                  <span className="text-gray-600 mx-4">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={pagination.page === pagination.totalPages}
                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}