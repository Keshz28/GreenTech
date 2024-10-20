const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  communityName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Admin', adminSchema);
