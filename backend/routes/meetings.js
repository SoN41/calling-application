const express = require("express");
const Meeting = require("../models/Meeting"); 

const router = express.Router();

// 1. Create a new meeting (/api/meetings)
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

// 2. Get all ACTIVE meetings for the Dashboard (/api/meetings)
router.get("/", async (req, res) => {
  try {
    // Only fetch meetings that are still "Scheduled" so completed ones hide from the dashboard
    const meetings = await Meeting.find({ status: "Scheduled" }).sort({ scheduledAt: 1 });
    res.json(meetings);
  } catch (error) {
    console.error("🔥 Error fetching meetings:", error);
    res.status(500).json({ message: "Error fetching meetings" });
  }
});

// 3. 🚨 ADDED: Get Meeting History (/api/meetings/history/:username)
// MUST be placed before the /:roomId route!
router.get("/history/:username", async (req, res) => {
  try {
    const { username } = req.params;
    
    // Find meetings where this user was involved AND the status is Completed
    const pastMeetings = await Meeting.find({
      $or: [{ hostName: username }, { guestName: username }],
      status: "Completed" 
    }).sort({ scheduledAt: -1 }); // Sort by newest first

    res.json(pastMeetings);
  } catch (error) {
    console.error("🔥 Error fetching history:", error);
    res.status(500).json({ message: "Server error fetching history" });
  }
});

// 4. Check if a room exists (/api/meetings/:roomId)
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

// 5. 🚨 FIXED: Update to "Completed" instead of Deleting (/api/meetings/:roomId)
router.delete("/:roomId", async (req, res) => {
  try {
    // Changed findOneAndDelete to findOneAndUpdate!
    const completedMeeting = await Meeting.findOneAndUpdate(
      { roomId: req.params.roomId },
      { status: "Completed" }, // Mark it as completed instead of destroying it
      { new: true }
    );

    if (!completedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.json({ message: "Meeting successfully ended and saved to history" });
  } catch (error) {
    console.error("🔥 Error ending meeting:", error);
    res.status(500).json({ message: "Error ending meeting" });
  }
});

module.exports = router;