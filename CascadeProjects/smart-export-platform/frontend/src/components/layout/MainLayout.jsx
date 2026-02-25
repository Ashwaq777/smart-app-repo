import React from 'react'
import { Sidebar } from './Sidebar'

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <Sidebar />
      
      <main className="lg:pl-72 transition-all duration-500 ease-out">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          {children}
        </div>
      </main>
    </div>
  )
}
