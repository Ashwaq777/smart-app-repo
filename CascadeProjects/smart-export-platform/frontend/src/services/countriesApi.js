import axios from 'axios'

const countriesApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 15000,
})

const exchangeRateApi = axios.create({
  baseURL: 'https://api.exchangerate.host',
  timeout: 15000,
})

// Cache pour les taux de change (éviter trop de requêtes)
let exchangeRatesCache = null
let exchangeRatesCacheTime = null
const CACHE_DURATION = 3600000 // 1 heure

/**
 * Retry logic pour les appels API
 */
const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
    }
  }
}

export const countriesService = {
  /**
   * Récupère TOUS les pays avec devises et taux de change
   * 100% de couverture obligatoire
   */
  getAll: async () => {
    try {
      // Récupérer tous les pays avec retry
      const response = await retryRequest(() => 
        countriesApi.get('/all?fields=name,cca2,currencies,cca3,landlocked')
      )
      
      // Récupérer les taux de change une seule fois
      const exchangeRates = await countriesService.getExchangeRates()
      
      return response.data.map(country => {
        // Extraire la devise principale
        let currencyCode = null
        let currencyName = null
        let currencySymbol = null
        
        if (country.currencies) {
          const currencies = Object.entries(country.currencies)
          if (currencies.length > 0) {
            const [code, data] = currencies[0]
            currencyCode = code
            currencyName = data.name
            currencySymbol = data.symbol
          }
        }
        
        // Fallback intelligent si pas de devise
        if (!currencyCode) {
          // Utiliser USD comme fallback universel
          currencyCode = 'USD'
          currencyName = 'US Dollar'
          currencySymbol = '$'
        }
        
        // Récupérer le taux de change
        const exchangeRate = exchangeRates[currencyCode] || 1
        
        return {
          name: country.name.common,
          code: country.cca2,
          code3: country.cca3,
          landlocked: country.landlocked || false,
          currency: {
            code: currencyCode,
            name: currencyName,
            symbol: currencySymbol,
            exchangeRate: exchangeRate
          }
        }
      })
    } catch (error) {
      console.error('Error fetching countries:', error)
      throw error
    }
  },

  /**
   * Récupère les taux de change pour toutes les devises
   * Utilise un cache pour éviter trop de requêtes
   */
  getExchangeRates: async () => {
    try {
      // Vérifier le cache
      const now = Date.now()
      if (exchangeRatesCache && exchangeRatesCacheTime && (now - exchangeRatesCacheTime < CACHE_DURATION)) {
        return exchangeRatesCache
      }
      
      // Récupérer les taux avec retry
      const response = await retryRequest(() => 
        exchangeRateApi.get('/latest?base=USD')
      )
      
      if (response.data && response.data.rates) {
        exchangeRatesCache = response.data.rates
        exchangeRatesCacheTime = now
        return response.data.rates
      }
      
      return {}
    } catch (error) {
      console.error('Error fetching exchange rates:', error)
      // Retourner un objet vide en cas d'erreur (fallback à 1)
      return {}
    }
  },

  /**
   * Récupère les informations d'un pays spécifique avec devise et taux
   */
  getByName: async (countryName) => {
    try {
      const response = await retryRequest(() =>
        countriesApi.get(`/name/${countryName}?fields=name,cca2,currencies,cca3,landlocked`)
      )
      
      if (response.data && response.data.length > 0) {
        const country = response.data[0]
        
        // Extraire la devise
        let currencyCode = null
        let currencyName = null
        let currencySymbol = null
        
        if (country.currencies) {
          const currencies = Object.entries(country.currencies)
          if (currencies.length > 0) {
            const [code, data] = currencies[0]
            currencyCode = code
            currencyName = data.name
            currencySymbol = data.symbol
          }
        }
        
        // Fallback si pas de devise
        if (!currencyCode) {
          currencyCode = 'USD'
          currencyName = 'US Dollar'
          currencySymbol = '$'
        }
        
        // Récupérer le taux de change
        const exchangeRates = await countriesService.getExchangeRates()
        const exchangeRate = exchangeRates[currencyCode] || 1
        
        return {
          name: country.name.common,
          code: country.cca2,
          code3: country.cca3,
          landlocked: country.landlocked || false,
          currency: {
            code: currencyCode,
            name: currencyName,
            symbol: currencySymbol,
            exchangeRate: exchangeRate
          }
        }
      }
      return null
    } catch (error) {
      console.error('Error fetching country by name:', error)
      return null
    }
  }
}

export default countriesService
