const { getUsers, getUser, createUser } = require('../controllers/users');
const routers = require('express').Router();

routers.get("/", getUsers);
routers.get("/:userId", getUser);
routers.post("/", createUser);

module.exports = routers;