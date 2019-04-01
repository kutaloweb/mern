import Profile from '../models/profile';
import User from '../models/user';

// Validation
const validateProfileInput = require('../validation/profile');

export function getProfile(req, res) {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json({ profile });
    })
    .catch(err => res.status(404).json(err));
}

export function createProfile(req, res) {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 403 with errors object
    res.status(403)
      .json(errors);
    return;
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.headline = req.body.headline;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(() => res.json(profile));
      } else {
        // Create
        new Profile(profileFields).save().then(() => res.json(profile));
      }
    });
}

export function deleteProfile(req, res) {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.status(200).send({ message: 'Account deleted' })
    );
  });
}
