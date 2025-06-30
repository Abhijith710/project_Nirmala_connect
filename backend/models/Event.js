
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  guest: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  poster: {
    type: String, // filename or URL of the image
    default: 'https://png.pngtree.com/png-clipart/20230802/original/pngtree-booklet-flyer-icon-vector-picture-image_7831085.png',
  },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
