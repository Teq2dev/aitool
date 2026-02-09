'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    <Link href={`/tools?category=${category.slug}`}>
      <Card className="group hover:shadow-md transition-all duration-300 border hover:border-blue-400 cursor-pointer h-full">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl">{category.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-black group-hover:text-blue-600 transition-colors truncate">
                {category.name}
              </h3>
              <p className="text-xs text-gray-500">
                {category.toolCount || 0} tools
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}