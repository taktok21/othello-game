// Mock API for fetching product data by ASIN
// In production, this would integrate with Amazon Product Advertising API and Keeper API

import { calculateProfit } from '../../../utils/calculations';

// Mock product database for demonstration
const mockProductData = {
  'B08N5WRWNW': {
    name: 'ザバス ホエイプロテイン100 ココア味',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71Qph%2BX2G%2BL._SL1500_.jpg',
    currentPrice: 7480,
    categoryFee: 15,
  },
  'B0BNHXDT9Q': {
    name: 'カルディ オリジナル コーヒー豆',
    imageUrl: 'https://via.placeholder.com/150',
    currentPrice: 2000,
    categoryFee: 15,
  },
  'B07BNQG45P': {
    name: 'Nintendo Switch Joy-Con',
    imageUrl: 'https://via.placeholder.com/150',
    currentPrice: 8500,
    categoryFee: 8,
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { asin, targetPrice } = req.body;

  if (!asin) {
    return res.status(400).json({ message: 'ASIN is required' });
  }

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get mock data or generate random data
    const productData = mockProductData[asin] || {
      name: `商品 ${asin}`,
      imageUrl: 'https://via.placeholder.com/150',
      currentPrice: Math.floor(Math.random() * 10000) + 1000,
      categoryFee: 15,
    };

    // Use target price if provided, otherwise use current price
    const sellingPrice = targetPrice || productData.currentPrice;
    
    // Calculate fees and profit (assuming no purchase price for initial fetch)
    const { netIncome } = calculateProfit(sellingPrice, 0, productData.categoryFee);

    const newProduct = {
      asin,
      name: productData.name,
      imageUrl: productData.imageUrl,
      currentPrice: productData.currentPrice,
      targetPrice: sellingPrice,
      purchasePrice: 0, // User will input this later
      netIncome,
      profit: netIncome, // Will be updated when purchase price is set
      status: 'active',
    };

    // In production, save to database here
    // await database.products.create(newProduct);

    res.status(200).json(newProduct);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ 
      message: 'Failed to fetch product data',
      error: error.message 
    });
  }
}