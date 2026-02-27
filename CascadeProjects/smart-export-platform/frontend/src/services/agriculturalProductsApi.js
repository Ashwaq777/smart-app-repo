/**
 * Service pour les produits agricoles mondiaux
 * Basé sur les données FAO/World Bank des produits les plus exportés
 * UNIQUEMENT Fruits et Légumes - NE MODIFIE PAS LA STRUCTURE SQL
 */

// Produits agricoles mondiaux les plus exportés (données FAO)
// Catégories: UNIQUEMENT Fruits et Légumes
const AGRICULTURAL_PRODUCTS = {
  'Fruits': [
    { 
      id: 'banane',
      codeHs: '0803.90',
      nom: 'Bananes',
      categorie: 'Fruits',
      description: 'Bananes fraîches - Produit agricole majeur mondial',
      principauxExportateurs: ['Équateur', 'Philippines', 'Costa Rica', 'Colombie', 'Guatemala']
    },
    {
      id: 'orange',
      codeHs: '0805.10',
      nom: 'Oranges',
      categorie: 'Fruits',
      description: 'Oranges fraîches - Agrume le plus exporté',
      principauxExportateurs: ['Espagne', 'Égypte', 'États-Unis', 'Afrique du Sud', 'Grèce']
    },
    {
      id: 'pomme',
      codeHs: '0808.10',
      nom: 'Pommes',
      categorie: 'Fruits',
      description: 'Pommes fraîches - Fruit tempéré majeur',
      principauxExportateurs: ['Chine', 'États-Unis', 'Pologne', 'Italie', 'France']
    },
    {
      id: 'raisin',
      codeHs: '0806.10',
      nom: 'Raisins',
      categorie: 'Fruits',
      description: 'Raisins frais - Production mondiale importante',
      principauxExportateurs: ['Chili', 'Italie', 'États-Unis', 'Pérou', 'Afrique du Sud']
    },
    {
      id: 'avocat',
      codeHs: '0804.40',
      nom: 'Avocats',
      categorie: 'Fruits',
      description: 'Avocats frais - Demande mondiale croissante',
      principauxExportateurs: ['Mexique', 'Pérou', 'Pays-Bas', 'Chili', 'Espagne']
    },
    {
      id: 'mangue',
      codeHs: '0804.50',
      nom: 'Mangues',
      categorie: 'Fruits',
      description: 'Mangues fraîches - Fruit tropical majeur',
      principauxExportateurs: ['Inde', 'Thaïlande', 'Mexique', 'Pakistan', 'Brésil']
    },
    {
      id: 'ananas',
      codeHs: '0804.30',
      nom: 'Ananas',
      categorie: 'Fruits',
      description: 'Ananas frais - Production tropicale importante',
      principauxExportateurs: ['Costa Rica', 'Philippines', 'Brésil', 'Thaïlande', 'Indonésie']
    },
    {
      id: 'fraise',
      codeHs: '0810.10',
      nom: 'Fraises',
      categorie: 'Fruits',
      description: 'Fraises fraîches - Baie la plus exportée',
      principauxExportateurs: ['Espagne', 'États-Unis', 'Mexique', 'Égypte', 'Maroc']
    }
  ],
  'Légumes': [
    {
      id: 'tomate',
      codeHs: '0702.00',
      nom: 'Tomates',
      categorie: 'Légumes',
      description: 'Tomates fraîches - Légume le plus exporté mondialement',
      principauxExportateurs: ['Mexique', 'Pays-Bas', 'Espagne', 'Maroc', 'Turquie']
    },
    {
      id: 'pomme-terre',
      codeHs: '0701.90',
      nom: 'Pommes de terre',
      categorie: 'Légumes',
      description: 'Pommes de terre fraîches - Tubercule majeur',
      principauxExportateurs: ['Pays-Bas', 'France', 'Allemagne', 'Belgique', 'Canada']
    },
    {
      id: 'oignon',
      codeHs: '0703.10',
      nom: 'Oignons',
      categorie: 'Légumes',
      description: 'Oignons frais - Légume de base mondial',
      principauxExportateurs: ['Pays-Bas', 'Inde', 'Chine', 'Égypte', 'États-Unis']
    },
    {
      id: 'carotte',
      codeHs: '0706.10',
      nom: 'Carottes',
      categorie: 'Légumes',
      description: 'Carottes fraîches - Légume racine important',
      principauxExportateurs: ['Pays-Bas', 'Chine', 'États-Unis', 'Pologne', 'Belgique']
    },
    {
      id: 'poivron',
      codeHs: '0709.60',
      nom: 'Poivrons',
      categorie: 'Légumes',
      description: 'Poivrons et piments doux - Production mondiale importante',
      principauxExportateurs: ['Mexique', 'Pays-Bas', 'Espagne', 'Maroc', 'Turquie']
    },
    {
      id: 'concombre',
      codeHs: '0707.00',
      nom: 'Concombres',
      categorie: 'Légumes',
      description: 'Concombres et cornichons frais',
      principauxExportateurs: ['Espagne', 'Pays-Bas', 'Mexique', 'Turquie', 'Maroc']
    },
    {
      id: 'laitue',
      codeHs: '0705.11',
      nom: 'Laitues',
      categorie: 'Légumes',
      description: 'Laitues pommées fraîches',
      principauxExportateurs: ['Espagne', 'États-Unis', 'Pays-Bas', 'Italie', 'France']
    },
    {
      id: 'ail',
      codeHs: '0703.20',
      nom: 'Ail',
      categorie: 'Légumes',
      description: 'Ail frais ou réfrigéré',
      principauxExportateurs: ['Chine', 'Espagne', 'Argentine', 'Égypte', 'Pays-Bas']
    }
  ]
}

export const agriculturalProductsService = {
  /**
   * Récupère tous les produits agricoles
   * UNIQUEMENT Fruits et Légumes - Données basées sur FAO
   */
  getAllProducts: () => {
    const allProducts = []
    Object.entries(AGRICULTURAL_PRODUCTS).forEach(([category, products]) => {
      products.forEach(product => {
        allProducts.push(product)
      })
    })
    return allProducts
  },

  /**
   * Récupère les produits par catégorie
   * Catégories: Fruits, Légumes UNIQUEMENT
   */
  getProductsByCategory: (category) => {
    return AGRICULTURAL_PRODUCTS[category] || []
  },

  /**
   * Récupère les catégories disponibles
   * UNIQUEMENT: Fruits, Légumes
   */
  getCategories: () => {
    return Object.keys(AGRICULTURAL_PRODUCTS)
  },

  /**
   * Récupère un produit par code HS
   */
  getProductByHsCode: (hsCode) => {
    const allProducts = agriculturalProductsService.getAllProducts()
    return allProducts.find(p => p.codeHs === hsCode)
  },

  /**
   * Récupère les principaux exportateurs d'un produit
   */
  getExportersByProduct: (productId) => {
    const allProducts = agriculturalProductsService.getAllProducts()
    const product = allProducts.find(p => p.id === productId)
    return product ? product.principauxExportateurs : []
  }
}

export default agriculturalProductsService
