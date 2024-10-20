const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql'); // Ensure you've installed mysql
const bcrypt = require('bcrypt'); // Ensure bcrypt is installed

const app = express();
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Add your MySQL password if you have one
  database: 'user_profiles_db',  // Your MySQL database
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// User Registration Route
app.post("/api/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const { username, email } = req.body;
    const password = hash;

    const query = "INSERT INTO users (username, email, password, profile_type) VALUES (?, ?, ?, 'user')";
    
    db.query(query, [username, email, password], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'User registration failed!', error: err });
      }
      res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
    });
  });
});

// User Login Route
app.post("/api/login", (req, res, next) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  
  db.query(query, [email], (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).json({ message: 'Login failed!' });
    }

    const user = result[0];
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(401).json({ message: 'Login failed!' });
      }
      res.status(200).json({ message: 'Login successful!', userId: user.id });
    }).catch(error => {
      res.status(500).json({ message: 'Login failed due to a server error.', error: error });
    });
  });
});

// Admin Registration Route
app.post("/api/admin/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const { firstName, lastName, email, address, communityName, phoneNumber } = req.body;
    const password = hash;

    const query = "INSERT INTO users (username, email, password, profile_type, community_name, community_address, phone_number) VALUES (?, ?, ?, 'admin', ?, ?, ?)";
    
    db.query(query, [firstName + ' ' + lastName, email, password, communityName, address, phoneNumber], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Admin registration failed!', error: err });
      }
      res.status(201).json({ message: 'Admin registered successfully!', adminId: result.insertId });
    });
  });
});

// Admin Login Route
app.post("/api/admin/login", (req, res, next) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND profile_type = 'admin'";
  
  db.query(query, [email], (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).json({ message: 'Login failed!' });
    }

    const admin = result[0];
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (!isMatch) {
        return res.status(401).json({ message: 'Login failed!' });
      }
      res.status(200).json({ message: 'Login successful!', adminId: admin.id });
    }).catch(error => {
      res.status(500).json({ message: 'Login failed due to a server error.', error: error });
    });
  });
});

module.exports = app;

