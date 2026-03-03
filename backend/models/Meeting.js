const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roomId: { type: String, required: true, unique: true },
  scheduledAt: { type: Date, required: true },
  hostName: { type: String, required: true },
  
  // --- NEW HISTORY FIELDS ---
  guestName: { type: String, default: "Unknown Guest" },
  status: { 
    type: String, 
    enum: ["Scheduled", "Completed", "Missed", "Cancelled"], 
    default: "Scheduled" 
  },
  duration: { type: String, default: "0 mins" }
}, { timestamps: true });

module.exports = mongoose.model("Meeting", MeetingSchema);