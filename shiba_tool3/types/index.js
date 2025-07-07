// Product types
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  SOLD: 'sold',
  DISCONTINUED: 'discontinued'
};

// API response types
export const createProduct = (data) => ({
  id: data.id || null,
  asin: data.asin || '',
  name: data.name || '',
  imageUrl: data.image_url || data.imageUrl || '',
  currentPrice: parseFloat(data.current_price || data.currentPrice || 0),
  targetPrice: parseFloat(data.target_price || data.targetPrice || 0),
  purchasePrice: parseFloat(data.purchase_price || data.purchasePrice || 0),
  profit: parseFloat(data.profit || 0),
  status: data.status || PRODUCT_STATUS.ACTIVE,
  createdAt: data.created_at || data.createdAt || new Date().toISOString(),
  updatedAt: data.updated_at || data.updatedAt || new Date().toISOString()
});

export const createRepeatProduct = (data) => ({
  id: data.id || null,
  asin: data.asin || '',
  name: data.name || '',
  purchasePrice: parseFloat(data.purchase_price || data.purchasePrice || 0),
  currentProfit: parseFloat(data.current_profit || data.currentProfit || 0),
  autoUpdate: data.auto_update || data.autoUpdate || false,
  createdAt: data.created_at || data.createdAt || new Date().toISOString(),
  updatedAt: data.updated_at || data.updatedAt || new Date().toISOString()
});

export const createUserSettings = (data) => ({
  id: data.id || null,
  userId: data.user_id || data.userId || '',
  keeperApiKey: data.keeper_api_key || data.keeperApiKey || '',
  rakutenId: data.rakuten_id || data.rakutenId || '',
  autoUpdateEnabled: data.auto_update_enabled || data.autoUpdateEnabled || false,
  updateSchedule: data.update_schedule || data.updateSchedule || '02:00',
  createdAt: data.created_at || data.createdAt || new Date().toISOString(),
  updatedAt: data.updated_at || data.updatedAt || new Date().toISOString()
});