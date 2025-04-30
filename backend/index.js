// index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Serve static files (for uploaded profile pictures)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const userRoutes = require('./routes/UserRoutes');
app.use('/api/users', userRoutes);


// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});


const loginRoutes = require('./routes/LoginRoutes');
app.use('/api/login', loginRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
