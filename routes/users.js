const routers = require("express").Router();
const { getUsers, getCurrentUser, createUser, login, updateUser } = require("../controllers/users");

routers.post("/signin", login);
routers.post("/signup", createUser);
routers.patch("/users/me", updateUser);

module.exports = routers;
