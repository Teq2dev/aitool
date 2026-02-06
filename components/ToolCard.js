'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ToolCard({ tool }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500 relative overflow-hidden">
      {tool.featured && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">
            Featured
          </Badge>
        </div>
      )}
      {tool.trending && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Trending
          </Badge>
        </div>
      )}
      
      <Link href={`/tools/${tool.slug}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-blue-100">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-1">
                {tool.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">{tool.rating}</span>
                </div>
                <span className="text-xs text-gray-400">({tool.votes} votes)</span>
              </div>
            </div>
          </div>
          <CardDescription className="line-clamp-2 text-gray-600">
            {tool.shortDescription}
          </CardDescription>
        </CardHeader>
      </Link>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1.5">
          {tool.categories?.slice(0, 3).map((cat) => (
            <Badge key={cat} variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
              {cat.replace('-', ' ')}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <Badge variant={tool.pricing === 'Free' ? 'default' : tool.pricing === 'Paid' ? 'destructive' : 'secondary'}>
          {tool.pricing}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          onClick={() => window.open(tool.website, '_blank')}
        >
          Visit <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}