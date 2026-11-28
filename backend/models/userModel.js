
const db = require("../config/database");

// Find user by email
async function findByEmail(email) {
  const [rows] = await db.execute(
    `SELECT id, username, email, password, created_at
     FROM users
     WHERE email = ?`,
    [email]
  );

  return rows[0];
}

// Register new user
async function create(username, email, hashedPassword) {
  const [result] = await db.execute(
    `INSERT INTO users (username, email, password)
     VALUES (?, ?, ?)`,
    [username, email, hashedPassword]
  );

  return result.insertId;
}

// Find user by ID (public information only)
async function findPublicById(id) {
  const [rows] = await db.execute(
    `SELECT id, username, email, created_at
     FROM users
     WHERE id = ?`,
    [id]
  );

  return rows[0];
}

// Update user profile
async function updateProfile(id, username, email) {
  await db.execute(
    `UPDATE users
     SET username = ?, email = ?
     WHERE id = ?`,
    [username, email, id]
  );
}

// Update password
async function updatePassword(id, hashedPassword) {
  await db.execute(
    `UPDATE users
     SET password = ?
     WHERE id = ?`,
    [hashedPassword, id]
  );
}

module.exports = {
  findByEmail,
  create,
  findPublicById,
  updateProfile,
  updatePassword
};
