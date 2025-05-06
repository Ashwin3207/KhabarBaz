import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  preferences: {
    type: [String], // e.g. ['technology', 'sports']
    default: [],
  },
  likedArticles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    }
  ],
  bookmarkedArticles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    }
  ],
  readingHistory: [
    {
      article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      count: {  // The number of times an article has been clicked
        type: Number,
        default: 1,
      },
    }
  ],
  behaviorVector: {
    type: [Number], // vector embedding for content-based filtering (e.g., from BERT)
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("User", userSchema);
