# FOMO Deals Platform

A fully automated, worldwide, digital-only affiliate website designed to generate passive income with minimal maintenance.

## 🎯 What This Platform Does

- Automatically displays trending products and deals
- Routes users to the best affiliate link for their country
- Collects emails with unsubscribe support
- Generates passive income through multiple monetization streams
- Requires near-zero daily maintenance after setup

## 📋 Features

### Core Features
- ✅ Multi-network affiliate support (Amazon, Awin, CJ, Impact, etc.)
- ✅ Geo-based affiliate link routing
- ✅ FOMO psychology design elements
- ✅ Email collection with unsubscribe
- ✅ Legal compliance (Disclosure, Privacy, Terms)
- ✅ Google AdSense integration ready
- ✅ Responsive design (mobile-friendly)
- ✅ SEO optimized
- ✅ Blog system for content marketing

### Automation Features
- ✅ Automatic product updates
- ✅ Scheduled content refresh
- ✅ Seasonal campaign switching (Black Friday, Prime Day, etc.)
- ✅ Automatic deal expiration

## 🚀 Quick Start (5 Steps)

### Step 1: Prerequisites

Before you begin, make sure you have:
- A computer (Windows, Mac, or Linux)
- An internet connection
- A GitHub account (free) - Sign up at https://github.com
- A Vercel account (free) - Sign up at https://vercel.com
- A Supabase account (free) - Sign up at https://supabase.com

**No coding experience required!** Follow these instructions step-by-step.

### Step 2: Set Up Supabase (Database)

Supabase will store all your products, affiliate links, and email subscribers.

1. **Create a Supabase Project**
   - Go to https://supabase.com and sign in
   - Click "New Project"
   - Choose a name (e.g., "fomo-deals")
   - Create a strong database password (save this!)
   - Select a region close to you
   - Click "Create new project"
   - Wait 2-3 minutes for the project to be ready

2. **Create Database Tables**
   - In your Supabase project, click "SQL Editor" in the left sidebar
   - Click "New Query"
   - Open the file `supabase-schema.sql` from this project
   - Copy ALL the content from that file
   - Paste it into the SQL Editor
   - Click "Run" (bottom right)
   - You should see "Success. No rows returned"

3. **Get Your Supabase Credentials**
   - Click "Settings" (gear icon) in the left sidebar
   - Click "API" under Project Settings
   - You'll need these two values:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public** key (long string of characters)
     - **service_role** key (click "Reveal" next to service_role)
   - Copy these somewhere safe - you'll need them in Step 4

### Step 3: Deploy to Vercel

Vercel will host your website for free.

1. **Upload This Project to GitHub**
   - Go to https://github.com/new
   - Repository name: `fomo-deals-platform`
   - Keep it Public
   - Click "Create repository"
   - Follow GitHub's instructions to upload this project folder
   - OR use the GitHub Desktop app (easier for non-technical users)

2. **Connect to Vercel**
   - Go to https://vercel.com and sign in
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Find and select your `fomo-deals-platform` repository
   - Click "Import"

3. **Configure Environment Variables**
   - Vercel will show a form before deployment
   - Click "Environment Variables"
   - Add these variables one by one:

   ```
   NEXT_PUBLIC_SITE_NAME = FOMO Finds
   NEXT_PUBLIC_SITE_TAGLINE = Don't Miss What Everyone Is Buying
   NEXT_PUBLIC_SITE_URL = (leave blank for now, you'll add this later)
   
   NEXT_PUBLIC_SUPABASE_URL = (paste your Supabase Project URL)
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (paste your Supabase anon key)
   SUPABASE_SERVICE_ROLE_KEY = (paste your Supabase service_role key)
   ```

   - Click "Deploy"
   - Wait 2-3 minutes for deployment to complete

4. **Get Your Website URL**
   - Once deployed, Vercel will show you a URL like: `https://fomo-deals-platform.vercel.app`
   - This is your live website!
   - Go back to Environment Variables
   - Edit `NEXT_PUBLIC_SITE_URL` and add your Vercel URL
   - Redeploy the site

### Step 4: Apply for Affiliate Programs

Now that your site is live, you can apply for affiliate networks.

#### Amazon Associates (Recommended First)

1. **Apply for Amazon Associates**
   - Go to https://affiliate-program.amazon.com
   - Click "Join Now for Free"
   - Fill out the application form
   - **Website URL**: Use your Vercel URL from Step 3
   - **Website description**: "A deals and trending products website that helps shoppers find the best prices and trending items across various categories."
   - **Traffic sources**: "Search engines, social media, email newsletter"
   - **How do you drive traffic**: "We create product reviews, deal alerts, and trending product lists to help consumers make informed purchasing decisions."
   - Submit your application

2. **Get Your Amazon Affiliate Tag**
   - Once approved, go to your Amazon Associates dashboard
   - Find your "Associate ID" or "Tracking ID" (looks like: `yourname-20`)
   - Save this - you'll add it to your site later

#### Other Networks (Optional but Recommended)

Follow similar steps for:
- **Awin**: https://www.awin.com/gb/publishers
- **CJ Affiliate**: https://www.cj.com/publishers
- **Impact**: https://impact.com/
- **ShareASale**: https://www.shareasale.com/
- **Rakuten**: https://rakutenadvertising.com/

**Tip**: Apply to 3-5 networks to maximize coverage across different countries and products.

### Step 5: Add Products and Content

#### Option A: Manual Entry (For Testing)

1. **Add a Test Product**
   - Go to your Supabase project
   - Click "Table Editor" in the left sidebar
   - Click on "products" table
   - Click "Insert" → "Insert row"
   - Fill in the fields:
     - name: "Test Product"
     - description: "This is a test product"
     - price: 99.99
     - image_url: (any image URL or use a placeholder)
     - category: "Electronics"
     - is_trending: true
   - Click "Save"

2. **Add an Affiliate Link for That Product**
   - Click on "affiliate_links" table
   - Click "Insert" → "Insert row"
   - Fill in:
     - product_id: (select the product you just created)
     - network: "amazon"
     - country_code: "US"
     - affiliate_url: Your Amazon affiliate link
     - priority: 1
   - Click "Save"

3. **Visit Your Site**
   - Go to your Vercel URL
   - You should see your product displayed!

#### Option B: API Integration (Advanced - Future)

For automated product feeds, you'll use API integrations with your affiliate networks. This is covered in the "Automation" section below.

## 🔧 Configuration

### Customizing Your Brand

Edit these environment variables in Vercel:

```
NEXT_PUBLIC_SITE_NAME = Your Site Name
NEXT_PUBLIC_SITE_TAGLINE = Your Tagline
```

After changing, redeploy your site in Vercel (Deployments → Redeploy).

### Adding Google AdSense

1. Sign up for Google AdSense: https://www.google.com/adsense
2. Get your Publisher ID (looks like: `ca-pub-1234567890123456`)
3. Add it to your environment variables:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID = ca-pub-1234567890123456
   ```
4. Redeploy your site

### Custom Domain (Optional)

1. Buy a domain from Namecheap, GoDaddy, or Google Domains
2. In Vercel, go to your project → Settings → Domains
3. Add your custom domain
4. Follow Vercel's instructions to update your DNS settings
5. Wait 24-48 hours for DNS propagation

## 📊 Automation Setup

### Setting Up Automated Product Updates

The platform includes automation scripts that can:
- Fetch products from affiliate network feeds
- Update prices daily
- Mark expired deals
- Generate blog content

**To enable automation:**

1. **Set up Vercel Cron Jobs** (Free on Pro plan, or use external cron)
   - Go to your Vercel project
   - Create a `vercel.json` file:
   ```json
   {
     "crons": [
       {
         "path": "/api/cron/update-products",
         "schedule": "0 6 * * *"
       }
     ]
   }
   ```

2. **Alternative: Use a free cron service**
   - Sign up at https://cron-job.org (free)
   - Add jobs to hit your API endpoints:
     - `/api/cron/update-products` - Daily at 6 AM
     - `/api/cron/expire-deals` - Daily at midnight

### Product Feed Integration

To automatically import products:

1. **Get API Access from Your Affiliate Networks**
   - Amazon Product Advertising API
   - Awin Product Feed
   - CJ Product Catalog
   - etc.

2. **Add API credentials to environment variables**

3. **The automation scripts will handle the rest**

## 📈 Marketing & Growth

### Email Marketing

The platform automatically collects emails. To send newsletters:

1. **Export emails from Supabase**
   - Go to Table Editor → email_subscribers
   - Filter by `is_subscribed = true`
   - Export to CSV

2. **Use an email service** (choose one):
   - Mailchimp (free up to 500 subscribers)
   - SendGrid (free up to 100/day)
   - ConvertKit
   - Substack

3. **Send weekly deal roundups**

### SEO Tips

Your site is already SEO-optimized, but here's how to improve:

1. **Create blog content**
   - "Top 10 [Product] of 2026"
   - "How to Save Money on [Category]"
   - "[Product] Buying Guide"

2. **Submit to Google**
   - Google Search Console: https://search.google.com/search-console
   - Add your site
   - Submit sitemap: `your-site.com/sitemap.xml`

3. **Build backlinks**
   - Share on social media
   - Comment on related blogs
   - Guest post on deal sites

### Social Media

1. **Create accounts**:
   - Twitter/X (for quick deals)
   - Pinterest (for product images)
   - Instagram (for lifestyle content)

2. **Post schedule**:
   - Daily: Top trending product
   - 3x/week: Deal alerts
   - Weekly: Blog content

## 🛡️ Legal Compliance

The platform includes all necessary legal pages:

- ✅ Affiliate Disclosure (`/legal/disclosure`)
- ✅ Privacy Policy (`/legal/privacy`)
- ✅ Terms of Service (`/legal/terms`)
- ✅ Unsubscribe Page (`/legal/unsubscribe`)

**Important**: Before going live, review and customize these pages with:
- Your contact information
- Your specific affiliate relationships
- Your location/jurisdiction

Consider consulting a lawyer for legal compliance in your country.

## 💰 Monetization Breakdown

### Primary Revenue
- **Affiliate commissions**: 1-10% per sale depending on network and product category
- Expected: $100-$500/month (early), $1,000-$5,000/month (mature)

### Secondary Revenue
- **Google AdSense**: $0.50-$3 per 1,000 page views
- Expected: $50-$200/month

### Growth Revenue (Future)
- **Email sponsorships**: $50-$500 per send
- **Exclusive deals**: Flat fees from merchants
- **Premium membership**: Subscription access to VIP deals

## 🔍 Troubleshooting

### Site Not Loading
- Check that all environment variables are set in Vercel
- Verify Supabase credentials are correct
- Check Vercel deployment logs for errors

### Products Not Showing
- Verify database has products (check Supabase Table Editor)
- Check that products have `is_trending` or `is_best_seller` set to true
- Clear browser cache

### Emails Not Being Collected
- Check Supabase Row Level Security policies
- Verify API route is working: visit `/api/subscribe`
- Check browser console for errors

### Affiliate Links Not Working
- Ensure affiliate_links table has entries
- Verify country codes are correct (ISO 2-letter codes)
- Check that products have associated affiliate links

## 📚 File Structure

```
fomo-deals-platform/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── subscribe/        # Email subscription
│   │   ├── unsubscribe/      # Email unsubscribe
│   │   └── affiliate-router/ # Affiliate link routing
│   ├── legal/                # Legal pages
│   ├── deals/                # Deals page
│   ├── blog/                 # Blog page
│   └── page.tsx              # Homepage
├── components/               # React components
├── lib/                      # Utility functions
│   ├── supabase.ts          # Database functions
│   └── affiliateRouter.ts   # Routing logic
├── public/                   # Static assets
├── supabase-schema.sql      # Database schema
├── package.json             # Dependencies
└── README.md                # This file
```

## 🎓 Learning Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Affiliate Marketing Guide**: https://www.shopify.com/blog/affiliate-marketing

## 🚀 Next Steps

After deployment:

1. ✅ Apply for 3-5 affiliate programs
2. ✅ Add 10-20 products to your database
3. ✅ Create 3-5 blog posts
4. ✅ Set up Google Analytics
5. ✅ Submit site to Google Search Console
6. ✅ Share on social media
7. ✅ Set up weekly email newsletter

## 📞 Support

If you encounter issues:

1. Check this README first
2. Review the Troubleshooting section
3. Check the GitHub repository issues
4. Search Stack Overflow for similar problems

## 📄 License

MIT License - Feel free to use this for your own affiliate site!

## 🎉 Success Metrics

Track these metrics monthly:

- 📊 **Traffic**: Unique visitors (goal: 1,000/month by month 3)
- 💰 **Revenue**: Total affiliate earnings (goal: $500/month by month 6)
- 📧 **Email List**: Subscribers (goal: 500 by month 6)
- 🔗 **Click-Through Rate**: Affiliate link clicks (goal: 5%+)
- ⭐ **Conversion Rate**: Sales / Clicks (goal: 2%+)

---

**Built with** ❤️ **for passive income seekers everywhere**

Good luck with your FOMO Deals Platform! 🚀
