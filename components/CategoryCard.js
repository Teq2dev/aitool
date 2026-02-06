'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    <Link href={`/tools?category=${category.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500 cursor-pointer h-full">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <span className="text-3xl">{category.icon}</span>
          </div>
          <h3 className="font-bold text-black group-hover:text-blue-600 transition-colors mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
          <Badge variant="secondary" className="mt-auto">
            {category.toolCount || 0} tools
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}