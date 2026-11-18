const borrowings = require("../models/borrowingModel");
const books = require("../models/bookModel");

async function list(req, res) {
  try {
    res.json(await borrowings.listForUser(req.user.id));
  } catch (error) {
    res.status(500).json({ message: "Could not load borrowings." });
  }
}

async function create(req, res) {
  try {
    const { bookId, dueDate } = req.body;
    if (!bookId || !dueDate) return res.status(400).json({ message: "Book and due date are required." });
    if (!(await books.findById(bookId))) return res.status(404).json({ message: "Book not found." });
    const id = await borrowings.create(req.user.id, bookId, dueDate);
    res.status(201).json({ message: "Book borrowed.", id });
  } catch (error) {
    res.status(500).json({ message: "Could not borrow book." });
  }
}

async function returnBook(req, res) {
  try {
    const changed = await borrowings.returnBook(req.params.id, req.user.id);
    if (!changed) return res.status(404).json({ message: "Borrowing record not found." });
    res.json({ message: "Book returned." });
  } catch (error) {
    res.status(500).json({ message: "Could not return book." });
  }
}

module.exports = { list, create, returnBook };