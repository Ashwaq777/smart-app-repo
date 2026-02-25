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
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Résultats du calcul</h2>
          <p className="text-base text-gray-500 leading-relaxed">
            {result.nomProduit} • {result.paysDestination}
          </p>
        </div>
        <Badge variant="primary" className="text-base px-5 py-2.5">
          {result.currency}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} hover className="relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 ${kpi.bgColor} rounded-full -mr-16 -mt-16 opacity-50`} />
              <CardContent className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3.5 rounded-xl ${kpi.bgColor}`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  {kpi.percentage !== undefined && (
                    <Badge variant="info" className="text-xs">
                      {kpi.percentage}%
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2 leading-relaxed">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight">
                  {formatCurrency(kpi.value, kpi.currency)}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-gradient-to-br from-primary-500 to-accent-600 text-white border-0 shadow-xl">
        <CardContent className="py-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <p className="text-primary-100 text-sm mb-2 leading-relaxed">Coût Total Landed Cost</p>
              <p className="text-5xl font-bold tracking-tight">{formatCurrency(result.coutTotal)}</p>
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
                  <p className="text-xl font-semibold tracking-tight">{formatCurrency(result.coutTotalEur, 'EUR')}</p>
                </div>
              )}
              {result.coutTotalUsd && result.currency !== 'USD' && (
                <div>
                  <p className="text-primary-100 text-xs leading-relaxed">Équivalent USD</p>
                  <p className="text-xl font-semibold tracking-tight">{formatCurrency(result.coutTotalUsd, 'USD')}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Détail des coûts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <CostLine label="Valeur FOB" value={result.valeurFob} currency={result.currency} />
              <CostLine label="Transport" value={result.coutTransport} currency={result.currency} />
              <CostLine label="Assurance" value={result.assurance} currency={result.currency} />
              <div className="border-t border-gray-200 pt-3">
                <CostLine 
                  label="Valeur CAF (CIF)" 
                  value={result.valeurCaf} 
                  currency={result.currency}
                  bold 
                />
              </div>
              <CostLine 
                label={`Droits de douane (${result.tauxDouane}%)`} 
                value={result.montantDouane} 
                currency={result.currency} 
              />
              <CostLine 
                label={`TVA (${result.tauxTva}%)`} 
                value={result.montantTva} 
                currency={result.currency} 
              />
              {result.montantTaxeParafiscale > 0 && (
                <CostLine 
                  label={`Taxe parafiscale (${result.taxeParafiscale}%)`} 
                  value={result.montantTaxeParafiscale} 
                  currency={result.currency} 
                />
              )}
              {result.fraisPortuaires > 0 && (
                <CostLine 
                  label="Frais portuaires" 
                  value={result.fraisPortuaires} 
                  currency={result.currency} 
                />
              )}
              <div className="border-t-2 border-gray-300 pt-3">
                <CostLine 
                  label="TOTAL LANDED COST" 
                  value={result.coutTotal} 
                  currency={result.currency}
                  bold
                  large
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations complémentaires</CardTitle>
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
            
            <div className="pt-4 border-t border-gray-200">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-xs text-yellow-800 font-medium mb-1">
                  ⚠️ Disclaimer
                </p>
                <p className="text-xs text-yellow-700">
                  {result.disclaimer}
                </p>
                <p className="text-xs text-yellow-600 mt-2">
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
    <div className="flex justify-between items-center">
      <span className={`text-gray-700 ${bold ? 'font-semibold' : ''} ${large ? 'text-lg' : 'text-sm'}`}>
        {label}
      </span>
      <span className={`text-gray-900 ${bold ? 'font-bold' : 'font-medium'} ${large ? 'text-xl' : 'text-sm'}`}>
        {formatCurrency(value, currency)}
      </span>
    </div>
  )
}

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  )
}

export default CostDashboard
