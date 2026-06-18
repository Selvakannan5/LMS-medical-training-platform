import React from 'react'

const variantMap = {
  valid:    'bg-green-100 text-green-700 border border-green-200',
  pass:     'bg-green-100 text-green-700 border border-green-200',
  active:   'bg-green-100 text-green-700 border border-green-200',
  completed:'bg-green-100 text-green-700 border border-green-200',
  expiring: 'bg-amber-100 text-amber-700 border border-amber-200',
  pending:  'bg-amber-100 text-amber-700 border border-amber-200',
  upcoming: 'bg-amber-100 text-amber-700 border border-amber-200',
  in_progress:'bg-blue-100 text-blue-700 border border-blue-200',
  scheduled:'bg-blue-100 text-blue-700 border border-blue-200',
  expired:  'bg-red-100 text-red-700 border border-red-200',
  fail:     'bg-red-100 text-red-700 border border-red-200',
  inactive: 'bg-slate-100 text-slate-600 border border-slate-200',
  none:     'bg-slate-100 text-slate-600 border border-slate-200',
}

const dotMap = {
  valid: 'bg-green-500', pass: 'bg-green-500', active: 'bg-green-500', completed: 'bg-green-500',
  expiring: 'bg-amber-500', pending: 'bg-amber-500', upcoming: 'bg-amber-500',
  in_progress: 'bg-blue-500', scheduled: 'bg-blue-500',
  expired: 'bg-red-500', fail: 'bg-red-500',
  inactive: 'bg-slate-400', none: 'bg-slate-400',
}

const labelMap = {
  valid: 'Valid', pass: 'Pass', active: 'Active', completed: 'Completed',
  expiring: 'Expiring Soon', pending: 'Pending', upcoming: 'Upcoming',
  in_progress: 'In Progress', scheduled: 'Scheduled',
  expired: 'Expired', fail: 'Fail',
  inactive: 'Inactive', none: 'None',
}

export function StatusBadge({ status, label, className = '' }) {
  const key = status?.toLowerCase() || 'none'
  const classes = variantMap[key] || variantMap.none
  const dot = dotMap[key] || dotMap.none
  const text = label || labelMap[key] || status

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${classes} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {text}
    </span>
  )
}
