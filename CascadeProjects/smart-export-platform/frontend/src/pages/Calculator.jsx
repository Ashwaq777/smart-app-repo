import React, { useState, useEffect } from 'react'
import { Calculator as CalcIcon, Download, AlertCircle } from 'lucide-react'
import { tarifService, portService, calculationService, pdfService } from '../services/api'
import CostDashboard from '../components/CostDashboard'
import { CURRENCIES } from '../utils/currencyConverter'

function Calculator() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [countries, setCountries] = useState([])
  const [ports, setPorts] = useState([])
  
  const [formData, setFormData] = useState({
    categorie: '',
    codeHs: '',
    paysDestination: '',
    portId: '',
    valeurFob: '',
    coutTransport: '',
    assurance: '',
    currency: 'MAD'
  })
  
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCategories()
    loadCountries()
  }, [])

  useEffect(() => {
    if (formData.categorie) {
      loadProductsByCategory(formData.categorie)
    }
  }, [formData.categorie])

  useEffect(() => {
    if (formData.paysDestination) {
      loadPortsByCountry(formData.paysDestination)
    }
  }, [formData.paysDestination])

  const loadCategories = async () => {
    try {
      const response = await tarifService.getCategories()
      setCategories(response.data)
    } catch (err) {
      console.error('Error loading categories:', err)
    }
  }

  const loadCountries = async () => {
    try {
      const response = await tarifService.getCountries()
      setCountries(response.data)
    } catch (err) {
      console.error('Error loading countries:', err)
    }
  }

  const loadProductsByCategory = async (category) => {
    try {
      const response = await tarifService.getProductsByCategory(category)
      // Filtrer pour ne garder qu'un seul produit par code HS
      const uniqueProducts = response.data.reduce((acc, product) => {
        if (!acc.find(p => p.codeHs === product.codeHs)) {
          acc.push(product)
        }
        return acc
      }, [])
      setProducts(uniqueProducts)
    } catch (err) {
      console.error('Error loading products:', err)
    }
  }

  const loadPortsByCountry = async (country) => {
    try {
      const response = await portService.getByCountry(country)
      setPorts(response.data)
    } catch (err) {
      console.error('Error loading ports:', err)
      setPorts([])
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'categorie') {
      setFormData(prev => ({ ...prev, codeHs: '' }))
      setProducts([])
    }
    
    if (name === 'paysDestination') {
      setFormData(prev => ({ ...prev, portId: '' }))
      setPorts([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const calculationData = {
        codeHs: formData.codeHs,
        paysDestination: formData.paysDestination,
        valeurFob: parseFloat(formData.valeurFob),
        coutTransport: parseFloat(formData.coutTransport),
        assurance: parseFloat(formData.assurance),
        currency: formData.currency,
        portId: formData.portId ? parseInt(formData.portId) : null
      }
      
      const response = await calculationService.calculateLandedCost(calculationData)
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du calcul')
      console.error('Calculation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPdf = async () => {
    try {
      const calculationData = {
        codeHs: formData.codeHs,
        paysDestination: formData.paysDestination,
        valeurFob: parseFloat(formData.valeurFob),
        coutTransport: parseFloat(formData.coutTransport),
        assurance: parseFloat(formData.assurance),
        currency: formData.currency,
        portId: formData.portId ? parseInt(formData.portId) : null
      }
      
      const pdfBlob = await pdfService.generateLandedCostPdf(calculationData)
      const url = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `landed_cost_${formData.codeHs.replace('.', '_')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF generation error:', err)
      alert('Erreur lors de la génération du PDF')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-maritime-navy mb-4">
          Export Duties Calculator
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-accent-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate complete import costs including customs duties, VAT, parafiscal taxes and port fees
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sticky top-24">
            <h3 className="text-2xl font-bold text-maritime-navy mb-6 flex items-center gap-2">
              <CalcIcon className="w-6 h-6 text-accent-500" />
              Product Information
            </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-maritime-navy mb-2">
                Catégorie
              </label>
              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 hover:border-gray-400 transition-all duration-200"
              >
                <option value="" className="bg-dark-hover text-white">Sélectionnez une catégorie</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-dark-hover text-white">{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-maritime-navy mb-2">
                Produit
              </label>
              <select
                name="codeHs"
                value={formData.codeHs}
                onChange={handleInputChange}
                required
                disabled={!formData.categorie}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-dark-hover text-white">Sélectionnez un produit</option>
                {products.map(product => (
                  <option key={product.id} value={product.codeHs} className="bg-dark-hover text-white">
                    {product.nomProduit} ({product.codeHs})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-maritime-navy mb-2">
                Valeur CIF (FOB)
              </label>
              <input
                type="number"
                name="valeurFob"
                value={formData.valeurFob}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0.01"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 hover:border-gray-400 transition-all duration-200"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-maritime-navy mb-2">
                Coût de transport
              </label>
              <input
                type="number"
                name="coutTransport"
                value={formData.coutTransport}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 hover:border-gray-400 transition-all duration-200"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-maritime-navy mb-2">
                Assurance
              </label>
              <input
                type="number"
                name="assurance"
                value={formData.assurance}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 hover:border-gray-400 transition-all duration-200"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-maritime-navy mb-2">
                Devise
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 hover:border-gray-400 transition-all duration-200"
              >
                {CURRENCIES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name} ({currency.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-maritime-navy mb-2">
                Pays de destination
              </label>
              <select
                name="paysDestination"
                value={formData.paysDestination}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 hover:border-gray-400 transition-all duration-200"
              >
                <option value="" className="bg-dark-hover text-white">Sélectionnez un pays</option>
                {countries.map(country => (
                  <option key={country} value={country} className="bg-dark-hover text-white">{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-maritime-navy mb-2">
                Port de destination (optionnel)
              </label>
              <select
                name="portId"
                value={formData.portId}
                onChange={handleInputChange}
                disabled={!formData.paysDestination}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-dark-hover text-white">Sélectionnez un port</option>
                {ports.map(port => (
                  <option key={port.id} value={port.id} className="bg-dark-hover text-white">
                    {port.nomPort} ({port.typePort}) - {port.fraisPortuaires} {formData.currency}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 rounded-xl p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white py-4 px-6 rounded-lg font-bold text-base shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? 'Calculating...' : 'Calculate Landed Cost'}
            </button>
          </form>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-3">
          {result && (
            <div className="space-y-6">
              <CostDashboard result={result} />
              
              <button
                onClick={handleDownloadPdf}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white py-4 px-6 rounded-lg font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download PDF Report
              </button>
            </div>
          )}
          
          {!result && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CalcIcon className="h-12 w-12 text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-maritime-navy mb-3">
                Ready to Calculate?
              </h3>
              <p className="text-gray-600 text-lg">
                Fill in the form to see your complete import cost breakdown
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calculator
