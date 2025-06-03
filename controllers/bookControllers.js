const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books." });
  }
};

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: "Failed to add book." });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book." });
  }
};
