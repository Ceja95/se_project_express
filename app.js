const express = require('express');
const mongoose = require('mongoose');
const app = express();

const mainRouter = require('./routes/index');
const {  PORT = 3001 } = process.env;

mongoose
.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(console.error);

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '689bd8a23c4bfc2acebc69cb'
  };
  next();
});
app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});