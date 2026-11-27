const mongoose = require("mongoose");
const Medicine = require("../models/Medicine");

// Menangani error dengan status code yang sesuai
const handleError = (res, error) => {
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: "Validasi gagal", errors: messages });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ success: false, message: `Format ${error.path} tidak valid` });
  }
  console.error(error);
  return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
};

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// READ semua + search & filter
// GET /api/medicines?search=para&kategori=Vitamin&expired=true&stokMax=40
const getAllMedicines = async (req, res) => {
  try {
    const { search, kategori, expired, stokMax } = req.query;
    const filter = {};

    if (search) filter.nama = { $regex: escapeRegex(search), $options: "i" };
    if (kategori) filter.kategori = kategori;
    if (expired === "true") filter.tanggalKadaluarsa = { $lt: new Date() };
    if (expired === "false") filter.tanggalKadaluarsa = { $gte: new Date() };
    if (stokMax !== undefined) {
      if (isNaN(Number(stokMax))) {
        return res.status(400).json({ success: false, message: "stokMax harus berupa angka" });
      }
      filter.stok = { $lte: Number(stokMax) };
    }

    const medicines = await Medicine.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: medicines.length, data: medicines });
  } catch (error) {
    handleError(res, error);
  }
};

// READ satu
// GET /api/medicines/:id
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ success: false, message: "Obat tidak ditemukan" });
    }
    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    handleError(res, error);
  }
};

// CREATE
// POST /api/medicines
const createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json({ success: true, message: "Obat berhasil ditambahkan", data: medicine });
  } catch (error) {
    handleError(res, error);
  }
};

// UPDATE (semua field termasuk nama bisa diubah)
// PUT /api/medicines/:id
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!medicine) {
      return res.status(404).json({ success: false, message: "Obat tidak ditemukan" });
    }
    res.status(200).json({ success: true, message: "Obat berhasil diperbarui", data: medicine });
  } catch (error) {
    handleError(res, error);
  }
};

// DELETE
// DELETE /api/medicines/:id
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({ success: false, message: "Obat tidak ditemukan" });
    }
    res.status(200).json({ success: true, message: "Obat berhasil dihapus" });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};