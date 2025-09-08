const router = require('express').Router();
const usersRouter = require('./users');
const clothingItemsRouter = require('./clothingitems');
const { createUser, login } = require('../controllers/users');

router.use('/users', usersRouter);
router.use('/items', clothingItemsRouter);
router.post("/signup", createUser);
router.post("/signin", login);

router.use((req, res) => {
  res.status(404).send({ message: "An error has occurred on the server" });
});

module.exports = router;