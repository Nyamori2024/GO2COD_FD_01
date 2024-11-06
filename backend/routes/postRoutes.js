import express from 'express';
const router = express.Router();
import postController from '../controllers/postController.js';

// Create a new post
router.post('/posts', postController.createPost);

// Get all posts
router.get('/posts', postController.getPosts);

// Get a single post by ID
router.get('/posts/:id', postController.getPostById);

// Update a post by ID
router.put('/posts/:id', postController.updatePost);

// Delete a post by ID
router.delete('/posts/:id', postController.deletePost);

export default router;