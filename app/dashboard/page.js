'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clock, CheckCircle, XCircle, Eye, Edit, AlertCircle, Sparkles, Globe, Linkedin, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in?callbackUrl=/dashboard');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (data && !data.error && (!data.country || !data.name)) {
            router.push('/complete-profile?callbackUrl=/dashboard');
            return;
          }
          fetchSubmissions();
        })
        .catch(() => {
          fetchSubmissions();
        });
    }
  }, [status, router]);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/my-submissions');
      if (!res.ok) {
        setSubmissions([]);
        return;
      }
      const data = await res.json();
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <Card className="max-w-md w-full text-center p-6 shadow-xl border border-gray-100 rounded-2xl">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Please sign in with your Google account to access your dashboard and manage submitted tools.
            </p>
            <Link href="/sign-in">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 font-semibold rounded-xl">
                Sign In with Google
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const safeSubmissions = Array.isArray(submissions) ? submissions : [];
  const pendingTools = safeSubmissions.filter((s) => s?.status === 'pending');
  const approvedTools = safeSubmissions.filter((s) => s?.status === 'approved');
  const rejectedTools = safeSubmissions.filter((s) => s?.status === 'rejected');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your submitted AI tools</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                  <p className="text-3xl font-bold text-orange-600">{pendingTools.length}</p>
                </div>
                <Clock className="w-12 h-12 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{approvedTools.length}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{rejectedTools.length}</p>
                </div>
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Submissions</CardTitle>
              <Link href="/submit">
                <Button className="bg-blue-600 hover:bg-blue-700">Submit New Tool</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All ({safeSubmissions.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingTools.length})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({approvedTools.length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({rejectedTools.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <SubmissionList tools={safeSubmissions} onRefresh={fetchSubmissions} />
              </TabsContent>
              <TabsContent value="pending" className="mt-6">
                <SubmissionList tools={pendingTools} onRefresh={fetchSubmissions} />
              </TabsContent>
              <TabsContent value="approved" className="mt-6">
                <SubmissionList tools={approvedTools} onRefresh={fetchSubmissions} />
              </TabsContent>
              <TabsContent value="rejected" className="mt-6">
                <SubmissionList tools={rejectedTools} onRefresh={fetchSubmissions} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SubmissionList({ tools, onRefresh }) {
  const safeTools = Array.isArray(tools) ? tools : [];
  const [editingTool, setEditingTool] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [resubmitting, setResubmitting] = useState(false);
  const [resubmitError, setResubmitError] = useState('');

  const openEditModal = (tool) => {
    setEditingTool(tool);
    setEditForm({
      name: tool.name || '',
      website: tool.website || tool.websiteUrl || '',
      shortDescription: tool.shortDescription || '',
      fullDescription: tool.fullDescription || tool.description || '',
      category: tool.category || (Array.isArray(tool.categories) ? tool.categories[0] : 'productivity'),
      pricing: tool.pricing || tool.pricingModel || 'Free',
      pricingDetails: tool.pricingDetails || '',
      linkedinProfile: tool.linkedinProfile || '',
      features: Array.isArray(tool.features) ? tool.features.join('\n') : (tool.features || ''),
      pros: Array.isArray(tool.pros) ? tool.pros.join('\n') : (tool.pros || ''),
      cons: Array.isArray(tool.cons) ? tool.cons.join('\n') : (tool.cons || ''),
      logo: tool.logo || '',
    });
    setResubmitError('');
  };

  const handleResubmit = async (e) => {
    e.preventDefault();
    setResubmitError('');
    if (!editForm.name.trim() || !editForm.website.trim() || !editForm.shortDescription.trim()) {
      setResubmitError('Please fill in Tool Name, Website, and Short Description.');
      return;
    }
    setResubmitting(true);
    try {
      const payload = {
        name: editForm.name.trim(),
        website: editForm.website.trim(),
        linkedinProfile: editForm.linkedinProfile.trim(),
        shortDescription: editForm.shortDescription.trim(),
        fullDescription: editForm.fullDescription.trim(),
        description: editForm.fullDescription.trim(),
        category: editForm.category,
        categories: [editForm.category],
        pricing: editForm.pricing,
        pricingModel: editForm.pricing,
        pricingDetails: editForm.pricingDetails?.trim() || '',
        features: editForm.features ? editForm.features.split('\n').map(s => s.trim()).filter(Boolean) : [],
        pros: editForm.pros ? editForm.pros.split('\n').map(s => s.trim()).filter(Boolean) : [],
        cons: editForm.cons ? editForm.cons.split('\n').map(s => s.trim()).filter(Boolean) : [],
        logo: editForm.logo || '',
      };

      const res = await fetch(`/api/my-submissions/${editingTool._id}/resubmit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to resubmit tool');
      }
      setEditingTool(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      setResubmitError(err.message || 'An error occurred during resubmission.');
    } finally {
      setResubmitting(false);
    }
  };

  if (safeTools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-medium">No tool submissions yet.</p>
        <p className="text-gray-400 text-xs mt-1">Submit your AI tool to get featured in our directory.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {safeTools.map((tool) => (
        <div key={tool._id || tool.slug || Math.random()} className="p-5 border border-slate-200/90 rounded-2xl hover:border-slate-300 transition-all bg-white shadow-2xs">
          <div className="flex items-start gap-4">
            <img 
              src={tool.logo || '/logo.jpg'} 
              alt={tool.name || 'Tool'} 
              className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0 bg-slate-50"
              onError={(e) => { e.currentTarget.src = '/logo.jpg'; }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-slate-900 text-base">{tool.name}</h3>
                <Badge
                  className={
                    tool.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : tool.status === 'pending'
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-red-100 text-red-800 border-red-200'
                  }
                >
                  {tool.status ? tool.status.toUpperCase() : 'PENDING'}
                </Badge>
              </div>

              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{tool.shortDescription}</p>

              {/* Status Explanation Banners */}
              {tool.status === 'pending' && (
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 mb-3 flex items-start gap-2.5 text-xs text-amber-900">
                  <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Under Review:</span> Your submission is currently being reviewed by our editorial team. You will see the update here once reviewed.
                  </div>
                </div>
              )}

              {tool.status === 'approved' && (
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 mb-3 flex items-start gap-2.5 text-xs text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Approved:</span> Your tool has been approved and is now live in the directory for thousands of users.
                  </div>
                </div>
              )}

              {tool.status === 'rejected' && (
                <div className="bg-red-50/80 border border-red-200/80 rounded-xl p-3 mb-3 text-xs text-red-900">
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-800 mb-1">Your submission was not approved:</p>
                      <p className="text-red-700 bg-white/70 p-2 rounded-lg border border-red-100 font-medium">
                        "{tool.rejectionReason || tool.rejectionComment || 'The submission did not meet our directory guidelines.'}"
                      </p>
                      {tool.rejectedAt && (
                        <p className="text-[11px] text-red-500 mt-1">
                          Reviewed on {new Date(tool.rejectedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500 pt-1">
                <span>Submitted {tool.createdAt ? new Date(tool.createdAt).toLocaleDateString() : 'recently'}</span>
                
                <div className="flex items-center gap-2">
                  {tool.status === 'approved' && tool.slug && (
                    <Link href={`/tools/${tool.slug}`}>
                      <Button variant="outline" size="sm" className="h-8 text-xs font-semibold border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 cursor-pointer">
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        View Live Tool
                      </Button>
                    </Link>
                  )}

                  {tool.status === 'rejected' && (
                    <Button 
                      size="sm" 
                      onClick={() => openEditModal(tool)}
                      className="h-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-2xs cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1.5" />
                      Edit & Resubmit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Comprehensive Edit & Resubmit Modal */}
      {editingTool && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Edit & Resubmit Tool</h3>
              <p className="text-xs text-slate-500">
                Update your tool details according to reviewer feedback and resubmit for editorial review.
              </p>
            </div>

            {/* Rejection feedback reminder banner */}
            {(editingTool.rejectionReason || editingTool.rejectionComment) && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-900 space-y-1">
                <strong className="block font-bold text-red-800">Reviewer Feedback:</strong>
                <p className="bg-white/80 p-2 rounded-xl border border-red-100 font-medium">
                  "{editingTool.rejectionReason || editingTool.rejectionComment}"
                </p>
              </div>
            )}

            {resubmitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                {resubmitError}
              </div>
            )}

            <form onSubmit={handleResubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tool Name *</label>
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm(p => ({ ...p, name: e.target.value }))}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Website URL *</label>
                  <Input
                    type="url"
                    value={editForm.website}
                    onChange={(e) => setEditForm(p => ({ ...p, website: e.target.value }))}
                    required
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pricing Model</label>
                  <select
                    value={editForm.pricing}
                    onChange={(e) => setEditForm(p => ({ ...p, pricing: e.target.value }))}
                    className="w-full h-9 px-3 border border-slate-200 rounded-xl text-xs bg-white text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                    <option value="Free Trial">Free Trial</option>
                    <option value="Contact for Pricing">Contact for Pricing</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Submitter LinkedIn Profile URL</label>
                  <Input
                    type="url"
                    value={editForm.linkedinProfile}
                    onChange={(e) => setEditForm(p => ({ ...p, linkedinProfile: e.target.value }))}
                    placeholder="https://www.linkedin.com/in/your-profile"
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description (Tagline) *</label>
                <Input
                  value={editForm.shortDescription}
                  onChange={(e) => setEditForm(p => ({ ...p, shortDescription: e.target.value }))}
                  required
                  placeholder="One sentence summary of what this tool does"
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full In-Depth Description</label>
                <Textarea
                  value={editForm.fullDescription}
                  onChange={(e) => setEditForm(p => ({ ...p, fullDescription: e.target.value }))}
                  rows={4}
                  placeholder="Detailed overview explaining core capabilities and who it's for..."
                  className="text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Features (One feature per line)</label>
                <Textarea
                  value={editForm.features}
                  onChange={(e) => setEditForm(p => ({ ...p, features: e.target.value }))}
                  rows={3}
                  placeholder="AI Content Detector&#10;Multilingual Support&#10;Chrome Extension Integration"
                  className="text-xs rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-emerald-800 mb-1">Pros (One per line)</label>
                  <Textarea
                    value={editForm.pros}
                    onChange={(e) => setEditForm(p => ({ ...p, pros: e.target.value }))}
                    rows={3}
                    placeholder="Fast processing speed&#10;Generous free tier"
                    className="text-xs rounded-xl bg-emerald-50/40 border-emerald-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-amber-800 mb-1">Cons (One per line)</label>
                  <Textarea
                    value={editForm.cons}
                    onChange={(e) => setEditForm(p => ({ ...p, cons: e.target.value }))}
                    rows={3}
                    placeholder="Occasional false positives on short text"
                    className="text-xs rounded-xl bg-amber-50/40 border-amber-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingTool(null)}
                  disabled={resubmitting}
                  className="cursor-pointer font-semibold text-xs"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={resubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  {resubmitting ? 'Resubmitting...' : 'Resubmit for Review'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}