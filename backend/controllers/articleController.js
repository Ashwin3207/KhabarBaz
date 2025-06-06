import axios from 'axios';
import Article from '../models/Article.js';
import dotenv from 'dotenv';

dotenv.config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Function to fetch articles from the external API and store them
export const fetchAndStoreArticles = async (req, res) => {
  const { query } = req.query  // query can be a topic like 'technology', 'business', etc.
  try {
    
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: query || 'news',  // Default to 'technology' if no query is provided
        apiKey: NEWS_API_KEY,
      },
    });
    console.log(response.data);
    const articles = response.data.articles;

    const savedArticles = await Promise.all(
      articles.map(async (article) => {
        try {
          const newArticle = new Article({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage || 'https://st.depositphotos.com/1011646/1255/i/450/depositphotos_12553000-stock-photo-breaking-news-screen.jpg', // ✅ Add image support with fallback
            source: article.source.name,
            publishedAt: article.publishedAt,
            content: article.content || '',
          });

          return await newArticle.save();
        } catch (err) {
          if (err.code === 11000) {
            // Duplicate key error (article already exists by unique URL)
            return null;
          } else {
            throw err;
          }
        }
      })
    );

    res.status(200).json({
      message: 'Articles fetched and stored successfully',
      savedArticles: savedArticles.filter((a) => a !== null), // remove duplicates from response
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching and storing articles', error: error.message });
  }
};

// Function to retrieve stored articles from the database
export const getStoredArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishedAt: -1 }); // sort by newest first
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles from database', error: error.message });
  }
};

//Get article by id
export const getArticleById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const article = await Article.findById(id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    return res.status(200).json(article);
    
  } catch (error) {
    console.error('Error fetching article:', error); // Using console.error for errors is better
    return res.status(500).json({ 
      message: 'Error fetching article from database', 
      error: error.message 
    });
  }
}