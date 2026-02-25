import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import { MainLayout } from './components/layout/MainLayout'
import Calculator from './pages/Calculator'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <ToastProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </MainLayout>
      </ToastProvider>
    </Router>
  )
}

export default App
