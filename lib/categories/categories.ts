/**
 * FOMOGEO CATEGORY CONFIGURATION
 * 
 * 30 Top Product Categories for Maximum Conversion
 */

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  keywords: string[]
  commission_avg: number // Average commission rate
  trending: boolean
}

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets, smartphones, laptops, and tech accessories',
    icon: '💻',
    color: '#3B82F6', // Blue
    keywords: ['tech', 'gadgets', 'electronics', 'devices'],
    commission_avg: 3,
    trending: true,
  },
  {
    id: '2',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Appliances, cookware, furniture, and home essentials',
    icon: '🏠',
    color: '#10B981', // Green
    keywords: ['home', 'kitchen', 'appliances', 'furniture'],
    commission_avg: 5,
    trending: true,
  },
  {
    id: '3',
    name: 'Fashion & Apparel',
    slug: 'fashion-apparel',
    description: 'Clothing, shoes, accessories, and style essentials',
    icon: '👔',
    color: '#EC4899', // Pink
    keywords: ['fashion', 'clothing', 'apparel', 'style'],
    commission_avg: 8,
    trending: true,
  },
  {
    id: '4',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Skincare, makeup, hair care, and wellness products',
    icon: '💄',
    color: '#F59E0B', // Amber
    keywords: ['beauty', 'skincare', 'makeup', 'cosmetics'],
    commission_avg: 10,
    trending: true,
  },
  {
    id: '5',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    description: 'Supplements, fitness equipment, and health products',
    icon: '💊',
    color: '#14B8A6', // Teal
    keywords: ['health', 'wellness', 'fitness', 'supplements'],
    commission_avg: 8,
    trending: true,
  },
  {
    id: '6',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Exercise equipment, camping gear, and outdoor activities',
    icon: '⚽',
    color: '#06B6D4', // Cyan
    keywords: ['sports', 'outdoors', 'camping', 'exercise'],
    commission_avg: 6,
    trending: false,
  },
  {
    id: '7',
    name: 'Toys & Games',
    slug: 'toys-games',
    description: 'Kids toys, board games, puzzles, and entertainment',
    icon: '🎮',
    color: '#8B5CF6', // Purple
    keywords: ['toys', 'games', 'kids', 'entertainment'],
    commission_avg: 4,
    trending: false,
  },
  {
    id: '8',
    name: 'Books & Media',
    slug: 'books-media',
    description: 'Books, eBooks, audiobooks, movies, and music',
    icon: '📚',
    color: '#6366F1', // Indigo
    keywords: ['books', 'media', 'reading', 'audiobooks'],
    commission_avg: 4,
    trending: false,
  },
  {
    id: '9',
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    description: 'Food, toys, accessories for dogs, cats, and pets',
    icon: '🐕',
    color: '#F97316', // Orange
    keywords: ['pets', 'dogs', 'cats', 'animals'],
    commission_avg: 5,
    trending: true,
  },
  {
    id: '10',
    name: 'Baby & Kids',
    slug: 'baby-kids',
    description: 'Diapers, strollers, baby gear, and children\'s products',
    icon: '👶',
    color: '#EC4899', // Pink
    keywords: ['baby', 'kids', 'children', 'parenting'],
    commission_avg: 6,
    trending: false,
  },
  {
    id: '11',
    name: 'Automotive',
    slug: 'automotive',
    description: 'Car accessories, tools, parts, and auto care products',
    icon: '🚗',
    color: '#EF4444', // Red
    keywords: ['automotive', 'car', 'vehicle', 'auto'],
    commission_avg: 4,
    trending: false,
  },
  {
    id: '12',
    name: 'Garden & Outdoor',
    slug: 'garden-outdoor',
    description: 'Plants, garden tools, outdoor furniture, and décor',
    icon: '🌻',
    color: '#22C55E', // Green
    keywords: ['garden', 'outdoor', 'plants', 'gardening'],
    commission_avg: 5,
    trending: false,
  },
  {
    id: '13',
    name: 'Office Supplies',
    slug: 'office-supplies',
    description: 'Desks, chairs, stationery, and workspace essentials',
    icon: '🖊️',
    color: '#64748B', // Slate
    keywords: ['office', 'workspace', 'desk', 'supplies'],
    commission_avg: 4,
    trending: false,
  },
  {
    id: '14',
    name: 'Tools & Home Improvement',
    slug: 'tools-home-improvement',
    description: 'Power tools, hand tools, hardware, and DIY supplies',
    icon: '🔨',
    color: '#DC2626', // Red
    keywords: ['tools', 'diy', 'hardware', 'improvement'],
    commission_avg: 5,
    trending: false,
  },
  {
    id: '15',
    name: 'Jewelry & Watches',
    slug: 'jewelry-watches',
    description: 'Fashion jewelry, watches, and luxury accessories',
    icon: '💍',
    color: '#A855F7', // Purple
    keywords: ['jewelry', 'watches', 'accessories', 'luxury'],
    commission_avg: 10,
    trending: false,
  },
  {
    id: '16',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Video games, consoles, PC gaming, and accessories',
    icon: '🎮',
    color: '#7C3AED', // Violet
    keywords: ['gaming', 'video games', 'console', 'pc'],
    commission_avg: 3,
    trending: true,
  },
  {
    id: '17',
    name: 'Smart Home',
    slug: 'smart-home',
    description: 'Alexa, smart bulbs, security cameras, home automation',
    icon: '🏡',
    color: '#0EA5E9', // Sky
    keywords: ['smart home', 'automation', 'iot', 'alexa'],
    commission_avg: 5,
    trending: true,
  },
  {
    id: '18',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Beds, sofas, tables, chairs, and home furnishings',
    icon: '🛋️',
    color: '#78716C', // Stone
    keywords: ['furniture', 'home', 'decor', 'furnishings'],
    commission_avg: 6,
    trending: false,
  },
  {
    id: '19',
    name: 'Luggage & Travel',
    slug: 'luggage-travel',
    description: 'Suitcases, backpacks, travel accessories, and gear',
    icon: '🧳',
    color: '#0891B2', // Cyan
    keywords: ['luggage', 'travel', 'suitcase', 'backpack'],
    commission_avg: 7,
    trending: false,
  },
  {
    id: '20',
    name: 'Arts & Crafts',
    slug: 'arts-crafts',
    description: 'Art supplies, craft materials, and DIY projects',
    icon: '🎨',
    color: '#D946EF', // Fuchsia
    keywords: ['arts', 'crafts', 'diy', 'creative'],
    commission_avg: 6,
    trending: false,
  },
  {
    id: '21',
    name: 'Musical Instruments',
    slug: 'musical-instruments',
    description: 'Guitars, keyboards, drums, and music accessories',
    icon: '🎸',
    color: '#F59E0B', // Amber
    keywords: ['music', 'instruments', 'guitar', 'piano'],
    commission_avg: 5,
    trending: false,
  },
  {
    id: '22',
    name: 'Photography',
    slug: 'photography',
    description: 'Cameras, lenses, tripods, and photography gear',
    icon: '📷',
    color: '#6366F1', // Indigo
    keywords: ['photography', 'camera', 'photo', 'video'],
    commission_avg: 4,
    trending: false,
  },
  {
    id: '23',
    name: 'Phones & Accessories',
    slug: 'phones-accessories',
    description: 'Smartphones, cases, chargers, and mobile accessories',
    icon: '📱',
    color: '#3B82F6', // Blue
    keywords: ['phone', 'smartphone', 'mobile', 'accessories'],
    commission_avg: 3,
    trending: true,
  },
  {
    id: '24',
    name: 'Computers & Tablets',
    slug: 'computers-tablets',
    description: 'Laptops, desktops, tablets, and computer accessories',
    icon: '💻',
    color: '#2563EB', // Blue
    keywords: ['computer', 'laptop', 'tablet', 'pc'],
    commission_avg: 3,
    trending: true,
  },
  {
    id: '25',
    name: 'Audio & Headphones',
    slug: 'audio-headphones',
    description: 'Headphones, speakers, earbuds, and audio equipment',
    icon: '🎧',
    color: '#1D4ED8', // Blue
    keywords: ['audio', 'headphones', 'speakers', 'earbuds'],
    commission_avg: 4,
    trending: true,
  },
  {
    id: '26',
    name: 'Wearable Tech',
    slug: 'wearable-tech',
    description: 'Smartwatches, fitness trackers, and wearable devices',
    icon: '⌚',
    color: '#10B981', // Green
    keywords: ['wearable', 'smartwatch', 'fitness tracker', 'tech'],
    commission_avg: 4,
    trending: true,
  },
  {
    id: '27',
    name: 'Kitchen Appliances',
    slug: 'kitchen-appliances',
    description: 'Coffee makers, blenders, air fryers, and cooking tools',
    icon: '☕',
    color: '#F97316', // Orange
    keywords: ['kitchen', 'appliances', 'cooking', 'coffee'],
    commission_avg: 5,
    trending: false,
  },
  {
    id: '28',
    name: 'Bedding & Bath',
    slug: 'bedding-bath',
    description: 'Sheets, towels, bathroom accessories, and linens',
    icon: '🛏️',
    color: '#06B6D4', // Cyan
    keywords: ['bedding', 'bath', 'towels', 'linens'],
    commission_avg: 6,
    trending: false,
  },
  {
    id: '29',
    name: 'Storage & Organization',
    slug: 'storage-organization',
    description: 'Shelving, bins, organizers, and storage solutions',
    icon: '📦',
    color: '#64748B', // Slate
    keywords: ['storage', 'organization', 'bins', 'shelving'],
    commission_avg: 5,
    trending: false,
  },
  {
    id: '30',
    name: 'Party & Events',
    slug: 'party-events',
    description: 'Decorations, supplies, costumes, and party essentials',
    icon: '🎉',
    color: '#EC4899', // Pink
    keywords: ['party', 'events', 'celebration', 'decorations'],
    commission_avg: 6,
    trending: false,
  },
]

// Helper functions
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(cat => cat.slug === slug)
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(cat => cat.id === id)
}

export function getTrendingCategories(): Category[] {
  return CATEGORIES.filter(cat => cat.trending)
}

export function getAllCategorySlugs(): string[] {
  return CATEGORIES.map(cat => cat.slug)
}

export function getCategoriesByKeyword(keyword: string): Category[] {
  const lowerKeyword = keyword.toLowerCase()
  return CATEGORIES.filter(cat =>
    cat.keywords.some(k => k.includes(lowerKeyword)) ||
    cat.name.toLowerCase().includes(lowerKeyword)
  )
}
