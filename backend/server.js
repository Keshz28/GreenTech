const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB database connection
mongoose.connect('mongodb+srv://sukesh:PMasQ9sWWNzejBgV@greentech.1mzrd.mongodb.net/?retryWrites=true&w=majority&appName=GreenTech')
  .then(() => {
    console.log('Connected to the MongoDB database.');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

// Define a Notification model
const Notification = mongoose.model('Notification', new mongoose.Schema({
  title: String,
  message: String,
}));

// Define API routes
app.get('/api/notifications', (req, res) => {
  Notification.find({}, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/api/notifications', (req, res) => {
  const notification = new Notification(req.body);
  notification.save((err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(result);
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  // Logic to fetch user data by userId
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});