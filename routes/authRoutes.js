const express = require("express");
const multer = require("multer");
const { register, login, getProfile, logout } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const uploadNone = multer().none();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API untuk autentikasi pengguna
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Mendaftarkan pengguna baru
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nama:
 *                 type: string
 *                 example: John Doe
 *               Email:
 *                 type: string
 *                 example: johndoe@example.com
 *               Password:
 *                 type: string
 *                 example: mypassword
 *               Tanggal_Lahir:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *     responses:
 *       201:
 *         description: Pengguna berhasil didaftarkan
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 example: johndoe@example.com
 *               Password:
 *                 type: string
 *                 example: mypassword
 *     responses:
 *       200:
 *         description: Berhasil login
 *       401:
 *         description: Kredensial tidak valid
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Mendapatkan profil pengguna yang sedang login
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data profil pengguna
 *       401:
 *         description: Tidak terautentikasi
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout pengguna
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil logout
 */

router.post("/register", uploadNone, register);
router.post("/login", uploadNone, login);
router.get("/profile", authMiddleware, getProfile);
router.post("/logout", authMiddleware, logout);

module.exports = router;
