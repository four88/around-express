const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cardRoutes = require('./routes/card');
const usersRoutes = require('./routes/users');
const { NOT_FOUND_ERROR_CODE } = require('./utils/constant');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();
const dbUri = 'mongodb://0.0.0.0:27017/aroundb';
const dbConfig = {
  useNewUrlParser: true,
};
mongoose.Promise = global.Promise;

// localhost not on my device I change it to 0.0.0.0
mongoose.connect(dbUri, dbConfig)
  .then(
    () => {
      console.log('DB connected');
    },
    (error) => {
      console.log(`cannot connect to DB:${error}`);
    },
  );

// for security
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// create middleware for set user._id
app.use((req, res, next) => {
  req.user = {
    _id: '630017827dc0d8751daa308c',
  };

  next();
});

// using routes
app.use('/users', usersRoutes);
app.use('/cards', cardRoutes);

// for Non-exestent address
app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`Link to server ${BASE_PATH}`);
  console.log(`Conntect to PORT ${PORT}`);
});
