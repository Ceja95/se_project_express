const ForbiddenError = require("../utils/errors/ForbiddenError");
const clothingItems = require("../models/clothingitem");
const NotFoundError = require("../utils/errors/NotFoundError");
const BadRequestError = require("../utils/errors/BadRequestError");

const getClothingItems = (req, res, next) => {
  clothingItems
    .find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      next(new NotFoundError("Clothing items not found"));
    });
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItems
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(", ")}`
          )
        );
      } else {
        next(err);
      }
    });
};

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItems
    .findById(itemId)
    .orFail(() => new NotFoundError("Clothing item not found"))
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw new ForbiddenError("You can only delete your own items");
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(200).send({ message: "Item deleted successfully" })
        );
    })
    .catch((err) => {
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
    .orFail(() => new NotFoundError("Clothing item not found"))
    .then((like) => res.status(201).json(like))
    .catch((err) => {
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
    .orFail(() => new NotFoundError("Clothing item not found"))
    .then((deleted) => res.status(200).json(deleted))
    .catch((err) => {
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
