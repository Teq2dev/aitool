'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Sparkles, Upload, ShoppingBag } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isSignedIn) {
        try {
          const res = await fetch('/api/admin/check');
          const data = await res.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
  }, [isSignedIn]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" prefetch={true}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-black hidden sm:inline">Best AI Tools Free</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/tools" 
              className={`transition-colors font-medium ${pathname === '/tools' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              prefetch={true}
            >
              Browse Tools
            </Link>
            <Link 
              href="/categories" 
              className={`transition-colors font-medium ${pathname === '/categories' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              prefetch={true}
            >
              Categories
            </Link>
            <Link 
              href="/blogs" 
              className={`transition-colors font-medium ${pathname === '/blogs' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              prefetch={true}
            >
              Blogs
            </Link>
            {/* Shop with discount badge */}
            <Link 
              href="/shop" 
              className={`relative transition-colors font-medium flex items-center gap-1 ${pathname === '/shop' || pathname.startsWith('/shop/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              prefetch={true}
            >
              <ShoppingBag className="w-4 h-4" />
              Shop
              <span className="absolute -top-2 -right-8 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                80% OFF
              </span>
            </Link>
            <SignedIn>
              <Link 
                href="/dashboard" 
                className={`transition-colors font-medium ${pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                prefetch={true}
              >
                My Dashboard
              </Link>
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className={`transition-colors font-medium ${pathname === '/admin' ? 'text-blue-600' : 'text-blue-700 hover:text-blue-600'}`}
                  prefetch={true}
                >
                  Admin
                </Link>
              )}
            </SignedIn>
          </nav>

          <div className="flex items-center gap-3">
            <SignedIn>
              <Link href="/submit" prefetch={true}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Tool
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              {/* Submit Tool button for non-authenticated users */}
              <SignInButton 
                mode="modal" 
                redirectUrl="/submit"
                signUpUrl="/sign-up"
              >
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Tool
                </Button>
              </SignInButton>
              
              {/* Single Sign In button */}
              <SignInButton 
                mode="modal"
                signUpUrl="/sign-up"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}