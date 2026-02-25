import React, { useState } from 'react'
import { Package, Anchor, FileText, Settings } from 'lucide-react'
import { Card } from '../components/ui/Card'
import ProductsManager from '../components/admin/ProductsManager'
import PortsManager from '../components/admin/PortsManager'
import TariffsManager from '../components/admin/TariffsManager'

function Admin() {
  const [activeTab, setActiveTab] = useState('products')

  const tabs = [
    { id: 'products', name: 'Produits', icon: Package, description: 'Gérer les produits et tarifs' },
    { id: 'ports', name: 'Ports', icon: Anchor, description: 'Gérer les ports et frais' },
    { id: 'tariffs', name: 'Tarifs Douaniers', icon: FileText, description: 'Consulter les tarifs' },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
            Administration
          </h1>
          <p className="mt-2 text-gray-600">
            Gérez les produits, ports et tarifs douaniers de la plateforme
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200 bg-gray-50 rounded-t-2xl">
          <nav className="flex gap-2 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-sm font-semibold">{tab.name}</div>
                    {activeTab === tab.id && (
                      <div className="text-xs text-gray-500">{tab.description}</div>
                    )}
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'products' && <ProductsManager />}
          {activeTab === 'ports' && <PortsManager />}
          {activeTab === 'tariffs' && <TariffsManager />}
        </div>
      </div>
    </div>
  )
}

export default Admin
