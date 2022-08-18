const express = require('express');
const cardRoutes = require('./routes/card');
const usersRoutes = require('./routes/users');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use('/', [cardRoutes, usersRoutes]);

// for Non-exestent address
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`Link to server ${BASE_PATH}`);
  console.log(`Conntect to PORT ${PORT}`);
});
