'use strict'
var Admin = require('../models/admin')
const bcrypt = require('bcrypt');
var jwt = require('../helpers/jwt')

const registro_admin = async function(req,res){
    var data = req.body
    var admin_arr = [];
    admin_arr = await Admin.find({email:data.email});
    if(admin_arr.length == 0){
        // var reg = await Cliente.create(data);
        if (data.password) {
            try {
                const hash = await bcrypt.hash(data.password, 10); // Utiliza 10 salt rounds
                data.password = hash;
                var reg = await Admin.create(data);
                res.status(200).send({ data: reg });
            } catch (error) {
                console.error('Error al hashear la contraseña:', error);
                res.status(500).send({ message: 'Error al crear el admin', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No hay una contraseña', data: undefined });
        }
    }else{
        res.status(200).send({message:'el correo ya existe en la base de datos', data:undefined});
    }
}
const login_admin = async function(req, res) {
    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({ email: data.email });

    if (admin_arr.length == 0) {
      res.status(200).send({ message: 'no se encontro el correo', data: undefined });
    } else {
        let user = admin_arr[0];
        bcrypt.compare(data.password, user.password, async function(err,check){
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            
            }else{
                res.status(200).send({message : 'la contraseña no coinciden', data:undefined});
            }
        });
    }
};

module.exports = {
    registro_admin,
    login_admin
}