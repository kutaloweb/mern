import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import passport from 'passport';

const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(passport.authenticate('jwt', { session: false }), PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(passport.authenticate('jwt', { session: false }), PostController.deletePost);

// Like post
router.route('/posts/like/:cuid').post(passport.authenticate('jwt', { session: false }), PostController.likePost);

// Unlike post
router.route('/posts/unlike/:cuid').post(passport.authenticate('jwt', { session: false }), PostController.unlikePost);

export default router;
