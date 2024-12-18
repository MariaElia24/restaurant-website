// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST a new user
router.post('/', userController.createUser);

module.exports = router;
