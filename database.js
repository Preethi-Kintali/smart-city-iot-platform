const sqlite3 = require("sqlite3").verbose();

// Create or connect to sensors.db
const db = new sqlite3.Database("./sensors.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database ✅");
    db.run(`CREATE TABLE IF NOT EXISTS sensors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        value REAL NOT NULL
    )`);
  }
});

module.exports = db;
