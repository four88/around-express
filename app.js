const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cardRoutes = require('./routes/card');
const usersRoutes = require('./routes/users');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

mongoose.Promise = global.Promise;

// localhost not on my device I change it to 0.0.0.0
mongoose.connect('mongodb://0.0.0.0:27017/aroundb', {
  useNewUrlParser: true
})
  .then(() => {
    console.log("DB connected")
  },
    error => {
      console.log("cannot connect to DB:" + error)
    })


app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRoutes);
app.use('/cards', cardRoutes);

// for Non-exestent address
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`Link to server ${BASE_PATH}`);
  console.log(`Conntect to PORT ${PORT}`);
});
