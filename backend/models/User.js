const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Host", "Guest"], default: "Guest" },
  
  // --- NEW PROFILE FIELDS ---
  fullName: { type: String, default: "" },
  timezone: { type: String, default: "Asia/Kolkata" },
  bio: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);