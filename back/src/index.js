const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const cliente_route = require('../routes/cliente');
const admin_route = require('../routes/admin');
const producto_route = require('../routes/producto');
const config_route = require('../routes/config');
const descuento_route = require('../routes/descuento');
const venta_route = require('../routes/venta');
const db = require('./conection');
var carrito_route = require('../routes/carrito');

var server = require('http').createServer(app);
var io = require('socket.io')(server,{
  cors: {origin : '*'}
});
io.on('connection',function(socket){
  socket.on('delete-carrito',function(data){
    io.emit('new-carrito',data);
    console.log(data);
  });
  socket.on('add-carrito-add',function(data){
    io.emit('new-carrito-add',data);
    console.log(data);
  })
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(cors()); // Agregar el middleware de CORS

app.use('/api', cliente_route);
app.use('/api', admin_route);
app.use('/api', producto_route);
app.use('/api', carrito_route);
app.use('/api', config_route);
app.use('/api', descuento_route);
app.use('/api', venta_route);



server.listen(3000, () => {
  console.log('Servidor en el puerto 3000');
});

