const express = require("express");
const cors = require("cors");
const authRoutes = require("./authRoutes");
const routes = require("./routes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", routes);

module.exports = app;
