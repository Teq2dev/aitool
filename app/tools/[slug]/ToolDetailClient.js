'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, ArrowLeft, Share2, Edit2, Trash2, X, Check, ThumbsUp, ThumbsDown, HelpCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  getLocalizedPricing, 
  getLocalizedBadge, 
  getLocalizedProsList, 
  getLocalizedConsList, 
  getLocalizedDescription 
} from '@/lib/languages';
import ToolSemanticClusters from '@/components/seo/ToolSemanticClusters';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const sanitizeHtml = (html) => {
  if (!html) return '';
  if (typeof window === 'undefined') {
    return html;
  }
  return DOMPurify.sanitize(html);
};

export default function ToolDetailClient({ initialTool, initialStrongSimilar = [], initialRelatedTools = [], initialLang = 'en', relatedBlogs = [], relatedCats = [], breadcrumbData }) {
  const { data: session } = useSession();
  const user = session?.user;
  const [tool] = useState(initialTool);
  const [strongSimilar] = useState(initialStrongSimilar);
  const [relatedTools] = useState(initialRelatedTools);
  const { t, currentLang, getLangUrl } = useLanguage();

  if (!tool) return null;

  const effectiveLang = initialLang || currentLang;
  const primaryCategory = tool.categories?.[0] || 'general';
  const localizedInfo = getLocalizedDescription(tool, effectiveLang);
  
  // Apply translation overrides from DB if they exist
  const translationOverride = tool.translations?.[effectiveLang] || {};
  const displayFullDescription = translationOverride.fullDescription || tool.fullDescription || localizedInfo.description;
  const displayPricingDetails = translationOverride.pricingDetails || tool.pricingDetails;
  
  let displayFaqs = tool.faqs;
  if (effectiveLang !== 'en' && translationOverride.faqs && translationOverride.faqs.length > 0) {
    displayFaqs = translationOverride.faqs;
  }

  let displayFeatures = tool.features;
  if (effectiveLang !== 'en' && translationOverride.features && translationOverride.features.length > 0) {
    displayFeatures = translationOverride.features;
  }
  let prosList = (tool.pros && Array.isArray(tool.pros) && tool.pros.length > 0)
    ? tool.pros
    : getLocalizedProsList(primaryCategory, tool.rating, effectiveLang);
  if (effectiveLang !== 'en' && translationOverride.pros && Array.isArray(translationOverride.pros) && translationOverride.pros.length > 0) {
    prosList = translationOverride.pros;
  }

  let consList = (tool.cons && Array.isArray(tool.cons) && tool.cons.length > 0)
    ? tool.cons
    : getLocalizedConsList(effectiveLang);
  if (effectiveLang !== 'en' && translationOverride.cons && Array.isArray(translationOverride.cons) && translationOverride.cons.length > 0) {
    consList = translationOverride.cons;
  }
  const localizedPricing = getLocalizedPricing(tool.pricing, effectiveLang);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tool.name} - Best AI Tools Free`,
        text: localizedInfo.shortDescription,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Schema for SoftwareApplication
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: displayFullDescription,
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
          <Breadcrumbs data={breadcrumbData} />

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
                          <p className="text-xl text-gray-600 font-medium">
                            {localizedInfo.shortDescription}
                          </p>
                        </div>
                        <Button variant="outline" size="icon" onClick={handleShare} aria-label={`Share ${tool.name}`} className="rounded-full">
                          <Share2 className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-bold text-yellow-700">{tool.rating}</span>
                          <span className="text-gray-500 text-sm">({tool.votes} {t('reviews')})</span>
                        </div>
                        <Badge className={`text-sm px-4 py-1.5 rounded-full ${
                          tool.pricing === 'Free' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 
                          tool.pricing === 'Paid' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 
                          'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}>
                          {localizedPricing}
                        </Badge>
                        {tool.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none shadow-sm">{getLocalizedBadge('Featured', currentLang)}</Badge>
                        )}
                        {tool.trending && (
                          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none shadow-sm">{getLocalizedBadge('Trending', currentLang)}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Description */}
              <Card className="mb-6 shadow-sm border-none">
                <CardHeader>
                  <CardTitle className="text-2xl">What is {tool.name}?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-blue max-w-none text-gray-700 text-lg leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayFullDescription) }}
                  />
        <ToolSemanticClusters 
          relatedCats={relatedCats} 
          relatedBlogs={relatedBlogs}
          strongSimilar={strongSimilar}
          relatedTools={relatedTools}
          effectiveLang={effectiveLang}
        />

</CardContent>
              </Card>

              {/* Features */}
              {displayFeatures && displayFeatures.length > 0 && (
                <Card className="mb-6 shadow-sm border-none house">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t('keyBenefits')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayFeatures.map((feature, index) => (
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

              {/* Pricing Section */}
              <Card className="mb-6 shadow-sm border-none">
                <CardHeader>
                  <CardTitle className="text-2xl">{tool.name} Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-sm font-semibold text-gray-500 mb-1 tracking-wider uppercase">Pricing model</span>
                      <span className="font-bold text-gray-900 text-lg">{tool.pricingModel || tool.pricing || '—'}</span>
                    </div>
                    <div className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-sm font-semibold text-gray-500 mb-1 tracking-wider uppercase">Starting price</span>
                      <span className="font-bold text-gray-900 text-lg">{tool.startingPrice || '—'}</span>
                    </div>
                    <div className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-sm font-semibold text-gray-500 mb-1 tracking-wider uppercase">Free plan</span>
                      <span className="font-bold text-gray-900 text-lg">
                        {tool.hasFreePlan !== undefined 
                          ? (tool.hasFreePlan ? 'Yes' : 'No') 
                          : (tool.pricing === 'Free' || tool.pricing === 'Freemium' ? 'Yes' : '—')}
                      </span>
                    </div>
                    <div className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-sm font-semibold text-gray-500 mb-1 tracking-wider uppercase">Free trial</span>
                      <span className="font-bold text-gray-900 text-lg">{tool.hasFreeTrial !== undefined ? (tool.hasFreeTrial ? 'Available' : 'No') : '—'}</span>
                    </div>
                    <div className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-sm font-semibold text-gray-500 mb-1 tracking-wider uppercase">Billing</span>
                      <span className="font-bold text-gray-900 text-lg">{tool.billingCycle || '—'}</span>
                    </div>
                  </div>
                  
                  {displayPricingDetails && (
                    <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100/50">
                      <h3 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wider">Detailed Pricing Info</h3>
                      <div 
                        className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(displayPricingDetails) }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Pros & Cons Section */}
              <Card className="mb-6 shadow-sm border-none">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <span>{t('prosAndConsOf')} {tool.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pros */}
                    <div className="bg-green-50/60 border border-green-100 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4 text-green-800 font-bold text-lg">
                        <ThumbsUp className="w-5 h-5 text-green-600" />
                        <span>{t('pros')}</span>
                      </div>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {prosList.map((proItem, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{proItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div className="bg-red-50/60 border border-red-100 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4 text-red-800 font-bold text-lg">
                        <ThumbsDown className="w-5 h-5 text-red-600" />
                        <span>{t('cons')}</span>
                      </div>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {consList.map((conItem, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span>{conItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="mb-6 shadow-sm border-none">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                    <span>{t('faqTitle')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {displayFaqs && displayFaqs.length > 0 ? (
                      displayFaqs.map((faq, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <h3 className="font-bold text-gray-900 mb-2 text-base">{faq.question}</h3>
                          <div 
                            className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(faq.answer) }}
                          />
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <h3 className="font-bold text-gray-900 mb-2 text-base">Is {tool.name} free to use?</h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {tool.name} is offered with a <strong>{localizedPricing}</strong> pricing structure. You can visit their official site to check available free tiers or trial options.
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <h3 className="font-bold text-gray-900 mb-2 text-base">What primary features does {tool.name} offer?</h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {tool.name} specializes in {primaryCategory.replace(/-/g, ' ')}, helping users streamline workflows and generate automated AI outputs efficiently.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Categories & Tags */}
              <Card className="shadow-sm border-none mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('classification')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{t('mainCategories')}</h3>
                      <div className="flex flex-wrap gap-3">
                        {tool.categories?.map((cat) => (
                          <Link key={cat} href={getLangUrl(`/tools?category=${cat}`)}>
                            <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white transition-all bg-blue-50">
                              {cat.replace('-', ' ')}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                    {tool.tags && tool.tags.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{t('relatedTopics')}</h3>
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

              {/* Reviews Section */}
              <ReviewsSection toolId={tool._id} initialRating={tool.rating} initialVotes={tool.votes} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 mb-6 shadow-lg border-none bg-white overflow-hidden">
                <div className="h-2 bg-blue-600 w-full"></div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-center">{t('readyToTry')} {tool.name}?</h3>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6 py-8 text-lg font-bold rounded-2xl shadow-blue-200 shadow-xl transition-all hover:scale-[1.02]"
                    onClick={() => window.open(tool.website, '_blank')}
                  >
                    {t('getStartedFree')}
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm py-2 border-b">
                      <span className="text-gray-500">Category</span>
                      <Link href={getLangUrl(`/categories/${primaryCategory}`)} className="font-bold text-blue-700 hover:underline capitalize">{primaryCategory.replace(/-/g, ' ')}</Link>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-b">
                      <span className="text-gray-500">{t('pricingModel')}</span>
                      <span className="font-bold text-blue-700">{localizedPricing}</span>
                    </div>
                    {tool.platforms && tool.platforms.length > 0 && (
                      <div className="flex flex-col text-sm py-2 border-b space-y-1">
                        <span className="text-gray-500">Supported Platforms</span>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {tool.platforms.map(p => (
                            <span key={p} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-medium">{p}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm py-2 border-b">
                      <span className="text-gray-500">{t('globalRating')}</span>
                      <span className="font-bold text-yellow-600">{tool.rating} / 5.0</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-b">
                      <span className="text-gray-500">Free Plan Available</span>
                      <span className="font-bold text-gray-700">{tool.pricing === 'Paid' ? 'No' : 'Yes'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2">
                      <span className="text-gray-500">{t('lastUpdated')}</span>
                      <span className="font-bold text-gray-700">
                        {new Date(tool.updatedAt || tool.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strong Similar Tools */}
              {strongSimilar.length > 0 && (
                <Card className="shadow-sm border-none mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                      Strong Similar Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {strongSimilar.map((similarTool) => {
                        const relDesc = similarTool.shortDescription || '';
                        return (
                          <Link key={similarTool.slug} href={getLangUrl(`/tools/${similarTool.slug}`)}>
                            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50/50 transition-all cursor-pointer border border-transparent hover:border-blue-100 group">
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                                {similarTool.logo ? (
                                  <img src={similarTool.logo} alt={similarTool.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">{similarTool.name.charAt(0)}</div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">{similarTool.name}</p>
                                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{relDesc}</p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Tools */}
              {relatedTools.length > 0 && (
                <Card className="shadow-sm border-none mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
                      Related Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {relatedTools.map((relatedTool) => {
                        const relDesc = relatedTool.shortDescription || '';
                        return (
                          <Link key={relatedTool.slug} href={getLangUrl(`/tools/${relatedTool.slug}`)}>
                            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50/50 transition-all cursor-pointer border border-transparent hover:border-gray-200 group">
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                                {relatedTool.logo ? (
                                  <img src={relatedTool.logo} alt={relatedTool.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">{relatedTool.name.charAt(0)}</div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors truncate">{relatedTool.name}</p>
                                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{relDesc}</p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
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

function ReviewsSection({ toolId, initialRating, initialVotes }) {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoaded = status !== 'loading';
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      setIsAdmin(data.isAdmin);
    } catch (e) {
      console.error('Error checking admin status:', e);
    }
  };

  const getEditToken = (reviewId) => {
    if (typeof window === 'undefined') return null;
    try {
      const tokens = JSON.parse(localStorage.getItem('review_tokens') || '{}');
      return tokens[reviewId] || null;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [toolId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?toolId=${toolId}`);
      if (!res.ok) { setReviews([]); return; }
      const data = await res.json();
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        console.warn('Reviews API returned non-array:', data);
        setReviews([]);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error('Please select a rating');
    if (!comment.trim()) return toast.error('Please enter a comment');
    
    setSubmitting(true);
    try {
      console.log('Submitting review for:', toolId);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId, rating, comment, userName })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success('Thank you for your review!');
        
        // Save edit token for anonymous edits
        if (data.editToken) {
          try {
            const tokens = JSON.parse(localStorage.getItem('review_tokens') || '{}');
            tokens[data.review._id] = data.editToken;
            localStorage.setItem('review_tokens', JSON.stringify(tokens));
          } catch (e) {
            console.warn('LocalStorage error:', e);
          }
        }
        
        setComment('');
        setUserName('');
        setRating(5);
        // Delay slightly to allow DB to propagate if needed
        setTimeout(() => fetchReviews(), 500);
      } else {
        console.error('Review submission failed:', data);
        toast.error(data.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Review submission exception:', error);
      toast.error('An error occurred while submitting your review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    const editToken = getEditToken(reviewId);
    try {
      const res = await fetch(`/api/reviews?id=${reviewId}${editToken ? `&editToken=${editToken}` : ''}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success('Review deleted');
        setDeleteConfirmId(null);
        fetchReviews();
      } else {
        toast.error(data.error || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('An error occurred while deleting');
    }
  };

  const startEditing = (review) => {
    setEditingId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditComment('');
    setEditRating(5);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const editToken = getEditToken(editingId);
    try {
      const res = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          reviewId: editingId, 
          rating: editRating, 
          comment: editComment,
          editToken: editToken
        })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success('Review updated');
        setEditingId(null);
        fetchReviews();
      } else {
        toast.error(data.error || 'Failed to update review');
      }
    } catch (error) {
      toast.error('An error occurred while updating');
    }
  };

  return (
    <Card className="shadow-sm border-none overflow-hidden">
      <CardHeader className="border-b bg-gray-50/50 flex flex-row flex-wrap items-center justify-between gap-4 py-5">
        <CardTitle className="text-2xl flex items-center gap-2">
          User Reviews & Ratings
        </CardTitle>
        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100 m-0">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="text-lg font-bold text-yellow-700">{initialRating}</span>
          <span className="text-gray-500 text-sm">({initialVotes} {t('reviews')})</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Submit Review */}
          <div className="md:col-span-2 p-6 border-b md:border-b-0 md:border-r bg-white">
            <h3 className="text-lg font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''} out of 5`}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded transition-transform active:scale-90"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <Star
                        aria-hidden="true"
                        className={`w-8 h-8 ${
                          star <= (hover || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="review-user-name" className="block text-sm font-medium text-gray-700 mb-1">Your Name (Optional)</label>
                <input
                  id="review-user-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>

              <div>
                <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What was your experience with this tool?"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-blue-100"
              >
                {submitting ? 'Submitting...' : 'Post Review'}
              </Button>
            </form>
          </div>

          {/* Review List */}
          <div className="md:col-span-3 bg-gray-50/30">
            <div className="p-6">
              {(() => {
                const safeReviews = Array.isArray(reviews) ? reviews : [];
                return (
                  <>
                    <h3 className="text-lg font-bold mb-4">Community Feedback ({safeReviews.length})</h3>
                    
                    {loading ? (
                      <div className="flex justify-center py-12" aria-live="polite" aria-busy="true">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" aria-label="Loading reviews"></div>
                      </div>
                    ) : safeReviews.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500">No reviews yet. Be the first to share your thoughts!</p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {safeReviews.map((rev, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                      {editingId === rev._id ? (
                        /* Edit Mode */
                        <form onSubmit={handleUpdate} className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''} out of 5`}
                                  onClick={() => setEditRating(star)}
                                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                >
                                  <Star aria-hidden="true" className={`w-4 h-4 ${star <= editRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                </button>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Button type="button" variant="ghost" size="sm" onClick={cancelEditing} aria-label="Cancel editing review" className="h-8 w-8 p-0">
                                <X className="w-4 h-4" aria-hidden="true" />
                              </Button>
                              <Button type="submit" variant="ghost" size="sm" aria-label="Save review changes" className="h-8 w-8 p-0 text-green-600">
                                <Check className="w-4 h-4" aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                          <textarea
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            aria-label="Edit your review comments"
                            className="w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"
                            rows={3}
                            required
                          />
                        </form>
                      ) : (
                        /* View Mode */
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              {rev.userPhoto ? (
                                <img src={rev.userPhoto} alt={rev.userName ? `${rev.userName}'s photo` : 'Reviewer photo'} className="w-8 h-8 rounded-full object-cover border border-gray-100 shadow-sm" />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase" aria-hidden="true">
                                  {rev.userName?.charAt(0) || 'A'}
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{rev.userName || 'Anonymous'}</p>
                                <p className="text-[10px] text-gray-500">
                                  {isClient ? new Date(rev.createdAt).toLocaleDateString() : ''}
                                  {rev.updatedAt && rev.updatedAt !== rev.createdAt && ' (edited)'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {deleteConfirmId === rev._id ? (
                                <div className="flex items-center gap-2 bg-red-50 px-2 py-1 rounded-lg">
                                  <span className="text-[10px] font-bold text-red-600">Delete?</span>
                                  <button type="button" onClick={() => handleDelete(rev._id)} aria-label="Confirm delete review" className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded">Yes</button>
                                  <button type="button" onClick={() => setDeleteConfirmId(null)} aria-label="Cancel delete review" className="text-[10px] text-gray-500 underline">No</button>
                                </div>
                              ) : (
                                <>
                                  <div className="flex gap-0.5" aria-label={`Rating: ${rev.rating} out of 5 stars`}>
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        aria-hidden="true"
                                        className={`w-3 h-3 ${i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                                      />
                                    ))}
                                  </div>
                                  
                                  {/* Ownership/Admin Actions */}
                                  {(isAdmin || (user && rev.userId === user.id) || getEditToken(rev._id)) && (
                                    <div className="flex gap-1">
                                      <button type="button" onClick={() => startEditing(rev)} aria-label="Edit review" className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                        <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
                                      </button>
                                      <button type="button" onClick={() => setDeleteConfirmId(rev._id)} aria-label="Delete review" className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                                      </button>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{rev.comment}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        })()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}