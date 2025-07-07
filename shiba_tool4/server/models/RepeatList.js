const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RepeatList = sequelize.define('RepeatList', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  asin: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  productName: {
    type: DataTypes.STRING(500),
    field: 'product_name'
  },
  productImageUrl: {
    type: DataTypes.STRING(500),
    field: 'product_image_url'
  },
  currentPrice: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'current_price'
  },
  purchasePrice: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'purchase_price'
  },
  fees: {
    type: DataTypes.DECIMAL(10, 2)
  },
  netIncome: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'net_income'
  },
  profit: {
    type: DataTypes.DECIMAL(10, 2)
  }
}, {
  tableName: 'repeat_list',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = RepeatList;