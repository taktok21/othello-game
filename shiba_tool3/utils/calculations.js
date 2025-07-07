// Price calculation utilities

/**
 * Calculate purchase price with discount
 * @param {number} originalPrice - Original price
 * @param {number} discountPercent - Discount percentage (e.g., 10 for 10%)
 * @param {number} couponAmount - Fixed coupon amount
 * @returns {number} Final purchase price
 */
export const calculatePurchasePrice = (originalPrice, discountPercent = 0, couponAmount = 0) => {
  const discountAmount = (originalPrice * discountPercent) / 100;
  return Math.round((originalPrice - discountAmount - couponAmount) * 100) / 100;
};

/**
 * Calculate Amazon fees and net income
 * @param {number} sellingPrice - Selling price
 * @param {number} categoryFeePercent - Category fee percentage (default 15%)
 * @param {number} fixedFee - Fixed fulfillment fee (default 0)
 * @returns {object} Fee breakdown and net income
 */
export const calculateAmazonFees = (sellingPrice, categoryFeePercent = 15, fixedFee = 0) => {
  const referralFee = (sellingPrice * categoryFeePercent) / 100;
  const totalFees = referralFee + fixedFee;
  const netIncome = sellingPrice - totalFees;
  
  return {
    sellingPrice: Math.round(sellingPrice * 100) / 100,
    referralFee: Math.round(referralFee * 100) / 100,
    fixedFee: Math.round(fixedFee * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    netIncome: Math.round(netIncome * 100) / 100
  };
};

/**
 * Calculate profit
 * @param {number} sellingPrice - Selling price
 * @param {number} purchasePrice - Purchase price
 * @param {number} categoryFeePercent - Amazon category fee percentage
 * @param {number} fixedFee - Fixed fulfillment fee
 * @returns {object} Profit calculation details
 */
export const calculateProfit = (sellingPrice, purchasePrice, categoryFeePercent = 15, fixedFee = 0) => {
  const fees = calculateAmazonFees(sellingPrice, categoryFeePercent, fixedFee);
  const profit = fees.netIncome - purchasePrice;
  const profitMargin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
  
  return {
    ...fees,
    purchasePrice: Math.round(purchasePrice * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    profitMargin: Math.round(profitMargin * 100) / 100
  };
};

/**
 * Parse price input string
 * @param {string} input - Price input (e.g., "5500*0.9" or "5500-550")
 * @returns {number} Calculated price
 */
export const parsePriceInput = (input) => {
  if (typeof input === 'number') return input;
  
  const str = input.toString().trim();
  
  // Handle multiplication (discount percentage)
  if (str.includes('*')) {
    const [price, multiplier] = str.split('*').map(s => parseFloat(s.trim()));
    return price * multiplier;
  }
  
  // Handle subtraction (coupon)
  if (str.includes('-')) {
    const [price, discount] = str.split('-').map(s => parseFloat(s.trim()));
    return price - discount;
  }
  
  // Handle addition
  if (str.includes('+')) {
    const [price, addition] = str.split('+').map(s => parseFloat(s.trim()));
    return price + addition;
  }
  
  // Regular number
  return parseFloat(str) || 0;
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default 'JPY')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'JPY') => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Get profit color based on amount
 * @param {number} profit - Profit amount
 * @returns {string} Chakra UI color scheme
 */
export const getProfitColor = (profit) => {
  if (profit > 1000) return 'green';
  if (profit > 500) return 'blue';
  if (profit > 0) return 'orange';
  return 'red';
};

/**
 * Check if selling time based on current vs target price
 * @param {number} currentPrice - Current market price
 * @param {number} targetPrice - Target selling price
 * @returns {boolean} True if it's selling time
 */
export const isSellingTime = (currentPrice, targetPrice) => {
  return currentPrice >= targetPrice;
};