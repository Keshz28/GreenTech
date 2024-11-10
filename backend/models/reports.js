// models/report.js

const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  issueType: { type: String, required: true },      // Type of issue, e.g., "Missed Pickup"
  location: { type: String, required: true },       // Location of the issue
  description: { type: String, required: true },    // Detailed description of the issue
  photo: { type: String, required: false },         // Optional photo URL
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User who reported
  createdAt: { type: Date, default: Date.now }      // Automatically sets the date when report is created
});

module.exports = mongoose.model("Report", reportSchema);
