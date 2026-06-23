import React from 'react'

export function ProgressBar({ value = 0, max = 100, label, showPercent = true, color = 'blue', className = '' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const colorClass = pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-blue-500' : 'bg-amber-500'

  const colorMap = {
    blue: 'bg-blue-600',
    green: 'bg-green-500',
    emerald: 'bg-emerald-500',
    purple: 'bg-purple-600',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  }

  const barColor = color === 'auto' ? colorClass : (colorMap[color] || color)

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-slate-500 font-medium">{label}</span>}
          {showPercent && <span className="text-xs font-semibold text-slate-700">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
