'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Check, Users, Shield, Zap, Award, Package, Clock } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/shop');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Shield, label: '100% Reliable', sublabel: 'Enterprise-grade uptime' },
    { icon: Users, label: '5,000+', sublabel: 'Happy Customers' },
    { icon: Zap, label: '80% Repeat', sublabel: 'Customer Rate' },
    { icon: Star, label: 'Top Rated', sublabel: '4.9/5 Average Rating' },
    { icon: Package, label: '50,000+', sublabel: 'Tools Delivered' },
    { icon: Clock, label: 'Instant', sublabel: 'Digital Delivery' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-red-500 text-white mb-4 text-lg px-4 py-1 animate-pulse">
            🔥 UP TO 80% OFF - LIMITED TIME
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium AI Tools Shop
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Get lifetime access to the best AI tools at unbeatable prices. Transform your workflow today!
          </p>
          <p className="text-sm text-blue-200">
            Trusted by thousands of creators worldwide
          </p>
        </div>
      </div>

      {/* Trust Stats */}
      <div className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <p className="font-bold text-gray-900">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured AI Tools</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No products available yet.</p>
            <p className="text-gray-400">Check back soon for amazing deals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link href={`/shop/${product.slug}`} key={product._id}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  <div className="relative">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Package className="w-16 h-16 text-white/80" />
                      </div>
                    )}
                    {product.discount > 0 && (
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-2">{product.category}</Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        {product.originalPrice > 0 && (
                          <p className="text-gray-400 line-through text-sm">
                            ${product.originalPrice}/mo
                          </p>
                        )}
                        <p className="text-2xl font-bold text-blue-600">
                          ${product.monthlyPrice}<span className="text-sm font-normal text-gray-500">/mo</span>
                        </p>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Deal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have upgraded their productivity with our premium AI tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-green-400">
              <Check className="w-5 h-5" />
              <span>30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Check className="w-5 h-5" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Check className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
