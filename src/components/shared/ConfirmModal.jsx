import React, { useEffect, useRef } from 'react'

export function ConfirmModal({ isOpen, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel, danger = false }) {
  const cancelRef = useRef(null)

  useEffect(() => {
    if (isOpen) cancelRef.current?.focus()
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto ${danger ? 'bg-red-100' : 'bg-blue-100'}`}>
          <span className="text-2xl">{danger ? '⚠️' : '❓'}</span>
        </div>
        <h2 className="text-lg font-bold text-slate-800 text-center mb-2">{title}</h2>
        <p className="text-sm text-slate-600 text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 font-medium rounded-xl transition-colors text-sm text-white ${
              danger ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
