const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roomId: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  hostName: { type: String, required: true }
});

module.exports = mongoose.model("Meeting", meetingSchema);