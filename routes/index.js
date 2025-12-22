const router = require("express").Router();
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingitems");

router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res, next) => {
  next(new Error("Requested resource not found"));
});

module.exports = router;
