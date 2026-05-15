const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const db = require("./database");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "driveeasy-secret";

const issueToken = (user) =>
  jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  if (db.prepare("SELECT id FROM users WHERE email = ?").get(email))
    return res.status(409).json({ error: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: randomUUID(), name, email, password: hashed, createdAt: new Date().toISOString() };
  db.prepare("INSERT INTO users (id,name,email,password,createdAt) VALUES (?,?,?,?,?)")
    .run(user.id, user.name, user.email, user.password, user.createdAt);

  res.status(201).json({ token: issueToken(user), user: { id: user.id, name: user.name, email: user.email } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid email or password" });

  res.json({ token: issueToken(user), user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
