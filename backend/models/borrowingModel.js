const db = require("../config/database");

async function listForUser(userId) {
  const [rows] = await db.execute(
    `SELECT br.*, b.title, b.author FROM borrowings br
     JOIN books b ON b.id = br.book_id
     WHERE br.user_id = ? ORDER BY br.borrow_date DESC`,
    [userId]
  );
  return rows;
}

async function create(userId, bookId, dueDate) {
  const [result] = await db.execute(
    `INSERT INTO borrowings (user_id, book_id, borrow_date, due_date, status)
     VALUES (?, ?, CURDATE(), ?, 'borrowed')`,
    [userId, bookId, dueDate]
  );
  return result.insertId;
}

async function returnBook(id, userId) {
  const [result] = await db.execute(
    `UPDATE borrowings SET status = 'returned', return_date = CURDATE()
     WHERE id = ? AND user_id = ? AND status = 'borrowed'`,
    [id, userId]
  );
  return result.affectedRows;
}

module.exports = { listForUser, create, returnBook };