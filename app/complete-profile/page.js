'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { COUNTRIES } from '@/lib/countries';
import { useLanguage } from '@/context/LanguageContext';
import { User, Mail, Globe, CheckCircle2, AlertCircle, Loader2, Search, ChevronDown, Lock } from 'lucide-react';

function CompleteProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status, update } = useSession();
  const { getLangUrl } = useLanguage();

  const callbackUrl = searchParams.get('callbackUrl') || searchParams.get('returnTo') || '/dashboard';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  // Fetch current user profile
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(`/complete-profile?callbackUrl=${encodeURIComponent(callbackUrl)}`)}`);
      return;
    }

    if (status === 'authenticated') {
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setName(data.name || session?.user?.name || '');
            setEmail(data.email || session?.user?.email || '');
            setCountry(data.country || '');
            
            // If profile is already complete and user didn't explicitly land here to edit, continue to destination
            if (data.isProfileComplete && data.country && data.name) {
              router.push(getLangUrl(callbackUrl));
              return;
            }
          }
        })
        .catch(err => {
          console.error('Error loading profile:', err);
          setName(session?.user?.name || '');
          setEmail(session?.user?.email || '');
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [status, session, router, callbackUrl, getLangUrl]);

  // Filter countries by search query
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES;
    const q = countrySearch.toLowerCase();
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [countrySearch]);

  const selectedCountryObj = useMemo(() => {
    return COUNTRIES.find(c => c.name === country || c.code === country);
  }, [country]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!country.trim()) {
      setError('Please select your country');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          country: selectedCountryObj ? selectedCountryObj.name : country.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save profile');
      }

      // Update NextAuth client session if update method is available
      if (typeof update === 'function') {
        try {
          await update();
        } catch (e) {}
      }

      // Smooth transition to intended destination
      router.push(getLangUrl(callbackUrl));
    } catch (err) {
      setError(err.message || 'An error occurred while saving your profile.');
      setSubmitting(false);
    }
  };

  if (fetching || status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-600 text-sm font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6">
      <Card className="w-full max-w-lg shadow-xl border border-slate-200/90 rounded-2xl p-2 sm:p-4 bg-white animate-in fade-in zoom-in-95 duration-200">
        <CardHeader className="text-center pb-2">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xs border border-blue-100">
            <User className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-slate-500 text-sm mt-1">
            Just a few details before you continue. This is a one-time step.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-xs sm:text-sm animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs sm:text-sm font-semibold text-slate-700">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-sm font-medium"
                />
              </div>
            </div>

            {/* Email (Read-only verified) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="email" className="text-xs sm:text-sm font-semibold text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              </div>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  readOnly
                  disabled
                  value={email}
                  className="h-11 rounded-xl bg-slate-50/80 border-slate-200 text-slate-500 text-sm cursor-not-allowed pr-9 font-medium"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              </div>
              <p className="text-[11px] text-slate-400">
                Synced from your authenticated Google account.
              </p>
            </div>

            {/* Country (Searchable Select Dropdown) */}
            <div className="space-y-1.5 relative">
              <Label className="text-xs sm:text-sm font-semibold text-slate-700">
                Country <span className="text-red-500">*</span>
              </Label>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  className={`w-full h-11 px-3.5 rounded-xl border text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
                    countryDropdownOpen 
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-white' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className={country ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                    {selectedCountryObj ? selectedCountryObj.name : (country || 'Select your country')}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${countryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {countryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="relative mb-2">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country..."
                        autoFocus
                        className="w-full h-9 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div className="max-h-56 overflow-y-auto overscroll-contain space-y-0.5">
                      {filteredCountries.length === 0 ? (
                        <div className="py-4 text-center text-xs text-slate-400">
                          No country matching "{countrySearch}"
                        </div>
                      ) : (
                        filteredCountries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setCountry(c.name);
                              setCountryDropdownOpen(false);
                              setCountrySearch('');
                            }}
                            className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                              country === c.name || country === c.code
                                ? 'bg-blue-50 text-blue-600 font-bold'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{c.name}</span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              {c.code}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <span>Continue</span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CompleteProfilePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    }>
      <CompleteProfileForm />
    </Suspense>
  );
}
