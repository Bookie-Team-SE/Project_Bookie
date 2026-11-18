const db = require("../config/database");

async function get(userId) {
  const [rows] = await db.execute("SELECT * FROM settings WHERE user_id = ?", [userId]);
  return rows[0];
}

async function save(userId, theme, language, notifications) {
  await db.execute(
    `INSERT INTO settings (user_id, theme, language, notifications)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE theme = VALUES(theme),
       language = VALUES(language), notifications = VALUES(notifications)`,
    [userId, theme, language, notifications]
  );
  return get(userId);
}

module.exports = { get, save };