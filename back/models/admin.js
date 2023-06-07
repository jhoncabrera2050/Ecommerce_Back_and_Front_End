'use strict';
const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    telefono: { type: String, required: true },
    rol: { type: String, required: true },
    dni: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = model('admin', AdminSchema);
