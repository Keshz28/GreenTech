const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: Date, required: true },
  month: { type: String, required: true }, // Assuming month as a string (e.g., "January")
  time: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference the User model
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Schedule', scheduleSchema);