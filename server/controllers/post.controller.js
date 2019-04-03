import Post from '../models/post';
import Profile from '../models/profile';
import cuid from 'cuid';
import slug from 'slugify';
import sanitizeHtml from 'sanitize-html';

// Validation
const validatePostInput = require('../validation/post');

export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

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

  newPost.slug = slug(newPost.title.toLowerCase(), { lower: true });
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

export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (!post) {
      return res.status(404).json(err);
    }
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

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

export function likePost(req, res) {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findOne({ cuid: req.params.cuid })
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(403).json({ alreadyLiked: 'User already liked this post' });
        }
        if (post.unlikes.filter(unlike => unlike.user.toString() === req.user.id).length > 0) {
          const removeIndex = post.unlikes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          post.unlikes.splice(removeIndex, 1);
        }
        post.likes.unshift({ user: req.user.id });
        post.save().then(p => res.json(p));
      })
      .catch(err => res.status(404).json({ postNotFound: 'No post found' }));
  });
}

export function unlikePost(req, res) {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findOne({ cuid: req.params.cuid })
      .then(post => {
        if (post.unlikes.filter(unlike => unlike.user.toString() === req.user.id).length > 0) {
          return res.status(403).json({ alreadyUnliked: 'User already unliked this post' });
        }
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
        }
        post.unlikes.unshift({ user: req.user.id });
        post.save().then(p => res.json(p));
      })
      .catch(err => res.status(404).json({ postNotFound: 'No post found' }));
  });
}
