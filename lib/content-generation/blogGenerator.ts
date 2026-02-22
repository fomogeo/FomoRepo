/**
 * AI BLOG POST GENERATOR
 * 
 * This library uses OpenAI to automatically generate SEO-optimized blog posts
 * about your products and trending topics.
 * 
 * Features:
 * - Keyword-optimized content
 * - Product recommendations
 * - Comparison articles
 * - Buying guides
 * - Seasonal content
 */

import { supabaseAdmin } from '@/lib/supabase'
import { getTrendingCategories, CATEGORIES } from '@/lib/categories/categories'

interface BlogPostConfig {
  type: 'product-review' | 'buying-guide' | 'comparison' | 'top-10' | 'how-to'
  category?: string
  keywords?: string[]
  products?: any[]
  minWords?: number
}

/**
 * Generate a complete blog post using AI
 */
export async function generateBlogPost(config: BlogPostConfig) {
  const { type, category, keywords, products, minWords = 1500 } = config

  // Get OpenAI API key
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  // Generate content based on type
  let prompt = ''
  let title = ''

  // Add variety to titles - weekly, monthly, seasonal, themed
  const now = new Date()
  const month = now.toLocaleDateString('en', { month: 'long' })
  const year = now.getFullYear()
  const weekNumber = Math.ceil((now.getDate() + new Date(year, now.getMonth(), 1).getDay()) / 7)
  const season = ['Winter', 'Winter', 'Spring', 'Spring', 'Spring', 'Summer', 'Summer', 'Summer', 'Fall', 'Fall', 'Fall', 'Winter'][now.getMonth()]
  const quarter = `Q${Math.floor(now.getMonth() / 3) + 1}`
  
  // Title variations for more uniqueness
  const titleVariations = {
    'top-10-weekly': `Top 10 ${category} Products This Week (Week ${weekNumber})`,
    'top-10-monthly': `Best ${category} Products of ${month} ${year}`,
    'top-10-seasonal': `Top ${category} Picks for ${season} ${year}`,
    'top-10-quarterly': `Best ${category} Products ${quarter} ${year}`,
    'top-10-budget': `Top 10 Budget-Friendly ${category} Products`,
    'top-10-premium': `Best Premium ${category} Products Worth the Money`,
    'top-10-trending': `10 Trending ${category} Products Everyone's Buying`,
    
    'buying-guide-seasonal': `${category} Buying Guide for ${season} ${year}`,
    'buying-guide-budget': `How to Choose ${category} on a Budget`,
    'buying-guide-premium': `Premium ${category} Buying Guide: What to Look For`,
    'buying-guide-beginners': `${category} for Beginners: Complete Buying Guide`,
    'buying-guide-expert': `Expert's Guide to Choosing ${category}`,
    
    'how-to-seasonal': `How to Choose ${category} for ${season}`,
    'how-to-budget': `How to Find Quality ${category} Without Breaking the Bank`,
    'how-to-compare': `How to Compare ${category}: Key Features to Consider`,
  }

  switch (type) {
    case 'top-10':
      // Randomly select variation for uniqueness
      const top10Variations = [
        'top-10-weekly',
        'top-10-monthly', 
        'top-10-seasonal',
        'top-10-quarterly',
        'top-10-budget',
        'top-10-premium',
        'top-10-trending'
      ]
      const selectedTop10 = top10Variations[Math.floor(Math.random() * top10Variations.length)]
      title = titleVariations[selectedTop10]
      prompt = await generateTop10Prompt(category, products, keywords)
      break

    case 'buying-guide':
      const buyingGuideVariations = [
        'buying-guide-seasonal',
        'buying-guide-budget',
        'buying-guide-premium',
        'buying-guide-beginners',
        'buying-guide-expert'
      ]
      const selectedGuide = buyingGuideVariations[Math.floor(Math.random() * buyingGuideVariations.length)]
      title = titleVariations[selectedGuide]
      prompt = await generateBuyingGuidePrompt(category, keywords)
      break

    case 'comparison':
      prompt = await generateComparisonPrompt(products, keywords)
      title = `${products?.[0]?.name} vs ${products?.[1]?.name}: Which Should You Buy?`
      break

    case 'product-review':
      prompt = await generateProductReviewPrompt(products?.[0], keywords)
      // Add variety to review titles
      const reviewVariations = [
        `${products?.[0]?.name} Review: Is It Worth Buying?`,
        `${products?.[0]?.name}: Honest Review & Pros/Cons`,
        `Is ${products?.[0]?.name} Worth the Hype? Our Review`,
        `${products?.[0]?.name} Review (${month} ${year})`,
      ]
      title = reviewVariations[Math.floor(Math.random() * reviewVariations.length)]
      break

    case 'how-to':
      const howToVariations = [
        'how-to-seasonal',
        'how-to-budget',
        'how-to-compare'
      ]
      const selectedHowTo = howToVariations[Math.floor(Math.random() * howToVariations.length)]
      title = titleVariations[selectedHowTo]
      prompt = await generateHowToPrompt(category, keywords)
      break

    default:
      throw new Error('Invalid blog post type')
  }

  // Call OpenAI API
  const content = await callOpenAI(prompt, minWords)

  // Generate excerpt
  const excerpt = content.substring(0, 200) + '...'

  // Generate slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return {
    title,
    slug,
    content,
    excerpt,
    tags: keywords || [category?.toLowerCase() || 'deals'],
  }
}

/**
 * Generate "Top 10" article prompt
 */
async function generateTop10Prompt(
  category: string = 'Electronics',
  products: any[] = [],
  keywords: string[] = []
): Promise<string> {
  // If no products provided, fetch from database
  if (products.length === 0) {
    const { data } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_trending', true)
      .limit(10)

    products = data || []
  }

  const productList = products.map((p, i) => 
    `${i + 1}. ${p.name} - $${p.price}${p.discount_percentage ? ` (${p.discount_percentage}% off)` : ''}`
  ).join('\n')

  return `Write a comprehensive, SEO-optimized blog post titled "Top 10 ${category} Products of ${new Date().getFullYear()}".

Target keywords: ${keywords.join(', ')}

Products to feature:
${productList}

Requirements:
1. Write at least 1,500 words
2. Start with an engaging introduction (150 words)
3. For each product, write 120-150 words covering:
   - Key features
   - Pros and cons
   - Who it's best for
   - Why we recommend it
4. Include a comparison table
5. Add a "How to Choose" section
6. End with a conclusion and FAQ section
7. Use natural language, not robotic
8. Be helpful and honest
9. Include transition words for readability
10. Optimize for SEO without keyword stuffing

Write in a friendly, authoritative tone. Make it genuinely useful for readers making a purchase decision.`
}

/**
 * Generate buying guide prompt
 */
async function generateBuyingGuidePrompt(
  category: string = 'Electronics',
  keywords: string[] = []
): Promise<string> {
  return `Write a comprehensive buying guide: "${category} Buying Guide: How to Choose the Best One"

Target keywords: ${keywords.join(', ')}

Structure:
1. Introduction (200 words)
   - Why this category matters
   - What readers will learn

2. Key Factors to Consider (800 words)
   - 5-7 main factors
   - Explain each in detail
   - Give practical examples

3. Common Mistakes to Avoid (300 words)
   - 4-5 common mistakes
   - How to avoid them

4. Budget Recommendations (200 words)
   - Entry-level options
   - Mid-range sweet spot
   - Premium choices

5. FAQ Section (200 words)
   - 5 common questions
   - Clear, concise answers

6. Conclusion (100 words)
   - Quick summary
   - Action steps

Requirements:
- At least 1,500 words total
- Use headings (H2, H3)
- Include bullet points for readability
- Write in second person ("you")
- Be genuinely helpful
- SEO-optimized but natural
- Include specific product examples where relevant

Write in a friendly, expert tone that builds trust.`
}

/**
 * Generate product comparison prompt
 */
async function generateComparisonPrompt(
  products: any[] = [],
  keywords: string[] = []
): Promise<string> {
  if (products.length < 2) {
    throw new Error('Need at least 2 products for comparison')
  }

  const product1 = products[0]
  const product2 = products[1]

  return `Write a detailed comparison article: "${product1.name} vs ${product2.name}: Which Should You Buy?"

Target keywords: ${keywords.join(', ')}

Product 1: ${product1.name}
Price: $${product1.price}
Category: ${product1.category}
Description: ${product1.description}

Product 2: ${product2.name}
Price: $${product2.price}
Category: ${product2.category}
Description: ${product2.description}

Structure:
1. Introduction (200 words)
   - Brief overview of both products
   - Why people compare these
   - What we'll cover

2. Quick Comparison Table
   - Side-by-side specs
   - Price comparison
   - Key differences

3. Detailed Feature Comparison (800 words)
   - Performance
   - Build quality
   - Features
   - Value for money
   - User experience

4. Pros and Cons (200 words)
   - Product 1 pros/cons
   - Product 2 pros/cons

5. Which Should You Buy? (200 words)
   - Best for [type of user]
   - Consider your needs
   - Final recommendation

6. FAQ (100 words)

Requirements:
- At least 1,500 words
- Objective and balanced
- Help readers make decision
- SEO-optimized
- Natural writing style
- Include specific details

Be fair to both products. Help readers choose based on their needs.`
}

/**
 * Generate product review prompt
 */
async function generateProductReviewPrompt(
  product: any,
  keywords: string[] = []
): Promise<string> {
  return `Write an in-depth product review: "${product.name} Review: Is It Worth Buying?"

Target keywords: ${keywords.join(', ')}

Product Details:
Name: ${product.name}
Price: $${product.price}
Category: ${product.category}
Description: ${product.description}

Structure:
1. Introduction (150 words)
   - First impressions
   - Who it's for
   - Key takeaway

2. What's in the Box (100 words)
   - Package contents
   - First impressions

3. Design and Build Quality (200 words)
   - Materials
   - Design choices
   - Ergonomics

4. Performance (400 words)
   - Real-world testing
   - Benchmarks
   - Daily usage
   - Strengths
   - Weaknesses

5. Features (300 words)
   - Key features explained
   - Unique selling points
   - Missing features

6. Value for Money (200 words)
   - Price analysis
   - Comparison to competitors
   - Who should buy it

7. Pros and Cons (100 words)
   - Clear lists

8. Final Verdict (150 words)
   - Rating
   - Recommendation
   - Alternatives

Requirements:
- At least 1,500 words
- Honest and balanced
- Specific details
- Personal experience tone
- SEO-optimized
- Helpful for purchase decision

Write as if you've actually used the product. Be specific and honest.`
}

/**
 * Generate how-to guide prompt
 */
async function generateHowToPrompt(
  category: string = 'Electronics',
  keywords: string[] = []
): Promise<string> {
  return `Write a how-to guide: "How to Choose the Perfect ${category}: Complete Guide"

Target keywords: ${keywords.join(', ')}

Structure:
1. Introduction (200 words)
   - Why this decision matters
   - What makes a good ${category}
   - Overview of guide

2. Understanding ${category} Basics (300 words)
   - Key terminology
   - Types available
   - Common features

3. Step-by-Step Buying Process (600 words)
   - Step 1: Determine your needs
   - Step 2: Set your budget
   - Step 3: Research options
   - Step 4: Compare features
   - Step 5: Read reviews
   - Step 6: Make the purchase

4. Red Flags to Watch For (200 words)
   - Warning signs
   - Common scams
   - What to avoid

5. Where to Buy (200 words)
   - Best retailers
   - Online vs in-store
   - When to buy (sales)

6. FAQ (150 words)

Requirements:
- At least 1,500 words
- Actionable advice
- Step-by-step format
- Real examples
- SEO-optimized
- Beginner-friendly

Make it practical and easy to follow.`
}

/**
 * Call OpenAI API to generate content
 */
async function callOpenAI(prompt: string, minWords: number = 1500): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o', // or 'gpt-4' or 'gpt-3.5-turbo'
        messages: [
          {
            role: 'system',
            content: 'You are an expert content writer specializing in product reviews, buying guides, and SEO-optimized blog posts. Write engaging, helpful, and honest content that helps readers make purchasing decisions. Always write in a natural, conversational tone.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: Math.ceil(minWords * 1.5), // Rough estimate
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('OpenAI API call failed:', error)
    throw error
  }
}

/**
 * Generate blog post with images
 */
export async function generateBlogPostWithImages(config: BlogPostConfig) {
  // Generate the blog post content
  const post = await generateBlogPost(config)

  // Find relevant images for the post
  const images = await findRelevantImages(post.title, config.category)

  // Insert images into content at appropriate places
  const contentWithImages = insertImagesIntoContent(post.content, images)

  return {
    ...post,
    content: contentWithImages,
    featured_image: images[0]?.url || null,
  }
}

/**
 * Find relevant images from Unsplash
 */
async function findRelevantImages(query: string, category?: string): Promise<any[]> {
  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY

  if (!unsplashAccessKey) {
    return []
  }

  try {
    const searchQuery = category || query.split(':')[0]
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=5`,
      {
        headers: {
          'Authorization': `Client-ID ${unsplashAccessKey}`
        }
      }
    )

    const data = await response.json()
    
    return data.results?.map((img: any) => ({
      url: img.urls.regular,
      alt: img.alt_description || searchQuery,
      photographer: img.user.name,
      photographer_url: img.user.links.html,
    })) || []
  } catch (error) {
    console.error('Failed to fetch images:', error)
    return []
  }
}

/**
 * Insert images into content at natural break points
 */
function insertImagesIntoContent(content: string, images: any[]): string {
  if (images.length === 0) return content

  const paragraphs = content.split('\n\n')
  const insertPoints = [
    Math.floor(paragraphs.length * 0.2),
    Math.floor(paragraphs.length * 0.5),
    Math.floor(paragraphs.length * 0.8),
  ]

  let imageIndex = 0
  insertPoints.forEach((point, i) => {
    if (imageIndex < images.length && point < paragraphs.length) {
      const image = images[imageIndex]
      const imageHtml = `\n\n![${image.alt}](${image.url})\n*Photo by [${image.photographer}](${image.photographer_url}) on Unsplash*\n\n`
      paragraphs[point] += imageHtml
      imageIndex++
    }
  })

  return paragraphs.join('\n\n')
}

/**
 * Get trending topics for blog post ideas
 * Updated to use FomoGeo's 30 structured categories
 */
export async function getTrendingTopics(): Promise<string[]> {
  // Get trending categories first (12 categories marked as trending)
  const trendingCategories = getTrendingCategories()
  
  if (trendingCategories.length > 0) {
    return trendingCategories.map(cat => cat.name)
  }
  
  // Otherwise return all 30 category names
  return CATEGORIES.map(cat => cat.name)
}
