export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

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

    // Sanitize email
    const sanitizedEmail = email.trim().toLowerCase()

    // ========================================
    // FIX: Check if email exists first
    // Then handle appropriately
    // ========================================
    
    // Step 1: Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabaseAdmin
      .from('email_subscribers')
      .select('*')
      .eq('email', sanitizedEmail)
      .maybeSingle() // Returns null if not found, no error

    if (checkError) {
      console.error('Error checking email:', checkError)
      return NextResponse.json(
        { success: false, error: 'Database error. Please try again.' },
        { status: 500 }
      )
    }

    // Step 2: Handle based on whether email exists and subscription status
    if (existingSubscriber) {
      // Email exists in database
      if (existingSubscriber.is_subscribed) {
        // Already subscribed and active
        return NextResponse.json({ 
          success: true,
          already: true,
          message: 'You\'re already subscribed to our newsletter!'
        })
      } else {
        // Exists but unsubscribed - resubscribe them
        const { error: updateError } = await supabaseAdmin
          .from('email_subscribers')
          .update({ 
            is_subscribed: true,
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null
          })
          .eq('email', sanitizedEmail)

        if (updateError) {
          console.error('Error resubscribing:', updateError)
          return NextResponse.json(
            { success: false, error: 'Failed to resubscribe. Please try again.' },
            { status: 500 }
          )
        }

        return NextResponse.json({ 
          success: true,
          already: true,
          message: 'Welcome back! You\'ve been resubscribed to our newsletter.'
        })
      }
    } else {
      // Step 3: New subscriber - insert new record
      const { error: insertError } = await supabaseAdmin
        .from('email_subscribers')
        .insert([{ 
          email: sanitizedEmail,
          is_subscribed: true,
          subscribed_at: new Date().toISOString()
        }])

      if (insertError) {
        console.error('Error inserting subscriber:', insertError)
        
        // Handle race condition - email might have been inserted between check and insert
        if (insertError.code === '23505') { // Unique violation
          // Try updating instead
          const { error: updateError } = await supabaseAdmin
            .from('email_subscribers')
            .update({ 
              is_subscribed: true,
              subscribed_at: new Date().toISOString(),
              unsubscribed_at: null
            })
            .eq('email', sanitizedEmail)

          if (updateError) {
            return NextResponse.json(
              { success: false, error: 'Failed to subscribe. Please try again.' },
              { status: 500 }
            )
          }

          return NextResponse.json({ 
            success: true,
            message: 'Successfully subscribed! Check your inbox for exclusive deals.'
          })
        }

        return NextResponse.json(
          { success: false, error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        )
      }

      return NextResponse.json({ 
        success: true,
        message: 'Successfully subscribed! Check your inbox for exclusive deals.'
      })
    }

  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
