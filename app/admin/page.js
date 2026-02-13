'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Eye, Star, Trash2, Users, Shield, ShieldOff, Upload, FileSpreadsheet, Download, Edit, X, ShoppingBag, History, Undo2, Plus, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [tools, setTools] = useState([]);
  const [users, setUsers] = useState([]);
  const [bulkLogs, setBulkLogs] = useState([]);
  const [shopProducts, setShopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tools');
  const [bulkUploadStatus, setBulkUploadStatus] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const shopImageInputRef = useRef(null);
  
  // Modal states
  const [rejectModal, setRejectModal] = useState({ open: false, toolId: null, toolName: '' });
  const [rejectComment, setRejectComment] = useState('');
  const [editModal, setEditModal] = useState({ open: false, tool: null });
  const [editForm, setEditForm] = useState({});
  const [shopModal, setShopModal] = useState({ open: false, product: null });
  const [shopForm, setShopForm] = useState({});
  const [bulkLogTools, setBulkLogTools] = useState({ open: false, logId: null, tools: [] });
  const [imageUploading, setImageUploading] = useState(false);
  const [imageFetching, setImageFetching] = useState(false);
  const [shopBulkStatus, setShopBulkStatus] = useState(null);
  const [shopUploading, setShopUploading] = useState(false);
  const shopFileInputRef = useRef(null);
  const [productUrl, setProductUrl] = useState('');

  // Fetch image from URL (favicon/og:image)
  const fetchProductImage = async () => {
    if (!productUrl) {
      alert('Please enter a website URL first');
      return;
    }
    
    setImageFetching(true);
    try {
      const res = await fetch('/api/fetch-favicon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: productUrl }),
      });
      const data = await res.json();
      
      if (data.favicon) {
        setShopForm(prev => ({ ...prev, image: data.favicon }));
        alert('Image fetched successfully!');
      } else {
        alert('Could not fetch image from this URL');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to fetch image: ' + error.message);
    } finally {
      setImageFetching(false);
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
      return;
    }
    if (isSignedIn) {
      fetchTools();
      fetchUsers();
      fetchBulkLogs();
      fetchShopProducts();
    }
  }, [isLoaded, isSignedIn]);

  const fetchTools = async () => {
    try {
      const res = await fetch('/api/admin/tools?status=all');
      const data = await res.json();
      setTools(data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchBulkLogs = async () => {
    try {
      const res = await fetch('/api/admin/bulk-logs');
      const data = await res.json();
      setBulkLogs(data);
    } catch (error) {
      console.error('Error fetching bulk logs:', error);
    }
  };

  const fetchShopProducts = async () => {
    try {
      const res = await fetch('/api/admin/shop');
      const data = await res.json();
      setShopProducts(data);
    } catch (error) {
      console.error('Error fetching shop products:', error);
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      await fetch(`/api/admin/users/${userId}/make-admin`, { method: 'PUT' });
      fetchUsers();
    } catch (error) {
      console.error('Error making admin:', error);
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      await fetch(`/api/admin/users/${userId}/remove-admin`, { method: 'PUT' });
      fetchUsers();
    } catch (error) {
      console.error('Error removing admin:', error);
    }
  };

  const handleApprove = async (toolId) => {
    try {
      await fetch(`/api/admin/tools/${toolId}/approve`, { method: 'PUT' });
      fetchTools();
    } catch (error) {
      console.error('Error approving tool:', error);
    }
  };

  // Bulk log handlers
  const viewBulkLogTools = async (logId) => {
    try {
      const res = await fetch(`/api/admin/bulk-logs/${logId}/tools`);
      const data = await res.json();
      setBulkLogTools({ open: true, logId, tools: data });
    } catch (error) {
      console.error('Error fetching bulk log tools:', error);
    }
  };

  const undoBulkUpload = async (logId) => {
    if (!confirm('Are you sure you want to undo this bulk upload? All tools from this upload will be deleted.')) return;
    try {
      const res = await fetch(`/api/admin/bulk-logs/${logId}/undo`, { method: 'DELETE' });
      const data = await res.json();
      alert(data.message);
      fetchBulkLogs();
      fetchTools();
    } catch (error) {
      console.error('Error undoing bulk upload:', error);
    }
  };

  // Shop handlers
  const openShopModal = (product = null) => {
    if (product) {
      setShopForm({
        name: product.name || '',
        shortDescription: product.shortDescription || '',
        description: product.description || '',
        image: product.image || '',
        imageAlt: product.imageAlt || '',
        monthlyPrice: product.monthlyPrice || 0,
        halfYearlyPrice: product.halfYearlyPrice || 0,
        yearlyPrice: product.yearlyPrice || 0,
        originalPrice: product.originalPrice || 0,
        discount: product.discount || 80,
        features: product.features?.join('\n') || '',
        category: product.category || 'AI Tool',
      });
      setShopModal({ open: true, product });
    } else {
      setShopForm({
        name: '', shortDescription: '', description: '', image: '', imageAlt: '',
        monthlyPrice: 0, halfYearlyPrice: 0, yearlyPrice: 0, originalPrice: 0,
        discount: 80, features: '', category: 'AI Tool',
      });
      setShopModal({ open: true, product: null });
    }
  };

  const saveShopProduct = async () => {
    try {
      const productData = {
        ...shopForm,
        features: shopForm.features.split('\n').filter(f => f.trim()),
      };
      
      if (shopModal.product) {
        await fetch(`/api/admin/shop/${shopModal.product._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      } else {
        await fetch('/api/admin/shop', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      }
      setShopModal({ open: false, product: null });
      fetchShopProducts();
    } catch (error) {
      console.error('Error saving shop product:', error);
    }
  };

  // Shop bulk CSV upload handler
  const handleShopCSVUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setShopUploading(true);
    setShopBulkStatus(null);
    
    try {
      const text = await file.text();
      const productsData = parseShopCSV(text);
      
      if (productsData.length === 0) {
        setShopBulkStatus({ type: 'error', message: 'No valid data found in CSV file.' });
        setShopUploading(false);
        return;
      }
      
      const response = await fetch('/api/admin/shop/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: productsData }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setShopBulkStatus({
          type: 'success',
          message: result.message,
          details: result.results
        });
        fetchShopProducts();
      } else {
        setShopBulkStatus({ type: 'error', message: result.error || 'Upload failed' });
      }
    } catch (error) {
      setShopBulkStatus({ type: 'error', message: `Error processing file: ${error.message}` });
    } finally {
      setShopUploading(false);
      if (shopFileInputRef.current) shopFileInputRef.current.value = '';
    }
  };

  // Parse shop CSV - pricing is mandatory
  const parseShopCSV = (csvText) => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
    const products = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = [];
      let currentValue = '';
      let insideQuotes = false;
      
      for (const char of lines[i]) {
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());
      
      const product = {};
      headers.forEach((header, index) => {
        product[header] = values[index]?.replace(/^"|"$/g, '') || '';
      });
      
      // Only add if pricing is provided (mandatory)
      const price = product['price'] || product['monthlyprice'] || product['monthly_price'] || product['monthly price'];
      if (price) {
        products.push({
          name: product['name'] || product['product name'] || 'Unnamed Product',
          shortDescription: product['shortdescription'] || product['short description'] || product['description'] || '',
          description: product['description'] || product['full description'] || '',
          image: product['image'] || product['imageurl'] || product['image url'] || '',
          imageAlt: product['imagealt'] || product['image alt'] || '',
          monthlyPrice: parseFloat(price) || 0,
          halfYearlyPrice: parseFloat(product['halfyearlyprice'] || product['6monthprice'] || product['6 month price'] || 0),
          yearlyPrice: parseFloat(product['yearlyprice'] || product['yearly price'] || product['annual price'] || 0),
          originalPrice: parseFloat(product['originalprice'] || product['original price'] || 0),
          discount: parseInt(product['discount'] || product['discount %'] || 80),
          category: product['category'] || 'AI Tool',
          features: (product['features'] || '').split('|').filter(f => f.trim()),
        });
      }
    }
    
    return products;
  };

  // Download shop CSV template
  const downloadShopTemplate = () => {
    const template = `Name,Price,Category,Short Description,Description,Yearly Price,Original Price,Discount,Features
"AI Writing Bundle",499,"AI Tool","Complete AI writing toolkit","Full suite of AI writing tools for content creation",2999,4999,80,"Lifetime Access|All Future Updates|Priority Support"
"Image Generator Pro",299,"Design Tool","AI image generation tool","Create stunning AI images in seconds",1799,2999,70,"Unlimited Generations|HD Export|Commercial License"`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shop_products_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteShopProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/admin/shop/${productId}`, { method: 'DELETE' });
      fetchShopProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Open reject modal
  const openRejectModal = (toolId, toolName) => {
    setRejectModal({ open: true, toolId, toolName });
    setRejectComment('');
  };

  // Submit rejection with comment
  const handleReject = async () => {
    if (!rejectModal.toolId) return;
    try {
      await fetch(`/api/admin/tools/${rejectModal.toolId}/reject`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: rejectComment })
      });
      setRejectModal({ open: false, toolId: null, toolName: '' });
      setRejectComment('');
      fetchTools();
    } catch (error) {
      console.error('Error rejecting tool:', error);
    }
  };

  // Open edit modal
  const openEditModal = (tool) => {
    setEditModal({ open: true, tool });
    setEditForm({
      name: tool.name || '',
      shortDescription: tool.shortDescription || '',
      description: tool.description || '',
      website: tool.website || '',
      logo: tool.logo || '',
      categories: tool.categories?.join(', ') || '',
      tags: tool.tags?.join(', ') || '',
      pricing: tool.pricing || 'Free',
      status: tool.status || 'pending',
      featured: tool.featured || false,
    });
  };

  // Submit edit
  const handleEdit = async () => {
    if (!editModal.tool) return;
    try {
      await fetch(`/api/admin/tools/${editModal.tool._id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editForm,
          categories: editForm.categories.split(',').map(c => c.trim()).filter(c => c),
          tags: editForm.tags.split(',').map(t => t.trim()).filter(t => t),
        }),
      });
      setEditModal({ open: false, tool: null });
      fetchTools();
    } catch (error) {
      console.error('Error editing tool:', error);
    }
  };

  const handleToggleFeatured = async (toolId, currentFeatured) => {
    try {
      await fetch(`/api/admin/tools/${toolId}/featured`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentFeatured }),
      });
      fetchTools();
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const handleToggleTrending = async (toolId, currentTrending) => {
    try {
      await fetch(`/api/admin/tools/${toolId}/trending`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trending: !currentTrending }),
      });
      fetchTools();
    } catch (error) {
      console.error('Error toggling trending:', error);
    }
  };

  const handleDelete = async (toolId) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;
    try {
      await fetch(`/api/tools/${toolId}`, { method: 'DELETE' });
      fetchTools();
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  // Parse CSV text into array of objects
  const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const tools = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = [];
      let currentValue = '';
      let insideQuotes = false;
      
      for (const char of lines[i]) {
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());
      
      if (values.length >= headers.length) {
        const tool = {};
        headers.forEach((header, index) => {
          tool[header] = values[index]?.replace(/^"|"$/g, '') || '';
        });
        tools.push(tool);
      }
    }
    
    return tools;
  };

  // Handle CSV file upload
  const handleCSVUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setUploading(true);
    setBulkUploadStatus(null);
    
    try {
      const text = await file.text();
      const toolsData = parseCSV(text);
      
      if (toolsData.length === 0) {
        setBulkUploadStatus({ type: 'error', message: 'No valid data found in CSV file.' });
        setUploading(false);
        return;
      }
      
      const response = await fetch('/api/admin/bulk-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tools: toolsData }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setBulkUploadStatus({
          type: 'success',
          message: result.message,
          details: result.results
        });
        fetchTools(); // Refresh tools list
      } else {
        setBulkUploadStatus({ type: 'error', message: result.error || 'Upload failed' });
      }
    } catch (error) {
      setBulkUploadStatus({ type: 'error', message: `Error processing file: ${error.message}` });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Download sample CSV template - matches user's format
  const downloadTemplate = () => {
    const template = `Name,Category,Pricing,Website (Original),Description
"WriteGenius","Blog Content","Paid","https://writegenius.com/","AI assistant for generating SEO-friendly long-form blog content and optimization."
"Dall E 2","Text To Image","Free","https://openai.com/dall-e-2","OpenAI's system that creates realistic images and art from natural language descriptions."
"ChatGPT","AI Chatbots","Freemium","https://chat.openai.com","Conversational AI assistant by OpenAI for various tasks."`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tools_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  const pendingTools = tools.filter((t) => t.status === 'pending');
  const approvedTools = tools.filter((t) => t.status === 'approved');
  const rejectedTools = tools.filter((t) => t.status === 'rejected');
  const adminUsers = users.filter((u) => u.isAdmin);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all content and users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Tools</p>
                <p className="text-3xl font-bold text-blue-600">{tools.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                <p className="text-3xl font-bold text-orange-600">{pendingTools.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-purple-600">{users.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Admin Users</p>
                <p className="text-3xl font-bold text-green-600">{adminUsers.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex flex-wrap">
                <TabsTrigger value="tools">
                  <Eye className="w-4 h-4 mr-2" />
                  Tools ({tools.length})
                </TabsTrigger>
                <TabsTrigger value="featured">
                  <Star className="w-4 h-4 mr-2" />
                  Featured ({tools.filter(t => t.featured).length})
                </TabsTrigger>
                <TabsTrigger value="trending">
                  <Zap className="w-4 h-4 mr-2" />
                  Trending ({tools.filter(t => t.trending).length})
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="w-4 h-4 mr-2" />
                  Users ({users.length})
                </TabsTrigger>
                <TabsTrigger value="bulk">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Bulk Upload
                </TabsTrigger>
                <TabsTrigger value="bulkLogs">
                  <History className="w-4 h-4 mr-2" />
                  Upload Logs ({bulkLogs.length})
                </TabsTrigger>
                <TabsTrigger value="shop">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Shop ({shopProducts.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tools" className="mt-6">
                <Tabs defaultValue="pending">
                  <TabsList>
                    <TabsTrigger value="pending">Pending ({pendingTools.length})</TabsTrigger>
                    <TabsTrigger value="approved">Approved ({approvedTools.length})</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected ({rejectedTools.length})</TabsTrigger>
                    <TabsTrigger value="all">All ({tools.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="pending" className="mt-6">
                    <AdminToolList
                      tools={pendingTools}
                      onApprove={handleApprove}
                      onReject={openRejectModal}
                      onToggleFeatured={handleToggleFeatured}
                      onToggleTrending={handleToggleTrending}
                      onDelete={handleDelete}
                      onEdit={openEditModal}
                    />
                  </TabsContent>
                  <TabsContent value="approved" className="mt-6">
                    <AdminToolList
                      tools={approvedTools}
                      onApprove={handleApprove}
                      onReject={openRejectModal}
                      onToggleFeatured={handleToggleFeatured}
                      onToggleTrending={handleToggleTrending}
                      onDelete={handleDelete}
                      onEdit={openEditModal}
                    />
                  </TabsContent>
                  <TabsContent value="rejected" className="mt-6">
                    <AdminToolList
                      tools={rejectedTools}
                      onApprove={handleApprove}
                      onReject={openRejectModal}
                      onToggleFeatured={handleToggleFeatured}
                      onDelete={handleDelete}
                      onEdit={openEditModal}
                    />
                  </TabsContent>
                  <TabsContent value="all" className="mt-6">
                    <AdminToolList
                      tools={tools}
                      onApprove={handleApprove}
                      onReject={openRejectModal}
                      onToggleFeatured={handleToggleFeatured}
                      onToggleTrending={handleToggleTrending}
                      onDelete={handleDelete}
                      onEdit={openEditModal}
                    />
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* Featured Tools Tab */}
              <TabsContent value="featured" className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Featured Tools</h3>
                  <p className="text-sm text-gray-600">Manage which tools appear in the "Featured" section on the homepage</p>
                </div>
                <AdminToolList
                  tools={tools.filter(t => t.featured && t.status === 'approved')}
                  onApprove={handleApprove}
                  onReject={openRejectModal}
                  onToggleFeatured={handleToggleFeatured}
                  onToggleTrending={handleToggleTrending}
                  onDelete={handleDelete}
                  onEdit={openEditModal}
                  showFeatureToggle={true}
                />
                <div className="mt-6 border-t pt-6">
                  <h4 className="font-medium mb-4">Add to Featured</h4>
                  <p className="text-sm text-gray-500 mb-4">Approved tools that can be featured:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {tools.filter(t => !t.featured && t.status === 'approved').slice(0, 20).map(tool => (
                      <div key={tool._id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <img src={tool.logo} alt="" className="w-8 h-8 rounded" />
                          <span className="text-sm">{tool.name}</span>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleToggleFeatured(tool._id, false)}>
                          <Star className="w-4 h-4 mr-1" />
                          Feature
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Trending Tools Tab */}
              <TabsContent value="trending" className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Trending Tools</h3>
                  <p className="text-sm text-gray-600">Manage which tools appear in the "Trending Now" section on the homepage</p>
                </div>
                <AdminToolList
                  tools={tools.filter(t => t.trending && t.status === 'approved')}
                  onApprove={handleApprove}
                  onReject={openRejectModal}
                  onToggleFeatured={handleToggleFeatured}
                  onToggleTrending={handleToggleTrending}
                  onDelete={handleDelete}
                  onEdit={openEditModal}
                  showTrendingToggle={true}
                />
                <div className="mt-6 border-t pt-6">
                  <h4 className="font-medium mb-4">Add to Trending</h4>
                  <p className="text-sm text-gray-500 mb-4">Approved tools that can be marked as trending:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {tools.filter(t => !t.trending && t.status === 'approved').slice(0, 20).map(tool => (
                      <div key={tool._id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <img src={tool.logo} alt="" className="w-8 h-8 rounded" />
                          <span className="text-sm">{tool.name}</span>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleToggleTrending(tool._id, false)}>
                          <Zap className="w-4 h-4 mr-1" />
                          Trend
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <UsersList 
                  users={users} 
                  onMakeAdmin={handleMakeAdmin}
                  onRemoveAdmin={handleRemoveAdmin}
                />
              </TabsContent>

              <TabsContent value="bulk" className="mt-6">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold mb-2">Bulk Upload Tools via CSV</h3>
                    <p className="text-gray-600">Upload a CSV file with multiple tools to add them all at once.</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-blue-800 mb-2">CSV Format:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Required columns:</strong> Name, Website (Original)</li>
                      <li>• <strong>Optional columns:</strong> Category, Pricing, Description</li>
                      <li>• Favicon/logo is automatically fetched from website</li>
                      <li>• Duplicate domains are automatically skipped</li>
                    </ul>
                    <div className="mt-3 bg-white/50 rounded p-2 font-mono text-xs">
                      Name, Category, Pricing, Website (Original), Description
                    </div>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <Button
                      variant="outline"
                      onClick={downloadTemplate}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download CSV Template
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <FileSpreadsheet className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        {uploading ? 'Processing...' : 'Click to upload CSV file'}
                      </p>
                      <p className="text-sm text-gray-500">or drag and drop</p>
                    </label>
                  </div>

                  {bulkUploadStatus && (
                    <div className={`mt-6 p-4 rounded-lg ${bulkUploadStatus.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <p className={`font-medium ${bulkUploadStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                        {bulkUploadStatus.message}
                      </p>
                      {bulkUploadStatus.details && bulkUploadStatus.details.errors?.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-red-700 font-medium">Errors:</p>
                          <ul className="text-sm text-red-600 mt-1">
                            {bulkUploadStatus.details.errors.slice(0, 5).map((error, i) => (
                              <li key={i}>• {error}</li>
                            ))}
                            {bulkUploadStatus.details.errors.length > 5 && (
                              <li>• ... and {bulkUploadStatus.details.errors.length - 5} more errors</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Bulk Upload Logs Tab */}
              <TabsContent value="bulkLogs" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Bulk Upload History</h3>
                  {bulkLogs.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No bulk uploads yet</p>
                  ) : (
                    <div className="space-y-3">
                      {bulkLogs.map((log) => (
                        <div key={log._id} className={`p-4 border rounded-lg ${log.undone ? 'bg-gray-100 opacity-60' : 'bg-white'}`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">
                                {new Date(log.createdAt).toLocaleString()}
                                {log.undone && <Badge className="ml-2 bg-gray-500">Undone</Badge>}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="text-green-600">{log.successCount} added</span>
                                {log.skippedCount > 0 && <span className="text-yellow-600 ml-2">{log.skippedCount} skipped</span>}
                                {log.failedCount > 0 && <span className="text-red-600 ml-2">{log.failedCount} failed</span>}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => viewBulkLogTools(log._id)}>
                                <Eye className="w-4 h-4 mr-1" />
                                View Tools
                              </Button>
                              {!log.undone && (
                                <Button size="sm" variant="destructive" onClick={() => undoBulkUpload(log._id)}>
                                  <Undo2 className="w-4 h-4 mr-1" />
                                  Undo
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Shop Products Tab */}
              <TabsContent value="shop" className="mt-6">
                <div className="space-y-6">
                  {/* Bulk Upload Section */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Bulk Upload Shop Products</h4>
                    <p className="text-sm text-blue-700 mb-3">Upload multiple products via CSV. Only <strong>Price</strong> is mandatory.</p>
                    <div className="flex gap-3 flex-wrap">
                      <Button variant="outline" onClick={downloadShopTemplate} size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Template
                      </Button>
                      <input
                        ref={shopFileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleShopCSVUpload}
                        className="hidden"
                        id="shop-csv-upload"
                      />
                      <Button 
                        onClick={() => shopFileInputRef.current?.click()}
                        disabled={shopUploading}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {shopUploading ? (
                          <>
                            <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload CSV
                          </>
                        )}
                      </Button>
                    </div>
                    {shopBulkStatus && (
                      <div className={`mt-3 p-3 rounded ${shopBulkStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {shopBulkStatus.message}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Shop Products ({shopProducts.length})</h3>
                    <Button onClick={() => openShopModal()} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                  {shopProducts.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No shop products yet</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {shopProducts.map((product) => (
                        <div key={product._id} className="border rounded-lg p-4 bg-white">
                          {product.image && (
                            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-3" />
                          )}
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{product.shortDescription}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge>{product.category}</Badge>
                            <Badge variant="outline" className="text-red-500">{product.discount}% OFF</Badge>
                          </div>
                          <p className="text-lg font-bold text-blue-600 mb-3">
                            ${product.monthlyPrice}/mo | ${product.yearlyPrice}/yr
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => openShopModal(product)}>
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteShopProduct(product._id)}>
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Reject Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Reject Tool</h3>
              <button onClick={() => setRejectModal({ open: false, toolId: null, toolName: '' })}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Rejecting: <strong>{rejectModal.toolName}</strong>
            </p>
            <Textarea
              placeholder="Enter rejection reason (will be visible to the user)..."
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setRejectModal({ open: false, toolId: null, toolName: '' })}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject Tool
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Tool</h3>
              <button onClick={() => setEditModal({ open: false, tool: null })}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <Input
                  value={editForm.website}
                  onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Logo URL</label>
                <div className="flex gap-2">
                  <Input
                    value={editForm.logo}
                    onChange={(e) => setEditForm({ ...editForm, logo: e.target.value })}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (editForm.website) {
                        try {
                          const url = new URL(editForm.website);
                          const faviconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
                          setEditForm({ ...editForm, logo: faviconUrl });
                        } catch {
                          alert('Invalid website URL');
                        }
                      } else {
                        alert('Please enter a website URL first');
                      }
                    }}
                    className="whitespace-nowrap"
                  >
                    Fetch Favicon
                  </Button>
                </div>
                {editForm.logo && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={editForm.logo} alt="Logo preview" className="w-10 h-10 rounded object-cover border" />
                    <span className="text-xs text-gray-500">Logo preview</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <Textarea
                  value={editForm.shortDescription}
                  onChange={(e) => setEditForm({ ...editForm, shortDescription: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Full Description</label>
                <Textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Categories (comma-separated)</label>
                  <Input
                    value={editForm.categories}
                    onChange={(e) => setEditForm({ ...editForm, categories: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                  <Input
                    value={editForm.tags}
                    onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Pricing</label>
                  <select
                    value={editForm.pricing}
                    onChange={(e) => setEditForm({ ...editForm, pricing: e.target.value })}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                    <option value="Contact for Pricing">Contact for Pricing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editForm.featured}
                  onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Tool</label>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <Button variant="outline" onClick={() => setEditModal({ open: false, tool: null })}>
                Cancel
              </Button>
              <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Log Tools Modal */}
      {bulkLogTools.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 my-auto max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tools from Bulk Upload</h3>
              <button onClick={() => setBulkLogTools({ open: false, logId: null, tools: [] })}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Total: {bulkLogTools.tools.length} tools</p>
            {bulkLogTools.tools.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No tools found (may have been deleted or undone)</p>
            ) : (
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {bulkLogTools.tools.map((tool) => (
                  <div key={tool._id} className="flex items-center gap-3 p-3 border rounded">
                    <img src={tool.logo} alt={tool.name} className="w-10 h-10 rounded object-cover" />
                    <div className="flex-1">
                      <p className="font-medium">{tool.name}</p>
                      <p className="text-xs text-gray-500">{tool.website}</p>
                    </div>
                    <Badge variant={tool.status === 'approved' ? 'default' : 'secondary'}>{tool.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shop Product Modal */}
      {shopModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {shopModal.product ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setShopModal({ open: false, product: null })}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name *</label>
                  <Input
                    value={shopForm.name}
                    onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                    placeholder="AI Tool Bundle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Input
                    value={shopForm.category}
                    onChange={(e) => setShopForm({ ...shopForm, category: e.target.value })}
                    placeholder="AI Tool"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Product Image</label>
                
                {/* Option 1: Fetch from URL */}
                <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <label className="block text-xs font-medium text-blue-800 mb-2">Option 1: Auto-fetch from Website</label>
                  <div className="flex gap-2">
                    <Input
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="flex-1 text-sm"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      size="sm"
                      disabled={imageFetching}
                      onClick={fetchProductImage}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {imageFetching ? (
                        <>
                          <span className="w-3 h-3 mr-1 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Fetching...
                        </>
                      ) : (
                        <>
                          <Globe className="w-3 h-3 mr-1" />
                          Fetch Image
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Option 2: Upload from PC */}
                <div className="mb-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <label className="block text-xs font-medium text-green-800 mb-2">Option 2: Upload from Your PC</label>
                  <input
                    ref={shopImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      setImageUploading(true);
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        console.log('Uploading file:', file.name, file.size);
                        const res = await fetch('/api/upload', {
                          method: 'POST',
                          credentials: 'include',
                          body: formData,
                        });
                        console.log('Response status:', res.status);
                        const data = await res.json();
                        console.log('Response data:', data);
                        if (data.success && data.url) {
                          setShopForm(prev => ({ ...prev, image: data.url }));
                          alert('Image uploaded successfully!');
                        } else {
                          alert('Upload failed: ' + (data.error || data.details || 'Unknown error'));
                        }
                      } catch (error) {
                        console.error('Upload error:', error);
                        alert('Upload failed: ' + error.message);
                      } finally {
                        setImageUploading(false);
                        if (shopImageInputRef.current) {
                          shopImageInputRef.current.value = '';
                        }
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    size="sm"
                    disabled={imageUploading}
                    onClick={() => shopImageInputRef.current?.click()}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    {imageUploading ? (
                      <>
                        <span className="w-3 h-3 mr-1 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-3 h-3 mr-1" />
                        Upload from PC
                      </>
                    )}
                  </Button>
                </div>

                {/* Option 3: Direct URL */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Or paste image URL directly:</label>
                  <Input
                    value={shopForm.image}
                    onChange={(e) => setShopForm({ ...shopForm, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="text-sm"
                  />
                </div>

                {/* Image Preview */}
                {shopForm.image && (
                  <div className="mt-2 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img src={shopForm.image} alt="Preview" className="w-24 h-24 object-cover rounded border" />
                    <div className="text-sm">
                      <p className="text-green-600 font-medium">✓ Image loaded</p>
                      <p className="text-gray-500 text-xs truncate max-w-[200px]">{shopForm.image}</p>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 mt-1 p-0 h-auto"
                        onClick={() => setShopForm(prev => ({ ...prev, image: '' }))}
                      >
                        <X className="w-3 h-3 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image Alt Text (SEO Keywords)</label>
                <Input
                  value={shopForm.imageAlt}
                  onChange={(e) => setShopForm({ ...shopForm, imageAlt: e.target.value })}
                  placeholder="Best AI directory tool, software discount, AI tool bundle"
                />
                <p className="text-xs text-gray-500 mt-1">Add keywords like: Best AI directory tool, software and AI tool in discount, AI tool buy</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <Input
                  value={shopForm.shortDescription}
                  onChange={(e) => setShopForm({ ...shopForm, shortDescription: e.target.value })}
                  placeholder="Brief description for listing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Full Description</label>
                <Textarea
                  value={shopForm.description}
                  onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
                  rows={4}
                  placeholder="Detailed product description"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Price (₹)</label>
                  <Input
                    type="number"
                    value={shopForm.monthlyPrice}
                    onChange={(e) => setShopForm({ ...shopForm, monthlyPrice: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">6 Months Price (₹)</label>
                  <Input
                    type="number"
                    value={shopForm.halfYearlyPrice}
                    onChange={(e) => setShopForm({ ...shopForm, halfYearlyPrice: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Yearly Price (₹)</label>
                  <Input
                    type="number"
                    value={shopForm.yearlyPrice}
                    onChange={(e) => setShopForm({ ...shopForm, yearlyPrice: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Original Price ($)</label>
                  <Input
                    type="number"
                    value={shopForm.originalPrice}
                    onChange={(e) => setShopForm({ ...shopForm, originalPrice: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount % (e.g., 80)</label>
                <Input
                  type="number"
                  value={shopForm.discount}
                  onChange={(e) => setShopForm({ ...shopForm, discount: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                <Textarea
                  value={shopForm.features}
                  onChange={(e) => setShopForm({ ...shopForm, features: e.target.value })}
                  rows={4}
                  placeholder="Lifetime Access&#10;All Future Updates&#10;Priority Support"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <Button variant="outline" onClick={() => setShopModal({ open: false, product: null })}>
                Cancel
              </Button>
              <Button onClick={saveShopProduct} className="bg-blue-600 hover:bg-blue-700">
                {shopModal.product ? 'Save Changes' : 'Add Product'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UsersList({ users, onMakeAdmin, onRemoveAdmin }) {
  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
          <img 
            src={user.imageUrl} 
            alt={user.email} 
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-black">
                {user.firstName} {user.lastName}
              </h3>
              {user.isAdmin && (
                <Badge className="bg-green-600 text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  Admin
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-xs text-gray-500">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            {user.isAdmin ? (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onRemoveAdmin(user.id)}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <ShieldOff className="w-4 h-4 mr-1" />
                Remove Admin
              </Button>
            ) : (
              <Button 
                size="sm"
                onClick={() => onMakeAdmin(user.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Shield className="w-4 h-4 mr-1" />
                Make Admin
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminToolList({ tools, onApprove, onReject, onToggleFeatured, onToggleTrending, onDelete, onEdit }) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tools found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <div key={tool._id} className="flex items-start gap-4 p-4 border rounded-lg">
          <img src={tool.logo} alt={tool.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-black mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{tool.shortDescription}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge
                  variant={
                    tool.status === 'approved'
                      ? 'default'
                      : tool.status === 'pending'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {tool.status}
                </Badge>
                {tool.featured && <Badge className="bg-yellow-500 text-black">Featured</Badge>}
                {tool.trending && <Badge className="bg-orange-500 text-white">Trending</Badge>}
              </div>
            </div>

            {/* Show rejection comment if rejected */}
            {tool.status === 'rejected' && tool.rejectionComment && (
              <div className="bg-red-50 border border-red-200 rounded p-2 mb-3">
                <p className="text-xs text-red-600 font-medium">Rejection Reason:</p>
                <p className="text-sm text-red-700">{tool.rejectionComment}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {tool.categories?.slice(0, 3).map((cat) => (
                <Badge key={cat} variant="outline" className="text-xs">
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{tool.pricing}</span>
              <span>•</span>
              <span>⭐ {tool.rating}</span>
              <span>•</span>
              <span>{tool.votes} votes</span>
              <span>•</span>
              <span>Added {new Date(tool.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {tool.status === 'pending' && (
              <>
                <Button size="sm" onClick={() => onApprove(tool._id)} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onReject(tool._id, tool.name)}>
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
            {tool.status === 'approved' && (
              <>
                <Button
                  size="sm"
                  variant={tool.featured ? 'default' : 'outline'}
                  onClick={() => onToggleFeatured(tool._id, tool.featured)}
                >
                  <Star className="w-4 h-4 mr-1" />
                  {tool.featured ? 'Unfeature' : 'Feature'}
                </Button>
                <Button
                  size="sm"
                  variant={tool.trending ? 'default' : 'outline'}
                  onClick={() => onToggleTrending && onToggleTrending(tool._id, tool.trending)}
                  className={tool.trending ? 'bg-orange-500 hover:bg-orange-600' : ''}
                >
                  <Zap className="w-4 h-4 mr-1" />
                  {tool.trending ? 'Untrend' : 'Trend'}
                </Button>
                <Link href={`/tools/${tool.slug}`}>
                  <Button size="sm" variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </Link>
              </>
            )}
            {tool.status === 'rejected' && (
              <Button size="sm" onClick={() => onApprove(tool._id)} variant="outline">
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
            )}
            {/* Edit button - always visible */}
            <Button size="sm" variant="outline" onClick={() => onEdit(tool)} className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(tool._id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
