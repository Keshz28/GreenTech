const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Notification = require("../models/notification"); // For creating notifications

// Secret key for JWT (use environment variables for production)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// User Registration
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, address, communityName, phoneNumber } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email." });
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Password will be hashed automatically by the model
      address,
      communityName,
      phoneNumber,
    });

    await newUser.save();

    // Create a "Welcome" notification for the new user
    const welcomeNotification = new Notification({
      title: "Welcome to GreenTech!",
      message: `Hello ${firstName}, your account has been successfully created!`,
      userId: newUser._id,
    });
    await welcomeNotification.save();

    res.status(201).json({ message: "User registered successfully!", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: "Error registering user: " + error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password); // Assuming comparePassword is implemented in the model
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Create a "Welcome Back" notification for the user
    const loginNotification = new Notification({
      title: "Welcome Back!",
      message: `Hello ${user.firstName}, glad to see you again!`,
      userId: user._id,
    });
    await loginNotification.save();

    res.status(200).json({ message: "Login successful!", token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Error logging in: " + error.message });
  }
});

// Fetch User by ID
router.get("/:userId", async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      communityName: user.communityName,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user: " + error.message });
  }
});

// Update User by ID
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully!", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user: " + error.message });
  }
});

// Delete User by ID
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user: " + error.message });
  }
});

module.exports = router;

