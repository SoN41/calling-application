// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Allows us to accept JSON data

// 1. Connect to MongoDB (Updated for Mongoose v7+)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// 2. Define the User Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["Host", "Guest"] }
});
const User = mongoose.model("User", userSchema);

// 3. Setup JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// --- API ROUTES ---

// SIGNUP ROUTE
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save to database
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    // Create a token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token, user: { username: newUser.username, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error during signup" });
  }
});

// LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in database
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

    // Create a token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
});

// --- MEETING SCHEMA & MODEL ---
const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roomId: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  hostName: { type: String, required: true }
});
const Meeting = mongoose.model("Meeting", meetingSchema);

// --- MEETING ROUTES ---

// Create a new scheduled meeting
app.post("/api/meetings", async (req, res) => {
  try {
    const { title, roomId, scheduledAt, hostName } = req.body;
    const newMeeting = new Meeting({ title, roomId, scheduledAt, hostName });
    await newMeeting.save();
    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(500).json({ message: "Error scheduling meeting" });
  }
});

// Get all scheduled meetings
app.get("/api/meetings", async (req, res) => {
  try {
    // Fetches all meetings and sorts them by date (newest first)
    const meetings = await Meeting.find().sort({ scheduledAt: 1 });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meetings" });
  }
});

// Check if a specific room exists before joining
app.get("/api/meetings/:roomId", async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ roomId: req.params.roomId });
    if (!meeting) {
      return res.status(404).json({ message: "Room does not exist" });
    }
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: "Server error checking room" });
  }
});

// Delete a meeting when it ends
app.delete("/api/meetings/:roomId", async (req, res) => {
  try {
    const deletedMeeting = await Meeting.findOneAndDelete({ roomId: req.params.roomId });
    if (!deletedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.json({ message: "Meeting successfully ended and deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting meeting" });
  }
});

// 4. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));