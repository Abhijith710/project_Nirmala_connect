// controllers/loginController.js

const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');
// const Student = require('../models/Student'); // Uncommented and assuming it's defined
const Alumni = require('../models/Alumni');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Login Controller
const loginUser = async (req, res) => {
  const {
    adminId,
    facultyId,
    studentId,
    alumniId,
    password,
    role
  } = req.body;
  console.log('Incoming role:', role);
  console.log('AdminId:', adminId);
  console.log('FacultyId:', facultyId);
  console.log('password:', password);
  
  if (!password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let user;

    switch (role.toLowerCase()) {
      case 'admin':
        if (!adminId) return res.status(400).json({ message: 'Admin ID is required' });
        user = await Admin.findOne({ adminId });
        break;

      case 'faculty': // Allow both 'faculty' and 'teacher'
        if (!facultyId) return res.status(400).json({ message: 'Faculty ID is required' });
        user = await Faculty.findOne({ facultyId });
        break;

      case 'student':
        if (!studentId) return res.status(400).json({ message: 'Student ID is required' });
        user = await Student.findOne({ studentId });
        break;

      case 'alumni':
        if (!alumniId) return res.status(400).json({ message: 'Alumni ID is required' });
        user = await Alumni.findOne({ alumniId });
        break;

      default:
        return res.status(400).json({ message: 'Invalid role selected' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid user ID' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Entered Password:', password);
    console.log('Hashed Password from DB:', user.password);
    console.log('Password Match:', isMatch);  // logs true or false


    const debugHashed = await bcrypt.hash(password, 10);
    console.log('Entered password hashed (for debug only):', debugHashed);


    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user._id, role.toLowerCase());

    res.status(200).json({
      message: 'Login successful',
      token,
      role,
      user: {
        id: user._id,
        name: user.fullName || user.name || user.adminId || user.FacultyId || user.studentId || user.alumniId,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser };
