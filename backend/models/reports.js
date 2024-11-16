const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  issueType: { type: String, required: true }, // Type of issue (e.g., "Missed Pickup")
  location: { type: String, required: true }, // Location of the issue
  description: { type: String, required: true }, // Description of the issue
  photo: { type: String, default: null }, // Optional photo URL
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who created the report
  createdAt: { type: Date, default: Date.now }, // Timestamp of report creation
});

module.exports = mongoose.model("Report", reportSchema);

