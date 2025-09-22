const express = require("express");
const cors = require("cors");
const db = require("./database"); // Import DB
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Base routes
app.get("/", (req, res) => {
  res.send("Smart City IoT Platform API 🚀 with DB");
});

app.get("/status", (req, res) => {
  res.json({ status: "API running", timestamp: new Date() });
});

// Get all sensors
app.get("/sensors", (req, res) => {
  db.all("SELECT * FROM sensors", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single sensor
app.get("/sensors/:id", (req, res) => {
  db.get("SELECT * FROM sensors WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    row ? res.json(row) : res.status(404).json({ error: "Not found" });
  });
});

// Add new sensor
app.post("/sensors", (req, res) => {
  const { type, value } = req.body;
  if (!type || value === undefined) {
    return res.status(400).json({ error: "Type and value are required" });
  }

  db.run(
    "INSERT INTO sensors (type, value) VALUES (?, ?)",
    [type, value],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, type, value });
    }
  );
});

// Delete sensor
app.delete("/sensors/:id", (req, res) => {
  db.run("DELETE FROM sensors WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    this.changes === 0
      ? res.status(404).json({ error: "Not found" })
      : res.json({ msg: "Sensor deleted", id: req.params.id });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
