const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For hashing passwords

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true, maxlength: 30 },
  lastName: { type: String, trim: true, required: true, maxlength: 30 },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
  },
  password: { type: String, required: true },
  address: { type: String, trim: true, maxlength: 200 },
  communityName: { type: String, trim: true, maxlength: 100 },
  phoneNumber: { 
    type: String, 
    trim: true, 
    match: [/^[\d\s-+()]{10,15}$/, "Please enter a valid phone number"],
  },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
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
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);


