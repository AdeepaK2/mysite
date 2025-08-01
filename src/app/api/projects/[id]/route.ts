import { NextRequest, NextResponse } from 'next/server'
import connect from '@/lib/db'
import Project from '@/models/Project'
import { validateApiKey, apiResponses } from '@/lib/auth'

// GET - Get single project by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate API key
    if (!validateApiKey(req)) {
      return NextResponse.json(
        apiResponses.invalidApiKey,
        { status: apiResponses.invalidApiKey.status }
      );
    }

    // Await the params since it's now a Promise in Next.js 15+
    const resolvedParams = await params;
    
    await connect()
    const project = await Project.findById(resolvedParams.id)
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      project
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// PUT - Update project by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate API key
    if (!validateApiKey(req)) {
      return NextResponse.json(
        apiResponses.invalidApiKey,
        { status: apiResponses.invalidApiKey.status }
      );
    }
    // Validate API key
    if (!validateApiKey(req)) {
      return NextResponse.json(
        apiResponses.invalidApiKey,
        { status: apiResponses.invalidApiKey.status }
      );
    }

    // Await the params since it's now a Promise in Next.js 15+
    const resolvedParams = await params;

    await connect()
    const body = await req.json()
    
    // Handle startDate - expect {month: number, year: number} or null
    if (body.startDate && typeof body.startDate === 'object' && body.startDate.month && body.startDate.year) {
      // Validate month and year
      const month = parseInt(body.startDate.month)
      const year = parseInt(body.startDate.year)
      
      if (month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
        body.startDate = { month, year }
      } else {
        body.startDate = null
      }
    } else {
      body.startDate = null
    }
    
    // Handle endDate - expect {month: number, year: number} or null
    if (body.endDate && typeof body.endDate === 'object' && body.endDate.month && body.endDate.year) {
      // Validate month and year
      const month = parseInt(body.endDate.month)
      const year = parseInt(body.endDate.year)
      
      if (month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
        body.endDate = { month, year }
      } else {
        body.endDate = null
      }
    } else {
      body.endDate = null
    }
    
    const project = await Project.findByIdAndUpdate(
      resolvedParams.id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      project
    })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE - Delete project by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate API key
    if (!validateApiKey(req)) {
      return NextResponse.json(
        apiResponses.invalidApiKey,
        { status: apiResponses.invalidApiKey.status }
      );
    }
    
    // Await the params since it's now a Promise in Next.js 15+
    const resolvedParams = await params;
    
    await connect()
    const project = await Project.findByIdAndDelete(resolvedParams.id)
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
