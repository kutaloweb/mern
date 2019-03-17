import { Router } from 'express';
const router = new Router();
import * as UserController from '../controllers/user.controller';

// Register new User
router.post('/register', UserController.register);

// Log in
router.post('/login', UserController.login);

export default router;
