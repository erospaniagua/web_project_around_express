const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards')

mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000} = process.env;
const app = express();
app.use((req, res, next) => {
  req.user = {
    _id: '689c08c8b5389417592ba409'
  };

  next();
});
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({ message: 'Datos inválidos' });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({ message: 'No encontrado' });
  }
  console.error(err);
  res.status(500).send({ message: 'Error interno del servidor' });
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use((req, res) => {
  res.status(404).json({ "message": "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
    console.log('servidor corriendo de noche');

  });
