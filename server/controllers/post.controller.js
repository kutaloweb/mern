import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

// Validation
const validatePostInput = require('../validation/post');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  const { errors, isValid } = validatePostInput(req.body.post);
  // Check Validation
  if (!isValid) {
    // If any errors, send 403 with errors object
    res.status(403).json(errors);
    return;
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.user = req.user.id;
  newPost.name = req.user.name;
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    // Check for post owner
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ notAuthorized: 'User not authorized' });
    }
    post.remove(() => {
      res.status(200).send({ message: 'Post deleted', post });
    });
  });
}
