const favorites = require("../models/favoriteModel");
const books = require("../models/bookModel");

async function list(req, res) {
  try {
    res.json(await favorites.list(req.user.id));
  } catch (error) {
    res.status(500).json({ message: "Could not load favorites." });
  }
}

async function add(req, res) {
  try {
    const { bookId } = req.body;
    if (!bookId) return res.status(400).json({ message: "Book is required." });
    if (!(await books.findById(bookId))) return res.status(404).json({ message: "Book not found." });
    await favorites.add(req.user.id, bookId);
    res.status(201).json({ message: "Book added to favorites." });
  } catch (error) {
    res.status(500).json({ message: "Could not add favorite." });
  }
}

async function remove(req, res) {
  try {
    const changed = await favorites.remove(req.user.id, req.params.bookId);
    if (!changed) return res.status(404).json({ message: "Favorite not found." });
    res.json({ message: "Favorite removed." });
  } catch (error) {
    res.status(500).json({ message: "Could not remove favorite." });
  }
}

module.exports = { list, add, remove };