const settings = require("../models/settingModel");

async function get(req, res) {
  try {
    let row = await settings.get(req.user.id);
    if (!row) row = await settings.save(req.user.id, "light", "en", true);
    res.json(row);
  } catch (error) {
    res.status(500).json({ message: "Could not load settings." });
  }
}

async function update(req, res) {
  try {
    const { theme = "light", language = "en", notifications = true } = req.body;
    if (!["light", "dark"].includes(theme)) return res.status(400).json({ message: "Invalid theme." });
    const row = await settings.save(req.user.id, theme, language, Boolean(notifications));
    res.json({ message: "Settings updated.", settings: row });
  } catch (error) {
    res.status(500).json({ message: "Could not update settings." });
  }
}

module.exports = { get, update };