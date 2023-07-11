'use strict';
const { Schema, model } = require('mongoose');

const ContactoSchema = new Schema({
    cliente: { type: String, required: true },
    mensaje: { type: String, required: true },
    asunto: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
    estado: { type: String, required: true },
    createdAt : {type:Date, default:Date.now,require:true}
}, {
    timestamps: true
});

module.exports = model('contacto', ContactoSchema);
