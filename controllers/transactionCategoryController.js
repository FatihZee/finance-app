const { TransactionCategory } = require('../models');

// Ambil semua kategori transaksi
const getAllCategories = async (req, res) => {
  try {
    const categories = await TransactionCategory.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Ambil kategori transaksi berdasarkan ID
const getCategoryById = async (req, res) => {
  try {
    const category = await TransactionCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// Tambah kategori transaksi baru
const createCategory = async (req, res) => {
  try {
    const { Nama_Kategori } = req.body;
    const category = await TransactionCategory.create({ Nama_Kategori });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan kategori', error: error.message });
  }
};

// Update kategori transaksi
const updateCategory = async (req, res) => {
  try {
    const { Nama_Kategori } = req.body;
    const category = await TransactionCategory.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    category.Nama_Kategori = Nama_Kategori;
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui kategori', error: error.message });
  }
};

// Hapus kategori transaksi
const deleteCategory = async (req, res) => {
  try {
    const category = await TransactionCategory.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    await category.destroy();
    res.json({ message: 'Kategori berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus kategori', error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
