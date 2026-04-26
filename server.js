//importing/bringing in Express, Mongoose and dotenv
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); //loads .env file to access URI and PORT

const app = express(); // creates app instance
app.use(express.json()); //tells server to accept JSON in request body

// Custom Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Connection Error:', err));

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));