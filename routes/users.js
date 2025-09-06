const routers = require("express").Router();
const { getUsers, getUser, createUser, login } = require("../controllers/users");

routers.post("/", createUser);
routers.post("/signin", login);
routers.post("/signup", createUser);

module.exports = routers;
