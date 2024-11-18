const express = require("express");
const multer = require("multer");
const router = express.Router();
const Report = require("../models/reports");

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" }); // Files are saved in the "uploads" folder

// POST: Create a new report
router.post("/", upload.single("photo"), async (req, res) => {
  const { issueType, location, description, userId } = req.body;
  
  // Log incoming request data
  console.log('Received report data:', req.body);
  console.log('Received file:', req.file);

  try {
    const newReport = new Report({
      issueType,
      location,
      description,
      photo: req.file ? req.file.path : null,
      userId
    });

    const savedReport = await newReport.save();
    console.log('Report saved successfully:', savedReport);
    
    res.status(201).json({ 
      message: "Report created successfully!", 
      report: savedReport 
    });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ 
      message: "Error creating report.", 
      error: error.message 
    });
  }
});

// GET: Fetch all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().populate("userId", "username email");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports.", error: error.message });
  }
});

module.exports = router;

