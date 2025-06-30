


const mongoose = require('mongoose');

// Define the schema for News
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Title of the news/announcement
    },
    description: {
      type: String,
      required: true, // Description of the news/announcement
    },
    date: {
      type: Date,
      default: Date.now, // Date when the news/announcement was created
    },
    image: {
      type: String,
      default: 'https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Default image if no image is uploaded
    },
    type: {
      type: String,
      enum: ['news', 'announcement'], // Only two possible values: 'news' or 'announcement'
      required: true, // Ensure that type is provided
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create and export the model
module.exports = mongoose.model('News', newsSchema);

