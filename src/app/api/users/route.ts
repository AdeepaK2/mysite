import { NextRequest, NextResponse } from 'next/server'
import connect from '@/lib/db'
import User from '@/models/User'
import { validateApiKey, apiResponses } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    // Validate API key
    if (!validateApiKey(req)) {
      return NextResponse.json(
        apiResponses.invalidApiKey,
        { status: apiResponses.invalidApiKey.status }
      );
    }

    // Connect to database
    await connect()

    // Get all users (without passwords)
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 })

    return NextResponse.json(
      { 
        message: 'Users retrieved successfully',
        users,
        count: users.length
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Error fetching users:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
