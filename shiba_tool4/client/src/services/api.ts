import axios from 'axios';
import { User, Product, RepeatItem, Settings } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string, keeperApiKey?: string, rakutenId?: string) => {
    const response = await api.post('/auth/register', {
      email,
      password,
      keeperApiKey,
      rakutenId
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};

// Settings API
export const settingsAPI = {
  getSettings: async (): Promise<{ settings: Settings }> => {
    const response = await api.get('/settings');
    return response.data;
  },

  updateSettings: async (settings: Partial<Settings>) => {
    const response = await api.put('/settings', settings);
    return response.data;
  }
};

// Products API
export const productsAPI = {
  getProducts: async (): Promise<{ products: Product[] }> => {
    const response = await api.get('/products');
    return response.data;
  },

  addProduct: async (asin: string, targetSellPrice?: number, purchasePrice?: number) => {
    const response = await api.post('/products', {
      asin,
      targetSellPrice,
      purchasePrice
    });
    return response.data;
  },

  updateProduct: async (id: number, data: Partial<Product>) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  fetchProductData: async (productIds: number[]) => {
    const response = await api.post('/products/fetch-data', { productIds });
    return response.data;
  }
};

// Repeat List API
export const repeatListAPI = {
  getRepeatItems: async (): Promise<{ repeatItems: RepeatItem[] }> => {
    const response = await api.get('/repeat-list');
    return response.data;
  },

  addRepeatItem: async (asin: string, purchasePrice?: number) => {
    const response = await api.post('/repeat-list', {
      asin,
      purchasePrice
    });
    return response.data;
  },

  updateRepeatItem: async (id: number, data: Partial<RepeatItem>) => {
    const response = await api.put(`/repeat-list/${id}`, data);
    return response.data;
  },

  deleteRepeatItem: async (id: number) => {
    const response = await api.delete(`/repeat-list/${id}`);
    return response.data;
  },

  updatePrices: async (itemIds: number[]) => {
    const response = await api.post('/repeat-list/update-prices', { itemIds });
    return response.data;
  }
};

// Batch API
export const batchAPI = {
  updateAllPrices: async () => {
    const response = await api.post('/batch/update-prices');
    return response.data;
  },

  getPriceHistory: async (asin: string, days: number = 30) => {
    const response = await api.get(`/batch/price-history/${asin}?days=${days}`);
    return response.data;
  }
};

export default api;