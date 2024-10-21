import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import UserController from '../controllers/UserController.js';

const router = Router();

const userController = new UserController();

router.post('/users', (req, res, next) => userController.register(req, res, next));
router.post('/login', (req, res, next) => userController.login(req, res, next));
router.post('/logout', (req, res, next) => userController.logout(req, res, next));
router.get('/me', authMiddleware, (req, res, next) => userController.me(req, res, next));

export default router;