const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true // Converts email to lowercase automatically
    //we can add regex validation for email format
  },
  phoneNumber: { 
    type: String, 
    required: true // No regex validation
    //we can add regex validation for phone number format
  },
  address: { type: String, required: true },
  communityName: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Pre-save middleware to hash the password before saving
adminSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords for login
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
