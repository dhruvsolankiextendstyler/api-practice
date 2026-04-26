const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  if (token === 'Bearer secret-token-123') {
    next();
  } else {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// GET all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET single user
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// POST create user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// PUT update user
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// DELETE user
router.delete('/:id', authMiddleware, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;