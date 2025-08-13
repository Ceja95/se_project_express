const routers = require('express').Router();

routers.get('/', () => console.log('Get all clothing items'));
routers.post('/', () => console.log('Create a new clothing item'));
routers.delete('/:itemId', () => console.log('Delete a clothing item by ID'));

module.exports = routers;