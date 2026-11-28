const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/userModel");

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email and password are required." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }
    if (await users.findByEmail(email)) {
      return res.status(409).json({ message: "Email is already registered." });
    }
    const hashed = await bcrypt.hash(password, 12);
    const id = await users.create(username, email, hashed);
    const user = { id, username, email };
    const token = createToken(user);
    return res.status(201).json({ message: "Registration successful.", token, user });
  } catch (error) {
    console.error("Register Erro:", error);
    return res.status(500).json({ 
      message: "Could not register user.",
      error: error.message
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await users.findByEmail(email || "");
    if (!user || !(await bcrypt.compare(password || "", user.password))) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }
    const token = createToken(user);
    return res.json({
      message: "Login successful.",
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ 
      message: "Could not log in." ,
      error: error.message
    });
  }
}

async function me(req, res) {
  try {
    const user = await users.findPublicById(req.user.id);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Could not load profile." });
  }
}

async function updateProfile(req, res) {
  try {
    const { username, email } = req.body;
    if (!username || !email) return res.status(400).json({ message: "Username and email are required." });
    await users.updateProfile(req.user.id, username, email);
    return res.json({ message: "Profile updated.", user: await users.findPublicById(req.user.id) });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "Email is already in use." });
    return res.status(500).json({ message: "Could not update profile." });
  }
}

async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await users.findByEmail(req.user.email);
    if (!user || !(await bcrypt.compare(currentPassword || "", user.password))) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters." });
    }
    await users.updatePassword(req.user.id, await bcrypt.hash(newPassword, 12));
    return res.json({ message: "Password updated." });
  } catch (error) {
    return res.status(500).json({ message: "Could not update password." });
  }
}

module.exports = { register, login, me, updateProfile, changePassword };