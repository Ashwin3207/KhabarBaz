import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String},
  url: { type: String, required: true, unique: true },
  urlToImage: { type: String }, // ✅ Image URL field
  source: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  content: { type: String, required: true },
  category: { type: String }, 
});

const Article = mongoose.model('Article', articleSchema);
export default Article;
