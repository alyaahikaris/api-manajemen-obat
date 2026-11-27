require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const medicineRoutes = require("./routes/medicineRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Manajemen Obat berjalan" });
});

app.use("/api/medicines", medicineRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
});