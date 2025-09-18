const routers = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, createUser, login, updateUser } = require("../controllers/users");

routers.use(auth);

routers.get("/me", getCurrentUser);

routers.patch("/me", updateUser);

module.exports = routers;
