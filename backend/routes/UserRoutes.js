// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const {
    registerFaculty,
    registerAlumni,
    getAllUsers
  } = require('../controllers/userController');
  

// Faculty Registration Route with profile picture
router.post('/register/faculty', upload.single('profilePicture'), registerFaculty);

// Alumni Registration Route with profile picture
router.post('/register/alumni', upload.single('profilePicture'), registerAlumni);

// Admin: Fetch all users
router.get('/all', getAllUsers);


module.exports = router;
