# 🎨 FomoGeo Legendary Design System

## Semi-Dark Mode Theme

**Philosophy:** Professional, inviting, and trustworthy with vibrant accents

### Color Palette

**Backgrounds (Semi-Dark)**
- Primary: `#1a1f2e` - Deep charcoal
- Secondary: `#252b3b` - Lighter charcoal  
- Tertiary: `#2f3648` - Card backgrounds
- Elevated: `#3a4159` - Raised elements

**Accents (Vibrant & Professional)**
- Teal: `#06b6d4` - Primary brand color
- Cyan: `#22d3ee` - Highlights
- Emerald: `#10b981` - Success states
- Amber: `#f59e0b` - Warnings
- Orange: `#f97316` - CTAs
- Rose: `#f43f5e` - Alerts
- Violet: `#8b5cf6` - Premium features

### Typography

**Fonts:**
- Headings: Space Grotesk (Bold, modern)
- Body: Inter (Clean, readable)

**Sizes:**
- Display: `clamp(2.5rem, 5vw, 4rem)`
- Heading: `clamp(2rem, 4vw, 3rem)`
- Subheading: `clamp(1.5rem, 3vw, 2rem)`

### Components

**Cards:**
- `.card` - Standard card with hover
- `.card-elevated` - Raised card with gradient
- `.card-glass` - Glassmorphism effect

**Buttons:**
- `.btn-primary` - Teal/cyan gradient
- `.btn-secondary` - Orange/amber gradient
- `.btn-outline` - Teal outline

**Effects:**
- `.texture-noise` - Subtle noise overlay
- `.texture-dots` - Dot pattern
- `.text-shimmer` - Animated shimmer
- `.glow-teal` - Teal glow effect

### Usage Examples

```jsx
// Professional card
<div className="card hover-lift">
  <h3 className="heading-gradient-teal">Title</h3>
  <p className="text-secondary">Description</p>
</div>

// Gradient button
<button className="btn-primary">
  Get Started
</button>

// Section with texture
<section className="section-dark texture-noise">
  <div className="container-custom">
    {/* Content */}
  </div>
</section>
```

### Design Principles

1. **Consistency** - Same spacing, colors, effects throughout
2. **Hierarchy** - Clear visual structure
3. **Accessibility** - WCAG AA compliant
4. **Performance** - Optimized CSS, no layout shifts
5. **SEO** - Semantic HTML, proper headings
6. **Responsive** - Mobile-first approach

