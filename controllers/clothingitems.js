const { Invalid_Data_Error, Not_Found_Error, Internal_Server_Error } = require('../utils/errors');

const clothingItems = require('../models/clothingitem');

const getClothingItems = (req, res) => {
  clothingItems.find({})
  .then((items) => res.status(200).send(items))
  .catch((err) => {
    console.error(err);
    return res.status(Internal_Server_Error).send({ message: err.message });
  });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  clothingItems.create({ name, weather, imageUrl })
  .then((item) => res.status(201).send(item))
  .catch((err) => {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(Invalid_Data_Error).send({ message: err.message });
    }
    return res.status(Internal_Server_Error).send({ message: err.message });
  });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  clothingItems.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ message: 'Item deleted successfully', item }))
    .catch((err) => {
      console.error(err);
      if(err.name === "CastError") {
        return res.satatus(Invalid_Data_Error).send({ message: err.message });
      }
      return res.status(Internal_Server_Error).send({ message: err.message });
    });
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem };

module.exports.createClothingItem = (req, res) => {
   console.log(req.user._id);
};