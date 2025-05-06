import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

if (!baseUrl) {
  console.error("❌ VITE_API_BASE_URL is not defined. Check your .env files.");
}

const API_URL = `${baseUrl}/api/articles/all`;

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log(API_URL)
        const response = await axios.get(API_URL);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const storeInLocalStorage = (key, article) => {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const alreadyExists = existing.some((item) => item.url === article.url);
    if (!alreadyExists) {
      existing.push(article);
      localStorage.setItem(key, JSON.stringify(existing));
    }
  };

  const handleLike = (article) => {
    console.log('Liked:', article.title);
    storeInLocalStorage('likedArticles', article);
  };

  const handleBookmark = (article) => {
    console.log('Bookmarked:', article.title);
    storeInLocalStorage('bookmarkedArticles', article);
  };

  const handleClick = (article) => {
    console.log('Clicked:', article.title);
    storeInLocalStorage('clickedArticles', article);

    const timestamp = Date.now();
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn("Token is not present");
    } else {
      fetch(`${baseUrl}/api/users/update-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          articleId: article._id,
          timestamp: timestamp,
        }),
      }).catch((err) => console.error('Error updating reading history:', err));
    }

    window.open(article.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Latest News</h1>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              onLike={() => handleLike(article)}
              onBookmark={() => handleBookmark(article)}
              onClick={() => handleClick(article)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
