const categories = require("../models/categoryModel");

async function list(req, res) {
  try {
    res.json(await categories.list());
  } catch (error) {
    res.status(500).json({ message: "Could not load categories." });
  }
}

module.exports = { list };