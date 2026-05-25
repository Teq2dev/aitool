import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
  // '/submit(.*)',  // Temporarily disabled for testing
]);

// Routes that should NOT be indexed
const isNoIndexRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
]);

// Create the Clerk middleware handler
const clerk = clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

// Wrap Clerk middleware to override X-Robots-Tag
export default async function middleware(req, event) {
  // Run Clerk middleware first
  const response = await clerk(req, event);
  
  // Override X-Robots-Tag based on route
  if (response) {
    const url = req.nextUrl.pathname;
    
    if (url.startsWith('/admin') || url.startsWith('/dashboard') || url.startsWith('/api')) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    
    return response;
  }
  
  return NextResponse.next();
}


export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
