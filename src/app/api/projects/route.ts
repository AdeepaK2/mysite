import { NextRequest, NextResponse } from 'next/server'
import connect from '@/lib/db'
import Project from '@/models/Project'

// GET - Get all projects
export async function GET() {
  try {
    await connect()
    const projects = await Project.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      projects
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST - Create new project
export async function POST(req: NextRequest) {
  try {
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
    
    const project = new Project(body)
    await project.save()
    
    return NextResponse.json({
      success: true,
      project
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
