export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { subscribeEmail, checkEmailExists } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await checkEmailExists(email)
    
    if (existing.exists) {
      if (existing.isSubscribed) {
        return NextResponse.json({ 
          success: true, 
          already: true,
          message: 'This email is already subscribed' 
        })
      } else {
        // Resubscribe
        const result = await subscribeEmail(email)
        
        if (result.success) {
          return NextResponse.json({ 
            success: true, 
            message: 'Successfully resubscribed!' 
          })
        } else {
          return NextResponse.json(
            { success: false, error: result.error || 'Failed to resubscribe' },
            { status: 500 }
          )
        }
      }
    }

    // Subscribe new email
    const result = await subscribeEmail(email)

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed!' 
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to subscribe' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
