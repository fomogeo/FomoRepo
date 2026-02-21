# 🚀 Quick Start: Adding Amazon Products with SiteStripe

## What is SiteStripe?

**SiteStripe** is Amazon's browser toolbar that appears when you're logged into Amazon Associates. It lets you grab affiliate links for any product on Amazon.com **without needing API access**.

Perfect for starting out before you have the sales needed for the Product Advertising API!

---

## Setup (One-Time)

### 1. Join Amazon Associates
- Go to https://affiliate-program.amazon.com
- Sign up (free)
- You'll get a **Tracking ID** like `yoursite-20`

### 2. Enable SiteStripe
1. Log into Amazon Associates Central
2. Click your name (top right) → Account Settings
3. Make sure "SiteStripe" is enabled
4. **Important:** Update `YOUR-TAG-20` in the collector tool to your actual tracking ID

---

## Two Methods to Add Products

### Method 1: Manual Collection (Fastest for bulk)

**Best for:** Adding 20-100 products quickly

1. **Open the Product Collector Tool:**
   - Open `scripts/amazon-product-collector.html` in your browser
   - Bookmark it for easy access

2. **Browse Amazon.com (logged into Associates):**
   - Search for products in your categories
   - For each product you want:
     - Copy the URL from your browser (or use SiteStripe "Get Link")
     - Go to the Collector tool
     - Paste URL
     - Fill in price (copy from Amazon listing)
     - Fill in product name (copy from Amazon listing)
     - Select category
     - Click "Add Product"

3. **Download CSV:**
   - Once you've added 10-50 products
   - Click "Download CSV"
   - Save file to `scripts/feeds/` folder

4. **Import to Database:**
   ```bash
   node scripts/import-csv.js amazon-products-123456.csv generic amazon
   ```

**Time estimate:** ~30 seconds per product = 50 products in 25 minutes

---

### Method 2: Bookmarklet (Semi-Automated)

**Best for:** Collecting while browsing naturally

1. **Install the Bookmarklet:**
   - Open `scripts/amazon-product-collector.html`
   - Drag the orange "FomoGeo Quick Add" button to your bookmarks bar

2. **Use While Shopping:**
   - Browse Amazon normally
   - When you find a good product, click the bookmarklet
   - It auto-fills URL, title, price, and image
   - Just select category and click "Add Product"

3. **Download & Import** (same as Method 1)

---

## Pro Tips for Fast Collection

### 1. Category Strategy
Pick 3-5 categories to start:
- Electronics (always popular)
- Home & Kitchen (broad appeal)
- Beauty & Personal Care (high conversion)
- Sports & Outdoors (passionate buyers)

### 2. Product Selection Criteria
✅ Good products to add:
- 4+ star rating with 100+ reviews
- Price: $15-$150 (sweet spot for conversions)
- Products YOU would recommend
- Best sellers in their category
- Products with "Limited time deal" badges

❌ Skip:
- No reviews or <3 stars
- Very expensive items (>$500)
- Generic/knock-off brands
- Seasonal items (unless in season)

### 3. Finding Products Fast

**Amazon Best Sellers:**
- Go to amazon.com/Best-Sellers
- Browse each category
- Grab top 10-20 from each subcategory you cover

**Amazon Deals:**
- amazon.com/gp/goldbox (Today's Deals)
- Great for limited-time promotions
- Mark these as "trending" in your site

**Category Deep Dive:**
- amazon.com/s?k=wireless+headphones
- Filter by "Avg. Customer Review" (4+ stars)
- Filter by "Prime" (faster shipping = higher conversion)
- Sort by "Best Sellers"

### 4. Bulk Collection Workflow

**Speed run (1 hour = 100 products):**

1. Open Collector tool in one browser tab
2. Open Amazon Best Sellers in another tab
3. For each category you cover:
   - Click through top 20 products
   - For each: Copy URL → Switch to Collector → Paste → Fill price & name → Add
   - Repeat

4. Every 25 products, download CSV and import
   - This keeps your data safe if browser crashes
   - Also uploads to database sooner

---

## Example: Adding 50 Electronics Products

**Time: ~20 minutes**

1. Go to amazon.com/Best-Sellers-Electronics-Accessories
2. Open Collector tool
3. Click "Headphones" subcategory
4. For each of top 10 products:
   - Right-click product → Copy link address
   - Paste into Collector "Amazon URL" field
   - Copy price from listing (e.g., $29.99)
   - Copy product name
   - Category: "electronics"
   - Click Add Product
5. Repeat for:
   - Phone Accessories (10 products)
   - Smart Home (10 products)
   - Computer Accessories (10 products)
   - Wearable Tech (10 products)
6. Download CSV
7. Import: `node scripts/import-csv.js electronics-batch1.csv generic amazon`

---

## Important: Update Your Tracking ID

**Before importing ANY products:**

1. Open `scripts/amazon-product-collector.html` in a text editor
2. Find line ~206: `const affiliateUrl = \`https://www.amazon.com/dp/${asin}?tag=YOUR-TAG-20\``
3. Replace `YOUR-TAG-20` with your actual Amazon Associates tracking ID
4. Save the file

**To find your tracking ID:**
- Log into Amazon Associates Central
- Top menu → Product Linking → Link to Any Page
- Your tracking ID is shown (e.g., `fomogeo-20`)

---

## Organizing by Category

**Match Amazon categories to your site categories:**

| Amazon Category | Your Category | Examples |
|---|---|---|
| Electronics | electronics | Headphones, chargers, speakers |
| Home & Kitchen | home-kitchen | Coffee makers, storage, decor |
| Clothing, Shoes & Jewelry | fashion-apparel | T-shirts, sneakers, accessories |
| Beauty & Personal Care | beauty-personal-care | Skincare, makeup, hair tools |
| Health & Household | health-wellness | Vitamins, fitness trackers |
| Sports & Outdoors | sports-outdoors | Yoga mats, camping gear |
| Toys & Games | toys-games | Board games, LEGO, action figures |
| Books | books-media | Bestsellers, Kindle books |
| Pet Supplies | pet-supplies | Dog toys, cat food, pet beds |

---

## After Importing

### 1. Verify Products Imported
```bash
# In your terminal
psql $DATABASE_URL
SELECT COUNT(*), category FROM products GROUP BY category;
\q
```

### 2. Check Your Site
- Go to your deployed site
- Browse categories
- Click a few products → Make sure affiliate links work
- Test "View Deal" button → Should redirect to Amazon with your tracking ID

### 3. Set Up Automated Updates (Optional)

Products imported this way are **static** — prices don't auto-update. Two options:

**Option A: Manual refresh (recommended for now)**
- Once a week, re-check prices for your top 20 products
- Update any that changed significantly
- Remove any that went out of stock

**Option B: Get API access later**
- Once you have 3+ sales via Associates
- Apply for Product Advertising API access
- Switch to automated price updates via cron

---

## Troubleshooting

### "Invalid Amazon URL or ASIN"
- Make sure you're copying the full product URL
- Or just copy the ASIN (10-character code like `B08XYZ1234`)
- SiteStripe links work too (they contain the ASIN)

### "No products showing on site"
- Run the import command again and check for errors
- Check Supabase → Products table to verify data is there
- Clear your browser cache and refresh

### "Affiliate link doesn't have my tracking ID"
- You forgot to update `YOUR-TAG-20` in the collector HTML file
- Fix it, re-download CSV, re-import

### Import script errors
- Check `.env.local` has correct Supabase credentials
- Make sure you're running `node scripts/import-csv.js` from the project root
- Check CSV file is in `scripts/feeds/` folder

---

## Recommended Starting Products (100 Product Starter Pack)

**Electronics (20):**
- Wireless earbuds (3-4 different price points)
- Phone cases (iPhone & Samsung)
- Charging cables & power banks
- Smart plugs
- Bluetooth speakers

**Home & Kitchen (20):**
- Coffee makers (drip, pour-over, espresso)
- Kitchen organizers
- Storage containers
- Small appliances (air fryer, blender)
- Cleaning tools

**Beauty (15):**
- Skincare sets
- Hair styling tools
- Makeup brushes
- Facial cleansing devices
- Nail care kits

**Sports & Outdoors (15):**
- Yoga mats & blocks
- Resistance bands
- Water bottles
- Gym bags
- Running accessories

**Toys & Games (10):**
- LEGO sets (various ages)
- Board games (family friendly)
- STEM toys
- Puzzles

**Pet Supplies (10):**
- Dog toys
- Cat trees
- Pet grooming tools
- Food bowls & feeders

**Baby & Kids (10):**
- Baby monitors
- Diaper bags
- Toys for toddlers
- Kids' books

---

## Next Steps

1. ✅ Update tracking ID in collector tool
2. ✅ Collect 50-100 products using Method 1
3. ✅ Import to database
4. ✅ Verify on your live site
5. ✅ Share your site and start getting traffic!
6. 📈 Once you have 3+ sales → Apply for Amazon API → Enable automated updates

---

## Questions?

**Getting Started:**
- Start with 1-2 categories you know well
- Aim for 20-30 products per category
- Focus on quality over quantity

**Tracking Sales:**
- Check Amazon Associates dashboard daily
- First 30 days are critical — you need 3 sales in 180 days to stay active
- Share your site everywhere (social media, friends, family)

**Growing:**
- Add 10-20 new products per week
- Track which categories perform best
- Double down on what works

Good luck! 🚀
