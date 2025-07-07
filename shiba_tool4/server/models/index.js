const sequelize = require('../config/database');
const User = require('./User');
const ProductManagement = require('./ProductManagement');
const RepeatList = require('./RepeatList');
const PriceHistory = require('./PriceHistory');

// Define associations
User.hasMany(ProductManagement, { foreignKey: 'userId', as: 'products' });
ProductManagement.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(RepeatList, { foreignKey: 'userId', as: 'repeatItems' });
RepeatList.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  ProductManagement,
  RepeatList,
  PriceHistory
};