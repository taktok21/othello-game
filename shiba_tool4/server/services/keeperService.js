const axios = require('axios');

class KeeperService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = process.env.KEEPER_API_BASE_URL || 'https://api.keepa.com';
  }

  async getProductData(asin) {
    try {
      if (!this.apiKey) {
        throw new Error('Keeper API key is required');
      }

      // Note: This is a simplified implementation
      // In a real implementation, you would need to follow Keepa API documentation
      const response = await axios.get(`${this.baseURL}/product`, {
        params: {
          key: this.apiKey,
          domain: 1, // Amazon.com
          asin: asin,
          stats: 1
        }
      });

      if (response.data && response.data.products && response.data.products.length > 0) {
        const product = response.data.products[0];
        
        return {
          asin: product.asin,
          title: product.title,
          image: product.imagesCSV ? product.imagesCSV.split(',')[0] : null,
          currentPrice: this.parsePrice(product.stats?.current?.[0]),
          averagePrice: this.parsePrice(product.stats?.avg90?.[0]),
          salesRank: product.stats?.salesRank?.[0],
          category: product.category
        };
      }

      throw new Error('Product not found');
    } catch (error) {
      console.error('Keeper API error:', error);
      throw new Error('Failed to fetch product data from Keeper API');
    }
  }

  parsePrice(priceData) {
    if (!priceData || priceData === -1) return null;
    return priceData / 100; // Keepa returns prices in cents
  }

  calculateFees(price, category) {
    // Simplified Amazon fee calculation
    // In reality, this would be more complex based on category, weight, etc.
    const referralFeeRate = this.getReferralFeeRate(category);
    const referralFee = price * referralFeeRate;
    const closingFee = 1.80; // Example closing fee
    const fulfillmentFee = this.estimateFulfillmentFee(price);
    
    return {
      referralFee: Math.round(referralFee * 100) / 100,
      closingFee,
      fulfillmentFee,
      totalFees: Math.round((referralFee + closingFee + fulfillmentFee) * 100) / 100
    };
  }

  getReferralFeeRate(category) {
    // Simplified referral fee rates
    const feeRates = {
      'Electronics': 0.08,
      'Home & Garden': 0.15,
      'Sports & Outdoors': 0.15,
      'Toys & Games': 0.15,
      'Books': 0.15,
      'default': 0.15
    };
    
    return feeRates[category] || feeRates.default;
  }

  estimateFulfillmentFee(price) {
    // Very simplified fulfillment fee estimation
    if (price < 15) return 2.50;
    if (price < 50) return 3.50;
    return 4.50;
  }
}

module.exports = KeeperService;