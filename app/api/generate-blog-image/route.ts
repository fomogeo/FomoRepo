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

    console.log(`[Image Gen] Starting for post: ${blogPostId}`)

    // Generate image prompt from blog title and excerpt
    const prompt = `Create a professional, modern, eye-catching blog header image for an article titled: "${title}". ${excerpt ? `The article is about: ${excerpt.substring(0, 150)}` : ''}. Style: clean, professional, tech/business aesthetic, vibrant colors, no text in image.`

    // Step 1: Generate image with DALL-E
    console.log('[Image Gen] Calling OpenAI DALL-E...')
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
        size: '1792x1024',
        quality: 'standard',
      }),
    })

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json()
      console.error('[Image Gen] OpenAI error:', error)
      return NextResponse.json(
        { error: 'Failed to generate image', details: error },
        { status: 500 }
      )
    }

    const data = await openaiResponse.json()
    const temporaryImageUrl = data.data[0].url
    console.log('[Image Gen] ✅ Image generated (temporary URL)')

    // Step 2: Download the image from OpenAI (they expire in 1-2 hours!)
    console.log('[Image Gen] Downloading image from OpenAI...')
    const imageResponse = await fetch(temporaryImageUrl)
    
    if (!imageResponse.ok) {
      console.error('[Image Gen] Failed to download image')
      return NextResponse.json(
        { error: 'Failed to download generated image' },
        { status: 500 }
      )
    }

    const imageBuffer = await imageResponse.arrayBuffer()
    console.log('[Image Gen] ✅ Image downloaded')

    // Step 3: Upload to Supabase Storage (PERMANENT!)
    const fileName = `blog-${blogPostId}-${Date.now()}.png`
    const filePath = `${fileName}`

    console.log('[Image Gen] Uploading to Supabase Storage...')
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(filePath, imageBuffer, {
        contentType: 'image/png',
        cacheControl: '31536000', // Cache for 1 year
        upsert: false,
      })

    if (uploadError) {
      console.error('[Image Gen] Supabase upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload image to storage', details: uploadError.message },
        { status: 500 }
      )
    }

    console.log('[Image Gen] ✅ Image uploaded to Supabase Storage')

    // Step 4: Get the permanent public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(filePath)

    console.log('[Image Gen] ✅ Permanent URL:', publicUrl)

    // Step 5: Update blog post with permanent image URL
    const { error: updateError } = await supabaseAdmin
      .from('blog_posts')
      .update({ featured_image: publicUrl })
      .eq('id', blogPostId)

    if (updateError) {
      console.error('[Image Gen] Database update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      )
    }

    console.log('[Image Gen] ✅ Database updated with permanent URL')

    return NextResponse.json({
      success: true,
      imageUrl: publicUrl,
      blogPostId,
      message: 'Image generated and saved permanently!',
    })
  } catch (error) {
    console.error('[Image Gen] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
