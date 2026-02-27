// Script to generate AI images for all blog posts without featured images
// Run with: node scripts/generate-blog-images.js

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'

async function generateBlogImages() {
  console.log('🎨 Starting blog image generation...')

  try {
    // Fetch all blog posts without featured images
    const response = await fetch(`${VERCEL_URL}/api/blog/get-posts-without-images`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts')
    }

    const { posts } = await response.json()

    if (!posts || posts.length === 0) {
      console.log('✅ All blog posts already have images!')
      return
    }

    console.log(`📝 Found ${posts.length} blog posts without images`)

    // Generate images for each post
    for (const post of posts) {
      console.log(`\n🖼️  Generating image for: "${post.title}"`)
      
      try {
        const generateResponse = await fetch(`${VERCEL_URL}/api/generate-blog-image`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blogPostId: post.id,
            title: post.title,
            excerpt: post.excerpt,
          }),
        })

        if (generateResponse.ok) {
          const result = await generateResponse.json()
          console.log(`   ✅ Generated: ${result.imageUrl}`)
        } else {
          const error = await generateResponse.json()
          console.error(`   ❌ Failed: ${error.error}`)
        }

        // Wait 2 seconds between requests to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}`)
      }
    }

    console.log('\n🎉 Blog image generation complete!')
  } catch (error) {
    console.error('❌ Script failed:', error)
  }
}

generateBlogImages()
