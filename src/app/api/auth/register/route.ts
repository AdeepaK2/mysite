import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connect from '@/lib/db'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, adminKey } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Security check: Only allow admin creation with a special key
    if (adminKey !== process.env.ADMIN_CREATION_KEY) {
      return NextResponse.json(
        { error: 'Invalid admin creation key' },
        { status: 403 }
      )
    }

    // Connect to database
    await connect()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create admin user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    })

    await user.save()

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user.toObject()

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('User creation error:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
