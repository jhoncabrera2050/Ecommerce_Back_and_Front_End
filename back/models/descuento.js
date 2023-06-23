'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DescuentoSchema = Schema({

    
    titulo: {type: String, required:true}, //porcentaje o precio fijo
    banner: {type: String, required:true},
    descuento: {type: Number, required:true},
    fecha_inicio: {type: String, required:true},
    fecha_fin: {type: String, required:true},
    createdAt:{ type:Date, default:Date.now, require:true}

});


module.exports = mongoose.model('descuento',DescuentoSchema);