const { UnauthorizedError } = require("../utils/errors/UnauthorizedError");
const { ConflictError } = require("../utils/errors/ConflictError");
const { BadRequestError } = require("../utils/errors/BadRequestError");
const { InternalServerError } = require("../utils/errors/InternalServerError");
const { NotFoundError } = require("../utils/errors/NotFoundError");

module.exports.errorHandling = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? "An error occurred on the server"
      : message,
  });
};

module.exports.errorClassifier = (err, req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("The password and email fields are required");
  }

  if (err.name === "ValidationError") {
    throw new BadRequestError("Invalid data provided");
  }

  if (err.name === "CastError") {
    throw new BadRequestError("Invalid ID format");
  }

  if (err.name === "DocumentNotFoundError") {
    throw new NotFoundError("Requested resource not found");
  }

  if (err.code === 11000) {
    throw new ConflictError("Resource already exists");
  }

  if (err.message === "Incorrect email or password") {
    throw new UnauthorizedError("Incorrect email or password");
  }

  if (err.name === "DocumentNotFoundError") {
    throw new NotFoundError("Requested resource not found");
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    throw new BadRequestError("Invalid data provided");
  }

  throw new InternalServerError("An unexpected error occurred on the server");
};
