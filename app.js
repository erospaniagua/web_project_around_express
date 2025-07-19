const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards')

const { PORT = 3000} = process.env;
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use((req, res) => {
  res.status(404).json({ "message": "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
    console.log('servidor corriendo de noche');

  });
