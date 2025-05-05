// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const {
  registerFaculty,
  registerAlumni,
  getAllUsers,
  updateUser,     // ✅ Add updateUser handler
  deleteUser,      // Already present
  getDeletedUsers,
  activateUser
} = require('../controllers/userController');

// Faculty Registration Route with profile picture
router.post('/register/faculty', upload.single('profilePicture'), registerFaculty);

// Alumni Registration Route with profile picture
router.post('/register/alumni', upload.single('profilePicture'), registerAlumni);

// Admin: Fetch all users
router.get('/all', getAllUsers);

// Update user (faculty or alumni)
router.put('/update/:role/:id', updateUser);

// Delete user
router.delete('/delete/:role/:id', deleteUser);

//Deleted user list
router.get('/deleted',getDeletedUsers);

router.put('/activate/:role/:id', activateUser);


module.exports = router;
