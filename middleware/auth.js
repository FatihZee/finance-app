exports.isAdmin = (req, res, next) => {
    console.log("User role from token:", req.user.role);

    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Akses ditolak, hanya admin yang diperbolehkan" });
    }
    next();
};
