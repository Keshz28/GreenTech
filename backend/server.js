// server.js

const mongoose = require('mongoose');
const app = require('./app');  // Import the app from app.js

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
