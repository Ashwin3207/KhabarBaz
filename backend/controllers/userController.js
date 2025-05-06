import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, passwordHash });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token }); // ✅ Send token back
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Tracking reading history

export const updateReadingHistory = async (req, res) => {
  const userId = req.userId; // From auth middleware
  const { articleId, timestamp } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if article already exists in history
    const existingIndex = user.readingHistory.findIndex(
      (entry) => entry.article.toString() === articleId
    );

    if (existingIndex !== -1) {
      // Increment the count and update the timestamp
      user.readingHistory[existingIndex].count += 1;
      user.readingHistory[existingIndex].timestamp = timestamp;
    } else {
      // Otherwise, create a new history entry
      user.readingHistory.push({
        article: articleId,
        count: 1, // First time click
        timestamp,
      });
    }

    await user.save();
    res.status(200).json({ message: 'Reading history updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
