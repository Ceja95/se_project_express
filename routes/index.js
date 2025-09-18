const router = require('express').Router();
const usersRouter = require('./users');
const clothingItemsRouter = require('./clothingitems');
const { NOT_FOUND_ERROR_CODE } = require('../utils/errors');


router.use('/users', usersRouter);
router.use('/items', clothingItemsRouter);

router.use((req, res) => {
  return res.status(NOT_FOUND_ERROR_CODE).send({ message: "Requested resource not found" });
});

module.exports = router;