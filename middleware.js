import { NextResponse } from 'next/server';

const VALID_LANGS = ['es', 'fr', 'de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];

export default async function middleware(req) {
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

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-invoke-lang', lang);

    const response = NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
    response.cookies.set('app_lang', lang, { path: '/', maxAge: 31536000, sameSite: 'lax' });
    
    if (targetPath.startsWith('/admin') || targetPath.startsWith('/dashboard')) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    
    return response;
  }

  const response = NextResponse.next();

  if (url.startsWith('/admin') || url.startsWith('/dashboard') || url.startsWith('/api')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
