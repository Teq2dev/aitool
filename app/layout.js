import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Sparkles, LayoutGrid, Upload, User } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Tools Directory - Discover the Best AI Tools',
  description: 'Browse 3000+ AI Tools across multiple categories. Find the perfect AI tool for your needs.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
              <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                  <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl text-black">AI Directory</span>
                  </Link>

                  <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/tools" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                      Browse Tools
                    </Link>
                    <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                      Categories
                    </Link>
                    <SignedIn>
                      <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                        My Dashboard
                      </Link>
                      <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                        Admin
                      </Link>
                    </SignedIn>
                  </nav>

                  <div className="flex items-center gap-3">
                    <SignedIn>
                      <Link href="/submit">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Upload className="w-4 h-4 mr-2" />
                          Submit Tool
                        </Button>
                      </Link>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Sign Up
                        </Button>
                      </SignUpButton>
                    </SignedOut>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t bg-gray-50 mt-20">
              <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-lg">AI Directory</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Discover and explore the best AI tools for your needs.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Platform</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><Link href="/tools" className="hover:text-blue-600">Browse Tools</Link></li>
                      <li><Link href="/categories" className="hover:text-blue-600">Categories</Link></li>
                      <li><Link href="/submit" className="hover:text-blue-600">Submit Tool</Link></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Resources</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                      <li><a href="#" className="hover:text-blue-600">Contact</a></li>
                      <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Connect</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="#" className="hover:text-blue-600">Twitter</a></li>
                      <li><a href="#" className="hover:text-blue-600">LinkedIn</a></li>
                      <li><a href="#" className="hover:text-blue-600">GitHub</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
                  <p>© 2025 AI Directory. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}