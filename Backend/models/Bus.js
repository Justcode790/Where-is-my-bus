const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { type: String, unique: true, required: true },
  capacity: { type: Number, required: true },
  currentLocation: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  speed: { type: Number, default: 0 },
  passengers: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ["on-time", "delayed", "maintenance"], 
    default: "on-time" 
  },
  route: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Route",
    required:true
  },
  driver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true
  }
});

module.exports = mongoose.model("Bus", busSchema);
