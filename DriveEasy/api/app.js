const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./authRoutes");
const routes = require("./routes");
require("./githubAuth");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET || "session-secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);
app.use("/api", routes);

module.exports = app;
