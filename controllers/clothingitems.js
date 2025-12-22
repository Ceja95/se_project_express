const {
  FORBIDDEN_ERROR_CODE,
} = require("../utils/errors");

const clothingItems = require("../models/clothingitem");

const getClothingItems = (req, res, next) => {
  clothingItems
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItems
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      next(err);
    });
};

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItems
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res
          .status(FORBIDDEN_ERROR_CODE)
          .send({ message: "You can only delete your own items" });
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(200).send({ message: "Item deleted successfully" })
        );
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const addLike = (req, res, next) => {
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((like) => res.status(201).json(like))
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const removeLike = (req, res, next) => {
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((deleted) => res.status(200).json(deleted))
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
};
