import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/tools(.*)',
  '/categories(.*)',
  '/blogs(.*)',
  '/api/tools(.*)',
  '/api/categories(.*)',
  '/api/blogs(.*)',
  '/api/featured(.*)',
  '/api/trending(.*)',
  '/api/featured-blogs(.*)',
  '/api/init(.*)',
  '/api',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};