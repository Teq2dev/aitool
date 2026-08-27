'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ToolEditorForm from '@/components/ToolEditorForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResubmitToolPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(`/dashboard/resubmit/${id}`)}`);
      return;
    }

    if (status === 'authenticated' && id) {
      fetch('/api/my-submissions')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch submission data');
          return res.json();
        })
        .then((submissions) => {
          const targetTool = Array.isArray(submissions)
            ? submissions.find((s) => s._id === id || s.slug === id)
            : null;

          if (!targetTool) {
            setError('Submission not found or you do not have permission to edit it.');
          } else {
            setTool(targetTool);
          }
        })
        .catch((err) => {
          setError(err.message || 'Error loading tool details');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [status, id, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-600 text-sm font-medium">Loading submission details...</p>
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-gray-50">
        <Card className="max-w-md w-full text-center p-6 shadow-xl border border-slate-200 rounded-2xl bg-white space-y-4">
          <CardContent className="pt-4 space-y-3">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Submission Unavailable</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {error || 'Unable to find this submission in your account.'}
            </p>
            <div className="pt-2">
              <Link href="/dashboard">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-semibold text-xs cursor-pointer">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ToolEditorForm
      mode="resubmit"
      initialData={tool}
      toolId={tool._id}
      returnTo="/dashboard"
      initialUser={{
        name: session?.user?.name || tool.submitterName || '',
        email: session?.user?.email || tool.submitterEmail || '',
        linkedinProfile: tool.linkedinProfile || session?.user?.linkedinProfile || ''
      }}
    />
  );
}
