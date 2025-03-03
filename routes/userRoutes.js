const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { isAdmin } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API untuk mengelola pengguna
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mendapatkan semua pengguna
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar pengguna
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Membuat pengguna baru
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *               Foto_Profil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Pengguna berhasil dibuat
 */

/**
 * @swagger
 * /users/{User_ID}:
 *   get:
 *     summary: Mendapatkan pengguna berdasarkan User_ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: User_ID
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data pengguna
 */

/**
 * @swagger
 * /users/{User_ID}:
 *   put:
 *     summary: Memperbarui pengguna berdasarkan User_ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: User_ID
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Nama:
 *                 type: string
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               Tanggal_Lahir:
 *                 type: string
 *                 format: date
 *               Foto_Profil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Berhasil memperbarui pengguna
 */

/**
 * @swagger
 * /users/{User_ID}:
 *   delete:
 *     summary: Menghapus pengguna berdasarkan User_ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: User_ID
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Berhasil menghapus pengguna
 */

router.get("/", authMiddleware, isAdmin, userController.getAllUsers);
router.post("/", authMiddleware, upload.single("Foto_Profil"), userController.createUser);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, upload.single("Foto_Profil"), userController.updateUser);
router.delete("/:id", authMiddleware, isAdmin, userController.deleteUser);

module.exports = router;
