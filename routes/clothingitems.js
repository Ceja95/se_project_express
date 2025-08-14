const { getClothingItems, createClothingItem, deleteClothingItem } = require('../controllers/clothingitems');
const routers = require('express').Router();

routers.get('/', getClothingItems);
routers.post('/', createClothingItem);
routers.delete('/:itemId', deleteClothingItem);

module.exports = routers;