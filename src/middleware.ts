import {
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

const isProtectedRoutes = createRouteMatcher(['/about'])

export default clerkMiddleware(
  async (auth: ClerkMiddlewareAuth, request: NextRequest) => {
    const { protect } = auth()
    if (!isProtectedRoutes(request)) {
      return
    }
    protect()
  }
)
