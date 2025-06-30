const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { createEvent,getAllEvents,deleteEvent, updateEvent } = require('../controllers/eventController');

// POST /api/events (with poster upload)
router.post('/', upload.single('poster'), createEvent);
router.get('/viewevents', getAllEvents);
router.delete('/delete/:id', deleteEvent);
router.put('/update/:id', upload.single('poster'), updateEvent);


module.exports = router;
