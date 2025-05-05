const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { createEvent } = require('../controllers/eventController');

// POST /api/events (with poster upload)
router.post('/', upload.single('poster'), createEvent);

module.exports = router;
