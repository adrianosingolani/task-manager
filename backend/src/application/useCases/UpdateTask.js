import TaskRepository from '../../infrastructure/repositories/TaskRepository.js';
import { errors } from '../../config/messages.js';

class UpdateTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository || new TaskRepository();
  }

  async execute(id, { title, completed }) {
    const task = await this.taskRepository.findById(id);

    if (title && task) {
      const existingTask = await this.taskRepository.findByTitleAndUser(title, task.userId);
      if (existingTask && existingTask.id !== id) {
        throw new Error(errors.TASK_TITLE_IN_USE);
      }
    }

    return await this.taskRepository.update(id, { title, completed });
  }
}

export default UpdateTask;
