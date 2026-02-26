export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  trending: boolean
  color?: string
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', icon: '💻', description: 'Latest tech gadgets', trending: true, color: '#06b6d4' },
  { id: '2', name: 'Fashion', slug: 'fashion', icon: '👗', description: 'Clothing and accessories', trending: true, color: '#f43f5e' },
  { id: '3', name: 'Home & Kitchen', slug: 'home-kitchen', icon: '🏠', description: 'Home essentials', trending: true, color: '#f97316' },
  { id: '4', name: 'Beauty', slug: 'beauty', icon: '💄', description: 'Beauty products', trending: true, color: '#8b5cf6' },
  { id: '5', name: 'Sports', slug: 'sports', icon: '⚽', description: 'Sports gear', trending: true, color: '#10b981' },
  { id: '6', name: 'Books', slug: 'books', icon: '📚', description: 'Books', trending: false, color: '#6366f1' },
  { id: '7', name: 'Toys & Games', slug: 'toys-games', icon: '🎮', description: 'Toys', trending: true, color: '#8b5cf6' },
  { id: '8', name: 'Automotive', slug: 'automotive', icon: '🚗', description: 'Auto parts', trending: false, color: '#3b82f6' },
  { id: '9', name: 'Health', slug: 'health', icon: '💊', description: 'Health products', trending: true, color: '#10b981' },
  { id: '10', name: 'Baby & Kids', slug: 'baby-kids', icon: '👶', description: 'Baby products', trending: true, color: '#f472b6' },
  { id: '11', name: 'Pet Supplies', slug: 'pets', icon: '🐾', description: 'Pet products', trending: true, color: '#f59e0b' },
  { id: '12', name: 'Tools', slug: 'tools', icon: '🔧', description: 'Tools', trending: false, color: '#64748b' },
  { id: '13', name: 'Office', slug: 'office', icon: '📎', description: 'Office supplies', trending: false, color: '#0ea5e9' },
  { id: '14', name: 'Garden', slug: 'garden', icon: '🌱', description: 'Garden', trending: false, color: '#22c55e' },
  { id: '15', name: 'Music', slug: 'music', icon: '🎸', description: 'Musical instruments', trending: false, color: '#f59e0b' },
  { id: '16', name: 'Arts & Crafts', slug: 'arts-crafts', icon: '🎨', description: 'Art supplies', trending: false, color: '#ec4899' },
  { id: '17', name: 'Jewelry', slug: 'jewelry', icon: '💍', description: 'Jewelry', trending: true, color: '#fbbf24' },
  { id: '18', name: 'Luggage', slug: 'luggage', icon: '🧳', description: 'Travel gear', trending: false, color: '#6366f1' },
  { id: '19', name: 'Grocery', slug: 'grocery', icon: '🛒', description: 'Food items', trending: false, color: '#22c55e' },
  { id: '20', name: 'Appliances', slug: 'appliances', icon: '🔌', description: 'Appliances', trending: false, color: '#0ea5e9' },
  { id: '21', name: 'Movies & TV', slug: 'movies-tv', icon: '🎬', description: 'Entertainment', trending: false, color: '#8b5cf6' },
  { id: '22', name: 'Video Games', slug: 'video-games', icon: '🎮', description: 'Gaming', trending: true, color: '#7c3aed' },
  { id: '23', name: 'Industrial', slug: 'industrial', icon: '⚙️', description: 'Industrial', trending: false, color: '#64748b' },
  { id: '24', name: 'Collectibles', slug: 'collectibles', icon: '🎭', description: 'Collectibles', trending: false, color: '#fbbf24' },
  { id: '25', name: 'Cell Phones', slug: 'phones', icon: '📱', description: 'Mobile devices', trending: true, color: '#06b6d4' },
  { id: '26', name: 'Computers', slug: 'computers', icon: '💻', description: 'PCs and tablets', trending: true, color: '#3b82f6' },
  { id: '27', name: 'Camera', slug: 'camera', icon: '📷', description: 'Photography', trending: false, color: '#64748b' },
  { id: '28', name: 'Software', slug: 'software', icon: '💿', description: 'Software', trending: false, color: '#6366f1' },
  { id: '29', name: 'Smart Home', slug: 'smart-home', icon: '🏡', description: 'Smart devices', trending: true, color: '#10b981' },
  { id: '30', name: 'Wearables', slug: 'wearables', icon: '⌚', description: 'Wearable tech', trending: true, color: '#06b6d4' },
]

export function getTrendingCategories(): Category[] {
  return CATEGORIES.filter(cat => cat.trending)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(cat => cat.slug === slug)
}
