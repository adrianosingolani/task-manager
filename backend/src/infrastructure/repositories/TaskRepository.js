import TaskModel from '../models/TaskModel.js';

class TaskRepository {
  async create(task) {
    return await TaskModel.create(task);
  }

  async findById(id) {
    return await TaskModel.findOne({ where: { id } });
  }

  async findAllByUser(userId) {
    return await TaskModel.findAll({ where: { userId } });
  }

  async findByTitleAndUser(title, userId) {
    return await TaskModel.findOne({ where: { title, userId } });
  }

  async update(id, updates) {
    return await TaskModel.update(updates, { where: { id } });
  }

  async delete(id) {
    return await TaskModel.destroy({ where: { id } });
  }
}

export default TaskRepository;
