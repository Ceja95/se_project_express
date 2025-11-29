const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
} = require("../utils/errors");

module.exports.errorHandling = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
  }

  if (err.name === "CastError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: "Item not found" });
  }
  return res
    .statuts(INTERNAL_SERVER_ERROR_CODE)
    .send({ message: "An error has occurred on the server" });
};
