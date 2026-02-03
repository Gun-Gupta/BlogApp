import express from 'express';
import {
  showRegister,
  register,
  showLogin,
  login,
  logout
} from '../controllers/authController.js';

const router = express.Router();

router.get('/signup', showRegister);
router.post('/signup', register);
router.get('/login', showLogin);
router.post('/login', login);
router.get('/logout', logout);

export default router;
