const mysql = require("mysql2/promise");
require("dotenv").config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "bookie_db",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test MySQL connection
pool.getConnection()
  .then((connection) => {
    console.log("MySQL connected successfully!");
    console.log("Database: bookie_db");
    console.log("Host: localhost");
    console.log("User: root");

    connection.release();
  })
  .catch((error) => {
    console.error("MySQL connection failed:", error.message);
  });

// Export database pool
module.exports = pool;