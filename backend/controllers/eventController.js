const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { title, date, time, venue, guest, description } = req.body;

    const newEvent = new Event({
      title,
      date,
      time,
      venue,
      guest,
      description,
      poster: req.file ? req.file.filename : null, // Uses uploaded file
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createEvent };
