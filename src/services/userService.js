'use strict';

class UserService {
  constructor() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  getUserById(userId) {
    const foundUser = this.users.find(user => user.id === userId);

    return foundUser || null;
  }

  create(name) {
    const newUserId = (this.users.length > 0)
      ? Math.max(...this.users.map(user => user.id)) + 1
      : 1;

    const newUser = {
      id: newUserId,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  remove(userId) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  update({ id, name }) {
    const user = this.getUserById(id);

    Object.assign(user, { name });

    return user;
  }
}

module.exports = { UserService };