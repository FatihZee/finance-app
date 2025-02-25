const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const blacklistedTokens = new Set();

exports.register = async (req, res) => {
    try {
        const { Nama, Email, Password, Tanggal_Lahir } = req.body;

        if (!Email) return res.status(400).json({ error: "Email is required" });
        if (!Password) return res.status(400).json({ error: "Password is required" });
        if (!Nama) return res.status(400).json({ error: "Nama is required" });
        if (!Tanggal_Lahir) return res.status(400).json({ error: "Tanggal_Lahir is required" });

        const existingUser = await User.findOne({ where: { Email } });
        if (existingUser) return res.status(400).json({ error: "Email sudah terdaftar" });

        const hashedPassword = await bcrypt.hash(Password, 12);

        const newUser = await User.create({
            Nama,
            Email,
            Password: hashedPassword,
            Tanggal_Lahir,
        });

        const userResponse = { ...newUser.get(), Password: undefined };
        res.status(201).json({ message: "User berhasil didaftarkan!", user: userResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email) return res.status(400).json({ error: "Email is required" });
        if (!Password) return res.status(400).json({ error: "Password is required" });

        const user = await User.findOne({ where: { Email } });
        if (!user) return res.status(401).json({ error: "Email atau password salah" });

        const validPassword = await bcrypt.compare(Password, user.Password);
        if (!validPassword) return res.status(401).json({ error: "Email atau password salah" });

        const token = jwt.sign(
            { id: user.User_ID, email: user.Email, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        const refreshToken = jwt.sign(
            { id: user.User_ID, email: user.Email, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );        

        res.status(200).json({ message: "Login berhasil", token, refreshToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        console.log("User from token:", req.user);

        const user = await User.findByPk(req.user.id, { attributes: { exclude: ["Password"] } });
        if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(400).json({ error: "Token tidak ditemukan" });

        blacklistedTokens.add(token);
        res.status(200).json({ message: "Logout berhasil" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.blacklistedTokens = blacklistedTokens;
