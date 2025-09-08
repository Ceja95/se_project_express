const routers = require("express").Router();
const { getUsers, getCurrentUser, createUser, login, updateUser } = require("../controllers/users");


routers.patch("/users/me", updateUser);

module.exports = routers;
