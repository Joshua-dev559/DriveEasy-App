const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "database.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id        TEXT PRIMARY KEY,
    name      TEXT NOT NULL,
    email     TEXT NOT NULL UNIQUE,
    password  TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id            TEXT PRIMARY KEY,
    userId        TEXT NOT NULL,
    carId         TEXT NOT NULL,
    carName       TEXT NOT NULL,
    carImage      TEXT,
    customerName  TEXT NOT NULL,
    customerEmail TEXT NOT NULL,
    startDate     TEXT NOT NULL,
    endDate       TEXT NOT NULL,
    totalPrice    REAL NOT NULL,
    createdAt     TEXT NOT NULL
  );
`);

module.exports = db;
