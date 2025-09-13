// models/Route.js
const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stops: [{ type: String, required: true }],
  distance: { type: Number, required: true }, // in km
  estimatedTime: { type: String } // e.g. "45 mins"
});

module.exports=mongoose.model("Route", routeSchema);
