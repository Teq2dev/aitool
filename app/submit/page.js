'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ToolEditorForm from '@/components/ToolEditorForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function SubmitToolPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/sign-in?callbackUrl=${encodeURIComponent('/submit')}`);
      return;
    }

    if (status === 'authenticated') {
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setProfileData(data);
            if (!data.country || !data.name) {
              router.push(`/complete-profile?callbackUrl=${encodeURIComponent('/submit')}`);
              return;
            }
          }
        })
        .catch(err => {
          console.error('Error verifying user profile for submission:', err);
        })
        .finally(() => {
          setCheckingProfile(false);
        });
    }
  }, [status, router]);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Submit Your AI Tool - Best AI Tools Free',
    description: 'Share your AI tool with thousands of users. Submit your tool to the Best AI Tools Free directory.',
    url: 'https://www.bestaitoolsfree.com/submit',
  };

  if (status === 'loading' || checkingProfile) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-600 text-sm font-medium">Verifying account & permissions...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <Card className="max-w-md w-full text-center p-6 shadow-xl border border-slate-200 rounded-2xl bg-white">
          <CardContent className="pt-4">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In Required</h2>
            <p className="text-slate-600 mb-6 text-sm">
              You must be signed in with a verified account to submit an AI tool to the directory.
            </p>
            <Link href={`/sign-in?callbackUrl=${encodeURIComponent('/submit')}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 font-bold rounded-xl shadow-md cursor-pointer">
                Sign In to Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <ToolEditorForm 
        mode="create" 
        initialUser={profileData || {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
          linkedinProfile: session?.user?.linkedinProfile || ''
        }} 
      />
    </>
  );
}

