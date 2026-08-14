'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Upload, CheckCircle, X, Image as ImageIcon, Globe,
  Plus, Zap, DollarSign, ThumbsUp, ThumbsDown, Tag, Layers
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// ─── Repeatable list input ────────────────────────────────────────────────────
function RepeatableList({ items = [], onAdd, onRemove, placeholder, maxLength = 120, label }) {
  const [input, setInput] = useState('');
  
  const handleAdd = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const val = input.trim();
    if (!val || items.includes(val)) return;
    onAdd(val);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd(e);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          className="flex-1"
          aria-label={label}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Add ${label}`}
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-sm px-3 py-1 rounded-full border border-blue-100"
            >
              {item}
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); onRemove(i); }}
                className="text-blue-400 hover:text-blue-700 transition-colors focus:outline-none"
                aria-label={`Remove ${item}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Toggle pill (Yes / No) ───────────────────────────────────────────────────
function YesNoPill({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            value === v
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
          }`}
        >
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionIcon({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 text-blue-600">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <span className="font-semibold text-gray-900 text-base">{label}</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SubmitToolPage() {
  const { getLangUrl } = useLanguage();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    website: '',
    logo: '',
    shortDescription: '',
    fullDescription: '',
    // Features
    features: [],
    // Pricing
    pricing: 'Free',
    pricingModel: '',
    startingPrice: '',
    hasFreePlan: null,
    hasFreeTrial: null,
    billingCycle: '',
    pricingDetails: '',
    // Pros & Cons
    pros: [],
    cons: [],
    // Classification
    categories: [],
    tags: [],
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoOption, setLogoOption] = useState('upload');
  const [fetchingFavicon, setFetchingFavicon] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  // ── Logo handlers ───────────────────────────────────────────────────────────
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please upload an image file'); return; }
    if (file.size > 2 * 1024 * 1024) { alert('Image size must be under 2 MB'); return; }
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => { setLogoPreview(reader.result); setFormData((p) => ({ ...p, logo: '' })); };
    reader.readAsDataURL(file);
  };

  const fetchFavicon = async () => {
    if (!formData.website) { alert('Enter the website URL first'); return; }
    setFetchingFavicon(true);
    try {
      const res = await fetch('/api/fetch-favicon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formData.website }),
      });
      const data = await res.json();
      if (data.success) {
        setLogoPreview(data.faviconUrl);
        setFormData((p) => ({ ...p, logo: data.faviconUrl }));
        setLogoFile(null);
      } else {
        alert('Failed to fetch favicon. Try uploading an image instead.');
      }
    } catch {
      alert('Failed to fetch favicon.');
    } finally {
      setFetchingFavicon(false);
    }
  };

  const uploadLogo = async () => {
    if (!logoFile) return null;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', logoFile);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.url;
    } catch {
      alert('Failed to upload logo');
      return null;
    } finally {
      setUploading(false);
    }
  };

  // ── Field updaters ──────────────────────────────────────────────────────────
  const set = (key) => (value) => setFormData((p) => ({ ...p, [key]: value }));
  const setE = (key) => (e) => setFormData((p) => ({ ...p, [key]: e.target.value }));

  const addToList = (key) => (val) => setFormData((p) => ({ ...p, [key]: [...(p[key] || []), val] }));
  const removeFromList = (key) => (idx) =>
    setFormData((p) => ({ ...p, [key]: (p[key] || []).filter((_, i) => i !== idx) }));

  const toggleCategory = (slug) => {
    setFormData((p) => {
      if (p.categories.includes(slug)) return { ...p, categories: p.categories.filter((c) => c !== slug) };
      if (p.categories.length >= 5) return p; // max 5
      return { ...p, categories: [...p.categories, slug] };
    });
  };

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Tool name is required';
    if (!formData.website.trim()) e.website = 'Website URL is required';
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) e.website = 'Must be a valid URL (https://...)';
    if (!formData.shortDescription.trim()) e.shortDescription = 'Short description is required';
    if (!logoPreview) e.logo = 'A logo is required — upload an image or fetch the favicon';
    if (formData.categories.length === 0) e.categories = 'Select at least one category';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setSubmitting(true);
    try {
      let logoUrl = formData.logo;
      if (logoOption === 'upload' && logoFile) {
        logoUrl = await uploadLogo();
        if (!logoUrl) { setSubmitting(false); return; }
      }

      const payload = {
        ...formData,
        logo: logoUrl,
        // Ensure arrays are clean
        features: formData.features.filter(Boolean),
        pros: formData.pros.filter(Boolean),
        cons: formData.cons.filter(Boolean),
        tags: formData.tags.filter(Boolean),
        categories: formData.categories,
      };

      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push(getLangUrl('/dashboard')), 2500);
      } else if (res.status === 409) {
        alert(`This tool already exists: "${data.existingTool?.name || 'Unknown'}". Status: ${data.existingTool?.status || 'unknown'}`);
      } else {
        alert('Failed to submit: ' + (data.error || data.message || 'Please try again.'));
      }
    } catch (err) {
      alert('An error occurred: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tool Submitted!</h2>
            <p className="text-gray-500 mb-6">Your tool has been submitted for review. We'll get back to you shortly.</p>
            <Button onClick={() => router.push(getLangUrl('/dashboard'))} className="bg-blue-600 hover:bg-blue-700 w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Submit Your AI Tool - Best AI Tools Free',
    description: 'Share your AI tool with thousands of users. Submit your tool to the Best AI Tools Free directory.',
    url: 'https://www.bestaitoolsfree.com/submit',
  };

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <>
      <head>
        <title>Submit Your AI Tool - Best AI Tools Free</title>
        <meta name="description" content="Share your AI tool with thousands of users. Submit your tool to the Best AI Tools Free directory." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </head>

      <div className="min-h-screen bg-gray-50 py-10" id="form-top">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Submit Your AI Tool</h1>
            <p className="text-gray-500 text-base">Share your AI tool with thousands of users. Fields marked <span className="text-red-500">*</span> are required.</p>
          </div>

          {/* Global error summary */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 space-y-1">
              <p className="font-semibold">Please fix the following before submitting:</p>
              {Object.values(errors).map((err, i) => <p key={i}>• {err}</p>)}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* ── 1. Basic Information ───────────────────────────────────────── */}
            <Card className="shadow-sm border border-gray-200/80">
              <CardHeader className="pb-2">
                <SectionIcon icon={Zap} label="Basic Information" />
              </CardHeader>
              <CardContent className="space-y-5">

                {/* Tool name */}
                <div>
                  <Label htmlFor="tool-name" className="mb-1.5 block">Tool Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="tool-name"
                    value={formData.name}
                    onChange={setE('name')}
                    placeholder="e.g. ChatGPT"
                    maxLength={80}
                    className={errors.name ? 'border-red-400' : ''}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="tool-website" className="mb-1.5 block">Website URL <span className="text-red-500">*</span></Label>
                  <Input
                    id="tool-website"
                    type="url"
                    value={formData.website}
                    onChange={setE('website')}
                    placeholder="https://example.com"
                    className={errors.website ? 'border-red-400' : ''}
                  />
                  {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website}</p>}
                </div>

                {/* Logo */}
                <div>
                  <Label className="mb-1.5 block">Logo <span className="text-red-500">*</span></Label>
                  <Tabs value={logoOption} onValueChange={setLogoOption} className="mt-1">
                    <TabsList className="grid w-full grid-cols-2 mb-3">
                      <TabsTrigger value="upload">
                        <ImageIcon className="w-4 h-4 mr-2" /> Upload Image
                      </TabsTrigger>
                      <TabsTrigger value="favicon">
                        <Globe className="w-4 h-4 mr-2" /> Auto-fetch Favicon
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="space-y-2">
                      <div className="flex items-center gap-4 flex-wrap">
                        <label
                          htmlFor="logo-upload"
                          className="cursor-pointer inline-flex items-center gap-2 rounded-lg text-sm font-medium border border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 transition-colors"
                        >
                          <Upload className="w-4 h-4" /> Choose Image
                        </label>
                        <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                        {logoPreview && logoOption === 'upload' && (
                          <div className="relative">
                            <img src={logoPreview} alt="Logo preview" className="w-16 h-16 rounded-xl border border-gray-200 object-cover" />
                            <button
                              type="button"
                              onClick={() => { setLogoPreview(''); setLogoFile(null); }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                              aria-label="Remove logo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">Recommended: 150×150 px square. Max 2 MB.</p>
                    </TabsContent>

                    <TabsContent value="favicon" className="space-y-2">
                      <div className="flex items-center gap-4 flex-wrap">
                        <Button
                          type="button"
                          onClick={fetchFavicon}
                          disabled={fetchingFavicon || !formData.website}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {fetchingFavicon ? (
                            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Fetching…</>
                          ) : (
                            <><Globe className="w-4 h-4 mr-2" />Fetch Favicon</>
                          )}
                        </Button>
                        {logoPreview && logoOption === 'favicon' && (
                          <div className="relative">
                            <img src={logoPreview} alt="Favicon preview" className="w-16 h-16 rounded-xl border border-gray-200 object-cover" />
                            <button
                              type="button"
                              onClick={() => setLogoPreview('')}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                              aria-label="Remove favicon"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">Automatically fetches the logo from the website URL above.</p>
                    </TabsContent>
                  </Tabs>
                  {errors.logo && <p className="text-xs text-red-500 mt-1">{errors.logo}</p>}
                </div>

                {/* Short description */}
                <div>
                  <Label htmlFor="short-desc" className="mb-1.5 block">Short Description <span className="text-red-500">*</span></Label>
                  <Input
                    id="short-desc"
                    value={formData.shortDescription}
                    onChange={setE('shortDescription')}
                    placeholder="One-line summary of what the tool does"
                    maxLength={150}
                    className={errors.shortDescription ? 'border-red-400' : ''}
                  />
                  <p className="text-xs text-gray-400 mt-1">{formData.shortDescription.length}/150</p>
                  {errors.shortDescription && <p className="text-xs text-red-500 mt-0.5">{errors.shortDescription}</p>}
                </div>

                {/* Full description */}
                <div>
                  <Label htmlFor="full-desc" className="mb-1.5 block">Full Description <span className="text-gray-400 font-normal">(optional)</span></Label>
                  <Textarea
                    id="full-desc"
                    value={formData.fullDescription}
                    onChange={setE('fullDescription')}
                    placeholder="Describe what the tool does, who it's for, and what makes it stand out…"
                    rows={5}
                    maxLength={3000}
                  />
                  <p className="text-xs text-gray-400 mt-1">{formData.fullDescription.length}/3000</p>
                </div>

              </CardContent>
            </Card>

            {/* ── 2. Key Benefits & Features ────────────────────────────────── */}
            <Card className="shadow-sm border border-gray-200/80">
              <CardHeader className="pb-2">
                <SectionIcon icon={Zap} label="Key Benefits & Features" />
                <CardDescription className="mt-1">List what users will gain from this tool. Press Enter or + to add each item.</CardDescription>
              </CardHeader>
              <CardContent>
                <RepeatableList
                  items={formData.features}
                  onAdd={addToList('features')}
                  onRemove={removeFromList('features')}
                  placeholder="e.g. Generate blog posts in seconds"
                  label="feature"
                />
              </CardContent>
            </Card>

            {/* ── 3. Pricing ────────────────────────────────────────────────── */}
            <Card className="shadow-sm border border-gray-200/80">
              <CardHeader className="pb-2">
                <SectionIcon icon={DollarSign} label="Pricing" />
              </CardHeader>
              <CardContent className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Pricing model */}
                  <div>
                    <Label className="mb-1.5 block">Pricing Model <span className="text-red-500">*</span></Label>
                    <Select value={formData.pricing} onValueChange={set('pricing')}>
                      <SelectTrigger id="pricing-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="Freemium">Freemium</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Subscription">Subscription</SelectItem>
                        <SelectItem value="Usage-based">Usage-based</SelectItem>
                        <SelectItem value="Contact for Pricing">Contact for Pricing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Starting price */}
                  <div>
                    <Label htmlFor="starting-price" className="mb-1.5 block">Starting Price <span className="text-gray-400 font-normal">(optional)</span></Label>
                    <Input
                      id="starting-price"
                      value={formData.startingPrice}
                      onChange={setE('startingPrice')}
                      placeholder="e.g. $9 / month or Free"
                      maxLength={40}
                    />
                  </div>

                  {/* Free plan */}
                  <div>
                    <Label className="mb-1.5 block">Free Plan Available</Label>
                    <YesNoPill value={formData.hasFreePlan} onChange={set('hasFreePlan')} />
                  </div>

                  {/* Free trial */}
                  <div>
                    <Label className="mb-1.5 block">Free Trial Available</Label>
                    <YesNoPill value={formData.hasFreeTrial} onChange={set('hasFreeTrial')} />
                  </div>

                  {/* Billing cycle */}
                  <div>
                    <Label className="mb-1.5 block">Billing <span className="text-gray-400 font-normal">(optional)</span></Label>
                    <Select value={formData.billingCycle} onValueChange={set('billingCycle')}>
                      <SelectTrigger id="billing-cycle">
                        <SelectValue placeholder="Select billing cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Yearly">Yearly</SelectItem>
                        <SelectItem value="Monthly & Yearly">Monthly & Yearly</SelectItem>
                        <SelectItem value="Usage-based">Usage-based</SelectItem>
                        <SelectItem value="One-time">One-time</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Detailed pricing info */}
                <div>
                  <Label htmlFor="pricing-details" className="mb-1.5 block">Detailed Pricing Info <span className="text-gray-400 font-normal">(optional)</span></Label>
                  <Textarea
                    id="pricing-details"
                    value={formData.pricingDetails}
                    onChange={setE('pricingDetails')}
                    placeholder="Describe plan tiers, limits, or anything useful for buyers…"
                    rows={3}
                    maxLength={800}
                  />
                </div>

              </CardContent>
            </Card>

            {/* ── 4. Pros & Cons ────────────────────────────────────────────── */}
            <Card className="shadow-sm border border-gray-200/80">
              <CardHeader className="pb-2">
                <SectionIcon icon={ThumbsUp} label="Pros & Cons" />
                <CardDescription className="mt-1">Optional but helps users evaluate the tool faster.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Pros */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    <Label>Pros</Label>
                  </div>
                  <RepeatableList
                    items={formData.pros}
                    onAdd={addToList('pros')}
                    onRemove={removeFromList('pros')}
                    placeholder="e.g. Very easy to use"
                    label="pro"
                  />
                </div>

                {/* Cons */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <ThumbsDown className="w-4 h-4 text-red-500" />
                    <Label>Cons</Label>
                  </div>
                  <RepeatableList
                    items={formData.cons}
                    onAdd={addToList('cons')}
                    onRemove={removeFromList('cons')}
                    placeholder="e.g. Limited free tier"
                    label="con"
                  />
                </div>

              </CardContent>
            </Card>

            {/* ── 5. Classification ─────────────────────────────────────────── */}
            <Card className="shadow-sm border border-gray-200/80">
              <CardHeader className="pb-2">
                <SectionIcon icon={Layers} label="Classification" />
              </CardHeader>
              <CardContent className="space-y-6">

                {/* Categories */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Main Category <span className="text-red-500">*</span></Label>
                    <span className="text-xs text-gray-400">{formData.categories.length}/5 selected</span>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1 py-1">
                    {categories.map((cat) => {
                      const selected = formData.categories.includes(cat.slug);
                      return (
                        <button
                          key={cat._id}
                          type="button"
                          onClick={() => toggleCategory(cat.slug)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                            selected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-700'
                          }`}
                          aria-pressed={selected}
                        >
                          {cat.icon && <span className="text-base leading-none">{cat.icon}</span>}
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                  {errors.categories && <p className="text-xs text-red-500 mt-1">{errors.categories}</p>}
                </div>

                {/* Tags */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <Label>Tags <span className="text-gray-400 font-normal">(optional)</span></Label>
                  </div>
                  <RepeatableList
                    items={formData.tags}
                    onAdd={addToList('tags')}
                    onRemove={removeFromList('tags')}
                    placeholder="e.g. writing, productivity, no-code"
                    label="tag"
                    maxLength={40}
                  />
                </div>

              </CardContent>
            </Card>

            {/* ── Submit button ──────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-3 pb-10">
              <Button
                type="submit"
                disabled={submitting || uploading || fetchingFavicon}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold rounded-xl shadow-lg shadow-blue-100 transition-all hover:scale-[1.01]"
              >
                {submitting || uploading ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Submitting…</>
                ) : (
                  <>Submit Tool for Review</>
                )}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
