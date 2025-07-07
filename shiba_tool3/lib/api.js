import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Product Management API
export const productApi = {
  // Get all products
  getProducts: () => api.get('/products'),
  
  // Get single product
  getProduct: (id) => api.get(`/products/${id}`),
  
  // Create product
  createProduct: (data) => api.post('/products', data),
  
  // Update product
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  
  // Delete product
  deleteProduct: (id) => api.delete(`/products/${id}`),
  
  // Get product data by ASIN
  getProductByASIN: (asin, targetPrice = null) => 
    api.post('/products/fetch-data', { asin, targetPrice }),
};

// Repeat Product API
export const repeatApi = {
  // Get all repeat products
  getRepeatProducts: () => api.get('/repeat-products'),
  
  // Create repeat product
  createRepeatProduct: (data) => api.post('/repeat-products', data),
  
  // Update repeat product
  updateRepeatProduct: (id, data) => api.put(`/repeat-products/${id}`, data),
  
  // Delete repeat product
  deleteRepeatProduct: (id) => api.delete(`/repeat-products/${id}`),
  
  // Update all repeat product prices
  updateAllPrices: () => api.post('/repeat-products/update-prices'),
};

// Settings API
export const settingsApi = {
  // Get user settings
  getSettings: () => api.get('/settings'),
  
  // Update settings
  updateSettings: (data) => api.put('/settings', data),
  
  // Test API connections
  testApiConnection: (apiType, credentials) => 
    api.post('/settings/test-api', { apiType, credentials }),
};

// External API helpers
export const externalApi = {
  // Fetch Amazon product data
  fetchAmazonData: (asin) => api.post('/external/amazon', { asin }),
  
  // Fetch Keeper data
  fetchKeeperData: (asin) => api.post('/external/keeper', { asin }),
  
  // Fetch Rakuten data
  fetchRakutenData: (productId) => api.post('/external/rakuten', { productId }),
};

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      // Handle authentication error
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;