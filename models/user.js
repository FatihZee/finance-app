'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Account, { foreignKey: 'User_ID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  
  User.init({
    User_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Tanggal_Lahir: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Tanggal_Daftar: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    Foto_Profil: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user"
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });  

  return User;
};
