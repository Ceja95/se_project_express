const { getClothingItems, createClothingItem, deleteClothingItem, addLike, removeLike } = require('../controllers/clothingitems');
const routers = require('express').Router();

routers.get('/', getClothingItems);
routers.post('/', createClothingItem);
routers.delete('/:itemId', deleteClothingItem);

routers.put("/:itemsId/likes", addLike);
routers.delete("/:itemsId/likes", removeLike);

module.exports = routers;