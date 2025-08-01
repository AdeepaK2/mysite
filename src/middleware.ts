import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'
import { validateApiKey, isAdminRoute, requiresApiKey, apiResponses } from './lib/auth'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    
    // Handle API routes
    if (pathname.startsWith('/api')) {
      // Admin routes use NextAuth, skip API key validation
      if (isAdminRoute(pathname)) {
        return NextResponse.next()
      }
      
      // Other API routes require X-API-KEY
      if (requiresApiKey(pathname)) {
        if (!validateApiKey(req)) {
          return NextResponse.json(
            apiResponses.unauthorized,
            { status: apiResponses.unauthorized.status }
          )
        }
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is trying to access admin routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          // Allow access to login page
          if (req.nextUrl.pathname === "/admin/login") {
            return true
          }
          // For other admin routes, check if user is admin
          return token?.role === "admin"
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"]
}
