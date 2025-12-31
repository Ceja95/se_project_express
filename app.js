require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const app = express();

const mainRouter = require("./routes/index");
const { createUser, login } = require("./controllers/users");
const { errorHandling } = require("./middlewares/ErrorHandling");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { validateUserBodyCreated } = require("./middlewares/validation");
const { validateUserBodyLogin } = require("./middlewares/validation");

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signup", validateUserBodyCreated, createUser);
app.post("/signin", validateUserBodyLogin, login);

app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
