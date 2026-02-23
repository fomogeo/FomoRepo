export default function AdSpace({ size = 'banner' }: { size?: 'banner' | 'sidebar' | 'square' | 'leaderboard' | 'large' }) {
  const sizes = {
    banner: 'h-24 md:h-32',
    sidebar: 'h-64',
    square: 'h-64 w-64',
    leaderboard: 'h-20 md:h-24',
    large: 'h-96'
  }

  return (
    <div className={`w-full ${sizes[size]} rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50`}>
      <span className="text-sm text-fg-muted font-medium">📢 Ad Space</span>
    </div>
  )
}
