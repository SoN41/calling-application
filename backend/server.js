// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/auth");
const meetingRoutes = require("./routes/meetings");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// Mount Routes
// Note: We mount authRoutes at "/api" so the endpoints remain /api/signup and /api/login
app.use("/api", authRoutes); 
app.use("/api/meetings", meetingRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));