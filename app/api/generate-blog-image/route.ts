import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { blogPostId, title, excerpt } = await request.json()

    if (!blogPostId || !title) {
      return NextResponse.json(
        { error: 'Blog post ID and title are required' },
        { status: 400 }
      )
    }

    // Generate image prompt from blog title and excerpt
    const prompt = `Create a professional, modern, eye-catching blog header image for an article titled: "${title}". ${excerpt ? `The article is about: ${excerpt.substring(0, 150)}` : ''}. Style: clean, professional, tech/business aesthetic, vibrant colors, no text in image.`

    // Call OpenAI DALL-E API to generate image
    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1792x1024', // Wide format for blog headers
        quality: 'standard',
      }),
    })

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json()
      console.error('OpenAI API error:', error)
      return NextResponse.json(
        { error: 'Failed to generate image', details: error },
        { status: 500 }
      )
    }

    const data = await openaiResponse.json()
    const imageUrl = data.data[0].url

    // Update blog post with generated image URL
    const { error: updateError } = await supabaseAdmin
      .from('blog_posts')
      .update({ featured_image: imageUrl })
      .eq('id', blogPostId)

    if (updateError) {
      console.error('Database update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      blogPostId,
    })
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
