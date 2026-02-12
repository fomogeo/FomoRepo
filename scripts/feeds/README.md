# Product Feeds Folder

Place your CSV product feeds in this folder for bulk import.

## Quick Start

1. Download product feed from your affiliate network
2. Place CSV file in this folder
3. Run import command:

```bash
npm run import-csv <filename> <format> <network> <country>
```

## Examples

**Import Amazon products:**
```bash
npm run import-csv amazon-products.csv amazon amazon US
```

**Import Awin products:**
```bash
npm run import-csv awin-feed.csv awin awin UK
```

**Import generic CSV:**
```bash
npm run import-csv my-products.csv generic custom US
```

## Supported Formats

### Amazon
Required columns: `title`, `price`, `description`, `image_url`, `asin`

### Awin
Required columns: `product_name`, `search_price`, `description`, `merchant_image_url`, `aw_deep_link`

### ShareASale
Required columns: `name`, `price`, `description`, `image`, `custom_link`

### CJ Affiliate
Required columns: `name`, `retail_price`, `description`, `image_url`, `buy_url`

### Generic (Custom)
Required columns: `name`, `price`, `description`, `image_url`, `url`
Optional: `original_price`, `category`

## CSV Format Tips

1. **First row must be headers**
2. **Use commas as separators**
3. **Wrap text with commas in quotes**: `"Description, with comma"`
4. **Image URLs must be complete**: `https://example.com/image.jpg`
5. **Prices as numbers**: `99.99` (no currency symbols)

## Sample CSV

See `example-generic.csv` for a template you can use.

## Where to Get Product Feeds

### Amazon Associates
1. Log in to Amazon Associates
2. Tools → Product Links → Download Product Links
3. Save as CSV

### Awin
1. Log in to Awin
2. Publishers → Product Feeds
3. Select merchant
4. Download feed (CSV format)

### ShareASale
1. Log in to ShareASale
2. Tools → Datafeed Services
3. Select merchant
4. Download product feed

### CJ Affiliate
1. Log in to CJ
2. Links → Product Catalog
3. Export products as CSV

## Automation

You can automate CSV imports using:

**Windows Task Scheduler:**
- Create task to run import script weekly
- Trigger: Monday 9 AM
- Action: `node C:\path\to\scripts\import-csv.js amazon-products.csv amazon amazon US`

**Mac/Linux Cron:**
```bash
# Edit crontab
crontab -e

# Add this line (runs every Monday at 9 AM)
0 9 * * 1 cd /path/to/project && node scripts/import-csv.js amazon-products.csv amazon amazon US
```

## Troubleshooting

**"File not found"**
- Make sure CSV is in this folder (`scripts/feeds/`)
- Check filename spelling

**"No products imported"**
- Verify CSV has correct columns
- Check first row is headers
- Ensure prices are numbers

**"Supabase error"**
- Verify `.env.local` has correct credentials
- Check Supabase project is running

## Need Help?

See `AUTOMATION_SETUP.md` for complete automation guide.
