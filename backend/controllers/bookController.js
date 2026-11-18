const books = require("../models/bookModel");

async function list(req, res) {
  try {
    const rows = await books.list(req.query.search || "", req.query.categoryId || null);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Could not load books." });
  }
}

async function create(req, res) {
  try {
    const { title, author, description, cover_image, categoryIds = [] } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Title and author are required." });
    const id = await books.create(req.user.id, { title, author, description, cover_image });
    if (Array.isArray(categoryIds) && categoryIds.length) await books.setCategories(id, categoryIds);
    res.status(201).json({ message: "Book added.", id });
  } catch (error) {
    res.status(500).json({ message: "Could not add book." });
  }
}

async function update(req, res) {
  try {
    const { title, author, description, cover_image, categoryIds = [] } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Title and author are required." });
    const changed = await books.update(req.params.id, req.user.id, { title, author, description, cover_image });
    if (!changed) return res.status(404).json({ message: "Book not found or not yours." });
    if (Array.isArray(categoryIds)) await books.setCategories(req.params.id, categoryIds);
    res.json({ message: "Book updated." });
  } catch (error) {
    res.status(500).json({ message: "Could not update book." });
  }
}

async function remove(req, res) {
  try {
    const changed = await books.remove(req.params.id, req.user.id);
    if (!changed) return res.status(404).json({ message: "Book not found or not yours." });
    res.json({ message: "Book deleted." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete book." });
  }
}

module.exports = { list, create, update, remove };