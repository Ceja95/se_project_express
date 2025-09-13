const routers = require("express").Router();
const auth = require("../middlewares/auth");
const { getUsers, getCurrentUser, createUser, login, updateUser } = require("../controllers/users");


routers.use(auth);

routers.patch("/me", updateUser);

module.exports = routers;
