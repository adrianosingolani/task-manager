import TaskRepository from '../../infrastructure/repositories/TaskRepository.js';

class GetTasks {
  constructor(taskRepository) {
    this.taskRepository = taskRepository || new TaskRepository();
  }

  async execute(userId) {
    return await this.taskRepository.findAllByUser(userId);
  }
}

export default GetTasks;
