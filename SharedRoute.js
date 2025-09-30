const mongoose = require('mongoose');

const SharedRouteSchema = new mongoose.Schema({
  start: String,
  target: String,
  path: [String],
  distance: Number,
  aqi: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SharedRoute', SharedRouteSchema);
