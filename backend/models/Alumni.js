// models/Alumni.js

const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  alumniId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  jobField: {
    type: String, // economic, politics, IT, social work etc.
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  linkedinProfile: {
    type: String, // optional
  },
  profilePicture: {
    type: String, // Store filename or cloud link
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Alumni',
  },
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active', // Default status is active
  }
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);
