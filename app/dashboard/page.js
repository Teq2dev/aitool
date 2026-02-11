'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
      return;
    }
    if (isSignedIn) {
      fetchSubmissions();
    }
  }, [isLoaded, isSignedIn]);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/my-submissions');
      const data = await res.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
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

  const pendingTools = submissions.filter((s) => s.status === 'pending');
  const approvedTools = submissions.filter((s) => s.status === 'approved');
  const rejectedTools = submissions.filter((s) => s.status === 'rejected');

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
                <TabsTrigger value="all">All ({submissions.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingTools.length})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({approvedTools.length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({rejectedTools.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <SubmissionList tools={submissions} />
              </TabsContent>
              <TabsContent value="pending" className="mt-6">
                <SubmissionList tools={pendingTools} />
              </TabsContent>
              <TabsContent value="approved" className="mt-6">
                <SubmissionList tools={approvedTools} />
              </TabsContent>
              <TabsContent value="rejected" className="mt-6">
                <SubmissionList tools={rejectedTools} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SubmissionList({ tools }) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No submissions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <div key={tool._id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <img src={tool.logo} alt={tool.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold text-black mb-1">{tool.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{tool.shortDescription}</p>
              <div className="flex items-center gap-2">
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
                <span className="text-xs text-gray-500">
                  Submitted {new Date(tool.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {tool.status === 'approved' && (
              <Link href={`/tools/${tool.slug}`}>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </Link>
            )}
          </div>
          
          {/* Show rejection reason */}
          {tool.status === 'rejected' && tool.rejectionComment && (
            <div className="mt-3 ml-20 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm font-medium text-red-700 mb-1">Rejection Reason:</p>
              <p className="text-sm text-red-600">{tool.rejectionComment}</p>
              {tool.rejectedAt && (
                <p className="text-xs text-red-500 mt-2">
                  Rejected on {new Date(tool.rejectedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}