'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Plus, Zap, DollarSign, ThumbsUp, ThumbsDown, Tag, Layers, ArrowLeft, Shield, Trash2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Toggle pill (Yes / No)
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

// Section heading
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

export default function ToolEditorForm({
  mode = 'create', // 'create' | 'edit'
  initialData = null,
  toolId = null,
  returnTo = '/admin',
  onSuccess = null,
  onCancel = null,
  onDeleteSuccess = null,
}) {
  const { getLangUrl } = useLanguage();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    // Basic Information
    name: initialData?.name || '',
    website: initialData?.website || '',
    logo: initialData?.logo || '',
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || initialData?.description || '',
    // Features
    features: Array.isArray(initialData?.features) ? initialData.features : [],
    // Pricing
    pricing: initialData?.pricing || 'Free',
    pricingModel: initialData?.pricingModel || initialData?.pricing || 'Free',
    startingPrice: initialData?.startingPrice || '',
    hasFreePlan: initialData?.hasFreePlan !== undefined ? initialData.hasFreePlan : null,
    hasFreeTrial: initialData?.hasFreeTrial !== undefined ? initialData.hasFreeTrial : null,
    billingCycle: initialData?.billingCycle || '',
    pricingDetails: initialData?.pricingDetails || '',
    // Pros & Cons
    pros: Array.isArray(initialData?.pros) ? initialData.pros : [],
    cons: Array.isArray(initialData?.cons) ? initialData.cons : [],
    // Classification
    categories: Array.isArray(initialData?.categories) ? initialData.categories : [],
    tags: Array.isArray(initialData?.tags) ? initialData.tags : [],
    // Admin only fields
    status: initialData?.status || 'pending',
    featured: initialData?.featured || false,
    trending: initialData?.trending || false,
    rejectionComment: initialData?.rejectionComment || '',
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(initialData?.logo || '');
  const [logoOption, setLogoOption] = useState('upload');
  const [fetchingFavicon, setFetchingFavicon] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Update form if initialData arrives after mount
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        website: initialData.website || '',
        logo: initialData.logo || '',
        shortDescription: initialData.shortDescription || '',
        fullDescription: initialData.fullDescription || initialData.description || '',
        features: Array.isArray(initialData.features) ? initialData.features : [],
        pricing: initialData.pricing || 'Free',
        pricingModel: initialData.pricingModel || initialData.pricing || 'Free',
        startingPrice: initialData.startingPrice || '',
        hasFreePlan: initialData.hasFreePlan !== undefined ? initialData.hasFreePlan : null,
        hasFreeTrial: initialData.hasFreeTrial !== undefined ? initialData.hasFreeTrial : null,
        billingCycle: initialData.billingCycle || '',
        pricingDetails: initialData.pricingDetails || '',
        pros: Array.isArray(initialData.pros) ? initialData.pros : [],
        cons: Array.isArray(initialData.cons) ? initialData.cons : [],
        categories: Array.isArray(initialData.categories) ? initialData.categories : [],
        tags: Array.isArray(initialData.tags) ? initialData.tags : [],
        status: initialData.status || 'pending',
        featured: initialData.featured || false,
        trending: initialData.trending || false,
        rejectionComment: initialData.rejectionComment || '',
      });
      if (initialData.logo) {
        setLogoPreview(initialData.logo);
      }
    }
  }, [initialData]);

  // Logo handlers
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please upload an image file'); return; }
    if (file.size > 2 * 1024 * 1024) { alert('Image size must be under 2 MB'); return; }
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
      setFormData((p) => ({ ...p, logo: '' }));
    };
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
      if (data.success && data.faviconUrl) {
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

  // Field updaters
  const set = (key) => (value) => setFormData((p) => ({ ...p, [key]: value }));
  const setE = (key) => (e) => setFormData((p) => ({ ...p, [key]: e.target.value }));

  const addToList = (key) => () => setFormData((p) => ({ ...p, [key]: [...(p[key] || []), ''] }));
  const removeFromList = (key) => (idx) =>
    setFormData((p) => ({ ...p, [key]: (p[key] || []).filter((_, i) => i !== idx) }));
  const updateListItem = (key) => (idx, val) =>
    setFormData((p) => {
      const arr = [...(p[key] || [])];
      arr[idx] = val;
      return { ...p, [key]: arr };
    });

  const toggleCategory = (slug) => {
    setFormData((p) => {
      if (p.categories.includes(slug)) return { ...p, categories: p.categories.filter((c) => c !== slug) };
      if (p.categories.length >= 5) return p;
      return { ...p, categories: [...p.categories, slug] };
    });
  };

  // Validation
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Tool name is required';
    if (!formData.website.trim()) e.website = 'Website URL is required';
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) e.website = 'Must be a valid URL (https://...)';
    if (!formData.shortDescription.trim()) e.shortDescription = 'Short description is required';
    if (!logoPreview && !formData.logo) e.logo = 'A logo is required — upload an image or fetch the favicon';
    if (formData.categories.length === 0) e.categories = 'Select at least one category';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Submit / Save
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) {
      document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setSubmitting(true);
    try {
      let logoUrl = formData.logo || logoPreview;
      if (logoOption === 'upload' && logoFile) {
        const uploaded = await uploadLogo();
        if (!uploaded) { setSubmitting(false); return; }
        logoUrl = uploaded;
      }

      const payload = {
        ...formData,
        logo: logoUrl,
        features: formData.features.filter(Boolean),
        pros: formData.pros.filter(Boolean),
        cons: formData.cons.filter(Boolean),
        tags: formData.tags.filter(Boolean),
        categories: formData.categories,
      };

      if (mode === 'edit') {
        const targetId = toolId || initialData?._id;
        const res = await fetch(`/api/admin/tools/${targetId}/edit`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setSuccess(true);
          if (onSuccess) {
            onSuccess(data);
          } else if (returnTo) {
            router.push(returnTo);
          } else {
            router.push('/admin');
          }
        } else {
          setServerError(data.error || data.message || 'Failed to save changes. Please try again.');
          document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Create mode
        const res = await fetch('/api/tools', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setSuccess(true);
          if (onSuccess) {
            onSuccess(data);
          } else {
            setTimeout(() => router.push(getLangUrl('/dashboard')), 2000);
          }
        } else if (res.status === 409) {
          setServerError(`This tool already exists: "${data.existingTool?.name || 'Unknown'}". Status: ${data.existingTool?.status || 'unknown'}`);
          document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          setServerError(data.error || data.message || 'Failed to submit tool. Please try again.');
          document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (err) {
      setServerError('An error occurred: ' + err.message);
      document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete tool (Admin mode)
  const [deleting, setDeleting] = useState(false);
  const handleDeleteTool = async () => {
    const toolName = formData.name || initialData?.name || 'this tool';
    if (!confirm(`Are you sure you want to permanently delete "${toolName}"? This action cannot be undone.`)) {
      return;
    }
    setDeleting(true);
    setServerError('');
    try {
      const targetId = toolId || initialData?._id;
      const res = await fetch(`/api/admin/tools/${targetId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Failed to delete tool (HTTP ${res.status})`);
      }
      if (onDeleteSuccess) {
        onDeleteSuccess(data);
      } else if (onCancel) {
        onCancel();
      } else if (returnTo) {
        router.push(returnTo);
      } else {
        router.push('/admin');
      }
    } catch (err) {
      console.error('Delete error in ToolEditorForm:', err);
      setServerError(err.message || 'Failed to delete tool.');
      alert(`Error deleting tool: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  if (success && mode === 'create') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full mx-4 shadow-md">
          <CardContent className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tool Submitted!</h2>
            <p className="text-gray-500 mb-6">Your tool has been submitted for review. We will notify you once approved.</p>
            <Button onClick={() => router.push(getLangUrl('/dashboard'))} className="bg-blue-600 hover:bg-blue-700 w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8" id="form-top">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {mode === 'edit' && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Shield className="w-3 h-3 mr-1" /> Admin Edit
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mode === 'edit' ? 'Edit Tool' : 'Submit Your AI Tool'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {mode === 'edit'
                ? 'Update all metadata, classification, pricing, and moderation status.'
                : 'Share your AI tool with thousands of users. Fields marked * are required.'}
            </p>
          </div>

          {mode === 'edit' && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel || (() => router.push(returnTo || '/admin'))}
              className="flex items-center gap-1.5 self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Cancel / Back to Admin
            </Button>
          )}
        </div>

        {/* Success Alert for Edit */}
        {success && mode === 'edit' && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-sm">Tool updated successfully! Redirecting back to admin...</span>
            </div>
            <Button size="sm" onClick={() => router.push(returnTo || '/admin')} className="bg-green-700 hover:bg-green-800">
              Back to Tools
            </Button>
          </div>
        )}

        {/* Server Error Alert */}
        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 space-y-1">
            <p className="font-semibold">Failed to save:</p>
            <p>{serverError}</p>
          </div>
        )}

        {/* Validation Errors Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 space-y-1">
            <p className="font-semibold">Please correct the following fields:</p>
            {Object.values(errors).map((err, i) => <p key={i}>• {err}</p>)}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Admin Moderation Controls (Only in Edit mode) */}
          {mode === 'edit' && (
            <Card className="shadow-sm border-2 border-blue-200 bg-blue-50/20">
              <CardHeader className="pb-2">
                <SectionIcon icon={Shield} label="Admin Controls & Moderation" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label className="mb-1.5 block font-semibold text-gray-700">Status</Label>
                    <Select value={formData.status} onValueChange={set('status')}>
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-1.5 block font-semibold text-gray-700">Featured in Hero</Label>
                    <YesNoPill value={formData.featured} onChange={set('featured')} />
                  </div>

                  <div>
                    <Label className="mb-1.5 block font-semibold text-gray-700">Trending</Label>
                    <YesNoPill value={formData.trending} onChange={set('trending')} />
                  </div>
                </div>

                {formData.status === 'rejected' && (
                  <div>
                    <Label htmlFor="rejection-comment" className="mb-1.5 block font-semibold text-red-700">
                      Rejection Reason (Visible to user)
                    </Label>
                    <Input
                      id="rejection-comment"
                      value={formData.rejectionComment}
                      onChange={setE('rejectionComment')}
                      placeholder="e.g. Broken website link or incomplete description"
                      className="bg-white border-red-300"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* 1. Basic Information */}
          <Card className="shadow-sm border border-gray-200/80">
            <CardHeader className="pb-2">
              <SectionIcon icon={Zap} label="Basic Information" />
            </CardHeader>
            <CardContent className="space-y-5">

              {/* Name */}
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
                      {logoPreview && (
                        <div className="relative">
                          <img src={logoPreview} alt="Logo preview" className="w-16 h-16 rounded-xl border border-gray-200 object-cover" />
                          <button
                            type="button"
                            onClick={() => { setLogoPreview(''); setLogoFile(null); setFormData(p => ({ ...p, logo: '' })); }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow"
                            aria-label="Remove logo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">Recommended: Square PNG/JPEG. Max 2 MB.</p>
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
                      {logoPreview && (
                        <div className="relative">
                          <img src={logoPreview} alt="Favicon preview" className="w-16 h-16 rounded-xl border border-gray-200 object-cover" />
                          <button
                            type="button"
                            onClick={() => { setLogoPreview(''); setFormData(p => ({ ...p, logo: '' })); }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow"
                            aria-label="Remove favicon"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
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
                  placeholder="Describe what the tool does, key capabilities, and use cases…"
                  rows={5}
                  maxLength={3000}
                />
                <p className="text-xs text-gray-400 mt-1">{formData.fullDescription.length}/3000</p>
              </div>

            </CardContent>
          </Card>

          {/* 2. Key Benefits & Features */}
          <Card className="shadow-sm border border-gray-200/80">
            <CardHeader className="pb-2">
              <SectionIcon icon={Zap} label="Key Benefits & Features" />
              <CardDescription className="mt-1">List key features or benefits of this tool.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {formData.features.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateListItem('features')(i, e.target.value)}
                      className="flex-1"
                      placeholder={`Feature ${i + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeFromList('features')(i)}
                      className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                      aria-label="Remove feature"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addToList('features')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                >
                  <Plus className="w-4 h-4" /> Add Feature
                </button>
              </div>
            </CardContent>
          </Card>

          {/* 3. Pricing */}
          <Card className="shadow-sm border border-gray-200/80">
            <CardHeader className="pb-2">
              <SectionIcon icon={DollarSign} label="Pricing" />
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label className="mb-1.5 block">Pricing Model <span className="text-red-500">*</span></Label>
                  <Select value={formData.pricing} onValueChange={(val) => { set('pricing')(val); set('pricingModel')(val); }}>
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

                <div>
                  <Label className="mb-1.5 block">Free Plan Available</Label>
                  <YesNoPill value={formData.hasFreePlan} onChange={set('hasFreePlan')} />
                </div>

                <div>
                  <Label className="mb-1.5 block">Free Trial Available</Label>
                  <YesNoPill value={formData.hasFreeTrial} onChange={set('hasFreeTrial')} />
                </div>

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

              <div>
                <Label htmlFor="pricing-details" className="mb-1.5 block">Detailed Pricing Info <span className="text-gray-400 font-normal">(optional)</span></Label>
                <Textarea
                  id="pricing-details"
                  value={formData.pricingDetails}
                  onChange={setE('pricingDetails')}
                  placeholder="Describe tier limits, usage limits, or enterprise options…"
                  rows={3}
                  maxLength={800}
                />
              </div>
            </CardContent>
          </Card>

          {/* 4. Pros & Cons */}
          <Card className="shadow-sm border border-gray-200/80">
            <CardHeader className="pb-2">
              <SectionIcon icon={ThumbsUp} label="Pros & Cons" />
              <CardDescription className="mt-1">Optional evaluation points for buyers.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <ThumbsUp className="w-4 h-4 text-green-600" />
                  <Label>Pros</Label>
                </div>
                <div className="space-y-2">
                  {formData.pros.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateListItem('pros')(i, e.target.value)}
                        className="flex-1"
                        placeholder={`Pro ${i + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeFromList('pros')(i)}
                        className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addToList('pros')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                  >
                    <Plus className="w-4 h-4" /> Add Pro
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <ThumbsDown className="w-4 h-4 text-red-500" />
                  <Label>Cons</Label>
                </div>
                <div className="space-y-2">
                  {formData.cons.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateListItem('cons')(i, e.target.value)}
                        className="flex-1"
                        placeholder={`Con ${i + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeFromList('cons')(i)}
                        className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addToList('cons')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                  >
                    <Plus className="w-4 h-4" /> Add Con
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Classification */}
          <Card className="shadow-sm border border-gray-200/80">
            <CardHeader className="pb-2">
              <SectionIcon icon={Layers} label="Classification" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Main Categories <span className="text-red-500">*</span></Label>
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

              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <Label>Tags <span className="text-gray-400 font-normal">(optional)</span></Label>
                </div>
                <div className="space-y-2">
                  {formData.tags.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateListItem('tags')(i, e.target.value)}
                        className="flex-1"
                        maxLength={40}
                        placeholder={`Tag ${i + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeFromList('tags')(i)}
                        className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addToList('tags')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                  >
                    <Plus className="w-4 h-4" /> Add Tag
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-12 pt-2">
            {mode === 'edit' ? (
              <Button
                type="button"
                variant="destructive"
                disabled={submitting || deleting}
                onClick={handleDeleteTool}
                className="bg-red-600 hover:bg-red-700 text-white py-6 px-6 text-base font-semibold rounded-xl flex items-center justify-center gap-2 order-last sm:order-first shadow-sm"
              >
                <Trash2 className="w-5 h-5" />
                {deleting ? 'Deleting Tool…' : 'Delete Tool'}
              </Button>
            ) : <div />}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {mode === 'edit' && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={submitting || deleting}
                  onClick={onCancel || (() => router.push(returnTo || '/admin'))}
                  className="py-6 px-8 text-base font-semibold rounded-xl hover:bg-gray-100"
                >
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                disabled={submitting || uploading || fetchingFavicon || deleting}
                className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-10 text-base font-semibold rounded-xl shadow-lg shadow-blue-100 transition-all hover:scale-[1.01]"
              >
                {submitting || uploading ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Saving…</>
                ) : mode === 'edit' ? (
                  <>Save Changes</>
                ) : (
                  <>Submit Tool for Review</>
                )}
              </Button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
