const db = require("../config/database");

async function list(userId) {
  const [rows] = await db.execute(
    `SELECT b.* FROM favorites f JOIN books b ON b.id = f.book_id
     WHERE f.user_id = ? ORDER BY f.created_at DESC`,
    [userId]
  );
  return rows;
}

async function add(userId, bookId) {
  await db.execute(
    "INSERT IGNORE INTO favorites (user_id, book_id) VALUES (?, ?)",
    [userId, bookId]
  );
}

async function remove(userId, bookId) {
  const [result] = await db.execute(
    "DELETE FROM favorites WHERE user_id = ? AND book_id = ?",
    [userId, bookId]
  );
  return result.affectedRows;
}

module.exports = { list, add, remove };