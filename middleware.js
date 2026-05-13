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
    } else {
      // Force allow indexing for all public pages
      // This overrides Clerk and Vercel's default noindex tags in preview/dev
      response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }
    
    return response;
  }
  
  // Fallback: create new response if Clerk didn't return one
  const newResponse = NextResponse.next();
  newResponse.headers.set('X-Robots-Tag', 'index, follow');
  return newResponse;
}


export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
