// routes/mealRoutes.js
const express = require('express');
const router = express.Router();
const { getMeals, addMeal } = require('../back-end/controllers/mealController');

router.get('/meals', getMeals);
router.post('/meals', addMeal);

module.exports = router;
