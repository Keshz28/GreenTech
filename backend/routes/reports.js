const express = require("express");
const multer = require("multer");
const router = express.Router();
const Report = require("../models/reports");
const path = require("path");

//Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

//File filter to accept the sent file must only be PNG or JPEG files
const fileFilter = (req, file, cb) => {
  const allowedType = ['image/png', 'image/jpeg'];
  if (allowedTypes.includes(file.mimetype)){
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Images to be sent in PNG and JPG files only!'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  }
});

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

