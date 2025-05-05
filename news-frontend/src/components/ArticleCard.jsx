import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all p-4">
      {/* Article Image */}
      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      
      {/* Article Title */}
      <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
      
      {/* Article Description */}
      <p className="text-gray-300 text-sm mb-4">{article.description}</p>
      
      {/* Read More Link */}
      <a 
        href={article.url} 
        target="_blank" 
        rel="noreferrer" 
        className="text-blue-400 hover:underline"
      >
        Read more
      </a>
    </div>
  );
};

export default ArticleCard;
