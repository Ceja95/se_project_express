const { Invalid_Data_Error, Not_Found_Error, Internal_Server_Error } = require('../utils/errors');
const Likes = require('../models/like');

const addLike = (req, res) => {
  const { itemsId } = req.params;
  const userId = req.user._id;

  Likes.create({ itemId: itemsId, userId })
    .then((like) => res.status(201).send(like))
    .catch((err) => {
      console.err(err);
      if (err.name === "ValidationError") {
        return res.status(Not_Found_Error).send({ message: err.message });
      }
      return res.status(Internal_Server_Error.status).send({ message: err.message });
    });
};

const removeLike = (req, res) => {
  const { itemsId } = req.params;
  const userId = req.user._id;

  Likes.findOneAndDelete({ itemId: itemsId, userId })
    .then((deleted) => res.status(200).send(deleted))
    .catch((err) => {
      console.err(err);
      if (err.name === "CastError") {
        return res.status(Not_Found_Error).send({ message: err.message });
      }
      return res.status(Internal_Server_Error).send({ message: err.message });
    });
};

module.exports = { addLike, removeLike };