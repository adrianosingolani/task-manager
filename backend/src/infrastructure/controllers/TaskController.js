import Joi from 'joi';
import TaskRepository from '../repositories/TaskRepository.js';
import CreateTask from '../../application/useCases/CreateTask.js';
import DeleteTask from '../../application/useCases/DeleteTask.js';
import GetTasks from '../../application/useCases/GetTasks.js';
import UpdateTask from '../../application/useCases/UpdateTask.js';
import { success, errors } from '../../config/messages.js';

const createSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().optional(),
});

const taskIdSchema = Joi.string().uuid().required();

const updateSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().optional(),
  completed: Joi.boolean().optional(),
});

class TaskController {
  constructor() {
    this.taskRepository = new TaskRepository();
    this.createTask = new CreateTask(this.taskRepository);
    this.deleteTask = new DeleteTask(this.taskRepository);
    this.getTasks = new GetTasks(this.taskRepository);
    this.updateTask = new UpdateTask(this.taskRepository);
  }

  async create(req, res, next) {
    try {
      const { error, value } = createSchema.validate(req.body);
      if (error) {
        return next(error);
      }

      const task = await this.createTask.execute({
        ...value,
        userId: req.user.id,
      });

      return res.status(201).json({
        id: task.id,
        title: task.title,
        description: task.description,
        message: success.TASK_CREATED,
      });
    } catch (err) {
      if (err.message === errors.TASK_TITLE_IN_USE) {
        return res.status(409).json({ message: errors.TASK_TITLE_IN_USE });
      }
      console.error('Error creating task:', err);
      return res.status(500).json({ message: errors.INTERNAL_SERVER_ERROR });
    }
  }

  async delete(req, res, next) {
    try {
      const { error } = taskIdSchema.validate(req.params.id);
      if (error) {
        return next(error);
      }

      await this.deleteTask.execute(req.params.id);
      return res.status(200).json({ message: success.TASK_DELETED });
    } catch (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ message: errors.INTERNAL_SERVER_ERROR });
    }
  }

  async getAll(req, res, next) {
    try {
      const tasks = await this.getTasks.execute(req.user.id);
      return res.status(200).json(tasks);
    } catch (err) {
      console.error('Error getting tasks:', err);
      return res.status(500).json({ message: errors.INTERNAL_SERVER_ERROR });
    }
  }

  async update(req, res, next) {
    try {
      const { error: paramError } = taskIdSchema.validate(req.params.id);
      if (paramError) {
        return next(paramError);
      }

      const { error: bodyError, value } = updateSchema.validate(req.body);
      if (bodyError) {
        return next(bodyError);
      }

      const task = await this.updateTask.execute(req.params.id, value);
      return res.status(200).json({
        id: task.id,
        title: task.title,
        message: success.TASK_UPDATED,
      });
    } catch (err) {
      if (err.message === errors.TASK_TITLE_IN_USE) {
        return res.status(409).json({ message: errors.TASK_TITLE_IN_USE });
      }
      console.error('Error updating task:', err);
      return res.status(500).json({ message: errors.INTERNAL_SERVER_ERROR });
    }
  }
}

export default TaskController;