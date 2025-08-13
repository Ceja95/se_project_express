const router = require('express').Router();
const usersRouter = require('./users');
const clothingItemsRouter = require('./clothingitems');

router.use('/users', usersRouter);
router.use('/clothingitems', clothingItemsRouter);

module.exports = router;