'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Check, Users, Shield, Zap, Award, Package, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ShopProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/shop/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
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
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getPriceByPlan = () => {
    switch (selectedPlan) {
      case 'monthly': return product.monthlyPrice;
      case 'halfYearly': return product.halfYearlyPrice;
      case 'yearly': return product.yearlyPrice;
      default: return product.monthlyPrice;
    }
  };

  const getSavings = () => {
    const monthly = product.monthlyPrice * 12;
    const yearly = product.yearlyPrice * 12;
    if (monthly === 0) return 0;
    return Math.round(((monthly - yearly) / monthly) * 100);
  };

  return (
    <>
      <head>
        <title>{product.name} - Buy at {product.discount}% OFF | Best AI Tools Free Shop</title>
        <meta name="description" content={product.shortDescription || `Get ${product.name} at ${product.discount}% discount. Premium AI tool with instant delivery.`} />
      </head>
      <div className="min-h-screen bg-gray-50">
        {/* Back Link */}
        <div className="container mx-auto px-4 py-4">
          <Link href="/shop" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        {/* Product Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.imageAlt || `${product.name} - Best AI directory tool, software discount, AI tool bundle`}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Package className="w-24 h-24 text-white/80" />
                  </div>
                )}
              </div>
              <div>
                <Badge variant="outline" className="mb-2">{product.category}</Badge>
                {product.discount > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white animate-pulse">
                    {product.discount}% OFF
                  </Badge>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {product.shortDescription}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600">4.9/5 (2,000+ reviews)</span>
                </div>

                {/* Pricing Plans */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold mb-4">Choose Your Plan</h3>
                  <Tabs value={selectedPlan} onValueChange={setSelectedPlan}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="halfYearly">6 Months</TabsTrigger>
                      <TabsTrigger value="yearly" className="relative">
                        Yearly
                        {getSavings() > 0 && (
                          <span className="absolute -top-3 -right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            Save {getSavings()}%
                          </span>
                        )}
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="mt-4 text-center">
                    {product.originalPrice > 0 && (
                      <p className="text-gray-400 line-through text-lg">
                        ₹{product.originalPrice}
                      </p>
                    )}
                    <p className="text-4xl font-bold text-blue-600">
                      ₹{getPriceByPlan()}
                      <span className="text-lg font-normal text-gray-500">
                        /{selectedPlan === 'monthly' ? 'mo' : selectedPlan === 'halfYearly' ? '6mo' : 'yr'}
                      </span>
                    </p>
                  </div>
                </div>

                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                  Get Started Now
                </Button>
                
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-500" />
                    Instant Access
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-500" />
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-400 mb-6">Trusted by thousands of creators worldwide</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                  <p className="font-bold text-white">{stat.label}</p>
                  <p className="text-sm text-gray-400">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description & Features */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>About This Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {product.description ? (
                      <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
                    ) : (
                      <p className="text-gray-500">No detailed description available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.features && product.features.length > 0 ? (
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>Lifetime Access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>All Future Updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>Priority Support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>Documentation</span>
                      </li>
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
