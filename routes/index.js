const router = require('express').Router();
const usersRouter = require('./users');
const clothingItemsRouter = require('./clothingitems');
const likesRouter = require('./likes');

router.use('/users', usersRouter);
router.use('/items', clothingItemsRouter);
router.use('/likes', likesRouter);

module.exports = router;