import TaskRepository from '../../infrastructure/repositories/TaskRepository.js';

class DeleteTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository || new TaskRepository();
  }

  async execute(id) {
    return await this.taskRepository.delete(id);
  }
}

export default DeleteTask;
