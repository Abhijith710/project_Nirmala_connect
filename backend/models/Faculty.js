// models/Faculty.js

const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  facultyId: {
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
  role: {
    type: String, // Teacher, Office Staff, Worker, etc.
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  subjectsTaught: {
    type: String, // Only if role is Teacher, otherwise can be empty
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  profilePicture: {
    type: String, // Store filename or cloud link
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
