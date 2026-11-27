# API Manajemen Obat Klinik/Apotek

Final Project Study Club Backend Basic - KSM Veterantech UPNVJ 2026

- **Nama:** Alyaa Hikari Susanto
- **NIM:** 2510511154
- **Judul Project:** API Manajemen Obat Klinik/Apotek

REST API sederhana untuk mengelola data obat (stok, harga, kategori, dan tanggal kadaluarsa) di klinik/apotek. Dibuat dengan Express.js dan MongoDB (Atlas) menggunakan Mongoose.

## Teknologi

- Node.js dan Express.js
- MongoDB Atlas dan Mongoose
- dotenv (environment variable)
- nodemon (development)
- Postman (pengujian endpoint)

## Struktur Project

```
api-obat/
├── config/
│   └── db.js                    # koneksi ke MongoDB
├── controllers/
│   └── medicineController.js    # logika CRUD, search, dan filter
├── models/
│   └── Medicine.js              # schema dan validasi data obat
├── routes/
│   └── medicineRoutes.js        # definisi endpoint
├── .gitignore
├── package.json
└── server.js                    # entry point aplikasi
```

Arsitektur yang dipakai adalah MVC sederhana: model (data), routes, dan controller (logika).

## Cara Instalasi

1. Clone repository:
   ```bash
   git clone https://github.com/USERNAME/api-manajemen-obat.git
   cd api-manajemen-obat
   ```
2. Install dependency:
   ```bash
   npm install
   ```
3. Buat file `.env` di root project (lihat bagian Environment Variable).

## Environment Variable

Buat file `.env` dengan isi berikut:

```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<nama-cluster>.mongodb.net/klinik_apotek?retryWrites=true&w=majority
```

| Variable | Keterangan |
|----------|------------|
| `PORT` | Port server (default 3000) |
| `MONGO_URI` | Connection string MongoDB Atlas, ganti `<username>`, `<password>`, dan `<nama-cluster>` dengan milikmu |

File `.env` tidak ikut di-commit karena sudah masuk `.gitignore`.

## Menjalankan Server

Mode development (auto-restart dengan nodemon):

```bash
npm run dev
```

Mode biasa:

```bash
npm start
```

Jika berhasil, terminal menampilkan `MongoDB terhubung` dan `Server berjalan di http://localhost:3000`.

## Format Data Obat

| Field | Tipe | Keterangan |
|-------|------|------------|
| `nama` | String | Wajib, 2-100 karakter |
| `kategori` | String | Wajib, salah satu dari: Analgesik, Antibiotik, Vitamin, Antihistamin, Lambung, Pernapasan, Penyakit Kronis, Antiseptik, Lainnya |
| `stok` | Number | Wajib, bilangan bulat, minimal 0 |
| `harga` | Number | Wajib, minimal 0 |
| `tanggalKadaluarsa` | Date | Wajib |
| `deskripsi` | String | Opsional, maksimal 300 karakter |

Field `_id`, `createdAt`, dan `updatedAt` dibuat otomatis oleh MongoDB/Mongoose.

Contoh data:

```json
{
  "nama": "Paracetamol 500mg",
  "kategori": "Analgesik",
  "stok": 120,
  "harga": 5000,
  "tanggalKadaluarsa": "2027-06-30",
  "deskripsi": "Pereda nyeri dan penurun demam"
}
```

## Daftar Endpoint

Base URL: `http://localhost:3000`

| Method | Endpoint | Keterangan | Status sukses |
|--------|----------|------------|---------------|
| GET | `/` | Cek server berjalan | 200 |
| GET | `/api/medicines` | Menampilkan semua obat (mendukung search dan filter) | 200 |
| GET | `/api/medicines/:id` | Menampilkan satu obat berdasarkan ID | 200 |
| POST | `/api/medicines` | Menambah obat baru | 201 |
| PUT | `/api/medicines/:id` | Mengubah data obat (nama, stok, harga, dll) | 200 |
| DELETE | `/api/medicines/:id` | Menghapus obat | 200 |

### Query Parameter (GET `/api/medicines`)

| Parameter | Contoh | Keterangan |
|-----------|--------|------------|
| `search` | `?search=para` | Cari obat berdasarkan nama (tidak case-sensitive) |
| `kategori` | `?kategori=Vitamin` | Filter berdasarkan kategori |
| `expired` | `?expired=true` | `true` untuk obat kadaluarsa, `false` untuk yang belum |
| `stokMax` | `?stokMax=40` | Obat dengan stok kurang dari atau sama dengan nilai ini |

Parameter bisa digabung, contoh: `/api/medicines?search=vit&kategori=Vitamin`.

### Path Parameter

`/api/medicines/:id` memakai `_id` dari MongoDB, contoh: `/api/medicines/6b098b32913262e901c261bb`.

## Error Handling

Semua endpoint memakai `try...catch` dan mengembalikan pesan error yang jelas.

| Status | Kondisi |
|--------|---------|
| 400 | Validasi gagal (field kosong, stok negatif, kategori tidak valid) atau format ID/parameter salah |
| 404 | Obat dengan ID tersebut tidak ditemukan |
| 500 | Kesalahan pada server |

Contoh response error validasi:

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": ["Stok tidak boleh negatif"]
}
```

## Pengujian

Seluruh endpoint diuji dengan Postman. File collection tersedia di repository ini (`*.postman_collection.json`). Cara memakai: buka Postman, klik **Import**, pilih file collection tersebut, lalu jalankan request. Pastikan server sudah berjalan di `http://localhost:3000`.

## Presentasi

Slide presentasi (PDF) tersedia di repository ini.
