const db = require("../config/database");

async function list() {
  const [rows] = await db.execute("SELECT id, category_name FROM categories ORDER BY category_name");
  return rows;
}

module.exports = { list };