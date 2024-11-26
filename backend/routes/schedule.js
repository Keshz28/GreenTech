const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ createdAt: -1 }); // Fetch all schedules sorted by the newest first
    res.json(schedules); // Return as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

// Add a new schedule
router.post('/', async (req, res) => {
  try {
    const { type, date, time, location, userId } = req.body; // Extract data from the request body

    // Create a new schedule
    const newSchedule = new Schedule({
      type,
      date,
      time,
      location,
      userId,
    });

    const savedSchedule = await newSchedule.save(); // Save the schedule to the database
    res.json(savedSchedule); // Return the saved schedule as a response
  } catch (error) {
    res.status(500).json({ error: 'Failed to add schedule' });
  }
});

// Delete a schedule by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the schedule ID from the route parameter
    await Schedule.findByIdAndDelete(id); // Delete the schedule
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
});

module.exports = router;
