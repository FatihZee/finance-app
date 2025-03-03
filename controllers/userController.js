const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { Nama, Email, Password, Tanggal_Lahir, Role } = req.body;
    const Foto_Profil = req.file ? req.file.path : null;

    if (!Password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(Password, 12);

    const newUser = await User.create({
      Nama,
      Email,
      Password: hashedPassword,
      Tanggal_Lahir,
      Foto_Profil,
      Role: Role || "user"
    });

    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log('Request Params ID:', req.params.id);
    console.log('Authenticated User:', req.user);

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const { Nama, Email, Password, Tanggal_Lahir, Role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    // Cek jika user ingin mengubah role tetapi bukan admin
    if (Role && req.user.Role !== "admin") {
      return res.status(403).json({ error: "Unauthorized to change role" });
    }

    // Hash password baru jika dikirimkan
    const hashedPassword = Password ? await bcrypt.hash(Password, 12) : user.Password;

    // Update data user
    await user.update({
      Nama: Nama || user.Nama,
      Email: Email || user.Email,
      Password: hashedPassword,
      Tanggal_Lahir: Tanggal_Lahir || user.Tanggal_Lahir,
      Foto_Profil: req.file ? req.file.path : user.Foto_Profil,
      Role: Role || user.Role
    });

    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    await user.destroy();
    res.status(200).json({ message: "User berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message });
  }
};
