import React, { useState,useEffect} from 'react'
import { mockArticles } from '../mockArticles'
import ArticleCard from '../components/ArticleCard'

const Home = () => {

    const [articles,setArticles] = useState([]);

    useEffect(() => {
        // Simulating data fetch (replace this with API call later)
        setArticles(mockArticles);
      }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-6">
    <h1 className="text-3xl font-bold text-white mb-6">Latest Tech News</h1>
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, idx) => (
        <ArticleCard key={idx} article={article} />
      ))}
    </div>
  </div>
  )
}

export default Home
