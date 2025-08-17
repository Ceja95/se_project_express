const { getClothingItems, createClothingItem, deleteClothingItem, addLike, removeLike } = require('../controllers/clothingitems');
const router = require('express').Router();

router.get('/', getClothingItems);
router.post('/', createClothingItem);
router.delete('/:itemId', deleteClothingItem);

router.put("/:itemId/likes", addLike);
router.delete("/:itemId/likes", removeLike);

module.exports = router;