export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { unsubscribeEmail } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Unsubscribe the email
    await unsubscribeEmail(email)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully unsubscribed!' 
    })

  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe. Please try again.' },
      { status: 500 }
    )
  }
}