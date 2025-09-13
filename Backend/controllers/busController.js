const Bus = require("../models/Bus");

// @desc    Get all buses
// @route   GET /pi/official/buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find()
      .populate("route")   // ✅ Route exists
      .populate("driver"); // ✅ Driver exists
    res.status(200).json(buses);
  } catch (err) {
    console.error("Error fetching buses:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc    Add a new bus
// @route   POST /pi/official/buses
const addBus = async (req, res) => {
  try {
    const { busNumber } = req.body;

    if (!busNumber) {
      return res.status(400).json({ message: "Bus number is required" }); // use return
    }

    const bus = new Bus(req.body);
    await bus.save();

    return res.status(201).json(bus); // only one response
  } catch (err) {
    console.error("Error adding bus:", err);
    return res.status(500).json({ message: "Server error" }); // only one response
  }
};


module.exports = { getAllBuses, addBus };
