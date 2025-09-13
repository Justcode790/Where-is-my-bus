const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Bus = require("../models/Bus");

// @desc    Get all drivers
// @route   GET /pi/official/drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password");
    res.status(200).json(drivers);
  } catch (err) {
    console.error("Error fetching drivers:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


router.get("/:driverId/bus", async (req, res) => {
  const { driverId } = req.params;

  if (!driverId) {
    return res.status(400).json({ message: "Driver ID is required" });
  }

  try {
    // Find one bus where the driver field equals the driverId
    const bus = await Bus.findOne({ driver: driverId }).populate({
      path: "route",         // field in Bus schema
    });
    if (!bus) return res.status(404).json({ message: "No bus assigned" });

    res.status(200).json(bus);
  } catch (err) {
    console.error("Error fetching assigned bus:", err);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
