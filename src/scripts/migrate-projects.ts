/**
 * Migration script to add startDate and endDate fields to existing projects
 * Run this script when deploying schema changes
 */

import mongoose from 'mongoose'
import connect from '@/lib/db'

async function migrateProjects() {
  try {
    console.log('🚀 Starting project migration...')
    
    // Connect to database
    await connect()
    console.log('✅ Connected to database')
    
    // Get the raw collection to bypass schema validation
    const db = mongoose.connection.db
    const projectsCollection = db?.collection('projects')
    
    if (!projectsCollection) {
      throw new Error('Projects collection not found')
    }
    
    // Find projects without startDate or endDate fields
    const projectsToMigrate = await projectsCollection.find({
      $or: [
        { startDate: { $exists: false } },
        { endDate: { $exists: false } }
      ]
    }).toArray()
    
    console.log(`📝 Found ${projectsToMigrate.length} projects to migrate`)
    
    if (projectsToMigrate.length === 0) {
      console.log('✅ No projects need migration')
      return
    }
    
    // Update projects to add the new fields
    const result = await projectsCollection.updateMany(
      {
        $or: [
          { startDate: { $exists: false } },
          { endDate: { $exists: false } }
        ]
      },
      {
        $set: {
          startDate: null,
          endDate: null
        }
      }
    )
    
    console.log(`✅ Migration completed! Updated ${result.modifiedCount} projects`)
    
    // Verify the migration
    const verifyCount = await projectsCollection.countDocuments({
      startDate: { $exists: true },
      endDate: { $exists: true }
    })
    
    console.log(`🔍 Verification: ${verifyCount} projects now have date fields`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  } finally {
    // Close connection
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateProjects()
    .then(() => {
      console.log('🎉 Migration script completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error)
      process.exit(1)
    })
}

export default migrateProjects
