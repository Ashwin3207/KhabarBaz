import express from 'express';
import getRecommendations from '../controllers/recommendationController.js';

const router = express.Router();

// Define route for fetching recommendations
router.get('/recommendations', getRecommendations);

export default router;
