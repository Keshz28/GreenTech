const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // Add bcrypt for password hashing

const User = require('./models/user');  // Import User model
const Admin = require('./models/admin');  // Import Admin model

const app = express();

// Replace <db_password> with your actual MongoDB password
mongoose.connect('mongodb+srv://sukesh:PMasQ9sWWNzejBgV@greentech.1mzrd.mongodb.net/node-angular?retryWrites=true&w=majority&appName=GreenTech', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());

// User Registration Route
app.post("/api/register", (req, res, next) => {
  // Hash the password before saving
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash  // Save the hashed password
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User registered successfully!',
        userId: result._id
      });
    }).catch(error => {
      res.status(500).json({
        message: 'User registration failed!',
        error: error
      });
    });
  });
});

// User Login Route
app.post("/api/login", (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).json({ message: 'Login failed!' });
    }
    // Compare hashed password with the entered password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(401).json({ message: 'Login failed!' });
      }
      res.status(200).json({
        message: 'Login successful!',
        userId: user._id
      });
    }).catch(error => {
      res.status(500).json({
        message: 'Login failed due to a server error.',
        error: error
      });
    });
  });
});

// Admin Registration Route
app.post("/api/admin/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const admin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      communityName: req.body.communityName,
      phoneNumber: req.body.phoneNumber,
      password: hash  // Store hashed password
    });
    admin.save().then(result => {
      res.status(201).json({
        message: 'Admin registered successfully!',
        adminId: result._id
      });
    }).catch(error => {
      res.status(500).json({
        message: 'Admin registration failed!',
        error: error
      });
    });
  });
});

// Admin Login Route
app.post("/api/admin/login", (req, res, next) => {
  Admin.findOne({ email: req.body.email }).then(admin => {
    if (!admin) {
      return res.status(401).json({ message: 'Login failed!' });
    }
    // Compare the entered password with the hashed password
    bcrypt.compare(req.body.password, admin.password).then(isMatch => {
      if (!isMatch) {
        return res.status(401).json({ message: 'Login failed!' });
      }
      res.status(200).json({
        message: 'Login successful!',
        adminId: admin._id
      });
    }).catch(error => {
      res.status(500).json({
        message: 'Login failed due to a server error.',
        error: error
      });
    });
  });
});

// Export the app
module.exports = app;

post.save();
