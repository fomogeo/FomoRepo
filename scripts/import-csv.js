/**
 * CSV PRODUCT IMPORT SCRIPT
 * 
 * This script allows you to bulk import products from CSV files
 * provided by affiliate networks.
 * 
 * Usage:
 * 1. Download product feed from your affiliate network
 * 2. Save as CSV in /scripts/feeds/ folder
 * 3. Run: node scripts/import-csv.js <filename>
 * 
 * Supported formats:
 * - Amazon Product Feeds
 * - Awin Product Feeds
 * - ShareASale Product Feeds
 * - CJ Product Feeds
 * - Generic CSV (custom mapping)
 */

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// CSV parsing (simple implementation)
function parseCSV(content) {
  const lines = content.split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const rows = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue
    
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
    const row = {}
    
    headers.forEach((header, index) => {
      row[header] = values[index] || ''
    })
    
    rows.push(row)
  }

  return rows
}

// Map CSV columns to database fields based on format
function mapProduct(row, format) {
  const mappings = {
    amazon: {
      name: 'title',
      description: 'description',
      price: 'price',
      image_url: 'image_url',
      asin: 'asin',
      category: 'product_group',
    },
    awin: {
      name: 'product_name',
      description: 'description',
      price: 'search_price',
      image_url: 'merchant_image_url',
      category: 'merchant_category',
      affiliate_url: 'aw_deep_link',
    },
    shareasale: {
      name: 'name',
      description: 'description',
      price: 'price',
      image_url: 'image',
      category: 'category',
      affiliate_url: 'custom_link',
    },
    cj: {
      name: 'name',
      description: 'description',
      price: 'retail_price',
      image_url: 'image_url',
      category: 'category',
      affiliate_url: 'buy_url',
    },
    generic: {
      name: 'name',
      description: 'description',
      price: 'price',
      image_url: 'image_url',
      category: 'category',
      affiliate_url: 'url',
    },
  }

  const mapping = mappings[format] || mappings.generic

  // Build product object
  const product = {
    name: row[mapping.name],
    description: row[mapping.description] || row[mapping.name],
    price: parseFloat(row[mapping.price] || '0'),
    image_url: row[mapping.image_url],
    category: row[mapping.category] || 'General',
    tags: [format, row[mapping.category]?.toLowerCase()].filter(Boolean),
    is_trending: true,
    is_best_seller: false,
  }

  // Calculate discount if original price available
  if (row.original_price || row.list_price) {
    const originalPrice = parseFloat(row.original_price || row.list_price)
    if (originalPrice > product.price) {
      product.original_price = originalPrice
      product.discount_percentage = Math.round(
        ((originalPrice - product.price) / originalPrice) * 100
      )
    }
  }

  return {
    product,
    affiliateUrl: row[mapping.affiliate_url],
    externalId: row[mapping.asin] || row.id,
  }
}

// Import products from CSV
async function importCSV(filename, format, network, countryCode = 'US') {
  console.log(`\n🚀 Starting CSV import...`)
  console.log(`   File: ${filename}`)
  console.log(`   Format: ${format}`)
  console.log(`   Network: ${network}`)
  console.log(`   Country: ${countryCode}\n`)

  // Read CSV file
  const filePath = path.join(__dirname, 'feeds', filename)
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`)
    process.exit(1)
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  const rows = parseCSV(content)

  console.log(`📊 Found ${rows.length} products in CSV\n`)

  let added = 0
  let updated = 0
  let skipped = 0
  let errors = 0

  // Process each row
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    
    try {
      // Map CSV row to product format
      const { product, affiliateUrl, externalId } = mapProduct(row, format)

      // Validate required fields
      if (!product.name || !product.price) {
        skipped++
        continue
      }

      // Check if product already exists (by name)
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('name', product.name)
        .single()

      if (existing) {
        // Update existing product
        await supabase
          .from('products')
          .update(product)
          .eq('id', existing.id)
        
        updated++
        console.log(`✓ Updated: ${product.name}`)
      } else {
        // Insert new product
        const { data: newProduct, error: insertError } = await supabase
          .from('products')
          .insert([product])
          .select()
          .single()

        if (insertError) {
          console.error(`❌ Error inserting ${product.name}:`, insertError.message)
          errors++
          continue
        }

        // Add affiliate link
        if (newProduct && affiliateUrl) {
          await supabase
            .from('affiliate_links')
            .insert([{
              product_id: newProduct.id,
              network: network,
              country_code: countryCode,
              affiliate_url: affiliateUrl,
              priority: 1,
            }])
        }

        added++
        console.log(`✓ Added: ${product.name}`)
      }
    } catch (error) {
      console.error(`❌ Error processing row ${i + 1}:`, error.message)
      errors++
    }
  }

  console.log(`\n📈 Import Summary:`)
  console.log(`   ✅ Added: ${added}`)
  console.log(`   🔄 Updated: ${updated}`)
  console.log(`   ⏭️  Skipped: ${skipped}`)
  console.log(`   ❌ Errors: ${errors}`)
  console.log(`   📊 Total: ${rows.length}\n`)
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2)
  
  if (args.length < 3) {
    console.log(`
Usage: node scripts/import-csv.js <filename> <format> <network> [country]

Parameters:
  filename - CSV file name (must be in scripts/feeds/ folder)
  format   - CSV format: amazon, awin, shareasale, cj, generic
  network  - Affiliate network: amazon, awin, shareasale, cj
  country  - Country code (optional, default: US)

Examples:
  node scripts/import-csv.js amazon-feed.csv amazon amazon US
  node scripts/import-csv.js awin-products.csv awin awin UK
  node scripts/import-csv.js products.csv generic custom US

Supported Formats:
  amazon     - Amazon Product Feed
  awin       - Awin Product Feed
  shareasale - ShareASale Merchant Feed
  cj         - CJ Product Catalog
  generic    - Custom CSV (requires: name, price, description, image_url, url)
    `)
    process.exit(1)
  }

  const [filename, format, network, countryCode = 'US'] = args
  
  importCSV(filename, format, network, countryCode)
    .catch(error => {
      console.error('Fatal error:', error)
      process.exit(1)
    })
}

module.exports = { importCSV, parseCSV, mapProduct }
