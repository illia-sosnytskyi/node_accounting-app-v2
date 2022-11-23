'use strict';

const { UserService } = require('../services/userService');
const userService = new UserService();

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(+userId);

  if (!foundUser || !userId) {
    res.sendStatus(404);

    return;
  }

  userService.remove(+userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  userService.update({
    id: +userId,
    name,
  });

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};