// src/components/ArticleCard.jsx
import React from 'react';

const ArticleCard = ({ article, onLike, onBookmark, onClick }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
      <p className="text-gray-300 mb-4">{article.description || 'No description available.'}</p>
      <div className="flex gap-4">
        <button onClick={() => onLike(article)} className="text-green-400 hover:underline">👍 Like</button>
        <button onClick={() => onBookmark(article)} className="text-yellow-400 hover:underline">📌 Bookmark</button>
        <a href={article.url} target="_blank" rel="noopener noreferrer" onClick={() => onClick(article)} className="text-blue-400 hover:underline">
          🔗 Read
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
