import React, { useState,useEffect} from 'react'
import { mockArticles } from '../mockArticles'
import ArticleCard from '../components/ArticleCard'
import axios from 'axios';

const API_KEY = '55f3e7b72dc241de83a8627db0e88031';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const Home = () => {

    const [articles,setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () =>
        {
            try {

                const response = await axios.get(API_URL);
                console.log(response)
                setArticles(response.data.articles)
                
            } catch (error) {
                console.log("Error fetching articles: ",error);
            }
        }
        fetchArticles();
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
