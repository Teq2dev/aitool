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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, CheckCircle, X, Image as ImageIcon, Globe } from 'lucide-react';

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
  });
  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoOption, setLogoOption] = useState('upload');
  const [fetchingFavicon, setFetchingFavicon] = useState(false);
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
      setFormData({ ...formData, logo: '' });
    };
    reader.readAsDataURL(file);
  };

  const fetchFavicon = async () => {
    if (!formData.website) {
      alert('Please enter website URL first');
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
      if (data.success) {
        setLogoPreview(data.faviconUrl);
        setFormData({ ...formData, logo: data.faviconUrl });
        setLogoFile(null);
      } else {
        alert('Failed to fetch favicon');
      }
    } catch (error) {
      console.error('Favicon fetch error:', error);
      alert('Failed to fetch favicon');
    } finally {
      setFetchingFavicon(false);
    }
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
      
      if (logoOption === 'upload' && logoFile) {
        logoUrl = await uploadLogo();
        if (!logoUrl) {
          setSubmitting(false);
          return;
        }
      }

      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          logo: logoUrl,
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
                <Label>Logo * (Choose one option)</Label>
                <Tabs value={logoOption} onValueChange={setLogoOption} className="mt-2">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Upload Image
                    </TabsTrigger>
                    <TabsTrigger value="favicon">
                      <Globe className="w-4 h-4 mr-2" />
                      Auto-fetch Favicon
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="space-y-2">
                    <div className="flex items-center gap-4">
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
                      />
                      {logoPreview && logoOption === 'upload' && (
                        <img src={logoPreview} alt="Preview" className="w-16 h-16 border rounded" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Upload 150x150px image. Max 2MB</p>
                  </TabsContent>
                  
                  <TabsContent value="favicon" className="space-y-2">
                    <div className="flex items-center gap-4">
                      <Button 
                        type="button"
                        onClick={fetchFavicon}
                        disabled={fetchingFavicon || !formData.website}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {fetchingFavicon ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Fetching...
                          </>
                        ) : (
                          <>
                            <Globe className="w-4 h-4 mr-2" />
                            Fetch Favicon
                          </>
                        )}
                      </Button>
                      {logoPreview && logoOption === 'favicon' && (
                        <img src={logoPreview} alt="Preview" className="w-16 h-16 border rounded" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Automatically fetch logo from website</p>
                  </TabsContent>
                </Tabs>
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
                <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/100</p>
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

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Select up to 3 categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 20).map((cat) => (
                  <Badge
                    key={cat._id}
                    variant={formData.categories.includes(cat.slug) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      if (formData.categories.includes(cat.slug)) {
                        setFormData({ ...formData, categories: formData.categories.filter(c => c !== cat.slug) });
                      } else if (formData.categories.length < 3) {
                        setFormData({ ...formData, categories: [...formData.categories, cat.slug] });
                      }
                    }}
                  >
                    {cat.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={submitting || uploading || fetchingFavicon || !logoPreview} 
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
