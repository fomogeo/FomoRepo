import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST() {
  try {
    // Fetch all blog posts with featured images
    const { data: posts, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('id, title, featured_image')
      .not('featured_image', 'is', null)

    if (fetchError) {
      console.error('Error fetching posts:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      )
    }

    const fixed: string[] = []
    const skipped: string[] = []

    // Fix each post
    for (const post of posts) {
      if (!post.featured_image) continue

      // Check if URL is duplicated (contains https:// twice)
      const urlCount = (post.featured_image.match(/https:\/\//g) || []).length

      if (urlCount > 1) {
        // Extract just the first URL
        const firstUrlMatch = post.featured_image.match(/(https:\/\/[^h]+)/)
        if (firstUrlMatch) {
          const cleanUrl = firstUrlMatch[1]

          // Update the post
          const { error: updateError } = await supabaseAdmin
            .from('blog_posts')
            .update({ featured_image: cleanUrl })
            .eq('id', post.id)

          if (updateError) {
            console.error(`Error updating post ${post.id}:`, updateError)
          } else {
            fixed.push(post.title)
          }
        }
      } else {
        skipped.push(post.title)
      }
    }

    return NextResponse.json({
      success: true,
      fixed: fixed.length,
      skipped: skipped.length,
      details: {
        fixed,
        skipped,
      },
    })
  } catch (error) {
    console.error('Fix URLs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
