import { Router } from 'express';
import * as ProfileController from '../controllers/profile.controller';
import passport from 'passport';

const router = new Router();

// Get profile
router.route('/profile').get(passport.authenticate('jwt', { session: false }), ProfileController.getProfile);

export default router;
