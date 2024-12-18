// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const mealRoutes = require('./routes/mealRoutes');  // أو ملف الروترات الآخر حسب الحاجة
const orderRoutes = require('./routes/orderRoutes'); // إذا كان لديك Routes للطلبات
const userRoutes = require('./routes/userRoutes');  // إذا كان لديك Routes للمستخدمين

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Could not connect to MongoDB:', err.message);
    process.exit(1);
  });

// Use Routes
app.use('/api', mealRoutes); // تحميل روتات الـ Meals
app.use('/api/orders', orderRoutes); // تحميل روتات الـ Orders (إذا كان لديك)
app.use('/api/users', userRoutes); // تحميل روتات الـ Users (إذا كان لديك)

// Starting the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
