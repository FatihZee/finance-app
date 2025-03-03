// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const multer = require('multer');
const { isAdmin } = require("../middleware/auth");
const authMiddleware = require("../middleware/authMiddleware");

const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: API untuk mengelola akun pengguna
 */

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar akun
 */
router.get('/', authMiddleware, accountController.getAllAccounts);

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Get account by ID
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan akun
 *       404:
 *         description: Akun tidak ditemukan
 */
router.get('/:id', authMiddleware, accountController.getAccountById);

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               User_ID:
 *                 type: integer
 *               Nama_Rekening:
 *                 type: string
 *               Saldo:
 *                 type: number
 *     responses:
 *       201:
 *         description: Akun berhasil dibuat
 */
router.post('/', upload.none(), authMiddleware, isAdmin, accountController.createAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     summary: Update an account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nama_Rekening:
 *                 type: string
 *               Saldo:
 *                 type: number
 *     responses:
 *       200:
 *         description: Akun berhasil diperbarui
 */
router.put('/:id', upload.none(), authMiddleware, isAdmin, accountController.updateAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Akun berhasil dihapus
 */
router.delete('/:id', authMiddleware, isAdmin, accountController.deleteAccount);

module.exports = router;
