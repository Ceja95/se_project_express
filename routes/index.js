const router = require('express').Router();
const usersRouter = require('./users');
const clothingItemsRouter = require('./clothingitems');

router.use('/users', usersRouter);
router.use('/items', clothingItemsRouter);

router.use((req, res) => {
  res.status(404).send({ message: "An error has occurred on the server" });
});

module.exports = router;