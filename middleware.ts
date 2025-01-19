import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define which routes are protected
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/profile'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // If the route is protected, call auth.protect()
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
