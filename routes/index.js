const router = require("express").Router();
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingitems");
const { NotFoundError } = require("../utils/errors/NotFoundError");

router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
