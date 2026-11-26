require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

const app = express();
const port = Number(process.env.PORT) || 3000;
const jwtSecret = process.env.JWT_SECRET || "development-only-change-me";
const useDatabase = Boolean(
  process.env.DB_HOST &&
  process.env.DB_USER &&
  process.env.DB_NAME
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
      : true,
  })
);
app.use(express.json());

const users = new Map();
let pool;

async function initializeDatabase() {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY users_email_unique (email)
    )
  `);
}

async function findUserByEmail(email) {
  if (useDatabase) {
    const [rows] = await pool.query(
      "SELECT id, username, email, password FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    return rows[0] || null;
  }

  return users.get(email) || null;
}

async function createUser(username, email, passwordHash) {
  if (useDatabase) {
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, passwordHash]
    );
    return {
      id: result.insertId,
      username,
      email,
    };
  }

  const user = {
    id: users.size + 1,
    username,
    email,
    password: passwordHash,
  };
  users.set(email, user);
  return user;
}

function validateRegistration(body) {
  const username = typeof body.username === "string" ? body.username.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (username.length < 3 || username.length > 50) {
    return "Username must be between 3 and 50 characters.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "A valid email address is required.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  return null;
}

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: useDatabase ? "mysql" : "memory",
  });
});

app.post("/api/users/register", async (req, res, next) => {
  try {
    const validationError = validateRegistration(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const username = req.body.username.trim();
    const email = req.body.email.trim().toLowerCase();
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: "Email address is already registered." });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 12);
    const user = await createUser(username, email, passwordHash);

    return res.status(201).json({
      message: "Registration successful!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/users/login", async (req, res, next) => {
  try {
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  if (useDatabase && error && (error.code === "ER_DUP_ENTRY" || error.errno === 1062)) {
    return res.status(409).json({ message: "Email address is already registered." });
  }

  console.error(error);
  return res.status(500).json({
    message:
      useDatabase
        ? "Database operation failed."
        : "An unexpected server error occurred.",
  });
});

async function start() {
  if (useDatabase) {
    await initializeDatabase();
  }

  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
    console.log(`Storage: ${useDatabase ? "MySQL" : "in-memory development mode"}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error("Failed to start backend:", error.message);
    process.exit(1);
  });
}

module.exports = { app, start };
