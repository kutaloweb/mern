import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';
import serverConfig from '../config';

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

export function register(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(403).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(403).json(errors);
    }

    // Let's sanitize inputs
    const newUser = new User({
      name: sanitizeHtml(req.body.name),
      email: sanitizeHtml(req.body.email),
      avatar: 'default.jpg',
      password: sanitizeHtml(req.body.password),
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(() => res.json(user))
          .catch(() => res.send(err));
      });
    });
  });
}

export function login(req, res) {
  const {
    errors,
    isValid,
  } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(403).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email,
  })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            };

            jwt.sign(payload, serverConfig.secretOrKey, {
              expiresIn: 360000,
            }, (err, token) => {
              if (err) res.send(err);
              else {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              }
            });
          } else {
            errors.password = 'Incorrect Password';
            return res.status(403).json(errors);
          }
        });
    });
}
