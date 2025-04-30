// routes/loginRoutes.js

const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

// routes/loginRoutes.js
router.post('/', loginUser);


module.exports = router;
