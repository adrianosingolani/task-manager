class User {
  constructor({ id, name, email, passwordHash, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  isValid() {
    return !!this.email && !!this.passwordHash;
  }
}

export default User;