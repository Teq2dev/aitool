'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle,
  XCircle,
  Eye,
  Star,
  Trash2,
  Users,
  Shield,
  ShieldOff,
  Upload,
  FileSpreadsheet,
  Download,
  Edit,
  X,
  ShoppingBag,
  History,
  Undo2,
  Plus,
  Zap,
  Globe,
  Clock,
  ExternalLink,
  Linkedin,
  AlertCircle,
  Search,
  Check,
  UserCheck,
  Calendar,
  Layers,
  Inbox,
  Sparkles,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  Tag,
  Monitor,
  FileText
} from 'lucide-react';
import Link from 'next/link';

function AdminDashboardContent() {
  const { data: session, status } = useSession();
  const isSignedIn = status === 'authenticated';
  const isLoaded = status !== 'loading';
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Tab & data states
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'submissions');
  const [tools, setTools] = useState([]);
  const [users, setUsers] = useState([]);
  const [submissionsData, setSubmissionsData] = useState({ submissions: [], counts: { total: 0, pending: 0, approved: 0, rejected: 0 }, pagination: { page: 1, limit: 25, total: 0, totalPages: 1 } });
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('pending');
  const [submissionSearch, setSubmissionSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [bulkLogs, setBulkLogs] = useState([]);
  const [shopProducts, setShopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bulkUploadStatus, setBulkUploadStatus] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Catalog Tools pagination & filters
  const initialToolStatus = searchParams.get('status') || 'all';
  const initialToolPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const initialToolSearch = searchParams.get('search') || '';
  const [toolStatus, setToolStatus] = useState(initialToolStatus);
  const [toolPage, setToolPage] = useState(initialToolPage);
  const [toolSearch, setToolSearch] = useState(initialToolSearch);
  const [toolPagination, setToolPagination] = useState({ page: initialToolPage, limit: 25, total: 0, totalPages: 1 });
  const [toolCounts, setToolCounts] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [toolsLoading, setToolsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Action Modals
  const [rejectModal, setRejectModal] = useState({ open: false, toolId: null, toolName: '', reason: '', loading: false, error: '' });
  const [approveModal, setApproveModal] = useState({ open: false, toolId: null, toolName: '', loading: false });
  const [adminRoleModal, setAdminRoleModal] = useState({ open: false, user: null, action: 'make', confirmText: '', loading: false, error: '' });
  
  // Submission Detail & Live Preview Modal State
  const [detailModal, setDetailModal] = useState({ open: false, submission: null, viewMode: 'details' }); // viewMode: 'details' | 'preview'

  // Sync URL query params
  const syncUrl = (tab, st, pg, srch) => {
    const params = new URLSearchParams();
    if (tab && tab !== 'submissions') params.set('tab', tab);
    if (st && st !== 'all' && st !== 'pending') params.set('status', st);
    if (pg && pg > 1) params.set('page', String(pg));
    if (srch && srch.trim()) params.set('search', srch.trim());
    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState(null, '', newUrl);
  };

  const currentAdminUrl = () => {
    if (typeof window === 'undefined') return '/admin';
    return window.location.pathname + window.location.search;
  };

  // 1. Fetch Submissions for Moderation
  const fetchSubmissions = async (status = submissionStatus, search = submissionSearch, page = 1) => {
    setSubmissionsLoading(true);
    try {
      const q = new URLSearchParams({
        status: status || 'all',
        search: search || '',
        page: String(page || 1),
        limit: '25'
      });
      const res = await fetch(`/api/admin/submissions?${q.toString()}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setSubmissionsData(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setSubmissionsLoading(false);
    }
  };

  // 2. Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setFetchError(prev => prev || error.message);
    }
  };

  // 3. Fetch Catalog Tools
  const fetchTools = async (status = toolStatus, page = toolPage, search = toolSearch) => {
    setToolsLoading(true);
    try {
      const q = new URLSearchParams({
        status: status || 'all',
        page: String(page || 1),
        limit: '25',
        search: search || '',
      });
      const res = await fetch(`/api/admin/tools?${q.toString()}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.tools && data.pagination) {
        if (data.pagination.totalPages > 0 && page > data.pagination.totalPages) {
          const clampedPage = data.pagination.totalPages;
          setToolPage(clampedPage);
          syncUrl(activeTab, status, clampedPage, search);
          return fetchTools(status, clampedPage, search);
        }
        setTools(Array.isArray(data.tools) ? data.tools : []);
        setToolPagination(data.pagination);
        if (data.counts) {
          setToolCounts(data.counts);
        }
      } else if (Array.isArray(data)) {
        setTools(data);
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
      setFetchError(prev => prev || error.message);
    } finally {
      setToolsLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blogs');
      if (!res.ok) return;
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchBulkLogs = async () => {
    try {
      const res = await fetch('/api/admin/bulk-logs');
      if (!res.ok) return;
      const data = await res.json();
      setBulkLogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching bulk logs:', error);
    }
  };

  const fetchShopProducts = async () => {
    try {
      const res = await fetch('/api/admin/shop');
      if (!res.ok) return;
      const data = await res.json();
      setShopProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching shop products:', error);
    }
  };

  const loadAllAdminData = () => {
    setLoading(true);
    setFetchError(null);
    Promise.all([
      fetchSubmissions(submissionStatus, submissionSearch, 1),
      fetchUsers(),
      fetchTools(toolStatus, toolPage, toolSearch),
      fetchBlogs(),
      fetchBulkLogs(),
      fetchShopProducts()
    ]).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
      return;
    }
    if (isSignedIn) {
      loadAllAdminData();
    }
  }, [isLoaded, isSignedIn]);

  // Handle Approve Tool Flow
  const openApproveModal = (toolId, toolName) => {
    setApproveModal({ open: true, toolId, toolName, loading: false });
  };

  const executeApprove = async () => {
    if (!approveModal.toolId) return;
    setApproveModal(prev => ({ ...prev, loading: true }));
    try {
      const res = await fetch(`/api/admin/tools/${approveModal.toolId}/approve`, { method: 'PUT' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to approve tool');
      
      setApproveModal({ open: false, toolId: null, toolName: '', loading: false });
      if (detailModal.open && detailModal.submission?._id === approveModal.toolId) {
        setDetailModal(prev => ({
          ...prev,
          submission: { ...prev.submission, status: 'approved', rejectionReason: '' }
        }));
      }
      fetchSubmissions();
      fetchTools();
      fetchUsers();
    } catch (error) {
      alert('Error approving tool: ' + error.message);
      setApproveModal(prev => ({ ...prev, loading: false }));
    }
  };

  // Handle Reject Tool Flow
  const openRejectModal = (toolId, toolName) => {
    setRejectModal({ open: true, toolId, toolName, reason: '', loading: false, error: '' });
  };

  const executeReject = async () => {
    if (!rejectModal.toolId) return;
    if (!rejectModal.reason.trim()) {
      setRejectModal(prev => ({ ...prev, error: 'Please enter a rejection reason.' }));
      return;
    }
    setRejectModal(prev => ({ ...prev, loading: true, error: '' }));
    try {
      const res = await fetch(`/api/admin/tools/${rejectModal.toolId}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectModal.reason.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reject tool');

      setRejectModal({ open: false, toolId: null, toolName: '', reason: '', loading: false, error: '' });
      if (detailModal.open && detailModal.submission?._id === rejectModal.toolId) {
        setDetailModal(prev => ({
          ...prev,
          submission: { ...prev.submission, status: 'rejected', rejectionReason: rejectModal.reason.trim() }
        }));
      }
      fetchSubmissions();
      fetchTools();
      fetchUsers();
    } catch (error) {
      setRejectModal(prev => ({ ...prev, loading: false, error: error.message }));
    }
  };

  // Handle Admin Promotion / Demotion with YES typing requirement
  const openAdminRoleModal = (user, action) => {
    setAdminRoleModal({
      open: true,
      user,
      action,
      confirmText: '',
      loading: false,
      error: ''
    });
  };

  const executeAdminRoleChange = async () => {
    if (adminRoleModal.confirmText !== 'YES' || !adminRoleModal.user) return;
    setAdminRoleModal(prev => ({ ...prev, loading: true, error: '' }));
    const targetUserId = adminRoleModal.user._id || adminRoleModal.user.userId || adminRoleModal.user.email;
    const endpoint = adminRoleModal.action === 'make'
      ? `/api/admin/users/${encodeURIComponent(targetUserId)}/make-admin`
      : `/api/admin/users/${encodeURIComponent(targetUserId)}/remove-admin`;

    try {
      const res = await fetch(endpoint, { method: 'PUT' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update user role');

      setAdminRoleModal({ open: false, user: null, action: 'make', confirmText: '', loading: false, error: '' });
      fetchUsers();
    } catch (error) {
      setAdminRoleModal(prev => ({ ...prev, loading: false, error: error.message }));
    }
  };

  // View Submission Details Modal (defaults to 'details' or 'preview')
  const openSubmissionDetails = (submission, initialView = 'details') => {
    setDetailModal({ open: true, submission, viewMode: initialView });
  };

  // Switch to user profile in users tab
  const navigateToUser = (targetUserIdOrEmail) => {
    if (detailModal.open) setDetailModal({ open: false, submission: null, viewMode: 'details' });
    setActiveTab('users');
    setUserSearch(targetUserIdOrEmail);
  };

  // Catalog tool actions
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
    if (!confirm('Are you sure you want to delete this tool permanently?')) return;
    try {
      await fetch(`/api/admin/tools/${toolId}`, { method: 'DELETE' });
      fetchTools();
      fetchSubmissions();
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  // CSV bulk uploads
  const downloadTemplate = () => {
    const csvContent = 'Name,Website (Original),Category,Pricing,Description\nExample AI,https://example.com,Productivity,Free,An example AI tool';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tools_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCSVUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    setBulkUploadStatus(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/admin/tools/bulk', { method: 'POST', body: formData });
      const result = await response.json();
      if (response.ok) {
        setBulkUploadStatus({ type: 'success', message: result.message, details: result.results });
        fetchTools();
        fetchBulkLogs();
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

  // Filtered Users List
  const filteredUsers = users.filter(u => {
    if (!userSearch.trim()) return true;
    const term = userSearch.toLowerCase().trim();
    const name = (u.name || u.fullName || `${u.firstName || ''} ${u.lastName || ''}`).toLowerCase();
    const email = (u.email || '').toLowerCase();
    const country = (u.country || '').toLowerCase();
    const id = (u._id || u.userId || '').toLowerCase();
    return name.includes(term) || email.includes(term) || country.includes(term) || id.includes(term);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-600">Loading admin moderation system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Admin Moderation Hub</h1>
              <Badge className="bg-blue-600 text-white font-semibold text-xs px-2.5 py-0.5">Verified Admin</Badge>
            </div>
            <p className="text-sm text-slate-500">
              Manage tool moderation submissions, preview live tool pages, user privileges, and directory catalog.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="font-semibold text-slate-700 border-slate-200 hover:bg-slate-50">
                User Dashboard
              </Button>
            </Link>
            <Link href="/submit">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs">
                <Plus className="w-4 h-4 mr-1.5" />
                Submit New Tool
              </Button>
            </Link>
          </div>
        </div>

        {/* Global Error Alert */}
        {fetchError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-sm text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
            <span className="font-medium">{fetchError}</span>
          </div>
        )}

        {/* Main Tabs Container */}
        <Tabs value={activeTab} onValueChange={(t) => { setActiveTab(t); syncUrl(t, null, 1, null); }}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="bg-white p-1.5 border border-slate-200/90 rounded-2xl shadow-2xs inline-flex gap-1">
              <TabsTrigger value="submissions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all">
                <Inbox className="w-4 h-4 mr-1.5" />
                Tool Submissions
                {submissionsData.counts.pending > 0 && (
                  <span className="ml-2 bg-amber-500 text-white font-bold text-[11px] px-2 py-0.5 rounded-full">
                    {submissionsData.counts.pending}
                  </span>
                )}
              </TabsTrigger>

              <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all">
                <Users className="w-4 h-4 mr-1.5" />
                User Management ({users.length})
              </TabsTrigger>

              <TabsTrigger value="tools" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all">
                <Layers className="w-4 h-4 mr-1.5" />
                Catalog Tools ({toolCounts.total || tools.length})
              </TabsTrigger>

              <TabsTrigger value="featured" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all">
                <Star className="w-4 h-4 mr-1.5" />
                Featured
              </TabsTrigger>

              <TabsTrigger value="trending" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all">
                <Zap className="w-4 h-4 mr-1.5" />
                Trending
              </TabsTrigger>

              <TabsTrigger value="bulk" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all">
                <FileSpreadsheet className="w-4 h-4 mr-1.5" />
                Bulk CSV
              </TabsTrigger>

              <TabsTrigger value="bulkLogs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all">
                <History className="w-4 h-4 mr-1.5" />
                Upload Logs ({bulkLogs.length})
              </TabsTrigger>

              <TabsTrigger value="blogs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all">
                <Edit className="w-4 h-4 mr-1.5" />
                Blogs ({blogs.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: TOOL SUBMISSIONS & MODERATION                                      */}
          {/* ========================================================================= */}
          <TabsContent value="submissions" className="space-y-6 mt-6 focus-visible:outline-none">
            <Card className="border-slate-200/80 shadow-xs">
              <CardHeader className="p-6 pb-4 border-b border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Submission Moderation Queue</CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Review community and user-submitted AI tools with full submission metadata and interactive live page preview.
                    </p>
                  </div>

                  {/* Submission Search Box */}
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={submissionSearch}
                      onChange={(e) => {
                        setSubmissionSearch(e.target.value);
                        fetchSubmissions(submissionStatus, e.target.value, 1);
                      }}
                      placeholder="Search tool, submitter name or email..."
                      className="pl-9 h-9 text-xs"
                    />
                    {submissionSearch && (
                      <button
                        onClick={() => {
                          setSubmissionSearch('');
                          fetchSubmissions(submissionStatus, '', 1);
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Submissions Status Tabs */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 flex-wrap">
                  <Button
                    size="sm"
                    variant={submissionStatus === 'pending' ? 'default' : 'outline'}
                    onClick={() => {
                      setSubmissionStatus('pending');
                      fetchSubmissions('pending', submissionSearch, 1);
                    }}
                    className={`h-8 text-xs font-semibold rounded-lg ${submissionStatus === 'pending' ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'text-slate-600'}`}
                  >
                    Pending Review ({submissionsData.counts.pending})
                  </Button>

                  <Button
                    size="sm"
                    variant={submissionStatus === 'approved' ? 'default' : 'outline'}
                    onClick={() => {
                      setSubmissionStatus('approved');
                      fetchSubmissions('approved', submissionSearch, 1);
                    }}
                    className={`h-8 text-xs font-semibold rounded-lg ${submissionStatus === 'approved' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'text-slate-600'}`}
                  >
                    Approved ({submissionsData.counts.approved})
                  </Button>

                  <Button
                    size="sm"
                    variant={submissionStatus === 'rejected' ? 'default' : 'outline'}
                    onClick={() => {
                      setSubmissionStatus('rejected');
                      fetchSubmissions('rejected', submissionSearch, 1);
                    }}
                    className={`h-8 text-xs font-semibold rounded-lg ${submissionStatus === 'rejected' ? 'bg-red-600 hover:bg-red-700 text-white' : 'text-slate-600'}`}
                  >
                    Rejected ({submissionsData.counts.rejected})
                  </Button>

                  <Button
                    size="sm"
                    variant={submissionStatus === 'all' ? 'default' : 'outline'}
                    onClick={() => {
                      setSubmissionStatus('all');
                      fetchSubmissions('all', submissionSearch, 1);
                    }}
                    className={`h-8 text-xs font-semibold rounded-lg ${submissionStatus === 'all' ? 'bg-slate-800 hover:bg-slate-900 text-white' : 'text-slate-600'}`}
                  >
                    All Submissions ({submissionsData.counts.total})
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {submissionsLoading ? (
                  <div className="py-16 text-center text-slate-500">
                    <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading submissions...
                  </div>
                ) : submissionsData.submissions.length === 0 ? (
                  <div className="py-16 text-center">
                    <Inbox className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <h3 className="text-base font-bold text-slate-800">No {submissionStatus !== 'all' ? submissionStatus : ''} submissions found</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      {submissionStatus === 'pending'
                        ? 'All user tool submissions have been moderated! Great job.'
                        : 'No submissions match your current filters.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissionsData.submissions.map((sub) => {
                      const statusLower = (sub.status || 'pending').toLowerCase();
                      const categoriesList = Array.isArray(sub.categories) ? sub.categories : [sub.category].filter(Boolean);
                      
                      return (
                        <div
                          key={sub._id}
                          className="border border-slate-200/90 rounded-2xl p-5 hover:border-slate-300 transition-all bg-white shadow-2xs space-y-4"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                            {/* Left: Tool Details */}
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                              <img
                                src={sub.logo || '/logo.jpg'}
                                alt={sub.name || 'Tool'}
                                className="w-16 h-16 rounded-2xl object-cover border border-slate-100 flex-shrink-0 bg-slate-50"
                                onError={(e) => { e.currentTarget.src = '/logo.jpg'; }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <h3 className="font-bold text-slate-900 text-lg">{sub.name}</h3>
                                  <Badge
                                    className={
                                      statusLower === 'approved'
                                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                        : statusLower === 'pending'
                                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                                        : 'bg-red-100 text-red-800 border-red-200'
                                    }
                                  >
                                    {statusLower.toUpperCase()}
                                  </Badge>

                                  {sub.pricing && (
                                    <Badge variant="outline" className="text-xs text-slate-600 bg-slate-50">
                                      💰 {sub.pricing}
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                                  {sub.shortDescription || 'No short description provided.'}
                                </p>

                                {/* Categories pills */}
                                {categoriesList.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                                    {categoriesList.map((cat, i) => (
                                      <Badge key={i} variant="secondary" className="text-[11px] bg-slate-100 text-slate-700 font-medium">
                                        🏷️ {cat}
                                      </Badge>
                                    ))}
                                  </div>
                                )}

                                <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                                  {sub.website && (
                                    <a
                                      href={sub.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                                    >
                                      <Globe className="w-3.5 h-3.5" />
                                      {sub.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                                    </a>
                                  )}
                                  <span>Submitted {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'N/A'}</span>
                                  {sub.reviewedAt && (
                                    <span>
                                      Reviewed {new Date(sub.reviewedAt).toLocaleDateString()}
                                      {sub.reviewedBy ? ` by ${sub.reviewedBy}` : ''}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Middle/Right: Submitter Profile Card */}
                            <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3.5 lg:w-72 flex-shrink-0 text-xs text-slate-700 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 flex items-center gap-1">
                                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                                  Submitter Info
                                </span>
                                {sub.submitter?.isAdmin && (
                                  <Badge className="bg-green-600 text-white text-[10px] px-1.5 py-0">Admin</Badge>
                                )}
                              </div>
                              <p className="font-semibold text-slate-800 truncate">
                                {sub.submitter?.name || sub.submitterName || 'Community Member'}
                              </p>
                              <p className="text-slate-500 truncate">{sub.submitter?.email || sub.submitterEmail || 'N/A'}</p>
                              <p className="text-slate-500">
                                Country: <span className="font-medium text-slate-700">{sub.submitter?.country || sub.submitterCountry || 'N/A'}</span>
                              </p>

                              {(sub.submitter?.linkedinProfile || sub.linkedinProfile) && (
                                <a
                                  href={sub.submitter?.linkedinProfile || sub.linkedinProfile}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium pt-0.5"
                                >
                                  <Linkedin className="w-3.5 h-3.5" />
                                  LinkedIn Profile
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}

                              <div className="pt-1.5 border-t border-slate-200/60 flex justify-end">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => navigateToUser(sub.submitter?.email || sub.submitter?.userId || sub.submittedBy)}
                                  className="h-6 text-[11px] text-blue-600 hover:text-blue-700 p-0 font-medium cursor-pointer"
                                >
                                  View User Profile in Admin →
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Rejection alert banner if rejected */}
                          {statusLower === 'rejected' && (sub.rejectionReason || sub.rejectionComment) && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-900 flex items-start gap-2">
                              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <span className="font-bold text-red-800">Rejection Reason: </span>
                                <span>{sub.rejectionReason || sub.rejectionComment}</span>
                              </div>
                            </div>
                          )}

                          {/* Actions Row */}
                          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openSubmissionDetails(sub, 'details')}
                                className="h-8 text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                                View Full Submission Details
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openSubmissionDetails(sub, 'preview')}
                                className="h-8 text-xs font-semibold border-blue-200 bg-blue-50/50 text-blue-700 hover:bg-blue-100/60 cursor-pointer"
                              >
                                <Monitor className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                                Live Page Preview
                              </Button>

                              {sub.slug && (
                                <Link href={`/tools/${sub.slug}`} target="_blank">
                                  <Button size="sm" variant="ghost" className="h-8 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                                    <ExternalLink className="w-3.5 h-3.5 mr-1" />
                                    Open in New Tab
                                  </Button>
                                </Link>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {statusLower === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => openApproveModal(sub._id, sub.name)}
                                    className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-2xs cursor-pointer"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                    Approve & Publish
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => openRejectModal(sub._id, sub.name)}
                                    className="h-8 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-2xs cursor-pointer"
                                  >
                                    <XCircle className="w-3.5 h-3.5 mr-1.5" />
                                    Reject Submission
                                  </Button>
                                </>
                              )}

                              {statusLower === 'approved' && sub.slug && (
                                <Link href={`/tools/${sub.slug}`} target="_blank">
                                  <Button size="sm" variant="outline" className="h-8 text-xs font-semibold text-emerald-700 border-emerald-300 hover:bg-emerald-50 cursor-pointer">
                                    <Globe className="w-3.5 h-3.5 mr-1.5" />
                                    View Live Tool ↗
                                  </Button>
                                </Link>
                              )}

                              {statusLower === 'rejected' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openApproveModal(sub._id, sub.name)}
                                  className="h-8 text-xs font-semibold text-emerald-700 border-emerald-300 hover:bg-emerald-50 cursor-pointer"
                                >
                                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                  Re-evaluate & Approve
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========================================================================= */}
          {/* TAB 2: USER MANAGEMENT                                                    */}
          {/* ========================================================================= */}
          <TabsContent value="users" className="space-y-6 mt-6 focus-visible:outline-none">
            <Card className="border-slate-200/80 shadow-xs">
              <CardHeader className="p-6 pb-4 border-b border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">User Management</CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">
                      View registered members, check login and join timestamps, manage administrator roles, and view user tool submissions.
                    </p>
                  </div>

                  {/* User Search Input */}
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search users by name, email, country..."
                      className="pl-9 h-9 text-xs"
                    />
                    {userSearch && (
                      <button
                        onClick={() => setUserSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {filteredUsers.length === 0 ? (
                  <div className="py-16 text-center text-slate-500">
                    <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p className="font-semibold text-slate-700">No users match your search query.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredUsers.map((u) => {
                      const fullName = u.name || u.fullName || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Community Member';
                      const isAdmin = Boolean(u.isAdmin || u.role === 'admin');
                      const stats = u.submissionStats || { total: 0, approved: 0, pending: 0, rejected: 0 };
                      const userSubmissions = u.submissions || [];

                      return (
                        <div
                          key={u._id || u.userId || u.email}
                          className="p-5 border border-slate-200/90 rounded-2xl hover:border-slate-300 transition-all bg-white shadow-2xs space-y-4"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            {/* User Profile Info */}
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <img
                                src={u.imageUrl || u.image || '/logo.jpg'}
                                alt={fullName}
                                className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 flex-shrink-0 bg-slate-100"
                                onError={(e) => { e.currentTarget.src = '/logo.jpg'; }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <h3 className="font-bold text-slate-900 text-base">{fullName}</h3>
                                  {isAdmin ? (
                                    <Badge className="bg-emerald-600 text-white font-bold text-xs px-2 py-0.5">
                                      <Shield className="w-3 h-3 mr-1" />
                                      Admin
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-xs text-slate-500">
                                      User
                                    </Badge>
                                  )}
                                  {u.country && (
                                    <Badge variant="secondary" className="text-xs text-slate-700 bg-slate-100 font-medium">
                                      🌍 {u.country}
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-sm text-slate-600 truncate">{u.email}</p>

                                <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap mt-1">
                                  <span>
                                    <Calendar className="w-3 h-3 inline mr-1 text-slate-400" />
                                    Joined: {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                                  </span>
                                  <span>
                                    <Clock className="w-3 h-3 inline mr-1 text-slate-400" />
                                    Last Login: {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never logged in'}
                                  </span>
                                  {u.linkedinProfile && (
                                    <a
                                      href={u.linkedinProfile}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                      <Linkedin className="w-3 h-3" />
                                      LinkedIn
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Submissions Breakdown Badges & Make Admin Actions */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                              {/* Submissions Pill Container */}
                              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center gap-2 text-xs">
                                <span className="font-semibold text-slate-700">Submissions ({stats.total}):</span>
                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold" title="Approved">
                                  ✓ {stats.approved}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold" title="Pending">
                                  ⏳ {stats.pending}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 font-bold" title="Rejected">
                                  ✗ {stats.rejected}
                                </span>
                              </div>

                              {/* Make Admin / Remove Admin Button */}
                              {isAdmin ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openAdminRoleModal(u, 'remove')}
                                  className="h-9 text-xs font-semibold text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                                >
                                  <ShieldOff className="w-3.5 h-3.5 mr-1.5" />
                                  Remove Admin
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => openAdminRoleModal(u, 'make')}
                                  className="h-9 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-2xs cursor-pointer"
                                >
                                  <Shield className="w-3.5 h-3.5 mr-1.5" />
                                  Make Admin
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Expandable User's Submissions List */}
                          {userSubmissions.length > 0 && (
                            <div className="pt-3 border-t border-slate-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                  Tools Submitted by this User ({userSubmissions.length})
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                {userSubmissions.map((tool) => (
                                  <div
                                    key={tool._id}
                                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2"
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <img
                                        src={tool.logo || '/logo.jpg'}
                                        alt={tool.name}
                                        className="w-7 h-7 rounded-lg object-cover bg-white border border-slate-200"
                                        onError={(e) => { e.currentTarget.src = '/logo.jpg'; }}
                                      />
                                      <div className="min-w-0">
                                        <p className="text-xs font-bold text-slate-900 truncate">{tool.name}</p>
                                        <p className="text-[11px] text-slate-500">
                                          {tool.status ? tool.status.toUpperCase() : 'PENDING'}
                                        </p>
                                      </div>
                                    </div>

                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => openSubmissionDetails({ ...tool, submitter: u }, 'details')}
                                      className="h-7 text-xs text-blue-600 hover:text-blue-700 font-semibold p-1.5 cursor-pointer"
                                    >
                                      Moderate →
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========================================================================= */}
          {/* TAB 3: CATALOG TOOLS                                                      */}
          {/* ========================================================================= */}
          <TabsContent value="tools" className="mt-6 focus-visible:outline-none">
            <Card className="border-slate-200/80 shadow-xs">
              <CardHeader className="p-6 pb-4 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Tabs value={toolStatus} onValueChange={(st) => { setToolStatus(st); setToolPage(1); fetchTools(st, 1, toolSearch); syncUrl('tools', st, 1, toolSearch); }}>
                    <TabsList className="bg-slate-100 p-1 rounded-xl">
                      <TabsTrigger value="all" className="text-xs font-semibold">All ({toolCounts.total})</TabsTrigger>
                      <TabsTrigger value="approved" className="text-xs font-semibold">Approved ({toolCounts.approved})</TabsTrigger>
                      <TabsTrigger value="pending" className="text-xs font-semibold">Pending ({toolCounts.pending})</TabsTrigger>
                      <TabsTrigger value="rejected" className="text-xs font-semibold">Rejected ({toolCounts.rejected})</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex gap-2 w-full sm:w-80">
                    <Input
                      value={toolSearch}
                      onChange={(e) => setToolSearch(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { setToolPage(1); fetchTools(toolStatus, 1, toolSearch); syncUrl('tools', toolStatus, 1, toolSearch); } }}
                      placeholder="Search tools by name..."
                      className="h-9 text-xs"
                    />
                    <Button
                      size="sm"
                      onClick={() => { setToolPage(1); fetchTools(toolStatus, 1, toolSearch); syncUrl('tools', toolStatus, 1, toolSearch); }}
                      className="h-9 text-xs font-semibold"
                    >
                      Search
                    </Button>
                  </div>
                </div>

                {toolPagination.total > 0 && (
                  <div className="flex justify-between items-center text-xs text-slate-500 mt-4 pt-2 border-t border-slate-100">
                    <span>
                      Showing {((toolPagination.page - 1) * toolPagination.limit) + 1}–
                      {Math.min(toolPagination.page * toolPagination.limit, toolPagination.total)} of {toolPagination.total} tools
                    </span>
                    <span>Page {toolPagination.page} of {toolPagination.totalPages}</span>
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-6">
                {toolsLoading ? (
                  <div className="py-16 text-center text-slate-500">
                    <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading catalog tools...
                  </div>
                ) : (
                  <AdminToolList
                    tools={tools}
                    onApprove={(id) => openApproveModal(id, 'Selected Tool')}
                    onReject={(id, name) => openRejectModal(id, name)}
                    onToggleFeatured={handleToggleFeatured}
                    onToggleTrending={handleToggleTrending}
                    onDelete={handleDelete}
                    returnToUrl={currentAdminUrl()}
                  />
                )}

                {/* Pagination Controls */}
                {toolPagination.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={toolPagination.page <= 1 || toolsLoading}
                      onClick={() => {
                        const pg = Math.max(1, toolPagination.page - 1);
                        setToolPage(pg);
                        fetchTools(toolStatus, pg, toolSearch);
                      }}
                      className="text-xs font-semibold"
                    >
                      Previous
                    </Button>

                    <span className="text-xs font-medium text-slate-600">
                      Page {toolPagination.page} of {toolPagination.totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={toolPagination.page >= toolPagination.totalPages || toolsLoading}
                      onClick={() => {
                        const pg = Math.min(toolPagination.totalPages, toolPagination.page + 1);
                        setToolPage(pg);
                        fetchTools(toolStatus, pg, toolSearch);
                      }}
                      className="text-xs font-semibold"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========================================================================= */}
          {/* TAB 4: FEATURED                                                           */}
          {/* ========================================================================= */}
          <TabsContent value="featured" className="mt-6 focus-visible:outline-none">
            <Card className="border-slate-200/80 shadow-xs">
              <CardHeader className="p-6 pb-4 border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-slate-900">Featured Tools</CardTitle>
                <p className="text-xs text-slate-500">Manage tools displayed prominently on the homepage featured carousel.</p>
              </CardHeader>
              <CardContent className="p-6">
                <AdminToolList
                  tools={tools.filter(t => t.featured && t.status === 'approved')}
                  onApprove={(id) => openApproveModal(id, 'Selected Tool')}
                  onReject={(id, name) => openRejectModal(id, name)}
                  onToggleFeatured={handleToggleFeatured}
                  onToggleTrending={handleToggleTrending}
                  onDelete={handleDelete}
                  returnToUrl={currentAdminUrl()}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========================================================================= */}
          {/* TAB 5: TRENDING                                                           */}
          {/* ========================================================================= */}
          <TabsContent value="trending" className="mt-6 focus-visible:outline-none">
            <Card className="border-slate-200/80 shadow-xs">
              <CardHeader className="p-6 pb-4 border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-slate-900">Trending Tools</CardTitle>
                <p className="text-xs text-slate-500">Manage tools with trending badges across the directory.</p>
              </CardHeader>
              <CardContent className="p-6">
                <AdminToolList
                  tools={tools.filter(t => t.trending && t.status === 'approved')}
                  onApprove={(id) => openApproveModal(id, 'Selected Tool')}
                  onReject={(id, name) => openRejectModal(id, name)}
                  onToggleFeatured={handleToggleFeatured}
                  onToggleTrending={handleToggleTrending}
                  onDelete={handleDelete}
                  returnToUrl={currentAdminUrl()}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========================================================================= */}
          {/* TAB 6: BULK CSV UPLOAD                                                    */}
          {/* ========================================================================= */}
          <TabsContent value="bulk" className="mt-6 focus-visible:outline-none">
            <Card className="border-slate-200/80 shadow-xs max-w-2xl mx-auto">
              <CardHeader className="p-6 pb-4 border-b border-slate-100 text-center">
                <CardTitle className="text-xl font-bold text-slate-900">Bulk Upload Tools via CSV</CardTitle>
                <p className="text-xs text-slate-500">Import hundreds of curated AI tools in a single batch.</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-800 space-y-2">
                  <p className="font-bold">Required CSV Header Format:</p>
                  <code className="block bg-white/70 p-2 rounded border border-blue-200 font-mono text-[11px]">
                    Name, Website (Original), Category, Pricing, Description
                  </code>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={downloadTemplate} className="w-full text-xs font-semibold">
                    <Download className="w-4 h-4 mr-2" />
                    Download Sample CSV Template
                  </Button>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50 hover:bg-slate-100/80 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload" className="cursor-pointer block">
                    <FileSpreadsheet className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                    <p className="text-sm font-bold text-slate-700 mb-1">
                      {uploading ? 'Processing & Uploading CSV...' : 'Click to Choose CSV File'}
                    </p>
                    <p className="text-xs text-slate-500">Supports .csv files up to 10MB</p>
                  </label>
                </div>

                {bulkUploadStatus && (
                  <div className={`p-4 rounded-xl text-xs ${bulkUploadStatus.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                    <p className="font-bold">{bulkUploadStatus.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========================================================================= */}
          {/* TAB 7: BULK LOGS                                                          */}
          {/* ========================================================================= */}
          <TabsContent value="bulkLogs" className="mt-6 focus-visible:outline-none">
            <Card className="border-slate-200/80 shadow-xs">
              <CardHeader className="p-6 pb-4 border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-slate-900">Bulk Upload History & Rollback</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {bulkLogs.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-8">No bulk uploads recorded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {bulkLogs.map((log) => (
                      <div key={log._id} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between bg-white">
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Uploaded {new Date(log.createdAt).toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-500">
                            Success: {log.successfulCount || log.successCount || 0} tools | Failed: {log.failedCount || 0}
                          </p>
                        </div>
                        {!log.undone && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => undoBulkUpload(log._id)}
                            className="text-xs text-red-600 border-red-200 hover:bg-red-50 font-semibold"
                          >
                            <Undo2 className="w-3.5 h-3.5 mr-1" />
                            Undo Upload
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========================================================================= */}
          {/* TAB 8: BLOGS                                                              */}
          {/* ========================================================================= */}
          <TabsContent value="blogs" className="mt-6 focus-visible:outline-none">
            <Card className="border-slate-200/80 shadow-xs">
              <CardHeader className="p-6 pb-4 border-b border-slate-100 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-900">Editorial Blog Articles</CardTitle>
                <Link href="/blog">
                  <Button size="sm" variant="outline" className="text-xs font-semibold">
                    View Live Blog
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-6">
                {blogs.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-8">No blog posts available.</p>
                ) : (
                  <div className="space-y-3">
                    {blogs.map((b) => (
                      <div key={b._id} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between bg-white">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{b.title}</h4>
                          <p className="text-xs text-slate-500">{b.slug} • Published {new Date(b.createdAt).toLocaleDateString()}</p>
                        </div>
                        <Link href={`/blog/${b.slug}`} target="_blank">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            Read
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ========================================================================= */}
      {/* ACTION MODAL: MAKE ADMIN / REMOVE ADMIN (STRICT "YES" REQUIRED)            */}
      {/* ========================================================================= */}
      {adminRoleModal.open && adminRoleModal.user && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-2xl ${adminRoleModal.action === 'make' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {adminRoleModal.action === 'make' ? <Shield className="w-6 h-6" /> : <ShieldOff className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {adminRoleModal.action === 'make' ? 'Promote to Administrator?' : 'Remove Administrator Privileges?'}
                </h3>
                <p className="text-xs text-slate-500">
                  Target: <strong className="text-slate-800">{adminRoleModal.user.name || adminRoleModal.user.email}</strong>
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 text-xs text-slate-700 space-y-2">
              <p>
                {adminRoleModal.action === 'make'
                  ? 'This user will receive full permissions to moderate tools, promote or demote users, and manage the live directory.'
                  : 'This user will be demoted to a regular member and will lose access to the admin dashboard.'}
              </p>
              <p className="font-semibold text-slate-900">
                To prevent accidental changes, please type <span className="font-mono text-red-600 bg-white px-1.5 py-0.5 rounded border border-slate-300">YES</span> in all caps to confirm.
              </p>
            </div>

            {adminRoleModal.error && (
              <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                {adminRoleModal.error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Type YES to confirm:
                </label>
                <Input
                  value={adminRoleModal.confirmText}
                  onChange={(e) => setAdminRoleModal(p => ({ ...p, confirmText: e.target.value }))}
                  placeholder="YES"
                  autoFocus
                  className="h-10 text-sm font-mono tracking-widest text-center uppercase"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAdminRoleModal({ open: false, user: null, action: 'make', confirmText: '', loading: false, error: '' })}
                  disabled={adminRoleModal.loading}
                  className="cursor-pointer font-semibold text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={executeAdminRoleChange}
                  disabled={adminRoleModal.confirmText !== 'YES' || adminRoleModal.loading}
                  className={`font-bold text-xs shadow-xs cursor-pointer ${
                    adminRoleModal.action === 'make'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {adminRoleModal.loading ? 'Updating...' : adminRoleModal.action === 'make' ? 'Confirm Make Admin' : 'Confirm Remove Admin'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTION MODAL: APPROVE TOOL CONFIRMATION                                    */}
      {/* ========================================================================= */}
      {approveModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Approve Tool Submission?</h3>
            <p className="text-xs text-slate-600 mb-6">
              Are you sure you want to approve <strong className="text-slate-900">"{approveModal.toolName}"</strong>? It will immediately become visible to all visitors in the directory catalog.
            </p>

            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setApproveModal({ open: false, toolId: null, toolName: '', loading: false })}
                disabled={approveModal.loading}
                className="font-semibold text-xs cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={executeApprove}
                disabled={approveModal.loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                {approveModal.loading ? 'Approving...' : 'Yes, Approve Tool'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTION MODAL: REJECT TOOL (REQUIRED REASON TEXTAREA)                      */}
      {/* ========================================================================= */}
      {rejectModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Reject Tool Submission</h3>
                <p className="text-xs text-slate-500">Tool: <strong className="text-slate-800">{rejectModal.toolName}</strong></p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Please provide a clear rejection reason. This feedback will be displayed directly to the submitting user on their dashboard so they can fix and resubmit.
            </p>

            {rejectModal.error && (
              <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                {rejectModal.error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reason for Rejection *
                </label>
                <Textarea
                  value={rejectModal.reason}
                  onChange={(e) => setRejectModal(p => ({ ...p, reason: e.target.value }))}
                  placeholder="e.g., Missing working website link, insufficient description, duplicate tool listing..."
                  rows={4}
                  required
                  className="text-xs rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRejectModal({ open: false, toolId: null, toolName: '', reason: '', loading: false, error: '' })}
                  disabled={rejectModal.loading}
                  className="font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={executeReject}
                  disabled={!rejectModal.reason.trim() || rejectModal.loading}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  {rejectModal.loading ? 'Rejecting...' : 'Reject Submission'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: FULL SUBMISSION DETAIL & INTERACTIVE LIVE PAGE PREVIEW              */}
      {/* ========================================================================= */}
      {detailModal.open && detailModal.submission && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50 flex-shrink-0">
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={detailModal.submission.logo || '/logo.jpg'}
                  alt={detailModal.submission.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 bg-white shadow-2xs flex-shrink-0"
                  onError={(e) => { e.currentTarget.src = '/logo.jpg'; }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-extrabold text-slate-900 truncate">{detailModal.submission.name}</h3>
                    <Badge
                      className={
                        (detailModal.submission.status || 'pending').toLowerCase() === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : (detailModal.submission.status || 'pending').toLowerCase() === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {(detailModal.submission.status || 'pending').toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5 truncate">
                    /{detailModal.submission.slug} • Added {detailModal.submission.createdAt ? new Date(detailModal.submission.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              {/* View Switcher Tabs inside Modal */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="bg-slate-200/80 p-1 rounded-xl flex items-center text-xs font-semibold">
                  <button
                    onClick={() => setDetailModal(p => ({ ...p, viewMode: 'details' }))}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      detailModal.viewMode === 'details'
                        ? 'bg-white text-blue-600 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Full Submission Data
                  </button>
                  <button
                    onClick={() => setDetailModal(p => ({ ...p, viewMode: 'preview' }))}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      detailModal.viewMode === 'preview'
                        ? 'bg-blue-600 text-white shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    Live Page Preview
                  </button>
                </div>

                <button
                  onClick={() => setDetailModal({ open: false, submission: null, viewMode: 'details' })}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Content (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {detailModal.viewMode === 'details' ? (
                /* ================= VIEW MODE 1: STRUCTURED SUBMISSION DETAILS ================= */
                <div className="space-y-6 text-xs text-slate-700">
                  {/* Submitter Info Card */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        Submitter Profile & Metadata
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigateToUser(detailModal.submission.submitter?.email || detailModal.submission.submitter?.userId || detailModal.submission.submittedBy)}
                        className="h-7 text-xs text-blue-600 font-semibold p-0 cursor-pointer"
                      >
                        View User in Admin Tab →
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200/60">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Full Name</span>
                        <strong className="text-slate-900">{detailModal.submission.submitter?.name || detailModal.submission.submitterName || 'Community Member'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Email Address</span>
                        <strong className="text-slate-900 truncate block">{detailModal.submission.submitter?.email || detailModal.submission.submitterEmail || 'N/A'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Country</span>
                        <strong className="text-slate-900">🌍 {detailModal.submission.submitter?.country || detailModal.submission.submitterCountry || 'N/A'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">LinkedIn Profile</span>
                        {(detailModal.submission.submitter?.linkedinProfile || detailModal.submission.linkedinProfile) ? (
                          <a
                            href={detailModal.submission.submitter?.linkedinProfile || detailModal.submission.linkedinProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1 mt-0.5"
                          >
                            <Linkedin className="w-3 h-3" />
                            Open LinkedIn ↗
                          </a>
                        ) : (
                          <span className="text-slate-400">Not provided</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Core Tool Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
                      <span className="text-slate-500 font-bold block">Official Website:</span>
                      <a
                        href={detailModal.submission.website || detailModal.submission.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-mono flex items-center gap-1 text-sm font-semibold break-all"
                      >
                        {detailModal.submission.website || detailModal.submission.websiteUrl}
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                      </a>
                    </div>

                    <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/70 space-y-1">
                      <span className="text-slate-500 font-bold block">Pricing Model & Starting Price:</span>
                      <div className="flex items-center gap-2 flex-wrap text-sm">
                        <span className="font-bold text-slate-900">
                          {detailModal.submission.pricing || detailModal.submission.pricingModel || 'Free'}
                        </span>
                        {detailModal.submission.startingPrice && (
                          <Badge className="bg-slate-200 text-slate-800 text-xs">
                            From {detailModal.submission.startingPrice}
                          </Badge>
                        )}
                        {detailModal.submission.hasFreePlan && (
                          <Badge className="bg-emerald-100 text-emerald-800 text-xs">Free Plan Available</Badge>
                        )}
                        {detailModal.submission.hasFreeTrial && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">Free Trial</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Categories & Tags */}
                  <div>
                    <span className="font-bold text-slate-800 block mb-1.5">Assigned Categories:</span>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(detailModal.submission.categories) ? detailModal.submission.categories : [detailModal.submission.category].filter(Boolean)).map((cat, i) => (
                        <Badge key={i} className="bg-slate-100 text-slate-800 border border-slate-200 text-xs px-2.5 py-1">
                          🏷️ {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Short Description */}
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Short Description (Tagline):</span>
                    <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-900 text-sm leading-relaxed">
                      {detailModal.submission.shortDescription || 'None provided'}
                    </p>
                  </div>

                  {/* Full Description */}
                  {(detailModal.submission.fullDescription || detailModal.submission.description) && (
                    <div>
                      <span className="font-bold text-slate-800 block mb-1">Full In-Depth Description:</span>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 text-xs leading-relaxed whitespace-pre-line">
                        {detailModal.submission.fullDescription || detailModal.submission.description}
                      </div>
                    </div>
                  )}

                  {/* Key Features List */}
                  {Array.isArray(detailModal.submission.features) && detailModal.submission.features.length > 0 && (
                    <div>
                      <span className="font-bold text-slate-800 block mb-2">Key Features ({detailModal.submission.features.length}):</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {detailModal.submission.features.map((feat, i) => (
                          <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2 text-slate-800">
                            <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pros and Cons Breakdown */}
                  {((Array.isArray(detailModal.submission.pros) && detailModal.submission.pros.length > 0) ||
                    (Array.isArray(detailModal.submission.cons) && detailModal.submission.cons.length > 0)) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Pros */}
                      <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 space-y-2">
                        <span className="font-bold text-emerald-900 flex items-center gap-1.5 text-xs">
                          <ThumbsUp className="w-4 h-4 text-emerald-600" />
                          Pros ({detailModal.submission.pros?.length || 0})
                        </span>
                        <ul className="space-y-1.5">
                          {(detailModal.submission.pros || []).map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-emerald-950 text-xs">
                              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 space-y-2">
                        <span className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                          <ThumbsDown className="w-4 h-4 text-amber-600" />
                          Cons ({detailModal.submission.cons?.length || 0})
                        </span>
                        <ul className="space-y-1.5">
                          {(detailModal.submission.cons || []).map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-amber-950 text-xs">
                              <X className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Pricing Details */}
                  {detailModal.submission.pricingDetails && (
                    <div>
                      <span className="font-bold text-slate-800 block mb-1">Pricing Overview & Plan Details:</span>
                      <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 text-xs">
                        {detailModal.submission.pricingDetails}
                      </p>
                    </div>
                  )}

                  {/* FAQs Section */}
                  {Array.isArray(detailModal.submission.faqs) && detailModal.submission.faqs.length > 0 && (
                    <div>
                      <span className="font-bold text-slate-800 block mb-2 text-xs">
                        Frequently Asked Questions ({detailModal.submission.faqs.length}):
                      </span>
                      <div className="space-y-2">
                        {detailModal.submission.faqs.map((faq, i) => (
                          <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                            <p className="font-bold text-slate-900 text-xs">Q: {faq.question}</p>
                            <p className="text-slate-600 text-xs pl-3 border-l-2 border-blue-400">A: {faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rejection Notice if Present */}
                  {(detailModal.submission.rejectionReason || detailModal.submission.rejectionComment) && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-900 space-y-1">
                      <strong className="block text-red-800 font-bold flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-600" />
                        Rejection Reason Given to User:
                      </strong>
                      <p className="text-xs bg-white/80 p-2.5 rounded-xl border border-red-100">
                        {detailModal.submission.rejectionReason || detailModal.submission.rejectionComment}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* ================= VIEW MODE 2: INTERACTIVE LIVE PAGE PREVIEW ================= */
                <div className="space-y-6">
                  {/* Live Preview Notification Bar */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3.5 rounded-2xl flex items-center justify-between gap-4 text-xs font-semibold shadow-xs">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      <span>Live Directory Simulation — This is an exact preview of how this tool renders to public users.</span>
                    </div>
                    {detailModal.submission.slug && (
                      <Link href={`/tools/${detailModal.submission.slug}`} target="_blank">
                        <Button size="sm" variant="secondary" className="h-7 text-xs bg-white text-blue-700 hover:bg-blue-50 font-bold">
                          Open Live URL ↗
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Live Tool Header Card Mockup */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={detailModal.submission.logo || '/logo.jpg'}
                          alt={detailModal.submission.name}
                          className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shadow-2xs bg-slate-50 flex-shrink-0"
                          onError={(e) => { e.currentTarget.src = '/logo.jpg'; }}
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{detailModal.submission.name}</h2>
                            <Badge className="bg-blue-600 text-white font-bold text-xs">Verified AI Tool</Badge>
                          </div>
                          <p className="text-sm text-slate-600 mt-1 max-w-xl font-normal">
                            {detailModal.submission.shortDescription || 'No tagline provided'}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                            <span>⭐ 4.8 / 5.0 (Community Rating)</span>
                            <span>•</span>
                            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {detailModal.submission.pricing || detailModal.submission.pricingModel || 'Free'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={detailModal.submission.website || detailModal.submission.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                      >
                        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 h-11 rounded-xl shadow-md">
                          Visit Official Website ↗
                        </Button>
                      </a>
                    </div>

                    {/* Categories Pill Bar */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                      {(Array.isArray(detailModal.submission.categories) ? detailModal.submission.categories : [detailModal.submission.category].filter(Boolean)).map((cat, i) => (
                        <Badge key={i} variant="outline" className="text-xs text-slate-600 bg-slate-50">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
                    <h3 className="text-lg font-bold text-slate-900">About {detailModal.submission.name}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                      {detailModal.submission.fullDescription || detailModal.submission.description || detailModal.submission.shortDescription}
                    </p>
                  </div>

                  {/* Features Grid Mockup */}
                  {Array.isArray(detailModal.submission.features) && detailModal.submission.features.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="text-lg font-bold text-slate-900">Key Features & Capabilities</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {detailModal.submission.features.map((feat, i) => (
                          <div key={i} className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pros & Cons Preview */}
                  {((Array.isArray(detailModal.submission.pros) && detailModal.submission.pros.length > 0) ||
                    (Array.isArray(detailModal.submission.cons) && detailModal.submission.cons.length > 0)) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 space-y-3">
                        <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4 text-emerald-600" />
                          Pros & Advantages
                        </h4>
                        <ul className="space-y-2">
                          {(detailModal.submission.pros || []).map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-emerald-950 text-xs">
                              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-5 space-y-3">
                        <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2">
                          <ThumbsDown className="w-4 h-4 text-amber-600" />
                          Cons & Considerations
                        </h4>
                        <ul className="space-y-2">
                          {(detailModal.submission.cons || []).map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-amber-950 text-xs">
                              <X className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Frequently Asked Questions (Live Preview) */}
                  {Array.isArray(detailModal.submission.faqs) && detailModal.submission.faqs.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
                      <div className="space-y-3">
                        {detailModal.submission.faqs.map((faq, i) => (
                          <div key={i} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/80 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDetailModal({ open: false, submission: null, viewMode: 'details' })}
                  className="font-semibold text-xs cursor-pointer"
                >
                  Close
                </Button>
                {detailModal.submission.slug && (
                  <Link href={`/tools/${detailModal.submission.slug}`} target="_blank">
                    <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Open Full Page in New Tab
                    </Button>
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  onClick={() => openRejectModal(detailModal.submission._id, detailModal.submission.name)}
                  className="bg-red-600 hover:bg-red-700 font-bold text-xs cursor-pointer shadow-xs"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1" />
                  Reject Submission
                </Button>
                <Button
                  onClick={() => openApproveModal(detailModal.submission._id, detailModal.submission.name)}
                  className="bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white cursor-pointer shadow-xs"
                >
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Approve & Publish Tool
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component for Catalog Tools List
function AdminToolList({ tools, onApprove, onReject, onToggleFeatured, onToggleTrending, onDelete, returnToUrl = '/admin' }) {
  if (!tools || tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xs text-slate-500 font-medium">No tools found in catalog.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <div key={tool._id} className="flex items-start gap-4 p-4 border border-slate-200/90 rounded-2xl hover:border-slate-300 transition-colors bg-white shadow-2xs">
          <img
            src={tool.logo || '/logo.jpg'}
            alt={tool.name}
            loading="lazy"
            decoding="async"
            className="w-14 h-14 rounded-xl object-cover flex-shrink-0 bg-slate-50 border border-slate-100"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1.5 gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{tool.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{tool.shortDescription}</p>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                <Badge
                  className={
                    tool.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : tool.status === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }
                >
                  {tool.status}
                </Badge>
                {tool.featured && <Badge className="bg-amber-400 text-slate-950 font-bold text-[10px]">Featured</Badge>}
                {tool.trending && <Badge className="bg-orange-500 text-white font-bold text-[10px]">Trending</Badge>}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-2">
              <span className="font-medium">{tool.pricing || 'Free'}</span>
              <span>•</span>
              <span>⭐ {tool.rating || 4.5}</span>
              <span>•</span>
              <span>Added {tool.createdAt ? new Date(tool.createdAt).toLocaleDateString() : 'N/A'}</span>
              {tool.submitterEmail && (
                <>
                  <span>•</span>
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[11px] font-medium">
                    Submitter: {tool.submitterEmail}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-shrink-0">
            {tool.status === 'approved' && (
              <>
                <Button
                  size="sm"
                  variant={tool.featured ? 'default' : 'outline'}
                  onClick={() => onToggleFeatured(tool._id, tool.featured)}
                  className="h-7 text-xs font-semibold"
                >
                  <Star className="w-3 h-3 mr-1" />
                  {tool.featured ? 'Unfeature' : 'Feature'}
                </Button>
                <Button
                  size="sm"
                  variant={tool.trending ? 'default' : 'outline'}
                  onClick={() => onToggleTrending && onToggleTrending(tool._id, tool.trending)}
                  className={`h-7 text-xs font-semibold ${tool.trending ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}`}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  {tool.trending ? 'Untrend' : 'Trend'}
                </Button>
                {tool.slug && (
                  <Link href={`/tools/${tool.slug}`} target="_blank">
                    <Button size="sm" variant="outline" className="h-7 text-xs w-full">
                      <Eye className="w-3 h-3 mr-1" />
                      Live
                    </Button>
                  </Link>
                )}
              </>
            )}

            {tool.status === 'pending' && (
              <>
                <Button size="sm" onClick={() => onApprove(tool._id)} className="h-7 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onReject(tool._id, tool.name)} className="h-7 text-xs font-bold">
                  <XCircle className="w-3 h-3 mr-1" />
                  Reject
                </Button>
              </>
            )}

            <Link
              href={`/admin/tools/${tool._id}/edit?returnTo=${encodeURIComponent(returnToUrl || '/admin')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="outline" className="h-7 text-xs w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
            </Link>

            <Button size="sm" variant="ghost" onClick={() => onDelete(tool._id)} className="h-7 text-xs text-red-600 hover:bg-red-50">
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500">Loading admin dashboard...</p>
          </div>
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
