const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");

// POST: Create a feedback notification
router.post("/feedback", async (req, res) => {
  const { userId, message } = req.body;

  try {
    const newNotification = new Notification({
      type: "Feedback",
      title: "User Feedback",
      message,
      userId,
    });

    const savedNotification = await newNotification.save();
    res.status(201).json({ message: "Feedback submitted successfully!", notification: savedNotification });
  } catch (error) {
    res.status(500).json({ error: "Error submitting feedback: " + error.message });
  }
});

// POST: Create a system notification (e.g., for user login or reports)
router.post("/", async (req, res) => {
  const { type, title, message, userId } = req.body;

  try {
    const newNotification = new Notification({
      type: type || "System", // Default to "System" if no type is specified
      title,
      message,
      userId,
    });

    const savedNotification = await newNotification.save();
    res.status(201).json({ message: "Notification created successfully!", notification: savedNotification });
  } catch (error) {
    res.status(500).json({ error: "Error creating notification: " + error.message });
  }
});

// GET: Fetch all notifications for a specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notifications: " + error.message });
  }
});

// PUT: Mark all notifications as read for a specific user
router.put("/:userId/mark-read", async (req, res) => {
  const { userId } = req.params;

  try {
    await Notification.updateMany({ userId, status: "unread" }, { $set: { status: "read" } });
    res.status(200).json({ message: "All notifications marked as read." });
  } catch (error) {
    res.status(500).json({ error: "Error updating notifications: " + error.message });
  }
});

module.exports = router;
