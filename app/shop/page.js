'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Check, Users, Shield, Zap, Award, Package, Clock } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/shop');
      const data = await res.json();
      setProducts(data);
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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
    <>
      <head>
        <title>AI Tools Shop - Premium AI Tools at 80% OFF | Best AI Tools Free</title>
        <meta name="description" content="Get premium AI tools at unbeatable prices. Up to 80% discount on AI software, productivity tools, and more. Instant digital delivery." />
        <meta name="keywords" content="ai tools shop, buy ai tools, ai software deals, premium ai tools, ai tools discount" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
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

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="rounded-full"
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button 
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                  className="rounded-full"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-8">Featured AI Tools</h2>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No products available yet.</p>
              <p className="text-gray-400">Check back soon for amazing deals!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <Link href={`/shop/${product.slug}`} key={product._id}>
                  <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border h-full">
                    <div className="relative aspect-square">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.imageAlt || `${product.name} - Best AI directory tool, software discount`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Package className="w-12 h-12 text-white/80" />
                        </div>
                      )}
                      {product.discount > 0 && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {product.discount}% OFF
                        </Badge>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {product.originalPrice > 0 && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                        <span className="text-lg font-bold text-blue-600">
                          ₹{product.monthlyPrice}
                        </span>
                      </div>
                    </div>
                  </div>
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
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <Check className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <Check className="w-5 h-5" />
                <span>Lifetime Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
