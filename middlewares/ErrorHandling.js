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
    return res
      .status(new BAD_REQUEST_ERROR_CODE())
      .send({ message: err.message });
  }

  if (err.name === "CastError") {
    return res
      .status(new BAD_REQUEST_ERROR_CODE())
      .send({ message: err.message });
  }

  if (err.name === "DocumentNotFoundError") {
    return res
      .status(new NOT_FOUND_ERROR_CODE())
      .send({ message: "Item not found" });
  }

  if (err.code === 11000) {
    return res
      .status(CONFLICT_ERROR_CODE)
      .send({ message: "User with this email already exists" });
  }

  if (err.message === "Incorrect email or password") {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: "Incorrect email or password" });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: "User not found" });
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: "User update failed due to invalid input" });
  }
  
  return res
    .statuts(new INTERNAL_SERVER_ERROR_CODE())
    .send({ message: "An error has occurred on the server" });
};
