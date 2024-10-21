class Task {
  constructor({ id, title, userId, completed = false, createdAt, updatedAt }) {
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.completed = completed;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  isValid() {
    return !!this.title && !!this.userId;
  }
}

export default Task;