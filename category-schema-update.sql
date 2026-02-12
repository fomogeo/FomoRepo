-- FOMOGEO CATEGORY SYSTEM UPDATE
-- Run this SQL in Supabase SQL Editor to add category support

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    keywords TEXT[], -- Array of keywords
    commission_avg INTEGER,
    trending BOOLEAN DEFAULT false,
    product_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update products table to link to categories
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS category_id TEXT REFERENCES categories(id);

-- Create index for category lookups
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_trending ON categories(trending);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read access to categories
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (TRUE);

-- Insert the 30 FomoGeo categories
INSERT INTO categories (id, name, slug, description, icon, color, keywords, commission_avg, trending) VALUES
('1', 'Electronics', 'electronics', 'Latest gadgets, smartphones, laptops, and tech accessories', '💻', '#3B82F6', ARRAY['tech', 'gadgets', 'electronics', 'devices'], 3, true),
('2', 'Home & Kitchen', 'home-kitchen', 'Appliances, cookware, furniture, and home essentials', '🏠', '#10B981', ARRAY['home', 'kitchen', 'appliances', 'furniture'], 5, true),
('3', 'Fashion & Apparel', 'fashion-apparel', 'Clothing, shoes, accessories, and style essentials', '👔', '#EC4899', ARRAY['fashion', 'clothing', 'apparel', 'style'], 8, true),
('4', 'Beauty & Personal Care', 'beauty-personal-care', 'Skincare, makeup, hair care, and wellness products', '💄', '#F59E0B', ARRAY['beauty', 'skincare', 'makeup', 'cosmetics'], 10, true),
('5', 'Health & Wellness', 'health-wellness', 'Supplements, fitness equipment, and health products', '💊', '#14B8A6', ARRAY['health', 'wellness', 'fitness', 'supplements'], 8, true),
('6', 'Sports & Outdoors', 'sports-outdoors', 'Exercise equipment, camping gear, and outdoor activities', '⚽', '#06B6D4', ARRAY['sports', 'outdoors', 'camping', 'exercise'], 6, false),
('7', 'Toys & Games', 'toys-games', 'Kids toys, board games, puzzles, and entertainment', '🎮', '#8B5CF6', ARRAY['toys', 'games', 'kids', 'entertainment'], 4, false),
('8', 'Books & Media', 'books-media', 'Books, eBooks, audiobooks, movies, and music', '📚', '#6366F1', ARRAY['books', 'media', 'reading', 'audiobooks'], 4, false),
('9', 'Pet Supplies', 'pet-supplies', 'Food, toys, accessories for dogs, cats, and pets', '🐕', '#F97316', ARRAY['pets', 'dogs', 'cats', 'animals'], 5, true),
('10', 'Baby & Kids', 'baby-kids', 'Diapers, strollers, baby gear, and children''s products', '👶', '#EC4899', ARRAY['baby', 'kids', 'children', 'parenting'], 6, false),
('11', 'Automotive', 'automotive', 'Car accessories, tools, parts, and auto care products', '🚗', '#EF4444', ARRAY['automotive', 'car', 'vehicle', 'auto'], 4, false),
('12', 'Garden & Outdoor', 'garden-outdoor', 'Plants, garden tools, outdoor furniture, and décor', '🌻', '#22C55E', ARRAY['garden', 'outdoor', 'plants', 'gardening'], 5, false),
('13', 'Office Supplies', 'office-supplies', 'Desks, chairs, stationery, and workspace essentials', '🖊️', '#64748B', ARRAY['office', 'workspace', 'desk', 'supplies'], 4, false),
('14', 'Tools & Home Improvement', 'tools-home-improvement', 'Power tools, hand tools, hardware, and DIY supplies', '🔨', '#DC2626', ARRAY['tools', 'diy', 'hardware', 'improvement'], 5, false),
('15', 'Jewelry & Watches', 'jewelry-watches', 'Fashion jewelry, watches, and luxury accessories', '💍', '#A855F7', ARRAY['jewelry', 'watches', 'accessories', 'luxury'], 10, false),
('16', 'Gaming', 'gaming', 'Video games, consoles, PC gaming, and accessories', '🎮', '#7C3AED', ARRAY['gaming', 'video games', 'console', 'pc'], 3, true),
('17', 'Smart Home', 'smart-home', 'Alexa, smart bulbs, security cameras, home automation', '🏡', '#0EA5E9', ARRAY['smart home', 'automation', 'iot', 'alexa'], 5, true),
('18', 'Furniture', 'furniture', 'Beds, sofas, tables, chairs, and home furnishings', '🛋️', '#78716C', ARRAY['furniture', 'home', 'decor', 'furnishings'], 6, false),
('19', 'Luggage & Travel', 'luggage-travel', 'Suitcases, backpacks, travel accessories, and gear', '🧳', '#0891B2', ARRAY['luggage', 'travel', 'suitcase', 'backpack'], 7, false),
('20', 'Arts & Crafts', 'arts-crafts', 'Art supplies, craft materials, and DIY projects', '🎨', '#D946EF', ARRAY['arts', 'crafts', 'diy', 'creative'], 6, false),
('21', 'Musical Instruments', 'musical-instruments', 'Guitars, keyboards, drums, and music accessories', '🎸', '#F59E0B', ARRAY['music', 'instruments', 'guitar', 'piano'], 5, false),
('22', 'Photography', 'photography', 'Cameras, lenses, tripods, and photography gear', '📷', '#6366F1', ARRAY['photography', 'camera', 'photo', 'video'], 4, false),
('23', 'Phones & Accessories', 'phones-accessories', 'Smartphones, cases, chargers, and mobile accessories', '📱', '#3B82F6', ARRAY['phone', 'smartphone', 'mobile', 'accessories'], 3, true),
('24', 'Computers & Tablets', 'computers-tablets', 'Laptops, desktops, tablets, and computer accessories', '💻', '#2563EB', ARRAY['computer', 'laptop', 'tablet', 'pc'], 3, true),
('25', 'Audio & Headphones', 'audio-headphones', 'Headphones, speakers, earbuds, and audio equipment', '🎧', '#1D4ED8', ARRAY['audio', 'headphones', 'speakers', 'earbuds'], 4, true),
('26', 'Wearable Tech', 'wearable-tech', 'Smartwatches, fitness trackers, and wearable devices', '⌚', '#10B981', ARRAY['wearable', 'smartwatch', 'fitness tracker', 'tech'], 4, true),
('27', 'Kitchen Appliances', 'kitchen-appliances', 'Coffee makers, blenders, air fryers, and cooking tools', '☕', '#F97316', ARRAY['kitchen', 'appliances', 'cooking', 'coffee'], 5, false),
('28', 'Bedding & Bath', 'bedding-bath', 'Sheets, towels, bathroom accessories, and linens', '🛏️', '#06B6D4', ARRAY['bedding', 'bath', 'towels', 'linens'], 6, false),
('29', 'Storage & Organization', 'storage-organization', 'Shelving, bins, organizers, and storage solutions', '📦', '#64748B', ARRAY['storage', 'organization', 'bins', 'shelving'], 5, false),
('30', 'Party & Events', 'party-events', 'Decorations, supplies, costumes, and party essentials', '🎉', '#EC4899', ARRAY['party', 'events', 'celebration', 'decorations'], 6, false)
ON CONFLICT (id) DO NOTHING;

-- Function to update product counts
CREATE OR REPLACE FUNCTION update_category_product_counts()
RETURNS void AS $$
BEGIN
  UPDATE categories
  SET product_count = (
    SELECT COUNT(*)
    FROM products
    WHERE products.category_id = categories.id
  );
END;
$$ LANGUAGE plpgsql;

-- Trigger to update product count when products change
CREATE OR REPLACE FUNCTION update_category_count_on_product_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Update old category if product was moved
  IF TG_OP = 'UPDATE' AND OLD.category_id IS DISTINCT FROM NEW.category_id THEN
    UPDATE categories
    SET product_count = product_count - 1
    WHERE id = OLD.category_id;
  END IF;
  
  -- Update new category
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.category_id IS DISTINCT FROM NEW.category_id) THEN
    UPDATE categories
    SET product_count = product_count + 1
    WHERE id = NEW.category_id;
  END IF;
  
  -- Update old category on delete
  IF TG_OP = 'DELETE' THEN
    UPDATE categories
    SET product_count = product_count - 1
    WHERE id = OLD.category_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_update_category_count ON products;
CREATE TRIGGER trigger_update_category_count
AFTER INSERT OR UPDATE OR DELETE ON products
FOR EACH ROW
EXECUTE FUNCTION update_category_count_on_product_change();

-- Initial product count update
SELECT update_category_product_counts();

-- Note: You may need to manually update existing products to link them to categories
-- Example:
-- UPDATE products SET category_id = '1' WHERE category ILIKE '%electronics%';
-- UPDATE products SET category_id = '2' WHERE category ILIKE '%home%' OR category ILIKE '%kitchen%';
-- etc.
