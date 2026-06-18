import React from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { EmptyState } from '@/components/shared/EmptyState'
import { format, differenceInDays } from 'date-fns'
import { useToast } from '@/context/ToastContext'

const programColors = {
  'Basic Life Support':                   { bg: 'from-blue-500 to-blue-600',   icon: '💙' },
  'Advanced Cardiovascular Life Support': { bg: 'from-purple-500 to-purple-600', icon: '💜' },
  'Pediatric Advanced Life Support':      { bg: 'from-green-500 to-green-600',  icon: '💚' },
  'Neonatal Advanced Life Support':       { bg: 'from-amber-500 to-amber-600',  icon: '🧡' },
  'Advanced Trauma Life Support':         { bg: 'from-red-500 to-red-600',      icon: '❤️' },
  'Basic Life Support for Obstetrics':    { bg: 'from-pink-500 to-pink-600',    icon: '🩷' },
}

export default function Certificates() {
  const toast = useToast()

  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ['learner-certificates'],
    queryFn: () => api.get('/learner/certificates').then(r => r.data),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Certifications</h1>
          <p className="text-slate-500 text-sm mt-0.5">{certificates.length} certificate{certificates.length !== 1 ? 's' : ''} earned</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Valid', count: certificates.filter(c => c.status === 'valid').length, color: 'bg-green-50 text-green-700 border-green-100', icon: '✅' },
          { label: 'Expiring', count: certificates.filter(c => c.status === 'expiring').length, color: 'bg-amber-50 text-amber-700 border-amber-100', icon: '⚠️' },
          { label: 'Expired', count: certificates.filter(c => c.status === 'expired').length, color: 'bg-red-50 text-red-700 border-red-100', icon: '❌' },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.color}`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-2xl font-bold">{s.count}</p>
            <p className="text-xs font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Certificate grid */}
      {certificates.length === 0 ? (
        <EmptyState icon="🏆" title="No certificates yet" description="Complete a training program to earn your first certification." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {certificates.map((cert) => {
            const daysLeft = differenceInDays(new Date(cert.expiryDate), new Date())
            const theme = programColors[cert.programName] || { bg: 'from-slate-500 to-slate-600', icon: '📜' }

            return (
              <div key={cert.id} className="bg-white rounded-2xl shadow-sm shadow-slate-100 border border-slate-100 overflow-hidden hover:shadow-md transition-shadow" id={`cert-card-${cert.id}`}>
                {/* Card header */}
                <div className={`bg-gradient-to-r ${theme.bg} p-5 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{theme.icon}</span>
                    <StatusBadge status={cert.status} className="bg-white/20 text-white border-white/30" />
                  </div>
                  <h3 className="font-bold text-base leading-snug">{cert.programName}</h3>
                  <p className="text-white/70 text-xs mt-1">ID: {cert.credentialId}</p>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Issued</p>
                      <p className="text-sm font-semibold text-slate-800">{format(new Date(cert.issueDate), 'MMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Expires</p>
                      <p className={`text-sm font-semibold ${cert.status === 'expired' ? 'text-red-600' : cert.status === 'expiring' ? 'text-amber-600' : 'text-slate-800'}`}>
                        {format(new Date(cert.expiryDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>

                  {cert.status !== 'expired' && (
                    <div className={`text-xs font-medium px-3 py-1.5 rounded-lg mb-3 text-center ${daysLeft < 30 ? 'bg-red-50 text-red-600' : daysLeft < 90 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                      {daysLeft > 0 ? `${daysLeft} days remaining` : 'Expires today'}
                    </div>
                  )}

                  <button
                    onClick={() => toast.success('Certificate download started!')}
                    id={`download-cert-${cert.id}`}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    ↓ Download PDF
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
