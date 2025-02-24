const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { Nama, Email, Password, Tanggal_Lahir } = req.body;
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
      Foto_Profil
    });

    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { Nama, Email, Password, Tanggal_Lahir } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const Foto_Profil = req.file ? req.file.path : user.Foto_Profil;
    const hashedPassword = Password ? await bcrypt.hash(Password, 12) : user.Password;

    await user.update({
      Nama,
      Email,
      Password: hashedPassword,
      Tanggal_Lahir,
      Foto_Profil
    });

    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
};
