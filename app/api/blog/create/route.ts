import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, excerpt, author, tags, is_published } = body

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      )
    }

    console.log(`[Blog Create] Creating post: ${title}`)

    // Step 1: Create the blog post (without image first)
    const { data: post, error: createError } = await supabaseAdmin
      .from('blog_posts')
      .insert([
        {
          title,
          slug,
          content,
          excerpt: excerpt || null,
          author: author || 'FomoGeo Team',
          tags: tags || [],
          is_published: is_published !== false,
          published_at: is_published !== false ? new Date().toISOString() : null,
        },
      ])
      .select()
      .single()

    if (createError) {
      console.error('[Blog Create] Error creating post:', createError)
      return NextResponse.json(
        { error: 'Failed to create blog post', details: createError.message },
        { status: 500 }
      )
    }

    console.log(`[Blog Create] ✅ Post created with ID: ${post.id}`)

    // Step 2: Generate and save image permanently
    console.log('[Blog Create] Generating permanent image...')
    
    try {
      const prompt = `Create a professional, modern, eye-catching blog header image for an article titled: "${title}". ${excerpt ? `The article is about: ${excerpt.substring(0, 150)}` : ''}. Style: clean, professional, tech/business aesthetic, vibrant colors, no text in image.`

      // Generate image with DALL-E
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

      if (openaiResponse.ok) {
        const imageData = await openaiResponse.json()
        const temporaryImageUrl = imageData.data[0].url

        // Download image from OpenAI
        const imageResponse = await fetch(temporaryImageUrl)
        if (imageResponse.ok) {
          const imageBuffer = await imageResponse.arrayBuffer()

          // Upload to Supabase Storage (PERMANENT)
          const fileName = `blog-${post.id}-${Date.now()}.png`
          const { error: uploadError } = await supabaseAdmin.storage
            .from('blog-images')
            .upload(fileName, imageBuffer, {
              contentType: 'image/png',
              cacheControl: '31536000',
              upsert: false,
            })

          if (!uploadError) {
            // Get permanent public URL
            const { data: { publicUrl } } = supabaseAdmin.storage
              .from('blog-images')
              .getPublicUrl(fileName)

            // Update blog post with permanent URL
            const { error: updateError } = await supabaseAdmin
              .from('blog_posts')
              .update({ featured_image: publicUrl })
              .eq('id', post.id)

            if (!updateError) {
              console.log(`[Blog Create] ✅ Permanent image saved: ${publicUrl}`)
              post.featured_image = publicUrl
            } else {
              console.error('[Blog Create] Failed to update image URL:', updateError)
            }
          } else {
            console.error('[Blog Create] Failed to upload to storage:', uploadError)
          }
        }
      } else {
        const error = await openaiResponse.json()
        console.error('[Blog Create] OpenAI error:', error)
      }
    } catch (imageError) {
      console.error('[Blog Create] Image generation error:', imageError)
      // Don't fail the whole request - post was created successfully
    }

    return NextResponse.json({
      success: true,
      post,
      message: post.featured_image 
        ? 'Blog post created with permanent image!' 
        : 'Blog post created (image generation pending)',
    })
  } catch (error) {
    console.error('[Blog Create] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
