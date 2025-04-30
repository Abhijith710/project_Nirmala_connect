// controllers/userController.js

const Faculty = require('../models/Faculty');
const Alumni = require('../models/Alumni');
const bcrypt = require('bcryptjs');

// ========== Faculty Registration ==========
const registerFaculty = async (req, res) => {
  try {
    const {
      facultyId,
      fullName,
      email,
      phoneNumber,
      role,
      department,
      subjectsTaught,
      gender,
      address,
      joiningDate,
      password,
    } = req.body;

    // Check if email or faculty ID already exists
    const emailExists = await Faculty.findOne({ email });
    const idExists = await Faculty.findOne({ facultyId });

    if (emailExists || idExists) {
      return res.status(400).json({ message: 'Faculty Email or Faculty ID already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new faculty
    const newFaculty = new Faculty({
      facultyId,
      fullName,
      email,
      phoneNumber,
      role,
      department,
      subjectsTaught,
      gender,
      address,
      joiningDate,
      password: hashedPassword,
      profilePicture: req.file ? req.file.filename : null, // if uploading file
    });

    await newFaculty.save();

    res.status(201).json({ message: 'Faculty registered successfully' });
  } catch (error) {
    console.error('Register Faculty Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ========== Alumni Registration ==========
const registerAlumni = async (req, res) => {
  try {
    const {
      alumniId,
      fullName,
      email,
      phoneNumber,
      graduationYear,
      gender,
      address,
      jobField,
      jobTitle,
      company,
      linkedinProfile,
      password,
    } = req.body;

    // Check if email or alumni ID already exists
    const emailExists = await Alumni.findOne({ email });
    const idExists = await Alumni.findOne({ alumniId });

    if (emailExists || idExists) {
      return res.status(400).json({ message: 'Alumni Email or Alumni ID already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new alumni
    const newAlumni = new Alumni({
      alumniId,
      fullName,
      email,
      phoneNumber,
      graduationYear,
      gender,
      address,
      jobField,
      jobTitle,
      company,
      linkedinProfile,
      password: hashedPassword,
      profilePicture: req.file ? req.file.filename : null,
    });

    await newAlumni.save();

    res.status(201).json({ message: 'Alumni registered successfully' });
  } catch (error) {
    console.error('Register Alumni Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// for fetching registered users
const getAllUsers = async (req, res) => {
  try {
    const facultyList = await Faculty.find({}, '-password'); // Exclude password
    const alumniList = await Alumni.find({}, '-password');   // Exclude password

    const users = [
      ...facultyList.map(user => ({ ...user._doc, roleType: 'Faculty' })),
      ...alumniList.map(user => ({ ...user._doc, roleType: 'Alumni' })),
    ];

    res.status(200).json(users);
  } catch (error) {
    console.error('Fetch All Users Error:', error);
    res.status(500).json({ message: 'Server Error while fetching users' });
  }
};

module.exports = {
  registerFaculty,
  registerAlumni,
  getAllUsers
};