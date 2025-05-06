import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Signup
export const signup = async (req, res) => {

    
  const { name, email, password } = req.body;

  try {
    // Validate input
    if(!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user exists

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, passwordHash });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
  const { articleId, timeSpent } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if article already exists in history
    const existingIndex = user.readingHistory.findIndex(
      (entry) => entry.article.toString() === articleId
    );

    if (existingIndex !== -1) {
      // Update timeSpent if article already exists
      user.readingHistory[existingIndex].timeSpent += timeSpent;
      user.readingHistory[existingIndex].timestamp = Date.now();
    } else {
      // Otherwise, push new entry
      user.readingHistory.push({
        article: articleId,
        timeSpent,
        timestamp: Date.now(),
      });
    }

    await user.save();
    res.status(200).json({ message: 'Reading history updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};