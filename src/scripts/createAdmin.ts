import bcrypt from 'bcryptjs'
import connect from '../lib/db'
import User from '../models/User'

async function createAdminUser() {
  try {
    await connect()
    
    const adminEmail = 'admin@adeepa.dev'
    const adminPassword = 'admin123' // Change this to a secure password
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    
    // Create admin user (role defaults to 'admin')
    const adminUser = new User({
      name: 'Adeepa Kularathna',
      email: adminEmail,
      password: hashedPassword
    })
    
    await adminUser.save()
    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', adminEmail)
    console.log('🔐 Password:', adminPassword)
    console.log('⚠️  Please change the password after first login!')
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    process.exit(0)
  }
}

createAdminUser()
