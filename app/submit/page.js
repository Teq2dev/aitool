'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, X, Image as ImageIcon } from 'lucide-react';

export default function SubmitToolPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    shortDescription: '',
    description: '',
    logo: '',
    categories: [],
    tags: [],
    pricing: 'Free',
    features: [],
    // SEO fields
    seoTitle: '',
    seoKeywords: '',
    seoTags: [],
  });
  const [tagInput, setTagInput] = useState('');
  const [seoTagInput, setSeoTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/?signin=true');
    }
    fetchCategories();
  }, [isLoaded, isSignedIn]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    setLogoFile(file);
    
    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadLogo = async () => {
    if (!logoFile) return null;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', logoFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload logo');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleAddSeoTag = () => {
    if (seoTagInput.trim() && !formData.seoTags.includes(seoTagInput.trim())) {
      setFormData({ ...formData, seoTags: [...formData.seoTags, seoTagInput.trim()] });
      setSeoTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleRemoveSeoTag = (tag) => {
    setFormData({ ...formData, seoTags: formData.seoTags.filter((t) => t !== tag) });
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (feature) => {
    setFormData({ ...formData, features: formData.features.filter((f) => f !== feature) });
  };

  const handleCategoryToggle = (categorySlug) => {
    if (formData.categories.includes(categorySlug)) {
      setFormData({ ...formData, categories: formData.categories.filter((c) => c !== categorySlug) });
    } else {
      setFormData({ ...formData, categories: [...formData.categories, categorySlug] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Upload logo first
      let logoUrl = formData.logo;
      if (logoFile) {
        logoUrl = await uploadLogo();
        if (!logoUrl) {
          setSubmitting(false);
          return;
        }
      }

      // Auto-generate SEO title if not provided
      const seoTitle = formData.seoTitle || `${formData.name} - Best AI Tool for ${formData.categories[0] || 'AI Solutions'}`;

      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          logo: logoUrl,
          seoTitle,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        alert('Failed to submit tool. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting tool:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className=\"flex items-center justify-center min-h-screen\">
        <div className=\"text-center\">
          <div className=\"w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4\"></div>
          <p className=\"text-gray-600\">Loading...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className=\"flex items-center justify-center min-h-screen bg-gray-50\">
        <Card className=\"max-w-md w-full\">
          <CardContent className=\"p-12 text-center\">
            <CheckCircle className=\"w-16 h-16 text-green-500 mx-auto mb-4\" />
            <h2 className=\"text-2xl font-bold text-black mb-2\">Tool Submitted!</h2>
            <p className=\"text-gray-600 mb-6\">
              Your tool has been submitted for review. We'll notify you once it's approved.
            </p>
            <Button onClick={() => router.push('/dashboard')} className=\"bg-blue-600 hover:bg-blue-700\">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gray-50 py-8\">
      <div className=\"container mx-auto px-4 max-w-4xl\">
        <div className=\"mb-8\">
          <h1 className=\"text-4xl font-bold text-black mb-2\">Submit Your AI Tool</h1>
          <p className=\"text-gray-600\">Share your AI tool with thousands of users</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className=\"mb-6\">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell us about your AI tool</CardDescription>
            </CardHeader>
            <CardContent className=\"space-y-4\">
              <div>
                <Label htmlFor=\"name\">Tool Name *</Label>
                <Input
                  id=\"name\"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder=\"e.g., ChatGPT\"
                />
              </div>

              <div>
                <Label htmlFor=\"website\">Website URL *</Label>
                <Input
                  id=\"website\"
                  type=\"url\"
                  required
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder=\"https://example.com\"
                />
              </div>

              <div>
                <Label htmlFor=\"logo\">Logo Upload * (150x150px recommended)</Label>
                <div className=\"mt-2\">
                  <div className=\"flex items-center gap-4\">
                    <label 
                      htmlFor=\"logo-upload\" 
                      className=\"cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2\"
                    >
                      <ImageIcon className=\"w-4 h-4\" />
                      Choose Image
                    </label>
                    <input
                      id=\"logo-upload\"
                      type=\"file\"
                      accept=\"image/*\"
                      className=\"hidden\"
                      onChange={handleLogoChange}
                      required={!formData.logo}
                    />
                    {logoPreview && (
                      <div className=\"relative w-16 h-16 border-2 border-gray-200 rounded-lg overflow-hidden\">
                        <img src={logoPreview} alt=\"Logo preview\" className=\"w-full h-full object-cover\" />
                      </div>
                    )}
                  </div>
                  <p className=\"text-xs text-gray-500 mt-1\">Upload a square image (150x150px recommended). Max 2MB.</p>
                </div>
              </div>

              <div>
                <Label htmlFor=\"shortDescription\">Short Description *</Label>
                <Input
                  id=\"shortDescription\"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder=\"One-line description\"
                  maxLength={100}
                />
                <p className=\"text-xs text-gray-500 mt-1\">{formData.shortDescription.length}/100 characters</p>
              </div>

              <div>
                <Label htmlFor=\"description\">Full Description (Optional)</Label>
                <Textarea
                  id=\"description\"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder=\"Detailed description of your tool (optional)\"
                  rows={5}
                />
              </div>

              <div>
                <Label htmlFor=\"pricing\">Pricing Model *</Label>
                <Select value={formData.pricing} onValueChange={(value) => setFormData({ ...formData, pricing: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=\"Free\">Free</SelectItem>
                    <SelectItem value=\"Freemium\">Freemium</SelectItem>
                    <SelectItem value=\"Paid\">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* SEO Section */}
          <Card className=\"mb-6\">
            <CardHeader>
              <CardTitle>SEO Optimization</CardTitle>
              <CardDescription>Improve discoverability of your tool</CardDescription>
            </CardHeader>
            <CardContent className=\"space-y-4\">
              <div>
                <Label htmlFor=\"seoTitle\">SEO Title (Optional)</Label>
                <Input
                  id=\"seoTitle\"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder=\"Auto-generated if left empty\"
                  maxLength={60}
                />
                <p className=\"text-xs text-gray-500 mt-1\">Recommended: 50-60 characters</p>
              </div>

              <div>
                <Label htmlFor=\"seoKeywords\">SEO Keywords</Label>
                <Input
                  id=\"seoKeywords\"
                  value={formData.seoKeywords}
                  onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                  placeholder=\"ai tools, chatbot, automation\"
                />
              </div>

              <div>
                <Label>SEO Tags</Label>
                <div className=\"flex gap-2 mb-3\">
                  <Input
                    value={seoTagInput}
                    onChange={(e) => setSeoTagInput(e.target.value)}
                    placeholder=\"Add SEO tag\"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSeoTag())}
                  />
                  <Button type=\"button\" onClick={handleAddSeoTag}>
                    Add
                  </Button>
                </div>
                <div className=\"flex flex-wrap gap-2\">
                  {formData.seoTags.map((tag) => (
                    <Badge key={tag} variant=\"secondary\" className=\"pr-1\">
                      {tag}
                      <X className=\"w-3 h-3 ml-2 cursor-pointer\" onClick={() => handleRemoveSeoTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className=\"mb-6\">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Select relevant categories (max 3)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className=\"flex flex-wrap gap-2\">
                {categories.slice(0, 20).map((cat) => (
                  <Badge
                    key={cat._id}
                    variant={formData.categories.includes(cat.slug) ? 'default' : 'outline'}
                    className=\"cursor-pointer\"
                    onClick={() => formData.categories.length < 3 || formData.categories.includes(cat.slug) ? handleCategoryToggle(cat.slug) : null}
                  >
                    {cat.name}
                  </Badge>
                ))}
              </div>
              {formData.categories.length >= 3 && (
                <p className=\"text-sm text-gray-500 mt-2\">Maximum 3 categories selected</p>
              )}
            </CardContent>
          </Card>

          <Card className=\"mb-6\">
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>List key features of your tool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className=\"flex gap-2 mb-3\">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder=\"Add a feature\"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                />
                <Button type=\"button\" onClick={handleAddFeature}>
                  Add
                </Button>
              </div>
              <div className=\"flex flex-wrap gap-2\">
                {formData.features.map((feature) => (
                  <Badge key={feature} variant=\"secondary\" className=\"pr-1\">
                    {feature}
                    <X className=\"w-3 h-3 ml-2 cursor-pointer\" onClick={() => handleRemoveFeature(feature)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className=\"mb-6\">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add relevant tags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className=\"flex gap-2 mb-3\">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder=\"Add a tag\"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <Button type=\"button\" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              <div className=\"flex flex-wrap gap-2\">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant=\"secondary\" className=\"pr-1\">
                    {tag}
                    <X className=\"w-3 h-3 ml-2 cursor-pointer\" onClick={() => handleRemoveTag(tag)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className=\"flex gap-4\">
            <Button 
              type=\"submit\" 
              disabled={submitting || uploading} 
              className=\"bg-blue-600 hover:bg-blue-700 text-white flex-1\"
            >
              {submitting || uploading ? (
                <>
                  <div className=\"w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2\"></div>
                  {uploading ? 'Uploading...' : 'Submitting...'}
                </>
              ) : (
                <>
                  <Upload className=\"w-4 h-4 mr-2\" />
                  Submit Tool
                </>
              )}
            </Button>
            <Button type=\"button\" variant=\"outline\" onClick={() => router.push('/')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
