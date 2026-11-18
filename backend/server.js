require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
  })
);

app.use(express.json());

// Test API
app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.status(200).json({
      message: "Bookie API and MySQL are connected!",
      database: "Connected",
      status: "OK",
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      message: "Database connection failed.",
      error: error.message,
    });
  }
});

// API Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/borrowings", require("./routes/borrowingRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/settings", require("./routes/settingRoutes"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found.",
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Bookie backend running at http://localhost:${PORT}`);
});