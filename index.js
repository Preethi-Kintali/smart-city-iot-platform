const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Base routes
app.get("/", (req, res) => {
  res.send("Smart City IoT Platform API 🚀");
});

app.get("/status", (req, res) => {
  res.json({ status: "API running", timestamp: new Date() });
});

// Dummy sensor data
let sensors = [
  { id: 1, type: "temperature", value: 26.5 },
  { id: 2, type: "humidity", value: 55 }
];

// Get all sensors
app.get("/sensors", (req, res) => {
  res.json(sensors);
});

// Get single sensor
app.get("/sensors/:id", (req, res) => {
  const sensor = sensors.find(s => s.id == req.params.id);
  sensor ? res.json(sensor) : res.status(404).json({ error: "Not found" });
});

// Add new sensor (with validation)
app.post("/sensors", (req, res) => {
  const { type, value } = req.body;
  if (!type || value === undefined) {
    return res.status(400).json({ error: "Type and value are required" });
  }

  const newSensor = { id: sensors.length + 1, type, value };
  sensors.push(newSensor);
  res.status(201).json(newSensor);
});

// Delete sensor
app.delete("/sensors/:id", (req, res) => {
  const sensorIndex = sensors.findIndex(s => s.id == req.params.id);
  if (sensorIndex === -1) {
    return res.status(404).json({ error: "Sensor not found" });
  }
  const deleted = sensors.splice(sensorIndex, 1);
  res.json({ msg: "Sensor deleted", deleted });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
