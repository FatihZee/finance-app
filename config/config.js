const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
require('dotenv').config();

// Debug: Cek apakah env terbaca dengan benar
console.log("🔍 DB Config:");
console.log("Host:", process.env.DB_HOST);
console.log("Port:", process.env.DB_PORT);
console.log("User:", process.env.DB_USER);
console.log("Database:", process.env.DB_NAME);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT || 'mysql',
  dialectModule: mysql2, // Tambahkan ini untuk kompatibilitas dengan Vercel
  dialectOptions: {
    connectTimeout: 60000,
  },
  logging: false,
});

module.exports = sequelize;