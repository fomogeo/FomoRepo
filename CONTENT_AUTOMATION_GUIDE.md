# CONTENT AUTOMATION SETUP GUIDE

Your FOMO Deals Platform now has **FULL CONTENT AUTOMATION**! 🤖

This means:
✅ Automatic blog post generation (AI-written)
✅ Automatic social media posting (multi-platform)
✅ Zero manual content creation needed

---

## 🎯 What Gets Automated

### 📝 Blog Content
- **Frequency**: 3x per week (Monday, Wednesday, Friday at 9 AM)
- **AI-Generated**: Using OpenAI GPT-4
- **Types**: Product reviews, buying guides, comparisons, top-10 lists, how-to guides
- **SEO-Optimized**: Includes keywords, proper structure, 1,500+ words
- **With Images**: Auto-sources relevant images from Unsplash
- **Auto-Published**: Goes live automatically or saved as draft

### 📱 Social Media
- **Frequency**: Every 2 hours
- **Platforms**: Twitter, Facebook, Pinterest, Instagram
- **Content Types**:
  - Trending product promotions
  - Price drop alerts
  - New product announcements
  - Blog post sharing
- **Auto-Scheduled**: Posts at optimal times for engagement

---

## 🚀 Quick Start (3 Levels)

### Level 1: AI Blog Posts Only (Easiest)
**Cost**: $5-10/month (OpenAI)
**Setup Time**: 15 minutes
**Result**: Automatic blog posts 3x/week

### Level 2: + Buffer for Social Media (Recommended)
**Cost**: $10-15/month (OpenAI + Buffer)
**Setup Time**: 30 minutes
**Result**: Auto blog + auto social media (easy)

### Level 3: Direct Social Media APIs (Advanced)
**Cost**: $5-10/month (just OpenAI, APIs are free)
**Setup Time**: 2 hours
**Result**: Auto blog + auto social media (more control)

---

## 📝 PART 1: Automatic Blog Posts

### Step 1: Get OpenAI API Key

1. **Sign up for OpenAI**
   - Go to https://platform.openai.com/signup
   - Create account (free)
   - Add payment method (required for API)

2. **Create API Key**
   - Go to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Name it "FOMO Deals Blog Generator"
   - Copy the key (starts with sk-...)
   - **Save it securely!** You can't see it again

3. **Add to Your Environment Variables**
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

### Step 2: Optional - Get Unsplash API Key (For Images)

1. **Sign up for Unsplash**
   - Go to https://unsplash.com/developers
   - Create account
   - Create new application

2. **Get Access Key**
   - Copy your Access Key
   - Add to environment variables:
   ```
   UNSPLASH_ACCESS_KEY=your-unsplash-key
   ```

**Note**: If you skip this, blog posts will still generate but without auto-images.

### Step 3: Deploy and Test

1. **Add environment variables in Vercel**
   - Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `OPENAI_API_KEY`
   - Add `UNSPLASH_ACCESS_KEY` (optional)
   - Redeploy

2. **Test the Blog Generator**
   ```
   Visit: https://your-site.vercel.app/api/cron/generate-blog-post?secret=your-cron-secret
   ```

   You should see:
   ```json
   {
     "success": true,
     "post": {
       "title": "Top 10 Electronics Products of 2026",
       "slug": "top-10-electronics-products-2026",
       "wordCount": 1847
     }
   }
   ```

3. **Check Your Blog**
   - Go to your site's /blog page
   - You should see the new post!

### Step 4: Schedule Automatic Posts

The cron job is already configured to run:
- **Monday 9 AM**
- **Wednesday 9 AM**
- **Friday 9 AM**

**No additional setup needed!** Once deployed with OpenAI key, it runs automatically.

### Blog Post Types

The system automatically rotates through:

**Monday**: Top 10 List
- "Top 10 [Category] Products of 2026"

**Wednesday**: Buying Guide
- "How to Choose the Perfect [Category]"

**Friday**: Product Review or Comparison
- "[Product] Review: Is It Worth Buying?"
- "[Product A] vs [Product B]: Which Should You Buy?"

---

## 📱 PART 2: Automatic Social Media

You have **3 options** for social media automation:

### Option A: Use Buffer (Easiest - RECOMMENDED)

**Why Buffer?**
- ✅ One API for all platforms
- ✅ Easy setup
- ✅ Visual scheduling interface
- ✅ Analytics included
- ✅ Queue management

**Cost**: Free for 3 accounts, $6/mo for more

**Setup**:

1. **Sign up for Buffer**
   - Go to https://buffer.com
   - Create account (free)
   - Connect your social accounts (Twitter, Facebook, Pinterest)

2. **Get Buffer Access Token**
   - Go to https://buffer.com/developers/apps
   - Create new app
   - Get access token
   - Add to environment variables:
   ```
   BUFFER_ACCESS_TOKEN=your-buffer-token
   ```

3. **That's it!**
   - Posts will automatically go through Buffer
   - You can see them in Buffer dashboard
   - They'll post according to your Buffer schedule

### Option B: Direct Social Media APIs (More Control)

If you want direct control, set up each platform individually.

#### Twitter/X API

1. **Apply for Twitter Developer Account**
   - Go to https://developer.twitter.com
   - Apply for Elevated access (free)
   - Create new app

2. **Get API Keys**
   - API Key and Secret
   - Access Token and Secret
   - Add all 4 to environment variables:
   ```
   TWITTER_API_KEY=your-key
   TWITTER_API_SECRET=your-secret
   TWITTER_ACCESS_TOKEN=your-token
   TWITTER_ACCESS_SECRET=your-token-secret
   ```

#### Facebook Page API

1. **Create Facebook Page**
   - Go to https://facebook.com
   - Create a page for your deals site

2. **Get Page Access Token**
   - Go to https://developers.facebook.com/tools/explorer/
   - Select your page
   - Generate token with `pages_manage_posts` permission
   - **Important**: Make token permanent (default expires in 2 hours)
   - Add to environment variables:
   ```
   FACEBOOK_PAGE_ACCESS_TOKEN=your-token
   FACEBOOK_PAGE_ID=your-page-id
   ```

#### Pinterest API

1. **Create Pinterest Business Account**
   - Go to https://business.pinterest.com
   - Verify your website

2. **Get API Access**
   - Apply at https://developers.pinterest.com
   - Create app
   - Get access token
   - Create a board for your deals
   ```
   PINTEREST_ACCESS_TOKEN=your-token
   PINTEREST_BOARD_ID=your-board-id
   ```

#### Instagram API

1. **Convert to Instagram Business Account**
   - Link to your Facebook page
   - Switch to business account

2. **Get Access Token**
   - Use Facebook Graph API Explorer
   - Get token with `instagram_basic`, `instagram_content_publish` permissions
   ```
   INSTAGRAM_ACCESS_TOKEN=your-token
   INSTAGRAM_BUSINESS_ACCOUNT_ID=your-account-id
   ```

### Option C: Manual (No Automation)

If you don't want automation yet:
- The system still generates blog posts
- You manually share them on social media
- Or use a tool like Buffer manually

---

## 🎛️ How It Works

### Blog Post Generation Flow

```
Every Monday, Wednesday, Friday at 9 AM:
1. System picks a blog post type (reviews, guides, etc.)
2. Finds trending products in your database
3. Generates SEO keywords
4. Calls OpenAI API to write 1,500+ word article
5. Finds relevant images from Unsplash
6. Inserts images into content
7. Saves to database as published
8. Schedules social media posts about it
```

### Social Media Posting Flow

```
Every 2 hours:
1. Check social_media_queue for scheduled posts
2. Post them to respective platforms
3. Mark as posted in database

Also automatically creates posts:
- Morning (6-10 AM): Trending products
- Afternoon (12-2 PM): Price drops
- Evening (6-8 PM): New arrivals
- Night (9-11 PM): Blog posts
```

---

## 💰 Cost Breakdown

### Level 1: Blog Only
- **OpenAI API**: ~$5-10/month
  - 3 posts/week × 4 weeks = 12 posts
  - ~2,000 tokens per post
  - GPT-4o: $0.15 per 1M tokens
  - **Total**: ~$5/month

### Level 2: Blog + Buffer
- **OpenAI**: $5-10/month
- **Buffer**: $0 (free tier) or $6/month (pro)
- **Total**: $5-16/month

### Level 3: Blog + Direct APIs
- **OpenAI**: $5-10/month
- **Social Media APIs**: Free!
- **Total**: $5-10/month

---

## 📊 What You Get

### Weekly Content Output (Automated)

**Blog Posts**: 3 per week
- Monday: Top 10 list (1,500+ words)
- Wednesday: Buying guide (1,500+ words)
- Friday: Product review (1,500+ words)

**Social Media Posts**: 84 per week
- Twitter: 12 per day = 84/week
- Facebook: 3 per day = 21/week
- Pinterest: 2 per day = 14/week
- Instagram: 1 per day = 7/week

**Total**: 126 pieces of content per week, 100% automated!

---

## 🎯 Customization Options

### Adjust Blog Frequency

Edit in `vercel.json`:

```json
// Current: Monday, Wednesday, Friday at 9 AM
"schedule": "0 9 * * 1,3,5"

// Daily at 9 AM:
"schedule": "0 9 * * *"

// Just Monday at 9 AM:
"schedule": "0 9 * * 1"

// Twice daily (9 AM and 5 PM):
"schedule": "0 9,17 * * *"
```

### Adjust Social Media Frequency

```json
// Current: Every 2 hours
"schedule": "0 */2 * * *"

// Every hour:
"schedule": "0 * * * *"

// Every 4 hours:
"schedule": "0 */4 * * *"

// Specific times (9 AM, 1 PM, 6 PM):
"schedule": "0 9,13,18 * * *"
```

### Customize Blog Content

Edit prompts in `/lib/content-generation/blogGenerator.ts`:

- Adjust word count (default: 1,500)
- Change writing style
- Add/remove content sections
- Modify SEO optimization

### Customize Social Media Posts

Edit templates in `/lib/social-media/socialPoster.ts`:

- Change post formats
- Adjust hashtags
- Modify emojis
- Change posting times

---

## 🔍 Monitoring & Analytics

### Check What's Being Created

**Blog Posts**:
```sql
-- In Supabase SQL Editor
SELECT title, published_at, author 
FROM blog_posts 
WHERE author = 'FomoGeo Team'
ORDER BY published_at DESC
LIMIT 10;
```

**Social Media Queue**:
```sql
SELECT platform, content, status, scheduled_for
FROM social_media_queue
ORDER BY scheduled_for DESC
LIMIT 20;
```

### View Cron Job Logs

1. Go to Vercel Dashboard
2. Your Project → Deployments
3. Click latest deployment
4. Click "Functions" tab
5. Click on a cron function
6. View logs

---

## 🚨 Troubleshooting

### "OpenAI API error: Insufficient quota"

**Problem**: You've run out of OpenAI credits
**Solution**: 
1. Go to https://platform.openai.com/account/billing
2. Add credits ($5 minimum)
3. Set up auto-recharge

### "Blog post generated but not visible"

**Problem**: Post created as draft
**Solution**: 
1. Check Supabase → blog_posts table
2. Find the post
3. Set `is_published = true`

### "Social media posts not posting"

**Problem**: API keys not configured or expired
**Solution**:
1. Check environment variables are set
2. Test API keys individually
3. Check token expiration dates
4. Regenerate if needed

### "Generated content is low quality"

**Problem**: Using GPT-3.5 instead of GPT-4
**Solution**:
1. Edit `/lib/content-generation/blogGenerator.ts`
2. Change model from `gpt-3.5-turbo` to `gpt-4o`
3. Note: GPT-4 costs more but produces much better content

---

## 📈 Scaling Up

### When You Hit $500/month Revenue

**Upgrade to**:
- Daily blog posts (not just 3x/week)
- More social media platforms
- Multiple posts per platform per day
- Video content (YouTube, TikTok)
- Podcast (AI-generated audio from blog posts)

**Additional tools**:
- Jasper AI (alternative to OpenAI)
- Surfer SEO (advanced SEO optimization)
- Lately.ai (AI social media management)
- Canva Pro (automated graphics)

---

## ✅ Success Checklist

### Blog Automation
- [ ] OpenAI API key added
- [ ] Unsplash API key added (optional)
- [ ] Test blog generation works
- [ ] First auto-generated post published
- [ ] Cron job scheduled and running

### Social Media Automation
- [ ] Choose automation method (Buffer vs Direct APIs)
- [ ] API keys added to environment
- [ ] Social accounts connected
- [ ] Test post works on each platform
- [ ] Cron job scheduled and running
- [ ] First auto-post successful

### Monitoring
- [ ] Set up email alerts for failures
- [ ] Check logs weekly
- [ ] Review generated content quality
- [ ] Adjust frequency if needed
- [ ] Monitor API costs

---

## 🎉 You're Done!

Your platform now:

✅ Generates 3 blog posts per week automatically
✅ Posts to social media 12+ times per day
✅ Creates 126 pieces of content per week
✅ Requires zero manual content creation
✅ Costs $5-15/month to run

**This is true passive content marketing!**

---

## 📚 Additional Resources

**OpenAI Documentation**:
https://platform.openai.com/docs

**Buffer API Documentation**:
https://buffer.com/developers/api

**Twitter API Documentation**:
https://developer.twitter.com/en/docs

**Facebook Graph API**:
https://developers.facebook.com/docs/graph-api

**Pinterest API**:
https://developers.pinterest.com/docs

---

**Next Steps**: 
1. Set up OpenAI API (15 min)
2. Deploy and test (10 min)
3. Set up social media (30 min - 2 hours depending on method)
4. Monitor for a week
5. Adjust as needed
6. Enjoy automatic content! 🎉
