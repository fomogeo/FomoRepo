# AUTOMATIC PRODUCT UPDATES GUIDE

Your FOMO Deals Platform now has **automatic product updating** built-in! This guide explains how to set it up.

---

## 🎯 What Gets Automated

✅ **Daily Product Updates** - Fetches top products from affiliate networks  
✅ **Daily Price Updates** - Checks current prices, detects price drops  
✅ **Daily Trending Refresh** - Updates which products show as "trending"  
✅ **Automatic Deal Expiration** - Removes old/unavailable products  
✅ **Price Drop Notifications** - Alerts subscribers to big discounts  

---

## 🚀 Setup Options

You have **3 options** for automation, from easiest to most powerful:

### Option 1: CSV Import (Easiest - FREE)
**Best for**: Beginners, low maintenance  
**Cost**: $0  
**Time**: 15 minutes weekly  

### Option 2: Cron Jobs (Moderate - FREE)  
**Best for**: Automated but no API costs  
**Cost**: $0  
**Time**: 1 hour setup, then automatic  

### Option 3: Full API Integration (Advanced - PAID)  
**Best for**: Maximum automation, real-time updates  
**Cost**: $20-50/month  
**Time**: 2 hours setup, then fully automatic  

---

## Option 1: CSV Import (Recommended to Start)

### How It Works
1. Download product feeds from affiliate networks (weekly)
2. Run a simple import script
3. Products update automatically

### Step-by-Step Setup

#### 1. Download Product Feeds

**Amazon Associates:**
- Log in to Amazon Associates
- Tools → Product Links → "Download Product Links"
- Save as CSV

**Awin:**
- Log in to Awin
- Publishers → Product Feeds
- Download your approved merchant feeds
- Save as CSV

**ShareASale:**
- Log in to ShareASale
- Tools → Datafeed Services
- Download merchant product feeds
- Save as CSV

#### 2. Prepare the CSV

Create a folder in your project:
```bash
mkdir scripts/feeds
```

Place your CSV files there:
```
scripts/feeds/amazon-products.csv
scripts/feeds/awin-products.csv
scripts/feeds/shareasale-products.csv
```

#### 3. Run the Import Script

**Install dependencies** (first time only):
```bash
npm install dotenv @supabase/supabase-js
```

**Import products:**
```bash
# Amazon
node scripts/import-csv.js amazon-products.csv amazon amazon US

# Awin
node scripts/import-csv.js awin-products.csv awin awin UK

# ShareASale
node scripts/import-csv.js shareasale-products.csv shareasale shareasale US
```

**That's it!** Products are now in your database.

#### 4. Schedule Weekly Updates

**Option A: Windows Task Scheduler**
1. Open Task Scheduler
2. Create Basic Task
3. Set trigger: Weekly, Monday 9 AM
4. Action: Start a program
5. Program: `node`
6. Arguments: `C:\path\to\scripts\import-csv.js amazon-products.csv amazon amazon`

**Option B: Mac/Linux Cron**
1. Edit crontab: `crontab -e`
2. Add line:
```bash
0 9 * * 1 cd /path/to/project && node scripts/import-csv.js amazon-products.csv amazon amazon US
```

### Pros and Cons

✅ **Pros:**
- Completely free
- Simple to understand
- No API complexities
- Full control over products

❌ **Cons:**
- Manual downloads weekly
- Not real-time
- Requires remembering to update
- 15 minutes per week

---

## Option 2: Automated Cron Jobs (Vercel Free)

### How It Works
- Cron jobs run automatically on schedule
- They fetch products from affiliate APIs (if configured)
- Or process CSV files from Supabase Storage
- Fully automated once set up

### Step-by-Step Setup

#### 1. Enable Vercel Cron Jobs

Your `vercel.json` is already configured with cron jobs:

```json
"crons": [
  {
    "path": "/api/cron/update-products",
    "schedule": "0 6 * * *"
  },
  {
    "path": "/api/cron/update-prices",
    "schedule": "0 3 * * *"
  },
  {
    "path": "/api/cron/refresh-trending",
    "schedule": "0 0 * * *"
  }
]
```

**Note**: Cron jobs require Vercel Pro ($20/month) OR you can use a free external service.

#### 2. Set Up Security

Add to your `.env`:
```
CRON_SECRET=your-random-secret-key-here
```

Generate a random secret:
```bash
# On Mac/Linux
openssl rand -base64 32

# Or use any random password generator
```

Add this to Vercel environment variables.

#### 3. Choose Your Method

**Method A: CSV Auto-Upload** (Free)
1. Upload product CSVs to Supabase Storage weekly
2. Cron jobs process them automatically
3. Products update without manual intervention

**Method B: API Integration** (Requires APIs)
- Configure affiliate network API keys
- Cron jobs fetch products automatically
- See "Option 3" below for API setup

#### 4. Test Your Cron Jobs

Visit these URLs to test:
```
https://your-site.vercel.app/api/cron/update-products?secret=your-secret
https://your-site.vercel.app/api/cron/update-prices?secret=your-secret
https://your-site.vercel.app/api/cron/refresh-trending?secret=your-secret
```

If they work, you'll see JSON responses with success messages.

#### 5. Alternative: Free Cron Service

If you don't want Vercel Pro, use https://cron-job.org (free):

1. Sign up (free)
2. Create new cron job
3. URL: `https://your-site.vercel.app/api/cron/update-products`
4. Schedule: Daily at 6 AM
5. Headers: `Authorization: Bearer your-secret`
6. Repeat for other cron jobs

### Pros and Cons

✅ **Pros:**
- Fully automated
- No weekly manual work
- Scheduled updates
- Can use CSV or APIs

❌ **Cons:**
- Requires Vercel Pro ($20/month) or external service
- More complex setup
- Need to monitor for failures

---

## Option 3: Full API Integration (Most Powerful)

### How It Works
- Connects directly to affiliate network APIs
- Fetches top products automatically
- Updates prices in real-time
- Detects price drops instantly
- Fully automated, zero manual work

### Required APIs

#### Amazon Product Advertising API (PA-API)

**Cost**: Free (with Associate account)  
**Requirements**: Amazon Associates account + application  

**Setup:**
1. Apply at: https://webservices.amazon.com/paapi5/documentation/
2. Get Access Key + Secret Key
3. Add to `.env`:
```
AMAZON_API_KEY=your-access-key
AMAZON_API_SECRET=your-secret-key
AMAZON_ASSOCIATES_TAG=your-tag-20
```

#### Alternative: RainforestAPI (Recommended)

**Cost**: $0.01 per request (~$30/month for 100 products daily)  
**Requirements**: Credit card  

**Setup:**
1. Sign up at: https://www.rainforestapi.com
2. Get API key
3. Add to `.env`:
```
RAINFOREST_API_KEY=your-api-key
```

**Why RainforestAPI?**
- Easier to use than Amazon PA-API
- More reliable
- Returns more data
- Better for price monitoring

#### Awin Product API

**Cost**: Free  
**Requirements**: Awin Publisher account  

**Setup:**
1. Get Publisher ID from Awin dashboard
2. Generate API key in Account Settings
3. Add to `.env`:
```
AWIN_PUBLISHER_ID=your-publisher-id
AWIN_API_KEY=your-api-key
```

#### CJ Affiliate API

**Cost**: Free  
**Requirements**: CJ Affiliate account  

**Setup:**
1. Apply for API access in CJ dashboard
2. Get API key
3. Add to `.env`:
```
CJ_API_KEY=your-api-key
```

#### Impact API

**Cost**: Free  
**Requirements**: Impact account  

**Setup:**
1. Get API credentials from Impact
2. Add to `.env`:
```
IMPACT_API_KEY=your-api-key
```

### Implementation Status

The cron job files (`/api/cron/*`) have **placeholder implementations** for each network.

**What's ready:**
- ✅ Structure and logic
- ✅ Error handling
- ✅ Database updates
- ✅ Scheduling

**What needs your input:**
- API credentials (add to `.env`)
- Network-specific parsing (depends on their API response format)

**How to complete:**
1. Get API keys from networks
2. Read their API documentation
3. Update the fetch functions in:
   - `/app/api/cron/update-products/route.ts`
   - `/app/api/cron/update-prices/route.ts`

### Pros and Cons

✅ **Pros:**
- 100% automated
- Real-time price updates
- Instant price drop alerts
- Best product selection
- Truly passive

❌ **Cons:**
- API costs ($30-50/month)
- More complex setup
- Requires API approvals
- Need to maintain integrations

---

## 📊 Comparison Table

| Feature | CSV Import | Cron Jobs (CSV) | Full API |
|---------|-----------|-----------------|----------|
| **Cost** | Free | Free (or $20/mo) | $30-50/mo |
| **Setup Time** | 30 min | 1-2 hours | 2-4 hours |
| **Weekly Effort** | 15 min | 0 min | 0 min |
| **Real-time** | No | No | Yes |
| **Price Updates** | Manual | Manual/Auto | Automatic |
| **Trending Detection** | Manual | Automatic | Automatic |
| **Best For** | Starting out | Moderate scale | Full scale |

---

## 🎯 Recommended Path

### Month 1-2: CSV Import
- Start simple
- Learn the system
- Build product catalog
- **Effort**: 15 min/week

### Month 3-4: Cron Jobs
- Once you have revenue
- Automate CSV processing
- Use free cron service
- **Effort**: 0 min/week

### Month 5+: Full API
- When making $500+/month
- Invest in automation
- Real-time updates
- **Effort**: 0 min/week

---

## 🔧 Quick Start (Recommended)

**Week 1**: Use CSV Import
1. Download product feeds from Amazon
2. Run import script
3. Add 20-30 products
4. Test your site

**Week 2**: Schedule weekly imports
1. Set up Task Scheduler (Windows) or Cron (Mac/Linux)
2. Automate the CSV import
3. Products update every Monday

**Month 2**: Consider Cron Jobs
1. Sign up for cron-job.org (free)
2. Point it at your Vercel endpoints
3. Let it run automatically

**Month 3+**: Evaluate Full API
1. If making $300+/month
2. Invest in RainforestAPI
3. Set up full automation

---

## 📝 Support & Troubleshooting

### CSV Import Issues

**Problem**: "File not found"  
**Solution**: Make sure CSV is in `scripts/feeds/` folder

**Problem**: "No products imported"  
**Solution**: Check CSV format, ensure required columns exist

**Problem**: "Supabase error"  
**Solution**: Verify `.env.local` has correct Supabase credentials

### Cron Job Issues

**Problem**: Cron not running  
**Solution**: Check Vercel deployment logs, verify schedule

**Problem**: "Unauthorized"  
**Solution**: Add CRON_SECRET to Vercel environment variables

**Problem**: Products not updating  
**Solution**: Test endpoint manually in browser, check logs

### API Integration Issues

**Problem**: "API key invalid"  
**Solution**: Verify key is correct, check it's activated in network dashboard

**Problem**: Rate limit errors  
**Solution**: Reduce frequency or upgrade API plan

**Problem**: No products returned  
**Solution**: Check API response format, update parsing logic

---

## 🚀 You're Ready!

Your platform now has three levels of automation:

1. **Start simple** with CSV import (15 min/week)
2. **Automate** with cron jobs (0 min/week)
3. **Scale** with full API integration (0 min/week + real-time)

Choose what fits your stage and budget. You can always upgrade later!

---

**Next Steps:**
1. Choose your automation level
2. Follow the setup guide above
3. Test with a few products
4. Monitor for a week
5. Scale up!
