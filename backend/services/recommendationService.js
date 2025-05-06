import axios from 'axios';

// Function to fetch recommendations from the Python Flask API
const getRecommendations = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/recommendations?userId=${userId}`);
    return response.data.recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

export default getRecommendations;
