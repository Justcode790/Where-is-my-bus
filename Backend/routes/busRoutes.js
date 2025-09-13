const express = require("express");
const router = express.Router();
const { getAllBuses, addBus } = require("../controllers/busController");

// Get all buses
router.get("/", getAllBuses);

// Add new bus
router.post("/", addBus);

module.exports = router;
