import express from 'express';
import { registerUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);

export default router;