const db = require("../config/database");

async function listForBook(bookId) {
  const [rows] = await db.execute(
    `SELECT r.id, r.rating, r.comment, r.created_at, u.username
     FROM reviews r JOIN users u ON u.id = r.user_id
     WHERE r.book_id = ? ORDER BY r.created_at DESC`,
    [bookId]
  );
  return rows;
}

async function create(userId, bookId, rating, comment) {
  await db.execute(
    `INSERT INTO reviews (user_id, book_id, rating, comment)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment)`,
    [userId, bookId, rating, comment || null]
  );
}

module.exports = { listForBook, create };