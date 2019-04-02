import { Router } from 'express';
import * as ProfileController from '../controllers/profile.controller';
import passport from 'passport';

const router = new Router();

// Get profile
router.route('/profile').get(passport.authenticate('jwt', { session: false }), ProfileController.getProfile);

// Create profile
router.route('/profile').post(passport.authenticate('jwt', { session: false }), ProfileController.createProfile);

// Delete profile
router.route('/profile').delete(passport.authenticate('jwt', { session: false }), ProfileController.deleteProfile);

export default router;
