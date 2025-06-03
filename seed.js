const mongoose = require("mongoose");
require("dotenv").config();

const Author = require("./models/Author");
const Book = require("./models/Book");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB (seed)");

    await Author.deleteMany();
    await Book.deleteMany();
    console.log("🧹 Eski veriler silindi.");

    const authors = await Author.insertMany([
      { firstName: "J.R.R.", lastName: "Tolkien" },
      { firstName: "George", lastName: "Orwell" }
    ]);
    console.log("✍️ Yazarlar eklendi.");

    const books = await Book.insertMany([
      {
        title: "Yüzüklerin Efendisi",
        year: 1954,
        author: authors[0]._id
      },
      {
        title: "1984",
        year: 1949,
        author: authors[1]._id
      }
    ]);
    console.log("📚 Kitaplar eklendi.");

    console.log("✅ Seed işlemi tamamlandı.");
    process.exit();
  } catch (error) {
    console.error("❌ Seed hatası:", error);
    process.exit(1);
  }
};

seed();
