const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();
const {
  createNewsOrAnnouncement,
  getAllNewsOrAnnouncements,
  deleteNewsOrAnnouncement,
} = require('../controllers/newsController'); // Import controller functions

// Create News or Announcement
router.post('/add', upload.single('poster'), createNewsOrAnnouncement);

// Get all News or Announcements (optional filtering by type)
router.get('/', getAllNewsOrAnnouncements);

// Delete News or Announcement
router.delete('/:id', deleteNewsOrAnnouncement);

module.exports = router;
