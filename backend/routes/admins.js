const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

// JWT Secret (use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Admin Registration
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, address, communityName, phoneNumber } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists with this email." });
    }

    // Create a new admin
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password, // Password will be hashed automatically
      address,
      communityName,
      phoneNumber
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully!", adminId: newAdmin._id });
  } catch (error) {
    res.status(500).json({ error: "Error registering admin: " + error.message });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    // Validate password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful!", token, adminId: admin._id });
  } catch (error) {
    res.status(500).json({ error: "Error logging in admin: " + error.message });
  }
});

// Fetch Admin Profile
router.get("/:adminId", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    res.status(200).json({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      address: admin.address,
      communityName: admin.communityName,
      phoneNumber: admin.phoneNumber
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching admin profile: " + error.message });
  }
});

module.exports = router;
