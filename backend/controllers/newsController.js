const News = require('../models/News'); // Import the News model

// Create News or Announcement
const createNewsOrAnnouncement = async (req, res) => {
  try {
    const { title, description, image, type } = req.body;

    // Validate the type to be either 'news' or 'announcement'
    if (!['news', 'announcement'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type. Must be "news" or "announcement"' });
    }

    const newNews = new News({
      title,
      description,
      image, // Optional: Default image will be used if not provided
      type,
    });

    await newNews.save(); // Save the new news or announcement to the database
    res.status(201).json({ message: 'News/Announcement created successfully', news: newNews });
  } catch (err) {
    console.error('Error creating news/announcement:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All News or Announcements
const getAllNewsOrAnnouncements = async (req, res) => {
  try {
    const { type } = req.query; // Get the 'type' from query parameters (optional)

    let query = {};
    if (type) {
      // If 'type' is provided, filter based on type
      query.type = type;
    }

    const news = await News.find(query).sort({ date: -1 }); // Sort by date descending
    res.status(200).json(news);
  } catch (err) {
    console.error('Error fetching news/announcements:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete News or Announcement
const deleteNewsOrAnnouncement = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News/Announcement not found' });
    }
    res.status(200).json({ message: 'News/Announcement deleted successfully' });
  } catch (err) {
    console.error('Error deleting news/announcement:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createNewsOrAnnouncement,
  getAllNewsOrAnnouncements,
  deleteNewsOrAnnouncement,
};
