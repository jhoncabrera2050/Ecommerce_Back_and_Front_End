'use strict'
var express = require('express');
var clientecontroller = require('../controllers/clienteController');
var api = express.Router();
var auth = require('../middlewares/authenticate')

api.post('/registro_cliente', clientecontroller.registro_cliente);
api.post('/login_cliente', clientecontroller.login_cliente);
api.get('/obtener_cliente_guest/:id', auth.auth, clientecontroller.obtener_cliente_guest);
api.get('/listar_clientes_filtro_admin/:tipo/:filtro?', auth.auth,clientecontroller.listar_clientes_filtro_admin);
api.post('/registro_cliente_admin',auth.auth,clientecontroller.registro_cliente_admin);
api.get('/obtener_cliente_admin/:id', auth.auth,clientecontroller.obtener_cliente_admin);
api.put('/actualizar_cliente_admin/:id', auth.auth, clientecontroller.actualizar_cliente_admin);
api.delete('/eliminar_cliente_admin/:id',auth.auth,clientecontroller.eliminar_cliente_admin );
api.put('/actualizar_perfil_cliente_guest/:id',auth.auth,clientecontroller.actualizar_perfil_cliente_guest);


//Direcciones

api.post('/registro_direccion_cliente',auth.auth,clientecontroller.registro_direccion_cliente);
api.get('/obtener_direccion_todos_cliente/:id',auth.auth,clientecontroller.obtener_direccion_todos_cliente);
api.get('/obtener_direccion_principal_cliente/:id',auth.auth,clientecontroller.obtener_direccion_principal_cliente);
api.put('/cambiar_direccion_principal_cliente/:id/:cliente',auth.auth,clientecontroller.cambiar_direccion_principal_cliente);


module.exports = api;