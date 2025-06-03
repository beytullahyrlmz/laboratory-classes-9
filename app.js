const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

dotenv.config(); // .env dosyasındaki ortam değişkenlerini yükler

const PORT = process.env.PORT || 3001; // Sunucunun çalışacağı port
const MONGO_URI = process.env.MONGO_URI; // MongoDB bağlantı URI

const app = express(); // Express uygulamasını başlatır

// Middleware'ler
app.use(cors()); // CORS (Cross-Origin Resource Sharing) için
app.use(express.json()); // JSON istek gövdesi ayrıştırılır

// Ana dizin için GET isteği — kullanıcı bilgilendirmesi
app.get("/", (req, res) => {
  res.send("📘 Bu bir REST API'dir. /api/books veya /api/authors adreslerini kullanınız.");
});

// API Rotaları
app.use("/api/books", bookRoutes); // Kitapla ilgili işlemler
app.use("/api/authors", authorRoutes); // Yazarla ilgili işlemler

// MongoDB Bağlantısı
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB"); // Başarılı bağlantı mesajı
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`); // Sunucu dinlemeye başlıyor
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err); // Hata mesajı
  });
