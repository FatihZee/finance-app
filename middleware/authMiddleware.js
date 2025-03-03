const jwt = require("jsonwebtoken");
const { blacklistedTokens } = require("../controllers/authController");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        console.log("Authorization Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Akses ditolak, token tidak tersedia" });
        }

        const token = authHeader.split(" ")[1];
        console.log("Token after extraction:", token);

        // Cek apakah token ada di blacklist (misal, setelah logout)
        if (blacklistedTokens.has(token)) {
            return res.status(401).json({ error: "Token tidak valid (sudah logout)" });
        }

        // Verifikasi token JWT
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ error: "Token sudah kadaluarsa" });
                } else if (err.name === "JsonWebTokenError") {
                    return res.status(401).json({ error: "Token tidak valid" });
                } else {
                    return res.status(400).json({ error: "Gagal memverifikasi token" });
                }
            }

            req.user = decoded; // Simpan data user dari token ke `req.user`
            console.log("Decoded Token:", decoded);

            next();
        });
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
};

module.exports = authMiddleware;
