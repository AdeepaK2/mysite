import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dimensions: string[] }> }
) {
  try {
    // Await the params since it's now a Promise in Next.js 15+
    const resolvedParams = await params;
    
    // Parse dimensions from URL path
    const [width = '400', height = '300'] = resolvedParams.dimensions || [];
    const w = Math.min(parseInt(width), 1200); // Max width 1200px
    const h = Math.min(parseInt(height), 800);  // Max height 800px

    // Create a simple SVG placeholder
    const svg = `
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" stroke-width="1" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#1f2937"/>
        <rect width="100%" height="100%" fill="url(#grid)"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
          ${w} × ${h}
        </text>
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">
          Image not available
        </text>
      </svg>
    `.trim();

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating placeholder:', error);
    
    // Fallback minimal SVG
    const fallbackSvg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1f2937"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
          No Image
        </text>
      </svg>
    `.trim();

    return new NextResponse(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }
}
