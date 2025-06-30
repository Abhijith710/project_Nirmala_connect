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
      ...(req.file && { poster: req.file.filename }), // ✅ only include if file exists
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// controllers/eventController.js

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    // Log poster filenames to debug
    events.forEach(event => {
      console.log(`Poster for "${event.title}":`, event.poster);
    });

    res.status(200).json(events);
  } catch (err) {
    console.error('Get Events Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};


//delete event
const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

//Update an event

const updateEvent = async (req, res) => {
  try {
    const { title, date, time, venue, guest, description } = req.body;
    console.log(req.body);
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
      title,
      date,
      time,
      venue,
      guest,
      description,
      poster: req.file ? req.file.filename : undefined, // Update poster if file is uploaded
    }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createEvent ,
  getAllEvents, 
  deleteEvent,
  updateEvent,
};

