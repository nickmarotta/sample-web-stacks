interface HpBarProps {
  current: number
  max: number
  showLabel?: boolean
  showNumbers?: boolean
}

function getColor(pct: number): string {
  if (pct > 50) return 'bg-green-500'
  if (pct > 20) return 'bg-yellow-400'
  return 'bg-red-500'
}

export function HpBar({ current, max, showLabel = true, showNumbers = false }: HpBarProps) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100))
  const color = getColor(pct)

  return (
    <div className="font-mono">
      <div className="flex items-center gap-2">
        {showLabel && <span className="text-[10px] font-bold">HP:</span>}
        <div className="flex-1 h-3 bg-gray-300 border-[2px] border-gray-900 rounded-sm overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-300`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      {showNumbers && (
        <div className="text-[10px] font-bold text-right mt-0.5">
          {current} / {max}
        </div>
      )}
    </div>
  )
}
