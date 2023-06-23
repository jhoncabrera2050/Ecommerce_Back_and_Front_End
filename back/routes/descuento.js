'use strict'
var express = require('express');
var api = express.Router();
var auth = require('../middlewares/authenticate');
var descuentocontroller = require('../controllers/descuentoController');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir : './uploads/descuentos'})
api.post('/registro_descuento_admin', [auth.auth,path], descuentocontroller.registro_descuento_admin);
api.get('/listar_descuentos_admin/:filtro?', auth.auth, descuentocontroller.listar_descuentos);
api.get('/obtener_banner_descuento/:img', auth.auth, descuentocontroller.obtener_banner_descuento);
api.get('/obtener_descuento_admin/:id', auth.auth, descuentocontroller.obtener_descuento_admin);
api.put('/actualizar_descuento_admin/:id',[auth.auth,path],descuentocontroller.actualizar_descuento_admin);
api.delete('/eliminar_descuento_admin/:id',auth.auth,descuentocontroller.eliminar_descuento_admin);
module.exports = api;