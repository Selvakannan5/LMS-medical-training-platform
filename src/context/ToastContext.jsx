import React, { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const add = useCallback((message, type = 'success', duration = 4000) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => remove(id), duration)
    return id
  }, [remove])

  const toast = {
    success: (msg, dur) => add(msg, 'success', dur),
    error:   (msg, dur) => add(msg, 'error', dur),
    warn:    (msg, dur) => add(msg, 'warn', dur),
    info:    (msg, dur) => add(msg, 'info', dur),
  }

  const colors = {
    success: 'bg-green-600 text-white',
    error:   'bg-red-500 text-white',
    warn:    'bg-amber-500 text-white',
    info:    'bg-blue-600 text-white',
  }

  const icons = {
    success: '✓',
    error:   '✕',
    warn:    '⚠',
    info:    'ℹ',
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-item ${colors[t.type]}`}>
            <span className="font-bold text-base leading-none">{icons[t.type]}</span>
            <span>{t.message}</span>
            <button
              onClick={() => remove(t.id)}
              className="ml-auto opacity-70 hover:opacity-100 text-lg leading-none"
            >×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
