import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const VALID_LANGS = ['es', 'fr', 'de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
]);

const clerk = clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export default async function middleware(req, event) {
  const url = req.nextUrl.pathname;
  const segments = url.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // Check if first segment is a language prefix (e.g. /fr, /es, /fr/tools/midjourney)
  if (VALID_LANGS.includes(firstSegment)) {
    const lang = firstSegment;
    const remainingSegments = segments.slice(1);
    const targetPath = '/' + remainingSegments.join('/');
    
    const rewriteUrl = new URL(targetPath, req.url);
    rewriteUrl.searchParams.set('lang', lang);
    
    req.nextUrl.searchParams.forEach((value, key) => {
      if (key !== 'lang') rewriteUrl.searchParams.set(key, value);
    });

    const response = NextResponse.rewrite(rewriteUrl);
    response.cookies.set('app_lang', lang, { path: '/', maxAge: 31536000, sameSite: 'lax' });
    
    if (targetPath.startsWith('/admin') || targetPath.startsWith('/dashboard')) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    
    return response;
  }

  // Run Clerk middleware for normal routes
  const response = await clerk(req, event);
  
  if (response) {
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
