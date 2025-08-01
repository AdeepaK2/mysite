import { NextRequest, NextResponse } from 'next/server'
import connect from '@/lib/db'
import Blog from '@/models/Blog'

// GET - Get all blog posts
export async function GET() {
  try {
    await connect()
    const blogs = await Blog.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      blogs
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

// POST - Create new blog post
export async function POST(req: NextRequest) {
  try {
    await connect()
    const body = await req.json()
    
    const blog = new Blog(body)
    await blog.save()
    
    return NextResponse.json({
      success: true,
      blog
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
