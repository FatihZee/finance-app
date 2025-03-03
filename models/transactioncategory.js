'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransactionCategory extends Model {
    static associate(models) {
      
    }
  }

  TransactionCategory.init({
    Category_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nama_Kategori: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TransactionCategory',
    tableName: 'Transaction_Categories',
    timestamps: true
  });

  return TransactionCategory;
};
