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
import { CheckCircle, XCircle, Eye, Star, Trash2, Users, Shield, ShieldOff, Upload, FileSpreadsheet, Download, Edit, X } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [tools, setTools] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tools');
  const [bulkUploadStatus, setBulkUploadStatus] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Modal states
  const [rejectModal, setRejectModal] = useState({ open: false, toolId: null, toolName: '' });
  const [rejectComment, setRejectComment] = useState('');
  const [editModal, setEditModal] = useState({ open: false, tool: null });
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
      return;
    }
    if (isSignedIn) {
      fetchTools();
      fetchUsers();
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

  const handleReject = async (toolId) => {
    try {
      await fetch(`/api/admin/tools/${toolId}/reject`, { method: 'PUT' });
      fetchTools();
    } catch (error) {
      console.error('Error rejecting tool:', error);
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

  // Download sample CSV template
  const downloadTemplate = () => {
    const template = `name,website,shortDescription,description,categories,tags,pricing,featured
"ChatGPT","https://chat.openai.com","AI-powered conversational assistant","ChatGPT is an AI language model developed by OpenAI...","AI Chatbots,Productivity","chatbot,AI,assistant","Free",false
"Midjourney","https://midjourney.com","AI art generator","Create stunning AI-generated artwork...","Image Generation,Design","art,images,AI","Freemium",false`;
    
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
              <TabsList>
                <TabsTrigger value="tools">
                  <Eye className="w-4 h-4 mr-2" />
                  Tools ({tools.length})
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="w-4 h-4 mr-2" />
                  Users ({users.length})
                </TabsTrigger>
                <TabsTrigger value="bulk">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Bulk Upload
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
                      onReject={handleReject}
                      onToggleFeatured={handleToggleFeatured}
                      onDelete={handleDelete}
                    />
                  </TabsContent>
                  <TabsContent value="approved" className="mt-6">
                    <AdminToolList
                      tools={approvedTools}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onToggleFeatured={handleToggleFeatured}
                      onDelete={handleDelete}
                    />
                  </TabsContent>
                  <TabsContent value="rejected" className="mt-6">
                    <AdminToolList
                      tools={rejectedTools}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onToggleFeatured={handleToggleFeatured}
                      onDelete={handleDelete}
                    />
                  </TabsContent>
                  <TabsContent value="all" className="mt-6">
                    <AdminToolList
                      tools={tools}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onToggleFeatured={handleToggleFeatured}
                      onDelete={handleDelete}
                    />
                  </TabsContent>
                </Tabs>
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
                    <h4 className="font-medium text-blue-800 mb-2">CSV Format Requirements:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Required columns:</strong> name, website</li>
                      <li>• <strong>Optional columns:</strong> shortDescription, description, categories, tags, pricing, featured</li>
                      <li>• Categories and tags can be comma-separated</li>
                      <li>• Pricing options: Free, Freemium, Paid, Contact for Pricing</li>
                    </ul>
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
            </Tabs>
          </CardContent>
        </Card>
      </div>
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

function AdminToolList({ tools, onApprove, onReject, onToggleFeatured, onDelete }) {
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
              <div className="flex gap-2">
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
              </div>
            </div>

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
                <Button size="sm" variant="destructive" onClick={() => onReject(tool._id)}>
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
