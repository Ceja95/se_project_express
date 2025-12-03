const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const app = express();

const mainRouter = require("./routes/index");
const { createUser, login } = require("./controllers/users");
const { errorHandling } = require("./middlewares/ErrorHandling");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;
const { NOT_FOUND_ERROR_CODE } = require("./utils/errors");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.use(requestLogger);
app.post("/signup", createUser);
app.post("/signin", login);

app.use("/", mainRouter);

app.use("*", (req, res) =>
 res.status(NOT_FOUND_ERROR_CODE).send({ message: "Requested resource not found" })
);

app.use(errorLogger);
app.use(errors());
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});