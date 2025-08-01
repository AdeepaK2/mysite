import { NextRequest, NextResponse } from 'next/server'
import connect from '@/lib/db'
import Project from '@/models/Project'

// POST - Migrate existing projects to new schema
export async function POST() {
  try {
    await connect()
    
    // Find all projects that might have old Date format
    const projects = await Project.find({})
    
    let migratedCount = 0
    let errors = []
    
    for (const project of projects) {
      try {
        let needsUpdate = false
        const updateData: any = {}
        
        // Check and convert startDate
        if (project.startDate) {
          if (project.startDate instanceof Date) {
            // Convert Date to {month, year} format
            updateData.startDate = {
              month: project.startDate.getMonth() + 1, // getMonth() returns 0-11, we want 1-12
              year: project.startDate.getFullYear()
            }
            needsUpdate = true
          } else if (typeof project.startDate === 'string') {
            // Handle string dates
            const date = new Date(project.startDate)
            if (!isNaN(date.getTime())) {
              updateData.startDate = {
                month: date.getMonth() + 1,
                year: date.getFullYear()
              }
              needsUpdate = true
            } else {
              updateData.startDate = null
              needsUpdate = true
            }
          }
          // If it's already in the correct format {month, year}, leave it as is
        }
        
        // Check and convert endDate
        if (project.endDate) {
          if (project.endDate instanceof Date) {
            // Convert Date to {month, year} format
            updateData.endDate = {
              month: project.endDate.getMonth() + 1,
              year: project.endDate.getFullYear()
            }
            needsUpdate = true
          } else if (typeof project.endDate === 'string') {
            // Handle string dates
            const date = new Date(project.endDate)
            if (!isNaN(date.getTime())) {
              updateData.endDate = {
                month: date.getMonth() + 1,
                year: date.getFullYear()
              }
              needsUpdate = true
            } else {
              updateData.endDate = null
              needsUpdate = true
            }
          }
          // If it's already in the correct format {month, year}, leave it as is
        }
        
        // Update the project if needed
        if (needsUpdate) {
          await Project.findByIdAndUpdate(
            project._id,
            updateData,
            { new: true, runValidators: true }
          )
          migratedCount++
        }
        
      } catch (projectError) {
        console.error(`Error migrating project ${project._id}:`, projectError)
        errors.push({
          projectId: project._id,
          title: project.title,
          error: projectError instanceof Error ? projectError.message : 'Unknown error'
        })
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Migration completed successfully`,
      totalProjects: projects.length,
      migratedProjects: migratedCount,
      errors: errors.length > 0 ? errors : undefined
    })
    
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Migration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET - Check migration status
export async function GET() {
  try {
    await connect()
    
    const projects = await Project.find({})
    
    let oldFormatCount = 0
    let newFormatCount = 0
    let nullDateCount = 0
    
    projects.forEach(project => {
      // Check startDate format
      if (project.startDate) {
        if (project.startDate instanceof Date || typeof project.startDate === 'string') {
          oldFormatCount++
        } else if (typeof project.startDate === 'object' && project.startDate.month && project.startDate.year) {
          newFormatCount++
        }
      } else {
        nullDateCount++
      }
    })
    
    return NextResponse.json({
      success: true,
      totalProjects: projects.length,
      oldFormatProjects: oldFormatCount,
      newFormatProjects: newFormatCount,
      nullDateProjects: nullDateCount,
      migrationNeeded: oldFormatCount > 0
    })
    
  } catch (error) {
    console.error('Error checking migration status:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to check migration status' },
      { status: 500 }
    )
  }
}
