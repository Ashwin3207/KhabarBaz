import express from 'express';
import { fetchAndStoreArticles, getStoredArticles } from '../controllers/articleController.js';

const router = express.Router();

// Route to fetch articles from external API and store them in DB
router.get('/fetch-and-store', fetchAndStoreArticles);

// Route to fetch stored articles from the DB
router.get('/all', getStoredArticles);

export default router;
