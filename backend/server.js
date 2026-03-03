
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/auth");
const meetingRoutes = require("./routes/meetings");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors({
  origin: "https://calling-application-8vtni730s-sujals-projects-567a4c95.vercel.app",
  credentials: true
}));
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