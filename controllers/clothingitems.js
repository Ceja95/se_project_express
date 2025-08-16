const {
  Invalid_Data_Error,
  Not_Found_Error,
  Internal_Server_Error,
} = require("../utils/errors");

const clothingItems = require("../models/clothingitem");

const getClothingItems = (req, res) => {
  clothingItems
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(Internal_Server_Error).send({ message: err.message });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItems
    .create({ name, weather, imageUrl, owner })
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

  clothingItems
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) =>
      res.status(200).send({ message: "Item deleted successfully", item })
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.satatus(Invalid_Data_Error).send({ message: err.message });
      }
      return res.status(Internal_Server_Error).send({ message: err.message });
    });
};

const addLike = (req, res) => {
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((like) => res.status(201).send(like))
    .catch((err) => {
      console.err(err);
      if (err.name === "ValidationError") {
        return res.status(Not_Found_Error).send({ message: err.message });
      }
      return res
        .status(Internal_Server_Error.status)
        .send({ message: err.message });
    });
};

const removeLike = (req, res) => {
  clothingItems
    .findOneAndDelete(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((deleted) => res.status(200).send(deleted))
    .catch((err) => {
      console.err(err);
      if (err.name === "CastError") {
        return res.status(Not_Found_Error).send({ message: err.message });
      }
      return res.status(Internal_Server_Error).send({ message: err.message });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
};
