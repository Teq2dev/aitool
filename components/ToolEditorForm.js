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
  Plus, Zap, DollarSign, ThumbsUp, ThumbsDown, Tag, Layers, ArrowLeft, Shield, Trash2, Linkedin, HelpCircle, AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { isValidLinkedInUrl, normalizeLinkedInUrl } from '@/lib/countries';
import Link from 'next/link';

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
  mode = 'create', // 'create' | 'edit' | 'resubmit'
  initialData = null,
  initialUser = null,
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
    linkedinProfile: initialData?.linkedinProfile || initialUser?.linkedinProfile || '',
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
    // FAQs
    faqs: Array.isArray(initialData?.faqs) ? initialData.faqs : [],
    // Classification
    categories: Array.isArray(initialData?.categories) ? initialData.categories : (initialData?.category ? [initialData.category] : []),
    tags: Array.isArray(initialData?.tags) ? initialData.tags : [],
    // Admin only fields
    status: initialData?.status || 'pending',
    featured: initialData?.featured || false,
    trending: initialData?.trending || false,
    rejectionComment: initialData?.rejectionComment || initialData?.rejectionReason || '',
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

  // Update form if initialData or initialUser arrives after mount
  useEffect(() => {
    if (initialData || initialUser) {
      setFormData((prev) => ({
        ...prev,
        name: initialData?.name || prev.name || '',
        website: initialData?.website || prev.website || '',
        linkedinProfile: initialData?.linkedinProfile || initialUser?.linkedinProfile || prev.linkedinProfile || '',
        logo: initialData?.logo || prev.logo || '',
        shortDescription: initialData?.shortDescription || prev.shortDescription || '',
        fullDescription: initialData?.fullDescription || initialData?.description || prev.fullDescription || '',
        features: Array.isArray(initialData?.features) ? initialData.features : prev.features,
        pricing: initialData?.pricing || prev.pricing || 'Free',
        pricingModel: initialData?.pricingModel || initialData?.pricing || prev.pricingModel || 'Free',
        startingPrice: initialData?.startingPrice || prev.startingPrice || '',
        hasFreePlan: initialData?.hasFreePlan !== undefined ? initialData.hasFreePlan : prev.hasFreePlan,
        hasFreeTrial: initialData?.hasFreeTrial !== undefined ? initialData.hasFreeTrial : prev.hasFreeTrial,
        billingCycle: initialData?.billingCycle || prev.billingCycle || '',
        pricingDetails: initialData?.pricingDetails || prev.pricingDetails || '',
        pros: Array.isArray(initialData?.pros) ? initialData.pros : prev.pros,
        cons: Array.isArray(initialData?.cons) ? initialData.cons : prev.cons,
        faqs: Array.isArray(initialData?.faqs) ? initialData.faqs : prev.faqs,
        categories: Array.isArray(initialData?.categories) ? initialData.categories : (initialData?.category ? [initialData.category] : prev.categories),
        tags: Array.isArray(initialData?.tags) ? initialData.tags : prev.tags,
        status: initialData?.status || prev.status || 'pending',
        featured: initialData?.featured !== undefined ? initialData.featured : prev.featured,
        trending: initialData?.trending !== undefined ? initialData.trending : prev.trending,
        rejectionComment: initialData?.rejectionComment || initialData?.rejectionReason || prev.rejectionComment || '',
      }));
      if (initialData?.logo) {
        setLogoPreview(initialData.logo);
      }
    }
  }, [initialData, initialUser]);

  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2 MB limit');
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
    setErrors((prev) => ({ ...prev, logo: undefined }));
  };

  // Auto-fetch favicon from website URL
  const fetchFavicon = async () => {
    if (!formData.website) {
      alert('Please enter a website URL first');
      return;
    }
    setFetchingFavicon(true);
    try {
      const res = await fetch('/api/fetch-favicon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formData.website }),
      });
      const data = await res.json();
      if (data.faviconUrl) {
        setLogoPreview(data.faviconUrl);
        setFormData((p) => ({ ...p, logo: data.faviconUrl }));
        setLogoFile(null);
        setErrors((prev) => ({ ...prev, logo: undefined }));
      } else {
        alert('Could not fetch favicon automatically. Please upload an image instead.');
      }
    } catch {
      alert('Failed to fetch favicon');
    } finally {
      setFetchingFavicon(false);
    }
  };

  // Upload logo to Cloudinary
  const uploadLogo = async () => {
    if (!logoFile) return logoPreview;
    setUploading(true);
    const form = new FormData();
    form.append('file', logoFile);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed');
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

  // FAQ specific handlers
  const addFaq = () => {
    setFormData((p) => ({
      ...p,
      faqs: [...(p.faqs || []), { question: '', answer: '' }]
    }));
  };

  const removeFaq = (idx) => {
    setFormData((p) => ({
      ...p,
      faqs: (p.faqs || []).filter((_, i) => i !== idx)
    }));
  };

  const updateFaq = (idx, field, val) => {
    setFormData((p) => {
      const list = [...(p.faqs || [])];
      list[idx] = { ...list[idx], [field]: val };
      return { ...p, faqs: list };
    });
  };

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
    
    // LinkedIn Profile is required for create/submission
    if (mode === 'create' || mode === 'resubmit') {
      if (!formData.linkedinProfile?.trim()) {
        e.linkedinProfile = 'LinkedIn Profile URL is required for submitter verification';
      } else if (!isValidLinkedInUrl(formData.linkedinProfile)) {
        e.linkedinProfile = 'Please enter a valid LinkedIn URL (e.g. https://www.linkedin.com/in/your-profile)';
      }
    } else if (formData.linkedinProfile?.trim() && !isValidLinkedInUrl(formData.linkedinProfile)) {
      e.linkedinProfile = 'Please enter a valid LinkedIn URL (e.g. https://www.linkedin.com/in/your-profile)';
    }

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
        linkedinProfile: formData.linkedinProfile ? normalizeLinkedInUrl(formData.linkedinProfile) : '',
        logo: logoUrl,
        features: formData.features.filter(Boolean),
        pros: formData.pros.filter(Boolean),
        cons: formData.cons.filter(Boolean),
        tags: formData.tags.filter(Boolean),
        categories: formData.categories,
        faqs: Array.isArray(formData.faqs)
          ? formData.faqs.filter(f => f && (f.question?.trim() || f.answer?.trim())).map(f => ({
              question: f.question?.trim() || '',
              answer: f.answer?.trim() || ''
            }))
          : [],
      };

      if (mode === 'resubmit') {
        const targetId = toolId || initialData?._id;
        const res = await fetch(`/api/my-submissions/${targetId}/resubmit`, {
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
          } else {
            setTimeout(() => router.push(getLangUrl('/dashboard')), 1500);
          }
        } else {
          setServerError(data.error || data.message || 'Failed to resubmit tool. Please try again.');
          document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (mode === 'edit') {
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
      if (res.ok) {
        if (onDeleteSuccess) {
          onDeleteSuccess(targetId);
        } else {
          router.push(returnTo || '/admin');
        }
      } else {
        setServerError(data.error || 'Failed to delete tool.');
        document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      setServerError('Delete error: ' + err.message);
      document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setDeleting(false);
    }
  };

  // Success view for create/resubmit mode
  if (success && (mode === 'create' || mode === 'resubmit')) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8 shadow-xl border border-gray-100 rounded-2xl">
          <CardContent className="pt-4 space-y-4">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'resubmit' ? 'Tool Resubmitted for Review!' : 'Tool Submitted for Review!'}
            </h2>
            <p className="text-gray-600 text-sm">
              Thank you! Our editorial team will review your tool submission promptly. You can track the status in your Dashboard.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link href={getLangUrl('/dashboard')}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold cursor-pointer">
                  Go to My Dashboard
                </Button>
              </Link>
              <Link href={getLangUrl('/tools')}>
                <Button variant="outline" className="w-full cursor-pointer">
                  Browse AI Tools
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const rejectionNotice = initialData?.rejectionReason || initialData?.rejectionComment;

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto" id="form-top">

        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {mode === 'edit' && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Shield className="w-3 h-3 mr-1" /> Admin Edit
                </Badge>
              )}
              {mode === 'resubmit' && (
                <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 font-bold">
                  🔄 Resubmission Mode
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mode === 'edit' ? 'Edit Tool' : mode === 'resubmit' ? 'Edit & Resubmit Tool' : 'Submit Your AI Tool'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {mode === 'edit'
                ? 'Update all metadata, classification, pricing, FAQs, and moderation status.'
                : mode === 'resubmit'
                ? 'Address reviewer feedback, update details and FAQs, and resubmit for review.'
                : 'Share your AI tool with thousands of users. Fields marked * are required.'}
            </p>
          </div>

          {(mode === 'edit' || mode === 'resubmit') && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel || (() => router.push(mode === 'resubmit' ? '/dashboard' : (returnTo || '/admin')))}
              className="flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> {mode === 'resubmit' ? 'Back to Dashboard' : 'Cancel / Back to Admin'}
            </Button>
          )}
        </div>

        {/* Reviewer Rejection Callout in Resubmit Mode */}
        {rejectionNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 shadow-2xs space-y-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <strong className="text-sm font-bold text-red-800">Editorial Reviewer Feedback:</strong>
            </div>
            <p className="text-xs bg-white/80 p-3 rounded-xl border border-red-100 font-medium text-slate-800 mt-2">
              "{rejectionNotice}"
            </p>
            <p className="text-[11px] text-red-600 mt-1">
              Please update the fields below (such as adding FAQs or expanding the description) to address this feedback before resubmitting.
            </p>
          </div>
        )}

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
                      <SelectTrigger aria-label="Moderation status" className="bg-white">
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

              {/* LinkedIn Profile (Required for Submitter Verification) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="tool-linkedin" className="font-medium text-gray-700">
                    LinkedIn Profile {(mode === 'create' || mode === 'resubmit') && <span className="text-red-500">*</span>}
                  </Label>
                  <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    Required for submitter verification
                  </span>
                </div>
                <Input
                  id="tool-linkedin"
                  type="url"
                  value={formData.linkedinProfile}
                  onChange={setE('linkedinProfile')}
                  placeholder="https://www.linkedin.com/in/your-profile"
                  className={errors.linkedinProfile ? 'border-red-400' : ''}
                />
                {errors.linkedinProfile ? (
                  <p className="text-xs text-red-500 mt-1">{errors.linkedinProfile}</p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Please provide your LinkedIn profile so we can verify the submitter and review the submission.
                  </p>
                )}
              </div>

              {/* Logo */}
              <div>
                <Label className="mb-1.5 block">Logo <span className="text-red-500">*</span></Label>
                <Tabs value={logoOption} onValueChange={setLogoOption} className="mt-1">
                  <TabsList className="grid w-full grid-cols-2 mb-3">
                    <TabsTrigger value="upload">
                      <ImageIcon className="w-4 h-4 mr-2" aria-hidden="true" /> Upload Image
                    </TabsTrigger>
                    <TabsTrigger value="favicon">
                      <Globe className="w-4 h-4 mr-2" aria-hidden="true" /> Auto-fetch Favicon
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-2">
                    <div className="flex items-center gap-4 flex-wrap">
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer inline-flex items-center gap-2 rounded-lg text-sm font-medium border border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 transition-colors"
                      >
                        <Upload className="w-4 h-4" aria-hidden="true" /> Choose Image
                      </label>
                      <input id="logo-upload" type="file" accept="image/*" aria-label="Upload logo image file" className="hidden" onChange={handleLogoChange} />
                      {logoPreview && (
                        <div className="relative">
                          <img src={logoPreview} alt="Logo preview" className="w-16 h-16 rounded-xl border border-gray-200 object-cover" />
                          <button
                            type="button"
                            onClick={() => { setLogoPreview(''); setLogoFile(null); setFormData(p => ({ ...p, logo: '' })); }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow cursor-pointer"
                            aria-label="Remove logo"
                          >
                            <X className="w-3 h-3" aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Recommended: Square PNG/JPEG. Max 2 MB.</p>
                  </TabsContent>

                  <TabsContent value="favicon" className="space-y-2">
                    <div className="flex items-center gap-4 flex-wrap">
                      <Button
                        type="button"
                        onClick={fetchFavicon}
                        disabled={fetchingFavicon || !formData.website}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      >
                        {fetchingFavicon ? (
                          <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true" />Fetching…</>
                        ) : (
                          <><Globe className="w-4 h-4 mr-2" aria-hidden="true" />Fetch Favicon</>
                        )}
                      </Button>
                      {logoPreview && (
                        <div className="relative">
                          <img src={logoPreview} alt="Favicon preview" className="w-16 h-16 rounded-xl border border-gray-200 object-cover" />
                          <button
                            type="button"
                            onClick={() => { setLogoPreview(''); setFormData(p => ({ ...p, logo: '' })); }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow cursor-pointer"
                            aria-label="Remove favicon"
                          >
                            <X className="w-3 h-3" aria-hidden="true" />
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
                <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/150</p>
                {errors.shortDescription && <p className="text-xs text-red-500 mt-0.5">{errors.shortDescription}</p>}
              </div>

              {/* Full description */}
              <div>
                <Label htmlFor="full-desc" className="mb-1.5 block">Full Description <span className="text-gray-500 font-normal">(optional)</span></Label>
                <Textarea
                  id="full-desc"
                  value={formData.fullDescription}
                  onChange={setE('fullDescription')}
                  placeholder="Describe what the tool does, key capabilities, and use cases…"
                  rows={5}
                  maxLength={3000}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.fullDescription.length}/3000</p>
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
                      aria-label={`Feature ${i + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeFromList('features')(i)}
                      className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                      aria-label={`Remove feature ${i + 1}`}
                    >
                      <X className="w-4 h-4 text-red-500" aria-hidden="true" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addToList('features')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 cursor-pointer"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" /> Add Feature
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
                    <SelectTrigger id="pricing-model" aria-label="Pricing Model">
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
                  <Label htmlFor="starting-price" className="mb-1.5 block">Starting Price <span className="text-gray-500 font-normal">(optional)</span></Label>
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
                <Label htmlFor="pricing-details" className="mb-1.5 block">Detailed Pricing Info <span className="text-gray-500 font-normal">(optional)</span></Label>
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
              <CardDescription className="mt-1">Optional evaluation points for users.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <ThumbsUp className="w-4 h-4 text-green-600" aria-hidden="true" />
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
                        aria-label={`Pro ${i + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeFromList('pros')(i)}
                        className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                        aria-label={`Remove pro ${i + 1}`}
                      >
                        <X className="w-4 h-4 text-red-500" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addToList('pros')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" /> Add Pro
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <ThumbsDown className="w-4 h-4 text-red-500" aria-hidden="true" />
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
                        aria-label={`Con ${i + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeFromList('cons')(i)}
                        className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                        aria-label={`Remove con ${i + 1}`}
                      >
                        <X className="w-4 h-4 text-red-500" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addToList('cons')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" /> Add Con
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Frequently Asked Questions (FAQs) */}
          <Card className="shadow-sm border border-gray-200/80">
            <CardHeader className="pb-2">
              <SectionIcon icon={HelpCircle} label="Frequently Asked Questions (FAQs)" />
              <CardDescription className="mt-1">
                Add common questions and helpful answers about this tool (optional).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.faqs.map((faq, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">FAQ Question #{i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeFaq(i)}
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove FAQ"
                      aria-label={`Remove FAQ ${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700 mb-1 block">Question</Label>
                    <Input
                      value={faq.question || ''}
                      onChange={(e) => updateFaq(i, 'question', e.target.value)}
                      placeholder="e.g. What is this tool used for?"
                      className="text-xs bg-white"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700 mb-1 block">Answer</Label>
                    <Textarea
                      value={faq.answer || ''}
                      onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                      rows={2}
                      placeholder="e.g. It helps users generate content, automate workflows, and enhance productivity..."
                      className="text-xs bg-white rounded-xl"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addFaq}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" /> Add FAQ Question & Answer
              </button>
            </CardContent>
          </Card>

          {/* 6. Classification */}
          <Card className="shadow-sm border border-gray-200/80">
            <CardHeader className="pb-2">
              <SectionIcon icon={Layers} label="Classification" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Main Categories <span className="text-red-500">*</span></Label>
                  <span className="text-xs text-gray-500">{formData.categories.length}/5 selected</span>
                </div>
                <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1 py-1">
                  {categories.map((cat) => {
                    const selected = formData.categories.includes(cat.slug);
                    return (
                      <button
                        key={cat._id}
                        type="button"
                        onClick={() => toggleCategory(cat.slug)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                          selected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-700'
                        }`}
                        aria-pressed={selected}
                      >
                        {cat.icon && <span className="text-base leading-none" aria-hidden="true">{cat.icon}</span>}
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
                {errors.categories && <p className="text-xs text-red-500 mt-1">{errors.categories}</p>}
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Tag className="w-4 h-4 text-gray-500" aria-hidden="true" />
                  <Label>Tags <span className="text-gray-500 font-normal">(optional)</span></Label>
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
                        aria-label={`Tag ${i + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeFromList('tags')(i)}
                        className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                        aria-label={`Remove tag ${i + 1}`}
                      >
                        <X className="w-4 h-4 text-red-500" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addToList('tags')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" /> Add Tag
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
                className="bg-red-600 hover:bg-red-700 text-white py-6 px-6 text-base font-semibold rounded-xl flex items-center justify-center gap-2 order-last sm:order-first shadow-sm cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
                {deleting ? 'Deleting Tool…' : 'Delete Tool'}
              </Button>
            ) : <div />}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {(mode === 'edit' || mode === 'resubmit') && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={submitting || deleting}
                  onClick={onCancel || (() => router.push(mode === 'resubmit' ? '/dashboard' : (returnTo || '/admin')))}
                  className="py-6 px-8 text-base font-semibold rounded-xl hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                disabled={submitting || uploading || fetchingFavicon || deleting}
                className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-10 text-base font-semibold rounded-xl shadow-lg shadow-blue-100 transition-all hover:scale-[1.01] cursor-pointer"
              >
                {submitting || uploading ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Saving…</>
                ) : mode === 'edit' ? (
                  <>Save Changes</>
                ) : mode === 'resubmit' ? (
                  <>Resubmit Tool for Review</>
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
