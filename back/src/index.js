const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const cliente_route = require('../routes/cliente');
const admin_route = require('../routes/admin');
const producto_route = require('../routes/producto');
const db = require('./conection');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(cors()); // Agregar el middleware de CORS

app.use('/api', cliente_route);
app.use('/api', admin_route);
app.use('/api', producto_route);

app.listen(3000, () => {
  console.log('Servidor en el puerto 3000');
});

