-- FOMO Deals Platform Database Schema
-- This SQL file creates all necessary tables for the platform
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    discount_percentage INTEGER,
    image_url TEXT,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    is_trending BOOLEAN DEFAULT FALSE,
    is_best_seller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on trending and best seller fields
CREATE INDEX idx_products_trending ON products(is_trending) WHERE is_trending = TRUE;
CREATE INDEX idx_products_best_seller ON products(is_best_seller) WHERE is_best_seller = TRUE;
CREATE INDEX idx_products_category ON products(category);

-- Affiliate links table
CREATE TABLE IF NOT EXISTS affiliate_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    network TEXT NOT NULL, -- e.g., 'amazon', 'awin', 'cj', 'impact'
    country_code TEXT NOT NULL, -- e.g., 'US', 'UK', 'DE', or 'GLOBAL'
    affiliate_url TEXT NOT NULL,
    priority INTEGER DEFAULT 1, -- Higher priority links are chosen first
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for affiliate links
CREATE INDEX idx_affiliate_links_product ON affiliate_links(product_id);
CREATE INDEX idx_affiliate_links_country ON affiliate_links(country_code);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10, 2) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on active coupons
CREATE INDEX idx_coupons_active ON coupons(is_active, expires_at);

-- Email subscribers table
CREATE TABLE IF NOT EXISTS email_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    is_subscribed BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create index on email for quick lookups
CREATE INDEX idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX idx_email_subscribers_status ON email_subscribers(is_subscribed);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    author TEXT DEFAULT 'FOMO Finds Team',
    published_at TIMESTAMP WITH TIME ZONE,
    is_published BOOLEAN DEFAULT FALSE,
    featured_image TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for blog posts
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at);

-- Analytics table (optional - for tracking clicks)
CREATE TABLE IF NOT EXISTS affiliate_clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    affiliate_link_id UUID REFERENCES affiliate_links(id) ON DELETE CASCADE,
    user_country TEXT,
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for analytics
CREATE INDEX idx_affiliate_clicks_product ON affiliate_clicks(product_id);
CREATE INDEX idx_affiliate_clicks_date ON affiliate_clicks(clicked_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Sample data insertion (optional - for testing)

-- Insert sample products
INSERT INTO products (name, description, price, original_price, discount_percentage, image_url, category, tags, is_trending, is_best_seller) VALUES
    ('Smart Watch Pro', 'Advanced fitness tracking and notifications', 249.99, 349.99, 29, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', 'Electronics', ARRAY['tech', 'wearable', 'fitness'], TRUE, TRUE),
    ('Wireless Headphones', 'Premium noise-cancelling headphones', 199.99, 299.99, 33, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', 'Electronics', ARRAY['audio', 'tech'], TRUE, FALSE),
    ('Coffee Maker Deluxe', 'Programmable coffee maker with timer', 89.99, 129.99, 31, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6', 'Home', ARRAY['kitchen', 'appliance'], FALSE, TRUE);

-- Insert sample affiliate links for the Smart Watch
INSERT INTO affiliate_links (product_id, network, country_code, affiliate_url, priority) 
SELECT id, 'amazon', 'US', 'https://amazon.com/smartwatch?tag=yourtaghere', 1 FROM products WHERE name = 'Smart Watch Pro';

INSERT INTO affiliate_links (product_id, network, country_code, affiliate_url, priority)
SELECT id, 'amazon', 'UK', 'https://amazon.co.uk/smartwatch?tag=yourtaghere', 1 FROM products WHERE name = 'Smart Watch Pro';

-- Insert sample coupon
INSERT INTO coupons (code, description, discount_type, discount_value, expires_at, is_active)
VALUES ('SAVE10', 'Get 10% off your purchase', 'percentage', 10, NOW() + INTERVAL '30 days', TRUE);

-- Insert sample blog post
INSERT INTO blog_posts (title, slug, content, excerpt, is_published, published_at, tags)
VALUES (
    'Top 10 Tech Gadgets of 2026',
    'top-10-tech-gadgets-2026',
    'Discover the best tech gadgets that are trending right now...',
    'A comprehensive guide to the hottest tech products this year',
    TRUE,
    NOW(),
    ARRAY['tech', 'gadgets', 'reviews']
);

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products, affiliate_links, coupons, and blog_posts
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (TRUE);
CREATE POLICY "Public read access for affiliate_links" ON affiliate_links FOR SELECT USING (TRUE);
CREATE POLICY "Public read access for coupons" ON coupons FOR SELECT USING (TRUE);
CREATE POLICY "Public read access for blog_posts" ON blog_posts FOR SELECT USING (is_published = TRUE);

-- Email subscribers can only be created, not read by public
CREATE POLICY "Anyone can subscribe" ON email_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Can update own subscription" ON email_subscribers FOR UPDATE USING (TRUE);

-- Affiliate clicks can be inserted by anyone
CREATE POLICY "Anyone can track clicks" ON affiliate_clicks FOR INSERT WITH CHECK (TRUE);

-- Social media queue table (for automated posting)
CREATE TABLE IF NOT EXISTS social_media_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL CHECK (platform IN ('twitter', 'facebook', 'pinterest', 'instagram', 'linkedin')),
    content TEXT NOT NULL,
    url TEXT,
    image_url TEXT,
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'posted', 'failed')),
    posted_at TIMESTAMP WITH TIME ZONE,
    post_id TEXT,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for scheduled posts
CREATE INDEX idx_social_media_queue_scheduled ON social_media_queue(status, scheduled_for);
CREATE INDEX idx_social_media_queue_platform ON social_media_queue(platform, status);

-- Enable RLS
ALTER TABLE social_media_queue ENABLE ROW LEVEL SECURITY;

-- Only service role can manage social media queue
CREATE POLICY "Service role can manage queue" ON social_media_queue FOR ALL USING (TRUE);

-- Note: For admin operations, you'll need to use the service role key
-- These policies ensure data security while allowing public read access to relevant content
