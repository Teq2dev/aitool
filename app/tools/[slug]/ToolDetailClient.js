'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ToolDetailClient({ initialTool, initialRelatedTools = [] }) {
  const [tool] = useState(initialTool);
  const [relatedTools] = useState(initialRelatedTools);

  if (!tool) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tool.name} - Best AI Tools Free`,
        text: tool.shortDescription,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Schema for SoftwareApplication (kept here for client-side crawlers, though server handles it too)
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description || tool.shortDescription,
    url: `https://www.bestaitoolsfree.com/tools/${tool.slug}`,
    applicationCategory: 'AI Tool',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'Free' ? '0' : undefined,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: tool.rating ? {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      ratingCount: tool.votes || 1,
      bestRating: 5,
      worstRating: 1
    } : undefined,
    image: tool.logo,
    author: {
      '@type': 'Organization',
      name: 'Best AI Tools Free'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
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
              <Card className="mb-6 overflow-hidden border-none shadow-sm">
                <CardHeader className="bg-white pb-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-blue-50 shadow-md">
                      <img 
                        src={tool.logo} 
                        alt={`${tool.name} - Free AI Tool`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                        <div>
                          <h1 className="text-4xl font-bold text-gray-900 mb-2">{tool.name}</h1>
                          <p className="text-xl text-gray-600 font-medium">{tool.shortDescription}</p>
                        </div>
                        <Button variant="outline" size="icon" onClick={handleShare} className="rounded-full">
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-bold text-yellow-700">{tool.rating}</span>
                          <span className="text-gray-500 text-sm">({tool.votes} reviews)</span>
                        </div>
                        <Badge className={`text-sm px-4 py-1.5 rounded-full ${
                          tool.pricing === 'Free' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 
                          tool.pricing === 'Paid' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 
                          'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}>
                          {tool.pricing}
                        </Badge>
                        {tool.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none shadow-sm">Featured</Badge>
                        )}
                        {tool.trending && (
                          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none shadow-sm">Trending</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Description */}
              <Card className="mb-6 shadow-sm border-none">
                <CardHeader>
                  <CardTitle className="text-2xl">Overview of {tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-blue max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{tool.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              {tool.features && tool.features.length > 0 && (
                <Card className="mb-6 shadow-sm border-none house">
                  <CardHeader>
                    <CardTitle className="text-2xl">Key Benefits & Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center p-4 rounded-xl bg-blue-50/50 border border-blue-100/50">
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 flex-shrink-0 shadow-sm">
                            <span className="text-sm font-bold">✓</span>
                          </div>
                          <span className="text-gray-800 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Categories & Tags */}
              <Card className="shadow-sm border-none">
                <CardHeader>
                  <CardTitle className="text-2xl">Classification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Main Categories</h4>
                      <div className="flex flex-wrap gap-3">
                        {tool.categories?.map((cat) => (
                          <Link key={cat} href={`/tools?category=${cat}`}>
                            <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white transition-all bg-blue-50">
                              {cat.replace('-', ' ')}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                    {tool.tags && tool.tags.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Related Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {tool.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 mb-6 shadow-lg border-none bg-white overflow-hidden">
                <div className="h-2 bg-blue-600 w-full"></div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-center">Ready to try {tool.name}?</h3>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6 py-8 text-lg font-bold rounded-2xl shadow-blue-200 shadow-xl transition-all hover:scale-[1.02]"
                    onClick={() => window.open(tool.website, '_blank')}
                  >
                    Get Started Free
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm py-2 border-b">
                      <span className="text-gray-500">Pricing Model</span>
                      <span className="font-bold text-blue-700">{tool.pricing}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-b">
                      <span className="text-gray-500">Global Rating</span>
                      <span className="font-bold text-yellow-600">{tool.rating} / 5.0</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2">
                      <span className="text-gray-500">Last Updated</span>
                      <span className="font-bold text-gray-700">
                        {new Date(tool.updatedAt || tool.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Tools */}
              {relatedTools.length > 0 && (
                <Card className="shadow-sm border-none">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                      Similar AI Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {relatedTools.map((relatedTool) => (
                        <Link key={relatedTool._id} href={`/tools/${relatedTool.slug}`}>
                          <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50/50 transition-all cursor-pointer border border-transparent hover:border-blue-100 group">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                              <img src={relatedTool.logo} alt={relatedTool.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">{relatedTool.name}</p>
                              <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{relatedTool.shortDescription}</p>
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
    </>
  );
}