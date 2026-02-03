import express from 'express';
import {
  gethome,
  getblogs,
  getposts,
  createBlog,
  showCreateBlog,
  editBlog,
  updateBlog,
  deleteBlog
} from '../Controllers/blog.js';

import authMiddleware from '../middleware/validateToken.js';

const router = express.Router();

router.get('/', gethome);

router.get('/blog', authMiddleware, getblogs);
router.get('/blog/posts', authMiddleware, getposts);

router.get('/blog/create', authMiddleware, showCreateBlog);
router.post('/blog/create', authMiddleware, createBlog); 

router.get('/blog/edit/:id', authMiddleware, editBlog);
router.post('/blog/update/:id', authMiddleware, updateBlog);
router.post('/blog/delete/:id', authMiddleware, deleteBlog);

export default router;
