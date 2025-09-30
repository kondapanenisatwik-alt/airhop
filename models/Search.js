const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  start: { type: String, required: true },
  target: { type: String, required: true },
  path: [String],
  distance: Number,
  aqi: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Search', SearchSchema);
