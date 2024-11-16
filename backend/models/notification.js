const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ["Feedback", "System", "Report"], 
    default: "System" 
  }, // "Feedback" for user feedback, "System" for other notifications
  title: { type: String, required: true }, // Notification title
  message: { type: String, required: true }, // Notification content
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false 
  }, // User-specific notifications
  status: { type: String, enum: ["unread", "read"], default: "unread" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);


