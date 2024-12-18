// controllers/mealController.js
const Meal = require('../models/meal');

const getMeals = async (req, res) => {
  const searchQuery = req.query.query || '';
  try {
    let meals;
    if (searchQuery) {
      meals = await Meal.find({
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } }
        ]
      });
    } else {
      meals = await Meal.find();
    }
    res.json({ status: 'success', data: meals });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

const addMeal = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    const newMeal = new Meal({ name, description, price, imageUrl });
    await newMeal.save();
    res.status(201).json({ status: 'success', data: newMeal });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

module.exports = { getMeals, addMeal };
