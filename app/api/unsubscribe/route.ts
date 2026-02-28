export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // ========================================
    // FIX: Sanitize email (same as subscribe)
    // This ensures case-insensitive matching
    // ========================================
    const sanitizedEmail = email.trim().toLowerCase()

    // ========================================
    // FIX: Direct database update without .single()
    // More robust - handles missing emails gracefully
    // ========================================
    const { data, error, count } = await supabaseAdmin
      .from('email_subscribers')
      .update({ 
        is_subscribed: false,
        unsubscribed_at: new Date().toISOString() 
      })
      .eq('email', sanitizedEmail)
      .select()

    if (error) {
      console.error('Error unsubscribing email:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to unsubscribe. Please try again.' },
        { status: 500 }
      )
    }

    // Check if any rows were updated
    if (!data || data.length === 0) {
      // Email not found in database - but still return success
      // (Don't reveal whether email exists for privacy)
      return NextResponse.json({ 
        success: true,
        message: 'If this email was subscribed, it has been unsubscribed.' 
      })
    }

    // Successfully unsubscribed
    return NextResponse.json({ 
      success: true,
      message: 'You have been successfully unsubscribed.' 
    })

  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
