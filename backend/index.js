const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// Import routes
const authRoutes = require("./src/routes/auth"); // pastikan path ini sesuai struktur kamu

// Middleware
app.use(cors()); // Biar bisa diakses dari frontend
app.use(express.json()); // Untuk parsing JSON body

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Hello express");
});

// Gunakan routes auth
app.use("/api/auth", authRoutes);

// Start server
app.listen(port, () => {
  console.log(`✅ Server berjalan di http://localhost:${port}`);
});
