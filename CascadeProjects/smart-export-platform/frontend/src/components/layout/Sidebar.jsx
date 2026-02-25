import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Calculator, Settings, FileText, Menu, X } from 'lucide-react'

const menuItems = [
  { path: '/', icon: Calculator, label: 'Simulation' },
  { path: '/admin', icon: Settings, label: 'Administration' },
]

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-40
          transition-all duration-500 ease-out
          ${isOpen ? 'w-72' : 'w-0 lg:w-20'}
          overflow-hidden
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-md">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              {isOpen && (
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent tracking-tight">Smart Export</h1>
                  <p className="text-xs text-gray-500 leading-relaxed">Global Platform</p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 p-5 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-4 px-4 py-3.5 rounded-xl
                    transition-all duration-300 ease-out
                    ${isActive
                      ? 'bg-gradient-to-r from-primary-50 to-accent-50 text-primary-700 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span className="leading-relaxed">{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          <div className="p-5 border-t border-gray-100">
            <div className={`flex items-center gap-4 px-4 py-3 ${isOpen ? '' : 'justify-center'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-700">U</span>
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate leading-relaxed">Utilisateur</p>
                  <p className="text-xs text-gray-500 truncate leading-relaxed">user@smartexport.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
