const routers = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

routers.get("/", getUsers);
routers.get("/:userId", getUser);
routers.post("/", createUser);

module.exports = routers;
