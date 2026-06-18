import React from 'react'

export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-3xl">
        {icon || '📭'}
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-1">{title || 'Nothing here yet'}</h3>
      {description && <p className="text-sm text-slate-500 max-w-xs mb-4">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
