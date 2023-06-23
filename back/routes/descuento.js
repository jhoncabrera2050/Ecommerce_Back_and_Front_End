'use strict'

var express = require('express');
var descuentoController = require('../controllers/descuentoController');

var api = express.Router();
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/descuentos'});

api.post('/registro_descuento_admin',[auth.auth,path],descuentoController.registro_descuento_admin);
api.get('/listar_descuentos_admin/:filtro?',auth.auth,descuentoController.listar_descuentos_admin);
api.get('/obtener_banner_descuento/:img',descuentoController.obtener_banner_descuento);
api.get('/obtener_descuento_admin/:id',auth.auth,descuentoController.obtener_descuento_admin);
api.put('/actualizar_descuento_admin/:id',[auth.auth,path],descuentoController.actualizar_descuento_admin);
api.delete('/eliminar_descuento_admin/:id',auth.auth,descuentoController.eliminar_descuento_admin);

api.get('/obtener_descuento_activo',descuentoController.obtener_descuento_activo);

module.exports = api;