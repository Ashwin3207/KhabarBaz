import axios from 'axios';

const getRecommendations = async (req, res) => {
  const userId = req.query.userId;

  try {
    // Fetch recommendations from the Python Flask API
    const response = await axios.get(`http://localhost:5000/recommendations?userId=681a07502d4a386f5e33c24e`);
    const recommendations = response.data.recommendations;

    // Send recommendations as a response
    res.json({ recommendations });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Error fetching recommendations" });
  }
};

export default getRecommendations;
