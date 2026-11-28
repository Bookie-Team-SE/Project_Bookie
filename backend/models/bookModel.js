const db = require("../config/database");

async function list(search = "", categoryId = null) {
  let sql = `SELECT b.id, b.user_id, b.title, b.author, b.description,
                    b.cover_image, b.created_at,
                    GROUP_CONCAT(DISTINCT c.category_name) AS categories
             FROM books b
             LEFT JOIN book_categories bc ON bc.book_id = b.id
             LEFT JOIN categories c ON c.id = bc.category_id
             WHERE (b.title LIKE ? OR b.author LIKE ?)`;
  const params = [`%${search}%`, `%${search}%`];

  if (categoryId) {
    sql += " AND EXISTS (SELECT 1 FROM book_categories x WHERE x.book_id = b.id AND x.category_id = ?)";
    params.push(categoryId);
  }
  sql += " GROUP BY b.id ORDER BY b.created_at DESC";
  const [rows] = await db.execute(sql, params);
  return rows;
}

async function findById(id) {
  const [rows] = await db.execute("SELECT * FROM books WHERE id = ?", [id]);
  return rows[0];
}

async function create(userId, data) {
  const [result] = await db.execute(
    `INSERT INTO books (user_id, title, author, description, cover_image)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, data.title, data.author, data.description || null, data.cover_image || null]
  );
  return result.insertId;
}

async function update(id, userId, data) {
  const [result] = await db.execute(
    `UPDATE books SET title = ?, author = ?, description = ?, cover_image = ?
     WHERE id = ? AND user_id = ?`,
    [data.title, data.author, data.description || null, data.cover_image || null, id, userId]
  );
  return result.affectedRows;
}

async function remove(id, userId) {
  const [result] = await db.execute("DELETE FROM books WHERE id = ? AND user_id = ?", [id, userId]);
  return result.affectedRows;
}

async function setCategories(bookId, categoryIds) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("DELETE FROM book_categories WHERE book_id = ?", [bookId]);
    for (const categoryId of categoryIds) {
      await connection.execute(
        "INSERT INTO book_categories (book_id, category_id) VALUES (?, ?)",
        [bookId, categoryId]
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { list, findById, create, update, remove, setCategories };