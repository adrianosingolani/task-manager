import Task from '../../domain/entities/Task.js';
import TaskRepository from '../../infrastructure/repositories/TaskRepository.js';
import { errors } from '../../config/messages.js';

class CreateTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository || new TaskRepository();
  }

  async execute({ title, userId }) {
    const existingTask = await this.taskRepository.findByTitleAndUser(title, userId);
    if (existingTask) {
      throw new Error(errors.TASK_TITLE_IN_USE);
    }

    const task = new Task({ title, userId });
    return await this.taskRepository.create(task);
  }
}

export default CreateTask;
