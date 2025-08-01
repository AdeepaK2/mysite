import { NextRequest, NextResponse } from 'next/server'
import connect from '@/lib/db'
import Blog from '@/models/Blog'

// GET - Get all blog posts
export async function GET() {
  try {
    await connect()
    const posts = await Blog.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      posts
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST - Create new blog post
export async function POST(req: NextRequest) {
  try {
    await connect()
    const body = await req.json()
    
    const post = new Blog(body)
    await post.save()
    
    return NextResponse.json({
      success: true,
      post
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
