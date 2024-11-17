const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const userRoutes = require("./routes/users");
const reportRoutes = require("./routes/reports");
const notificationRoutes = require("./routes/notifications");
const adminRoutes = require("./routes/admins");

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb+srv://sukesh:PMasQ9sWWNzejBgV@greentech.1mzrd.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB database!"))
  .catch((error) => console.error("Error connecting to MongoDB:", error.message));

// Middleware
app.use(cors({ origin: "http://localhost:4200" })); // Update the origin to your frontend's URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

// Static folder for uploads
app.use("/uploads", express.static("uploads"));

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running smoothly!" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "MongoError") {
    return res.status(500).json({ error: "Database error occurred." });
  }

  res.status(500).json({ error: "An unexpected error occurred." });
});

module.exports = app;

