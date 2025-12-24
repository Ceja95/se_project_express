const { UnauthorizedError } = require("../utils/errors/UnauthorizedError");
const { ConflictError } = require("../utils/errors/ConflictError");
const { BadRequestError } = require("../utils/errors/BadRequestError");
const { InternalServerError } = require("../utils/errors/InternalServerError");
const { NotFoundError } = require("../utils/errors/NotFoundError");

module.exports.errorHandling = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);
  const { email, password } = req.body;


  if (!email || !password) {
    return res
      .status(BadRequestError)
      .send({ message: "The password and email fields are required" });
  }

  if (err.name === "ValidationError") {
    return res
      .status(BadRequestError)
      .send({ message: err.message });
  }

  if (err.name === "CastError") {
    return res
      .status(BadRequestError)
      .send({ message: err.message });
  }

  if (err.name === "DocumentNotFoundError") {
    return res
      .status(NotFoundError)
      .send({ message: "Item not found" });
  }

  if (err.code === 11000) {
    return res
      .status(ConflictError)
      .send({ message: "User with this email already exists" });
  }

  if (err.message === "Incorrect email or password") {
    return res
      .status(UnauthorizedError)
      .send({ message: "Incorrect email or password" });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(NotFoundError).send({ message: "User not found" });
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res
      .status(BadRequestError)
      .send({ message: "User update failed due to invalid input" });
  }

  return res
    .status(InternalServerError)
    .send({ message: "An error has occurred on the server" });
};
