const express = require("express");
const Meeting = require("../models/Meeting"); 

const router = express.Router();

// Create a new meeting (/api/meetings)
router.post("/", async (req, res) => {
  try {
    const { title, roomId, scheduledAt, hostName } = req.body;
    const newMeeting = new Meeting({ title, roomId, scheduledAt, hostName }); 
    await newMeeting.save();
    res.status(201).json(newMeeting);
  } catch (error) {
    console.error("🔥 Error saving meeting:", error);
    res.status(500).json({ message: "Error scheduling meeting" });
  }
});

// Get all meetings (/api/meetings)
router.get("/", async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ scheduledAt: 1 });
    res.json(meetings);
  } catch (error) {
    console.error("🔥 Error fetching meetings:", error);
    res.status(500).json({ message: "Error fetching meetings" });
  }
});

// Check if a room exists (/api/meetings/:roomId)
router.get("/:roomId", async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ roomId: req.params.roomId });
    if (!meeting) {
      return res.status(404).json({ message: "Room does not exist" });
    }
    res.json(meeting);
  } catch (error) {
    console.error("🔥 Error checking room:", error);
    res.status(500).json({ message: "Server error checking room" });
  }
});

// Delete a meeting (/api/meetings/:roomId)
router.delete("/:roomId", async (req, res) => {
  try {
    const deletedMeeting = await Meeting.findOneAndDelete({ roomId: req.params.roomId });
    if (!deletedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.json({ message: "Meeting successfully ended and deleted" });
  } catch (error) {
    console.error("🔥 Error deleting meeting:", error);
    res.status(500).json({ message: "Error deleting meeting" });
  }
});

module.exports = router;