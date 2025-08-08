import { NextRequest, NextResponse } from 'next/server';

// Validate X-API-KEY for public API routes
export function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.X_API_KEY;
  
  if (!validApiKey) {
    console.error('X_API_KEY not configured in environment variables');
    return false;
  }
  
  return apiKey === validApiKey;
}

// Check if the route is an admin route
export function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/api/admin');
}

// Check if the route should be protected with API key
export function requiresApiKey(pathname: string): boolean {
  // Routes that don't require API key validation
  const publicRoutes = [
    '/api/auth',        // NextAuth routes
    '/api/admin',       // Admin routes (use admin auth instead)
    '/api/file/download', // File download route (images need to be publicly accessible)
    '/api/projects',    // Projects API (used by admin, no API key needed)
    '/api/contact',     // Contact API (used by admin, no API key needed)
  ];
  
  // Check if it's a public route
  return !publicRoutes.some(route => pathname.startsWith(route));
}

// Wrapper function for API routes to validate API key
export function withApiKeyValidation(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    // Skip validation for admin routes
    if (isAdminRoute(req.nextUrl.pathname)) {
      return handler(req);
    }
    
    // Validate API key for other routes
    if (requiresApiKey(req.nextUrl.pathname)) {
      if (!validateApiKey(req)) {
        return NextResponse.json(
          apiResponses.unauthorized,
          { status: apiResponses.unauthorized.status }
        );
      }
    }
    
    return handler(req);
  };
}

// Create standardized error responses
export const apiResponses = {
  unauthorized: {
    error: 'Unauthorized',
    message: 'Valid X-API-KEY header is required',
    status: 401
  },
  forbidden: {
    error: 'Forbidden',
    message: 'Access denied',
    status: 403
  },
  serverError: {
    error: 'Internal Server Error',
    message: 'Something went wrong',
    status: 500
  },
  invalidApiKey: {
    error: 'Invalid API Key',
    message: 'The provided X-API-KEY is invalid or missing',
    status: 401
  }
};
