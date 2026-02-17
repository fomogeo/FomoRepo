export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { subscribeEmail } from '@/lib/supabase'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

function sanitize(email: string): string {
  return email.trim().toLowerCase().replace(/['";\\\*<>]/g, '').slice(0, 254)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const raw: string = body?.email ?? ''

    // Sanitize input
    const email = sanitize(raw)

    // Validate
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const result = await subscribeEmail(email)

    // Already subscribed
    if (result.already) {
      return NextResponse.json({ success: true, already: true })
    }

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
