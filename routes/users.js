const routers = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");

routers.use(auth);

routers.get("/me", getCurrentUser);

routers.patch("/me", validateUserAndItemsId, updateUser);

module.exports = routers;
