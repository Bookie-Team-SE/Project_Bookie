const reviews = require("../models/reviewModel");
const books = require("../models/bookModel");

async function list(req, res) {
  try {
    if (!(await books.findById(req.params.bookId))) return res.status(404).json({ message: "Book not found." });
    res.json(await reviews.listForBook(req.params.bookId));
  } catch (error) {
    res.status(500).json({ message: "Could not load reviews." });
  }
}

async function create(req, res) {
  try {
    const { bookId, rating, comment } = req.body;
    if (!bookId || !Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ message: "Choose a book and a rating from 1 to 5." });
    }
    if (!(await books.findById(bookId))) return res.status(404).json({ message: "Book not found." });
    await reviews.create(req.user.id, bookId, Number(rating), comment);
    res.status(201).json({ message: "Review saved." });
  } catch (error) {
    res.status(500).json({ message: "Could not save review." });
  }
}

module.exports = { list, create };