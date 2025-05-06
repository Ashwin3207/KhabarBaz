import express from 'express';
import { fetchAndStoreArticles, getArticleById, getStoredArticles } from '../controllers/articleController.js';

const router = express.Router();

// Route to fetch articles from external API and store them in DB
router.get('/fetch-and-store', fetchAndStoreArticles);

// Route to fetch stored articles from the DB
router.get('/all', getStoredArticles);


// Route to fetch a specific article by ID
router.get('/:id', getArticleById);

export default router;
