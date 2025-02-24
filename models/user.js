'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

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
    Foto_Profil: { // ✅ Kolom baru untuk menyimpan URL gambar
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });

  return User;
};
