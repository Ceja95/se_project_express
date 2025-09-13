const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE
} = require("../utils/errors");

const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.user;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "User creation failed due to invalid input" });
      }
      if (err.code === 11000) {
        return res
          .status(CONFLICT_ERROR_CODE)
          .send({ message: "User with this email already exists" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

   return UserFindByCredentials(email, password)
   .then((user) => {
    return res.status(200).send(user);
   })
    .catch((err) => {
      console.error(err);
      return res.status(UNAUTHORIZED_ERROR_CODE).send({ message: 'Incorrect email or password' });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { getUsers, getCurrentUser, createUser, login, updateUser };
