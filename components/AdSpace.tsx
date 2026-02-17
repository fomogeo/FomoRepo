// AdSpace — placeholder for advertising (Google AdSense etc.)
// Replace inner div with your <ins class="adsbygoogle"> tag when ready.

interface AdSpaceProps {
  size?: 'banner' | 'leaderboard' | 'rectangle' | 'halfpage' | 'wide'
  label?: string
  className?: string
}

const sizes: Record<string, { minH: string; label: string }> = {
  banner:      { minH: 'min-h-[100px]', label: '728×90 Banner' },
  leaderboard: { minH: 'min-h-[100px]', label: '970×90 Leaderboard' },
  rectangle:   { minH: 'min-h-[260px]', label: '300×250 Rectangle' },
  halfpage:    { minH: 'min-h-[610px]', label: '300×600 Half Page' },
  wide:        { minH: 'min-h-[260px]', label: '970×250 Wide Banner' },
}

export default function AdSpace({ size = 'banner', label, className = '' }: AdSpaceProps) {
  const { minH, label: defaultLabel } = sizes[size]
  return (
    <div className={`w-full ${minH} ${className}`}>
      {/* ↓ REPLACE WITH YOUR AD CODE ↓ */}
      <div
        className={`w-full h-full ${minH} flex items-center justify-center rounded-xl text-sm font-medium`}
        style={{
          background: 'linear-gradient(135deg, rgba(0,212,200,0.04) 0%, rgba(0,0,0,0) 100%)',
          border: '2px dashed rgba(0,212,200,0.2)',
          color: '#4A7A9B',
        }}
      >
        <span>📢 Ad Space — {label || defaultLabel}</span>
      </div>
      {/* ↑ REPLACE WITH YOUR AD CODE ↑ */}
    </div>
  )
}
