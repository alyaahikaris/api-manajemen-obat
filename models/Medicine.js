const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama obat wajib diisi"],
      trim: true,
      minlength: [2, "Nama obat minimal 2 karakter"],
      maxlength: [100, "Nama obat maksimal 100 karakter"],
    },
    kategori: {
      type: String,
      required: [true, "Kategori wajib diisi"],
      enum: {
        values: [
          "Analgesik",
          "Antibiotik",
          "Vitamin",
          "Antihistamin",
          "Lambung",
          "Pernapasan",
          "Penyakit Kronis",
          "Antiseptik",
          "Lainnya",
        ],
        message: "Kategori '{VALUE}' tidak valid",
      },
    },
    stok: {
      type: Number,
      required: [true, "Stok wajib diisi"],
      min: [0, "Stok tidak boleh negatif"],
      validate: {
        validator: Number.isInteger,
        message: "Stok harus berupa bilangan bulat",
      },
    },
    harga: {
      type: Number,
      required: [true, "Harga wajib diisi"],
      min: [0, "Harga tidak boleh negatif"],
    },
    tanggalKadaluarsa: {
      type: Date,
      required: [true, "Tanggal kadaluarsa wajib diisi"],
    },
    deskripsi: {
      type: String,
      trim: true,
      maxlength: [300, "Deskripsi maksimal 300 karakter"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);