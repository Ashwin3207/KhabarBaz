import express from 'express';
import { signup, login ,updateReadingHistory} from '../controllers/userController.js';
import {authenticateToken} from '../middleware/authenticateToken.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/update-history', authenticateToken, updateReadingHistory);
export default router;
