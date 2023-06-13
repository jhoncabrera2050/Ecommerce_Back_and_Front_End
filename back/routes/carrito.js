'use strict'
var express = require('express');
var carritoController = require('../controllers/carritoController');
var api = express.Router();
var auth = require('../middlewares/authenticate')
api.post('/agregar_carrito_cliente', auth.auth, carritoController.agregar_carrito_cliente);
module.exports = api;