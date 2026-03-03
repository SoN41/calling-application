const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET User Profile
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching profile" });
  }
});

// UPDATE User Profile
router.put("/profile", async (req, res) => {
  try {
    const { username, fullName, timezone, bio } = req.body;
    
    // Find user and update their details
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { fullName, timezone, bio },
      { new: true } // Returns the updated document
    ).select("-password"); // Don't send the password back!

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error updating profile" });
  }
});

module.exports = router;