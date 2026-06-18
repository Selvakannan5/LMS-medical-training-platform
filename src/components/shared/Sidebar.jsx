import React from 'react'
import { NavLink } from 'react-router-dom'

export function Sidebar({ navItems, isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-900 z-30
          flex flex-col transition-transform duration-300
          lg:static lg:translate-x-0 lg:z-auto lg:h-auto lg:flex-shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo header */}
        <div className="h-16 flex items-center px-5 border-b border-slate-700/50 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center mr-2.5">
            <span className="text-white text-xs font-bold">MT</span>
          </div>
          <div>
            <span className="font-bold text-white text-sm">MedTrain</span>
            <span className="font-bold text-blue-400 text-sm"> LMS</span>
          </div>
          <button
            onClick={onClose}
            className="ml-auto p-1 text-slate-400 hover:text-white transition-colors lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((section, si) => (
            <div key={si} className="mb-2">
              {section.label && (
                <p className="px-5 text-[10px] font-semibold tracking-widest uppercase text-slate-500 mb-1">
                  {section.label}
                </p>
              )}
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-150 mb-0.5 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`
                  }
                  id={`sidebar-${item.id || item.to.replace(/\//g, '-')}`}
                >
                  <span className="text-base w-5 flex-shrink-0 text-center">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Bottom footer */}
        <div className="p-4 border-t border-slate-700/50 flex-shrink-0">
          <p className="text-[10px] text-slate-600 text-center">MedTrain LMS v1.0</p>
          <p className="text-[10px] text-slate-600 text-center">© 2026 MedTrain Healthcare</p>
        </div>
      </aside>
    </>
  )
}
