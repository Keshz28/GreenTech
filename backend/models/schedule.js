const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Type of schedule (e.g., "plastic", "glass", etc.)
  date: { type: Date, required: true }, // Date for the schedule
  time: { type: String, required: true }, // Time for the schedule
  location: { type: String, required: true }, // Location for the schedule
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Reference to a User
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
});

module.exports = mongoose.model('Schedule', scheduleSchema);
