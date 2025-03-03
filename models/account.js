'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.User, { foreignKey: 'User_ID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }

  Account.init({
    Account_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    User_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'User_ID',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    Nama_Rekening: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Saldo: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
  }, {
    sequelize,
    modelName: 'Account',
    timestamps: true,
  });

  return Account;
};