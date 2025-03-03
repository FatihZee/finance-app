const express = require('express');
const router = express.Router();
const transactionCategoryController = require('../controllers/transactionCategoryController');
const { isAdmin } = require("../middleware/auth");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require('multer');

const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Transaction Categories
 *   description: API untuk mengelola kategori transaksi
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Mendapatkan semua kategori transaksi
 *     tags: [Transaction Categories]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar kategori transaksi
 *       401:
 *         description: Unauthorized (Token tidak valid)
 */
router.get('/', authMiddleware, transactionCategoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Mendapatkan kategori transaksi berdasarkan ID
 *     tags: [Transaction Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID kategori transaksi
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan kategori transaksi
 *       404:
 *         description: Kategori tidak ditemukan
 */
router.get('/:id', authMiddleware, transactionCategoryController.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Menambahkan kategori transaksi baru (Admin Only)
 *     tags: [Transaction Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nama_Kategori:
 *                 type: string
 *                 example: "Makanan"
 *     responses:
 *       201:
 *         description: Kategori berhasil ditambahkan
 *       403:
 *         description: Forbidden (Hanya admin yang bisa mengakses)
 */
router.post('/', upload.none(), authMiddleware, isAdmin, transactionCategoryController.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Memperbarui kategori transaksi berdasarkan ID (Admin Only)
 *     tags: [Transaction Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID kategori transaksi
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nama_Kategori:
 *                 type: string
 *                 example: "Transportasi"
 *     responses:
 *       200:
 *         description: Kategori berhasil diperbarui
 *       403:
 *         description: Forbidden (Hanya admin yang bisa mengakses)
 *       404:
 *         description: Kategori tidak ditemukan
 */
router.put('/:id', upload.none(), authMiddleware, isAdmin, transactionCategoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Menghapus kategori transaksi berdasarkan ID (Admin Only)
 *     tags: [Transaction Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID kategori transaksi yang akan dihapus
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 *       403:
 *         description: Forbidden (Hanya admin yang bisa mengakses)
 *       404:
 *         description: Kategori tidak ditemukan
 */
router.delete('/:id', authMiddleware, isAdmin, transactionCategoryController.deleteCategory);

module.exports = router;
