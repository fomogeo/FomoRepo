# Complete Deployment Guide for Non-Technical Users

This guide walks you through deploying your FOMO Deals Platform step-by-step, assuming zero technical knowledge.

## What You're Building

You're creating a website that shows trending products and deals. When people click on products, they go to Amazon (or other stores) and if they buy, you earn a commission. The website runs automatically after setup.

## Time Required
- Initial Setup: 2-3 hours
- Affiliate Applications: 1-2 weeks (waiting for approval)
- Adding Content: 1-2 hours per week (optional)

## Cost
- **Year 1**: $0-$20/month
  - Vercel: Free (hobby plan)
  - Supabase: Free (up to 500MB database)
  - Domain: $10-15/year (optional)
- **After Growth**: $20-40/month for pro features

---

## Part 1: Create Your Accounts (30 minutes)

### Account 1: GitHub (Code Storage)
1. Go to https://github.com
2. Click "Sign up" (top right)
3. Enter your email, create a password
4. Choose a username (this can be anything)
5. Verify your email
6. **Save your username and password securely**

### Account 2: Vercel (Website Hosting)
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub
5. You're now logged in!

### Account 3: Supabase (Database)
1. Go to https://supabase.com
2. Click "Start your project"
3. Choose "Continue with GitHub"
4. Authorize Supabase
5. You're now logged in!

---

## Part 2: Set Up Your Database (20 minutes)

### Step 1: Create a Supabase Project

1. **In Supabase, click "New Project"**
2. **Fill in the form**:
   - Organization: Select "Your Name's Projects" (default)
   - Name: `fomo-deals` (or any name you like)
   - Database Password: Create a strong password
     - Example: `FoMo2026!Secure#Pass`
     - **CRITICAL: Write this password down!** You'll need it later.
   - Region: Choose closest to you (e.g., "US East" if you're in the US)
   - Pricing Plan: Free
3. **Click "Create new project"**
4. **Wait 2-3 minutes** - Supabase is setting up your database

### Step 2: Create Your Database Tables

1. **Click "SQL Editor"** in the left sidebar
   - It looks like this: `</>`
2. **Click "+ New query"**
3. **Open this project folder on your computer**
4. **Find the file named** `supabase-schema.sql`
5. **Open it with Notepad (Windows) or TextEdit (Mac)**
6. **Select All** (Ctrl+A on Windows, Cmd+A on Mac)
7. **Copy** (Ctrl+C on Windows, Cmd+C on Mac)
8. **Go back to Supabase SQL Editor**
9. **Paste** (Ctrl+V on Windows, Cmd+V on Mac)
10. **Click "Run"** (bottom right corner)
11. **You should see**: "Success. No rows returned"
    - If you see an error, try running it again

### Step 3: Get Your Supabase API Keys

1. **Click the gear icon** (⚙️) in the left sidebar
2. **Click "API"** under Project Settings
3. **You'll see two important sections**:

   **A) Project URL** (top of page)
   - Looks like: `https://abcdefghijk.supabase.co`
   - **Copy this** and paste it into a notepad
   - Label it: "Supabase URL"

   **B) Project API keys** (middle of page)
   - Find "anon public" key
   - **Copy this long text** and paste it into your notepad
   - Label it: "Supabase Anon Key"
   - Find "service_role" key (click "Reveal" to see it)
   - **Copy this** and paste it into your notepad
   - Label it: "Supabase Service Key"

4. **Save this notepad file** somewhere safe!

---

## Part 3: Upload Your Code to GitHub (15 minutes)

### Option A: Using GitHub Desktop (Easier)

1. **Download GitHub Desktop**
   - Go to https://desktop.github.com
   - Download and install it
   - Open the app
   - Sign in with your GitHub account

2. **Create a New Repository**
   - Click "File" → "New Repository"
   - Name: `fomo-deals-platform`
   - Local path: Choose where to save it
   - Click "Create Repository"

3. **Add Your Project Files**
   - Open the folder where GitHub Desktop saved your repository
   - Copy ALL files from this project into that folder
   - GitHub Desktop will show all these files as "changes"

4. **Commit and Publish**
   - In GitHub Desktop, write a commit message: "Initial setup"
   - Click "Commit to main"
   - Click "Publish repository"
   - Make sure "Keep this code private" is UNCHECKED
   - Click "Publish repository"

### Option B: Using GitHub Website (Alternative)

1. **Go to** https://github.com/new
2. **Fill in**:
   - Repository name: `fomo-deals-platform`
   - Description: My FOMO Deals Website
   - Public (selected)
   - Add a README file: NO
3. **Click "Create repository"**
4. **Follow the instructions on screen to upload files**
   - Use the "uploading an existing file" link
   - Drag and drop ALL files from this project
   - Click "Commit changes"

---

## Part 4: Deploy Your Website (20 minutes)

### Step 1: Connect Vercel to GitHub

1. **Go to** https://vercel.com
2. **Click "Add New..."** → **"Project"**
3. **Find your** `fomo-deals-platform` **repository**
   - If you don't see it, click "Adjust GitHub App Permissions"
   - Give Vercel access to all repositories
4. **Click "Import"** next to your repository

### Step 2: Configure Your Website

1. **Vercel will show a configuration screen**
2. **Framework Preset**: Should automatically detect "Next.js" ✅
3. **Root Directory**: Leave as default (`.`)
4. **Build and Output Settings**: Leave as default

### Step 3: Add Environment Variables

This is the most important step! These variables tell your website how to connect to your database.

1. **Click "Environment Variables"** (expand the section)
2. **Add these variables ONE BY ONE**:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SITE_NAME`
   - Value: `FOMO Finds` (or your custom name)
   - Click "Add"

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SITE_TAGLINE`
   - Value: `Don't Miss What Everyone Is Buying` (or your custom tagline)
   - Click "Add"

   **Variable 3:**
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: Leave blank for now (we'll add this after deployment)

   **Variable 4:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (paste your Supabase URL from Part 2, Step 3)
   - Click "Add"

   **Variable 5:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (paste your Supabase Anon Key from Part 2, Step 3)
   - Click "Add"

   **Variable 6:**
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: (paste your Supabase Service Key from Part 2, Step 3)
   - Click "Add"

3. **Double-check all variables are entered correctly**
4. **Click "Deploy"**

### Step 4: Wait for Deployment

1. **Vercel is now building your website**
   - You'll see a progress screen with animated dots
   - This takes 2-3 minutes
   - Don't close the browser!

2. **When it's done, you'll see**:
   - "Congratulations!" message
   - A preview of your website
   - A URL like: `https://fomo-deals-platform.vercel.app`

3. **Click on the URL to visit your live website!** 🎉

### Step 5: Update Site URL

1. **Copy your Vercel URL** from Step 4
2. **In Vercel, go to your project**
3. **Click "Settings"** → **"Environment Variables"**
4. **Find** `NEXT_PUBLIC_SITE_URL`
5. **Click "Edit"**
6. **Paste your Vercel URL**
7. **Save**
8. **Go to "Deployments"** tab
9. **Click "Redeploy"** on the latest deployment

---

## Part 5: Add Your First Product (15 minutes)

Now let's add a test product to make sure everything works!

### Step 1: Open Supabase Table Editor

1. **Go to** https://supabase.com
2. **Open your project** (`fomo-deals`)
3. **Click "Table Editor"** in the left sidebar (looks like a table icon)

### Step 2: Add a Product

1. **Click on** `products` **table**
2. **Click "Insert"** → **"Insert row"**
3. **Fill in the fields**:
   - **name**: `Wireless Headphones`
   - **description**: `Premium noise-cancelling headphones with 30-hour battery`
   - **price**: `199.99`
   - **original_price**: `299.99`
   - **discount_percentage**: `33`
   - **image_url**: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e`
   - **category**: `Electronics`
   - **tags**: Click "Edit as JSON" and enter: `["audio", "tech", "wireless"]`
   - **is_trending**: Check the box ✅
   - **is_best_seller**: Check the box ✅
4. **Click "Save"**

### Step 3: Add an Affiliate Link

1. **Click on** `affiliate_links` **table**
2. **Click "Insert"** → **"Insert row"**
3. **Fill in**:
   - **product_id**: Click the dropdown and select the "Wireless Headphones" product
   - **network**: `amazon`
   - **country_code**: `US`
   - **affiliate_url**: For now, use: `https://amazon.com`
     - (You'll replace this with your real Amazon affiliate link later)
   - **priority**: `1`
4. **Click "Save"**

### Step 4: Check Your Website

1. **Go to your Vercel URL** (from Part 4, Step 4)
2. **You should see your product** on the homepage!
3. **If you don't see it**:
   - Wait 1 minute (caching)
   - Refresh the page (Ctrl+R or Cmd+R)
   - Clear browser cache (Ctrl+Shift+Delete)

---

## Part 6: Apply for Affiliate Programs (1-2 weeks)

Now that your website is live, you can apply to affiliate programs!

### Amazon Associates (Start Here)

1. **Go to** https://affiliate-program.amazon.com
2. **Click "Join Now for Free"**
3. **Sign in** with your Amazon account (or create one)
4. **Fill in the application**:

   **Account Information:**
   - Your name, address, phone number

   **Website Information:**
   - Website URL: (your Vercel URL)
   - Name your website: FOMO Finds (or your name)
   - Topic: `Shopping, Deals, Product Reviews`
   - What is your website about?
     ```
     FOMO Finds is a deals and trending products website that helps shoppers 
     discover the best prices, trending items, and exclusive discounts across 
     various product categories including electronics, home goods, fashion, 
     and more. We provide curated product recommendations and deal alerts to 
     help consumers make informed purchasing decisions.
     ```

   **Profile:**
   - Website type: `Product comparison, Reviews`
   - How do you generate traffic?
     ```
     We generate traffic through:
     - Search engine optimization (SEO)
     - Social media marketing (Twitter, Pinterest, Instagram)
     - Email newsletter with deal alerts
     - Content marketing (blog posts and product guides)
     - Organic search traffic from product reviews
     ```
   - How do you usually build links?
     ```
     We create product review pages, buying guides, and deal alerts. 
     Links are integrated naturally within content to provide value to 
     readers looking for trending products and best deals.
     ```
   - How many unique visitors per month? `0-500` (be honest if you're just starting)
   - Main reason for joining? `To monetize my website`

   **Traffic & Monetization:**
   - Primary method: `Content/Niche website`
   - How do you monetize? `Affiliate links and advertising`

5. **Complete the CAPTCHA**
6. **Agree to the terms**
7. **Submit application**

### What Happens Next?

1. **Amazon will review** your application (usually 1-3 days)
2. **You'll get an email** with approval or request for more info
3. **Once approved**:
   - Log in to Amazon Associates
   - Get your Affiliate ID (looks like: `yourname-20`)
   - Start creating affiliate links!

### Creating Amazon Affiliate Links

1. **Log in to** https://affiliate-program.amazon.com
2. **Search for a product** you want to promote
3. **Click "Get Link"** 
4. **Copy the link**
5. **Update your Supabase** `affiliate_links` table with this link

### Other Affiliate Programs (Apply to These Next)

**Awin** (Great for international coverage)
- Website: https://www.awin.com
- Apply as a Publisher
- Good for: Fashion, Travel, Home goods

**CJ Affiliate** (Major brands)
- Website: https://www.cj.com
- Click "Publishers" → "Join CJ"
- Good for: Major retailers, Tech brands

**ShareASale** (Easy approval)
- Website: https://www.shareasale.com
- Click "Affiliate Sign Up"
- Good for: Niche products, Smaller brands

**Impact** (Tech & SaaS)
- Website: https://impact.com
- Good for: Software, Apps, Digital products

---

## Part 7: Add More Products (Ongoing)

### Strategy for Adding Products

**Week 1:** Add 10-20 products
**Month 1:** Aim for 50-100 products
**Month 3:** 200-300 products

### Finding Products to Add

1. **Browse your affiliate program dashboards**
   - Amazon Associates has a product search
   - Look for "Best Sellers" in each category
   - Check "Hot Products" or "Trending" sections

2. **Categories to focus on**:
   - Electronics (high value, popular)
   - Home & Kitchen (steady sales)
   - Fashion (high traffic)
   - Health & Beauty (repeat purchases)
   - Sports & Outdoors (seasonal)

3. **Product criteria**:
   - Good reviews (4+ stars)
   - Reasonable price ($20-$300)
   - Available in stock
   - Has a decent commission rate

### How to Add Products Quickly

1. **Go to Supabase** → **Table Editor** → **products**
2. **For each product**:
   - Insert new row
   - Fill in: name, description, price, image_url, category
   - Set `is_trending` or `is_best_seller` to true
   - Save
3. **Then go to** `affiliate_links` **table**
   - Add the affiliate link for that product
   - Set country_code (US, UK, etc.)
   - Set priority: 1
   - Save

### Getting Product Images

Free image sources:
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Or use the Amazon product image URL (check terms)

---

## Part 8: Marketing Your Site (30 min setup, ongoing)

### Step 1: Set Up Google Search Console

1. **Go to** https://search.google.com/search-console
2. **Click "Start now"**
3. **Select "URL prefix"**
4. **Enter your Vercel URL**
5. **Choose verification method**: HTML tag
6. **Copy the meta tag** they give you
7. **Contact me for help adding this** (requires minor code edit)
8. **Click "Verify"**
9. **Submit your sitemap**: `your-url.com/sitemap.xml`

### Step 2: Create Social Media Accounts

**Twitter/X** (Best for quick deals)
1. Create account: @YourSiteName
2. Bio: "Daily trending products & hot deals 🔥 | Saving you money one deal at a time"
3. Post daily: "🔥 TRENDING: [Product Name] - [Discount]% OFF! [link]"

**Pinterest** (Best for traffic)
1. Create business account
2. Create boards: "Trending Tech", "Home Deals", "Fashion Finds"
3. Pin your products with attractive images
4. Link pins to your product pages

**Instagram** (Optional)
1. Create account
2. Post: Product images with deal info
3. Use Stories for flash deals
4. Link in bio to your website

### Step 3: Email Marketing

1. **Weekly email strategy**:
   - Subject: "🔥 This Week's Hottest Deals"
   - Content: Top 5-10 trending products
   - Call-to-action: "Shop Now"

2. **Export emails from Supabase**:
   - Table Editor → email_subscribers
   - Click Export → CSV
   - Filter: `is_subscribed = true`

3. **Use an email service**:
   - Mailchimp (free up to 500 subscribers)
   - SendGrid (free up to 100/day)
   - Import your CSV of emails
   - Create a template
   - Send weekly

---

## Part 9: Monitoring & Optimization

### Weekly Tasks (30 minutes)

1. **Check Analytics**:
   - Vercel Analytics (free)
   - See which products get most views
   - Check visitor count

2. **Add 5-10 new products**
   - Keep content fresh
   - Focus on trending categories

3. **Update expired deals**:
   - Check prices on merchant sites
   - Update or remove old products

4. **Post on social media**:
   - 1-2 posts on Twitter
   - 3-5 pins on Pinterest
   - 1 Instagram post

### Monthly Tasks (1-2 hours)

1. **Review affiliate earnings**:
   - Check each affiliate dashboard
   - See which products sell best
   - Add more similar products

2. **Content creation**:
   - Write 1-2 blog posts
   - Topics: "Top 10 [Product] of [Month]"
   - "Best [Category] Deals This Week"

3. **SEO optimization**:
   - Check Google Search Console
   - See which keywords bring traffic
   - Create content around those keywords

---

## Part 10: Scaling & Growing

### When You Hit 1,000 Visitors/Month

1. **Upgrade to Google AdSense**
   - Apply: https://www.google.com/adsense
   - Add your publisher ID to environment variables
   - Start earning from ad impressions

2. **Add more affiliate networks**
   - Apply to 5-10 networks
   - Diversify income sources
   - Better international coverage

3. **Consider a custom domain**
   - Buy: yoursite.com ($10-15/year)
   - Add in Vercel settings
   - More professional

### When You Hit $500/Month in Revenue

1. **Upgrade Vercel** to Pro ($20/month)
   - Better performance
   - More bandwidth
   - Analytics insights

2. **Hire a VA** (Virtual Assistant) on Fiverr
   - Add 20-30 products per week
   - Write blog posts
   - Manage social media

3. **Invest in SEO**
   - Buy backlinks (carefully)
   - Guest posting
   - Content marketing

---

## Troubleshooting Common Issues

### Issue: Site shows "500 Error"
**Solution:**
1. Check environment variables in Vercel
2. Make sure Supabase project is running
3. Check Vercel deployment logs for specific error

### Issue: No products showing
**Solution:**
1. Verify you added products in Supabase
2. Check products have `is_trending` or `is_best_seller` = true
3. Wait 1 minute and refresh (caching)

### Issue: Email signup not working
**Solution:**
1. Check browser console for errors (F12)
2. Verify Supabase API keys are correct
3. Check `email_subscribers` table exists

### Issue: Affiliate links not redirecting
**Solution:**
1. Check `affiliate_links` table has entries
2. Verify `product_id` matches actual product
3. Check `country_code` is correct (2 letters, uppercase)

---

## Success Timeline

**Month 1:**
- ✅ Site deployed
- ✅ 50 products added
- ✅ Affiliate programs approved
- Target: 100 visitors, $0-50 revenue

**Month 3:**
- ✅ 200+ products
- ✅ 5+ blog posts
- ✅ Social media presence
- Target: 1,000 visitors, $200-500 revenue

**Month 6:**
- ✅ 500+ products
- ✅ Email list: 500+ subscribers
- ✅ Multiple traffic sources
- Target: 5,000 visitors, $1,000-2,000 revenue

**Month 12:**
- ✅ Authority site
- ✅ Passive income stream
- ✅ Automated systems
- Target: 10,000+ visitors, $2,000-5,000 revenue

---

## Final Checklist

Before you call it "done" and let it run passively:

- [ ] Site is deployed and accessible
- [ ] Database has at least 20 products
- [ ] All legal pages are reviewed and customized
- [ ] Affiliate programs applied to (at least Amazon)
- [ ] Social media accounts created
- [ ] Google Search Console set up
- [ ] First blog post published
- [ ] Email collection is working
- [ ] At least one test purchase tracked
- [ ] Weekly maintenance schedule planned

---

## You're Ready! 🎉

Your FOMO Deals Platform is now live and ready to generate passive income!

Remember:
- **Be patient** - Traffic and revenue take time to build
- **Stay consistent** - Add content weekly
- **Track metrics** - Focus on what works
- **Scale gradually** - Reinvest earnings into growth

**Good luck with your passive income journey!** 🚀
