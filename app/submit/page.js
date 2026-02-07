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

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    setLogoFile(file);
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let logoUrl = formData.logo;
      if (logoFile) {
        logoUrl = await uploadLogo();
        if (!logoUrl) {
          setSubmitting(false);
          return;
        }
      }

      const seoTitle = formData.seoTitle || `${formData.name} - Best AI Tool`;

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="max-w-md w-full">
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-2">Tool Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your tool has been submitted for review.
            </p>
            <Button onClick={() => router.push('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Submit Your AI Tool</h1>
          <p className="text-gray-600">Share your AI tool with thousands of users</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tool Name *</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., ChatGPT"
                />
              </div>

              <div>
                <Label>Website URL *</Label>
                <Input
                  type="url"
                  required
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label>Logo Upload * (150x150px)</Label>
                <div className="mt-2 flex items-center gap-4">
                  <label 
                    htmlFor="logo-upload" 
                    className="cursor-pointer inline-flex items-center gap-2 rounded-md text-sm font-medium border border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Choose Image
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                    required={!formData.logo}
                  />
                  {logoPreview && (
                    <img src={logoPreview} alt="Preview" className="w-16 h-16 border rounded" />
                  )}
                </div>
              </div>

              <div>
                <Label>Short Description *</Label>
                <Input
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="One-line description"
                  maxLength={100}
                />
              </div>

              <div>
                <Label>Full Description (Optional)</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description (optional)"
                  rows={5}
                />
              </div>

              <div>
                <Label>Pricing</Label>
                <Select value={formData.pricing} onValueChange={(value) => setFormData({ ...formData, pricing: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Freemium">Freemium</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={submitting || uploading} 
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
            >
              {submitting || uploading ? 'Submitting...' : 'Submit Tool'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
