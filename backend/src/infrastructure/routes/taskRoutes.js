import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import TaskController from '../controllers/TaskController.js';

const router = Router();

const taskController = new TaskController();

router.post('/tasks', authMiddleware, (req, res, next) => taskController.create(req, res, next));
router.delete('/tasks/:id', authMiddleware, (req, res, next) => taskController.delete(req, res, next));
router.get('/tasks', authMiddleware, (req, res, next) => taskController.getAll(req, res, next));
router.put('/tasks/:id', authMiddleware, (req, res, next) => taskController.update(req, res, next));


export default router;