// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const Notification = require('./models/notification');
const Report = require('./models/reports');  // Import the Report model

const app = express();


const port = 3000;

// MongoDB connection
mongoose.connect("mongodb+srv://sukesh:PMasQ9sWWNzejBgV@greentech.1mzrd.mongodb.net/?retryWrites=true&w=majority&appName=GreenTech", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB database.");
    // Start the server after a successful database connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the MongoDB database:", err);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// User Registration Route
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, address, communityName, phoneNumber, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      address,
      communityName,
      phoneNumber,
      password  // This will be hashed before saving due to the pre-save hook in the model
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user: ' + error.message });
  }
});

// Notification Routes
app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching notifications', error: error.message });
  }
});

app.post('/api/notifications', async (req, res) => {
  try {
    const notification = new Notification(req.body);
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving notification', error: error.message });
  }
});

// Report Routes

// Route to create a new report
app.post('/api/reports', async (req, res) => {
  const { issueType, location, description, photo, userId } = req.body;
  try {
    const newReport = new Report({
      issueType,
      location,
      description,
      photo,
      userId
    });

    await newReport.save();
    res.status(201).json({ message: 'Report created successfully!', reportId: newReport._id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating report: ' + error.message });
  }
});

// Route to get all reports
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find().populate('userId', 'firstName lastName email'); // Populate user details
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reports: ' + error.message });
  }
});

// Export the app (without starting the server)
module.exports = app;

