'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, ArrowLeft, Share2 } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';

export default function ToolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tool, setTool] = useState(null);
  const [relatedTools, setRelatedTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchTool();
    }
  }, [params.slug]);

  const fetchTool = async () => {
    try {
      const res = await fetch(`/api/tools/${params.slug}`);
      if (!res.ok) {
        router.push('/tools');
        return;
      }
      const data = await res.json();
      setTool(data);

      // Fetch related tools from the same category
      if (data.categories?.[0]) {
        const relatedRes = await fetch(`/api/tools?category=${data.categories[0]}&limit=3`);
        const relatedData = await relatedRes.json();
        setRelatedTools(relatedData.tools?.filter((t) => t._id !== data._id) || []);
      }
    } catch (error) {
      console.error('Error fetching tool:', error);
      router.push('/tools');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tool details...</p>
        </div>
      </div>
    );
  }

  if (!tool) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/tools">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-blue-100">
                    <img src={tool.logo} alt={tool.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-3xl font-bold text-black mb-2">{tool.name}</h1>
                        <p className="text-lg text-gray-600">{tool.shortDescription}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-semibold">{tool.rating}</span>
                        <span className="text-gray-500">({tool.votes} votes)</span>
                      </div>
                      <Badge variant={tool.pricing === 'Free' ? 'default' : tool.pricing === 'Paid' ? 'destructive' : 'secondary'}>
                        {tool.pricing}
                      </Badge>
                      {tool.featured && (
                        <Badge className="bg-yellow-500 text-black">Featured</Badge>
                      )}
                      {tool.trending && (
                        <Badge className="bg-blue-600 text-white">Trending</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>About {tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{tool.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          ✓
                        </span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Categories & Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Categories & Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.categories?.map((cat) => (
                      <Link key={cat} href={`/tools?category=${cat}`}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                          {cat.replace('-', ' ')}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
                {tool.tags && tool.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 mb-6">
              <CardContent className="p-6">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4"
                  size="lg"
                  onClick={() => window.open(tool.website, '_blank')}
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-sm text-gray-500 text-center">Click to visit the official website</p>
              </CardContent>
            </Card>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedTools.map((relatedTool) => (
                      <Link key={relatedTool._id} href={`/tools/${relatedTool.slug}`}>
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <img src={relatedTool.logo} alt={relatedTool.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-black truncate">{relatedTool.name}</p>
                            <p className="text-xs text-gray-600 truncate">{relatedTool.shortDescription}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}