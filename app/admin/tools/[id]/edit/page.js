'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ToolEditorForm from '@/components/ToolEditorForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function AdminEditToolPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();
  const [isAdmin, setIsAdmin] = useState(null); // null = checking, true/false
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const toolId = params?.id;

  // 1. Check Admin Authorization
  useEffect(() => {
    if (authStatus === 'loading') return;

    if (authStatus === 'unauthenticated') {
      setIsAdmin(false);
      setLoading(false);
      setError('You must be signed in as an administrator to edit tools.');
      return;
    }

    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/admin/check');
        const data = await res.json().catch(() => ({}));
        if (data?.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setError('Unauthorized. Administrator permissions are required to view this page.');
        }
      } catch (err) {
        setIsAdmin(false);
        setError('Failed to verify administrator credentials.');
      }
    };

    checkAdmin();
  }, [authStatus]);

  // 2. Fetch Tool by ID
  useEffect(() => {
    if (!isAdmin || !toolId) return;

    const fetchTool = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/admin/tools/${toolId}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Tool not found (HTTP ${res.status})`);
        }
        const data = await res.json();
        setTool(data);
      } catch (err) {
        setError(err.message || 'Failed to load tool details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [isAdmin, toolId]);

  if (authStatus === 'loading' || (isAdmin === null && loading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="text-gray-500 text-sm">Verifying administrator access…</p>
        </div>
      </div>
    );
  }

  if (error || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="shadow-md border-red-200">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto text-red-600">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Access Restricted</h2>
              <p className="text-gray-600 text-sm">{error || 'You do not have permission to access this page.'}</p>
              <div className="pt-2">
                <Button onClick={() => router.push('/admin')} variant="outline" className="flex items-center gap-2 mx-auto">
                  <ArrowLeft className="w-4 h-4" /> Return to Admin Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="text-gray-500 text-sm">Loading tool details for editing…</p>
        </div>
      </div>
    );
  }

  return (
    <ToolEditorForm
      mode="edit"
      initialData={tool}
      toolId={toolId}
      onCancel={() => router.push('/admin')}
      onSuccess={() => router.push('/admin')}
    />
  );
}
