const jwt = require("jsonwebtoken");
const { blacklistedTokens } = require("../controllers/authController");

const authMiddleware = (req, res, next) => {
    console.log("Authorization Header:", req.header("Authorization"));

    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Akses ditolak, token tidak tersedia" });

    console.log("Token after extraction:", token);

    if (blacklistedTokens.has(token)) {
        return res.status(401).json({ error: "Token tidak valid (sudah logout)" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Token tidak valid" });
    }
};

module.exports = authMiddleware;
