export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { subscribeEmail } from '@/lib/supabase'

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

    // Subscribe the email
    const result = await subscribeEmail(email)
    
    if (result.already) {
      return NextResponse.json({ 
        success: true, 
        message: 'You are already subscribed!' 
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed!' 
    })

  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}