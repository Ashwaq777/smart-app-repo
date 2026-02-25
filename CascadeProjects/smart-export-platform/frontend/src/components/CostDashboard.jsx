import React from 'react'
import { TrendingUp, DollarSign, Ship, FileText, Globe } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { Badge } from './ui/Badge'

const CostDashboard = ({ result }) => {
  const formatCurrency = (value, currency = result.currency) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(value)
  }

  const kpiCards = [
    {
      title: 'Total Douane',
      value: result.montantDouane,
      currency: result.currency,
      icon: FileText,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      percentage: result.tauxDouane,
    },
    {
      title: 'Total TVA',
      value: result.montantTva,
      currency: result.currency,
      icon: TrendingUp,
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
      percentage: result.tauxTva,
    },
    {
      title: 'Taxe Parafiscale',
      value: result.montantTaxeParafiscale,
      currency: result.currency,
      icon: FileText,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      percentage: result.taxeParafiscale,
    },
    {
      title: 'Frais Portuaires',
      value: result.fraisPortuaires || 0,
      currency: result.currency,
      icon: Ship,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-maritime-navy to-maritime-deepBlue rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-accent-300 mb-2">TOTAL LANDED COST</h3>
            <div className="text-5xl font-bold">{formatCurrency(result.coutTotal)}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-accent-300 mb-1">Currency</div>
            <div className="text-2xl font-bold">{result.currency}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-accent-200">
          <span>{result.nomProduit}</span>
          <span>•</span>
          <span>{result.paysDestination}</span>
          {result.nomPort && (
            <>
              <span>•</span>
              <span>{result.nomPort}</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-accent-500 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-accent-100 group-hover:bg-accent-200 transition-colors">
                  <Icon className="w-5 h-5 text-accent-600" />
                </div>
                {kpi.percentage !== undefined && (
                  <span className="text-xs font-semibold text-gray-500">
                    {kpi.percentage}%
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">{kpi.title}</p>
              <p className="text-2xl font-bold text-maritime-navy">
                {formatCurrency(kpi.value, kpi.currency)}
              </p>
            </div>
          )
        })}
      </div>

      <div className="bg-gradient-to-br from-maritime-navy to-maritime-ocean rounded-2xl p-8 shadow-xl border border-maritime-ocean">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <p className="text-primary-100 text-sm mb-2 leading-relaxed">Coût Total Landed Cost</p>
            <p className="text-5xl font-bold tracking-tight text-white">{formatCurrency(result.coutTotal)}</p>
            {result.nomPort && (
              <p className="text-primary-100 text-sm mt-3 leading-relaxed">
                Port: {result.nomPort}
              </p>
            )}
          </div>
          <div className="text-right space-y-3">
            {result.coutTotalEur && result.currency !== 'EUR' && (
              <div>
                <p className="text-primary-100 text-xs leading-relaxed">Équivalent EUR</p>
                <p className="text-xl font-semibold tracking-tight text-white">{formatCurrency(result.coutTotalEur, 'EUR')}</p>
              </div>
            )}
            {result.coutTotalUsd && result.currency !== 'USD' && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-primary-100 text-xs leading-relaxed">Équivalent USD</p>
                <p className="text-xl font-semibold tracking-tight text-maritime-navy">{formatCurrency(result.coutTotalUsd, 'USD')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-maritime-navy mb-6">Cost Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">Item</th>
                  <th className="text-right py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">Amount</th>
                  <th className="text-right py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200">
                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">Valeur FOB</td>
                  <td className="py-4 px-4 text-sm text-right font-bold text-maritime-navy">{formatCurrency(result.valeurFob, result.currency)}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">-</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">Transport</td>
                  <td className="py-4 px-4 text-sm text-right font-bold text-maritime-navy">{formatCurrency(result.coutTransport, result.currency)}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">-</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">Assurance</td>
                  <td className="py-4 px-4 text-sm text-right font-bold text-maritime-navy">{formatCurrency(result.assurance, result.currency)}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">-</td>
                </tr>
                <tr className="bg-accent-50 font-semibold border-b border-accent-200">
                  <td className="py-4 px-4 text-sm font-bold text-maritime-navy">CIF Value</td>
                  <td className="py-4 px-4 text-sm text-right font-bold text-maritime-navy">{formatCurrency(result.valeurCaf, result.currency)}</td>
                  <td className="py-4 px-4 text-sm text-right text-gray-600">-</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">Droits de douane</td>
                  <td className="py-4 px-4 text-sm text-right font-bold text-maritime-navy">{formatCurrency(result.montantDouane, result.currency)}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">{result.tauxDouane}%</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">TVA</td>
                  <td className="py-4 px-4 text-sm text-right font-bold text-maritime-navy">{formatCurrency(result.montantTva, result.currency)}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">{result.tauxTva}%</td>
                </tr>
                {result.montantTaxeParafiscale > 0 && (
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">Taxe parafiscale</td>
                    <td className="py-4 px-4 text-sm text-right font-bold text-maritime-navy">{formatCurrency(result.montantTaxeParafiscale, result.currency)}</td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600">{result.taxeParafiscale}%</td>
                  </tr>
                )}
                {result.fraisPortuaires > 0 && (
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">Frais portuaires</td>
                    <td className="py-4 px-4 text-sm text-right font-bold text-maritime-navy">{formatCurrency(result.fraisPortuaires, result.currency)}</td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600">-</td>
                  </tr>
                )}
                <tr className="bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold">
                  <td className="py-5 px-4 text-base font-bold">TOTAL LANDED COST</td>
                  <td className="py-5 px-4 text-base text-right font-bold">{formatCurrency(result.coutTotal, result.currency)}</td>
                  <td className="py-5 px-4 text-base text-right">-</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Informations complémentaires</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoItem 
              icon={Globe} 
              label="Produit" 
              value={`${result.nomProduit} (${result.codeHs})`} 
            />
            <InfoItem 
              icon={Globe} 
              label="Destination" 
              value={result.paysDestination} 
            />
            {result.nomPort && (
              <InfoItem 
                icon={Ship} 
                label="Port" 
                value={result.nomPort} 
              />
            )}
            <InfoItem 
              icon={DollarSign} 
              label="Devise" 
              value={result.currency} 
            />
            
            <div className="pt-3 border-t border-dark-border">
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
                <p className="text-xs text-amber-700 font-semibold mb-1">
                  ⚠️ Disclaimer
                </p>
                <p className="text-xs text-amber-600">
                  {result.disclaimer}
                </p>
                <p className="text-xs text-amber-700 mt-2">
                  Source taux de change: {result.exchangeRateSource}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const CostLine = ({ label, value, currency, bold = false, large = false }) => {
  const formatCurrency = (val, curr) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: 2,
    }).format(val)
  }

  return (
    <div className="flex justify-between items-center py-1">
      <span className={`text-gray-600 ${bold ? 'font-semibold' : ''} ${large ? 'text-base' : 'text-sm'}`}>
        {label}
      </span>
      <span className={`text-maritime-navy ${bold ? 'font-bold' : 'font-medium'} ${large ? 'text-lg' : 'text-sm'}`}>
        {formatCurrency(value, currency)}
      </span>
    </div>
  )
}

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gradient-to-br from-maritime-ocean/20 to-maritime-wave/20 border border-maritime-ocean/30 rounded-lg">
        <Icon className="w-4 h-4 text-maritime-ocean" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-sm font-semibold text-maritime-navy">{value}</p>
      </div>
    </div>
  )
}

export default CostDashboard
