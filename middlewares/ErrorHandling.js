const InternalServerError = require("../utils/errors/InternalServerError");

module.exports.errorHandling = (err, req, res, next) => {
  throw new InternalServerError("An error occurred on the server")
    ? (this.status = 500)
    : next(err);
};
