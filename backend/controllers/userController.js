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

    const emailExists = await Faculty.findOne({ email });
    const idExists = await Faculty.findOne({ facultyId });

    if (emailExists || idExists) {
      return res.status(400).json({ message: 'Faculty Email or Faculty ID already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
      profilePicture: req.file ? req.file.filename : null,
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

    const emailExists = await Alumni.findOne({ email });
    const idExists = await Alumni.findOne({ alumniId });

    if (emailExists || idExists) {
      return res.status(400).json({ message: 'Alumni Email or Alumni ID already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

// ========== Get All Users ==========
const getAllUsers = async (req, res) => {
  try {
    const facultyList = await Faculty.find({status: 'active' }, '-password');
    const alumniList = await Alumni.find({status: 'active' }, '-password');

    const users = [
      ...facultyList.map(user => ({ ...user._doc, role: 'Faculty' })),
      ...alumniList.map(user => ({ ...user._doc, role: 'Alumni' })),
    ];

    res.status(200).json(users);
  } catch (error) {
    console.error('Fetch All Users Error:', error);
    res.status(500).json({ message: 'Server Error while fetching users' });
  }
};

// ========== Update User ==========
const updateUser = async (req, res) => {
  const { role, id } = req.params;
  const updatedData = req.body;

  try {
    let updatedUser;

    // Avoid updating password this way unless handled explicitly
    if (updatedData.password) {
      return res.status(400).json({ message: "Password cannot be updated via this route." });
    }

    if (role === 'Faculty') {
      updatedUser = await Faculty.findOneAndUpdate(
        { facultyId: id, status: { $ne: 'deleted' } }, // Only update active users
        { $set: updatedData },
        { new: true, runValidators: true }
      );
    } else if (role === 'Alumni') {
      updatedUser = await Alumni.findOneAndUpdate(
        { alumniId: id, status: { $ne: 'deleted' } },
        { $set: updatedData },
        { new: true, runValidators: true }
      );
    } else {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    if (!updatedUser) {
      return res.status(404).json({ message: `No active ${role} found with the given ID` });
    }

    res.status(200).json({ message: `${role} updated successfully`, user: updatedUser });
  } catch (error) {
    console.error('Update User Error:', error.message);
    res.status(500).json({ message: 'Server error during user update', error: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { role, id } = req.params;

  try {
    let updatedUser;

    if (role === 'Faculty') {
      updatedUser = await Faculty.findOneAndUpdate(
        { facultyId: id },
        { status: 'deleted' },
        { new: true }
      );
    } else if (role === 'Alumni') {
      updatedUser = await Alumni.findOneAndUpdate(
        { alumniId: id },
        { status: 'deleted' },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User status set to Deleted', user: updatedUser });
  } catch (error) {
    console.error('Soft Delete User Error:', error);
    res.status(500).json({ message: 'Server Error during user status update' });
  }
};

// ========== Get Deleted Users ==========
const getDeletedUsers = async (req, res) => {
  try {
    const facultyList = await Faculty.find({ status: 'deleted' }, '-password');
    const alumniList = await Alumni.find({ status: 'deleted' }, '-password');

    const users = [
      ...facultyList.map(user => ({ ...user._doc, role: 'Faculty' })),
      ...alumniList.map(user => ({ ...user._doc, role: 'Alumni' })),
    ];

    res.status(200).json(users);
  } catch (error) {
    console.error('Fetch Deleted Users Error:', error);
    res.status(500).json({ message: 'Server Error while fetching deleted users' });
  }
};

// ========== Activate User ==========
const activateUser = async (req, res) => {
  const { role, id } = req.params;

  try {
    let user;

    if (role === 'Faculty') {
      user = await Faculty.findOneAndUpdate(
        { facultyId: id },
        { status: 'active' },
        { new: true }
      );
    } else if (role === 'Alumni') {
      user = await Alumni.findOneAndUpdate(
        { alumniId: id },
        { status: 'active' },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User activated successfully', user });
  } catch (error) {
    console.error('Activate User Error:', error);
    res.status(500).json({ message: 'Server Error during user activation' });
  }
};


module.exports = {
  registerFaculty,
  registerAlumni,
  getAllUsers,
  updateUser,
  deleteUser,
  getDeletedUsers,
  activateUser,
};

