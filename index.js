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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
