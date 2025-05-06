// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(API_URL);
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
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
    console.log("Liked:", article.title);
    storeInLocalStorage("likedArticles", article);
  };

  const handleBookmark = (article) => {
    console.log("Bookmarked:", article.title);
    storeInLocalStorage("bookmarkedArticles", article);
  };

  const handleClick = (article) => {
    console.log("Clicked:", article.title);
    storeInLocalStorage("clickedArticles", article);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Latest News</h1>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, idx) => (
            <ArticleCard
              key={idx}
              article={article}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onClick={handleClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
