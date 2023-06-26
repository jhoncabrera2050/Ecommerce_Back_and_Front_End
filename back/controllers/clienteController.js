'use strict';

var Cliente = require('../models/cliente');
var Direccion = require('../models/direccion');
const bcrypt = require('bcrypt');
var jwt = require('../helpers/jwt')


const registro_cliente = async function(req,res){
    var data = req.body
    var clientes_arr = [];
    clientes_arr = await Cliente.find({email:data.email});
    if(clientes_arr.length == 0){
        // var reg = await Cliente.create(data);
        if (data.password) {
            try {
                const hash = await bcrypt.hash(data.password, 10); // Utiliza 10 salt rounds
                data.password = hash;
                var reg = await Cliente.create(data);
                res.status(200).send({ data: reg });
            } catch (error) {
                console.error('Error al hashear la contraseña:', error);
                res.status(500).send({ message: 'Error al crear el cliente', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'No hay una contraseña', data: undefined });
        }
    }else{
        res.status(200).send({message:'el correo ya existe en la base de datos', data:undefined});
    }
}

const login_cliente = async function(req, res) {
    var data = req.body;
    var cliente_arr = [];

    cliente_arr = await Cliente.find({ email: data.email });

    if (cliente_arr.length == 0) {
      res.status(200).send({ message: 'no se encontro el correo', data: undefined });
    } else {
        let user = cliente_arr[0];
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
}

const listar_clientes_filtro_admin = async function(req,res){
    console.log(req.user);
    if(req.user){
        if(req.user.role == 'admin'){
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];
            console.log(tipo);
            if(tipo == null || tipo == 'null'){
                let reg = await Cliente.find();
                res.status(200).send({data:reg});
            }else{
                if(tipo == 'apellidos'){
                    let reg = await Cliente.find({apellidos:new RegExp(filtro, 'i')});
                    res.status(200).send({data:reg});
                }else if(tipo == 'correo'){
                    let reg = await Cliente.find({email:new RegExp(filtro, 'i')});
                    res.status(200).send({data:reg});
                }
            }
        }else{
            res.status(500).send({message : ' No access'})
        }
    }else{
        res.status(500).send({message : ' No access'})
    }
}

const obtener_cliente_guest = async function(req, res){
    if(req.user){
        var id = req.params['id'];
        try{
            var reg = await Cliente.findById({_id:id});
            res.status(200).send({data:reg});
        }catch(error){
            res.status(200).send({data:undefined}); 
        }
    }else{
        res.status(500).send({message:'NoAccess'});
    }
}

const registro_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            var data = req.body;
            const saltRounds = 10;
            bcrypt.hash('123456789', saltRounds, async function(err, hash) {
                if (hash) {
                  data.password = hash;
                  let reg = await Cliente.create(data);
                  res.status(200).send({ data: reg });
                } else {
                  res.status(200).send({ message: 'hubo un error en el servidor', data: undefined });
                }
              });
        }
    }
}

const obtener_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            var id = req.params['id'];
            try {
                var reg = await Cliente.findById({_id:id});
                res.status(200).send({data:reg});        
            } catch (error) {
                res.status(200).send({data:undefined});   
            }
        }else{
            res.status(500).send({message : ' No access'})
        }
    }else{
        res.status(500).send({message : ' No access'})
    }
}

const actualizar_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            var id = req.params['id'];
            var data = req.body;
            var reg = await Cliente.findByIdAndUpdate({_id:id},{
                nombres : data.nombres,
                apellidos : data.apellidos,
                email : data.email,
                telefono: data.telefono,
                f_nacimiento:data.f_nacimiento,
                dni: data.dni,
                genero:data.genero
            })
            res.status(200).send({data:reg})
        }else{
            res.status(500).send({message : ' No access'})
        }
    }else{
        res.status(500).send({message : ' No access'})
    }
}

const eliminar_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            var id = req.params['id']
            let reg = await Cliente.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message : ' No access'})
        }
    }else{
        res.status(500).send({message : ' No access'})
    }
}

const actualizar_perfil_cliente_guest = async function(req, res){
    if(req.user){
        var id = req.params['id'];
        var data = req.body;
        console.log(data.password);
        if(data.password){
            console.log('con contraseña')
            bcrypt.hash(data.password, 10, async function(err, hash) {
                if (err) {
                    console.error('Error al hashear la contraseña:', err);
                    res.status(500).send({ message: 'Error al crear el cliente', data: undefined });
                } else {
                    var reg = await Cliente.findByIdAndUpdate({_id:id},{
                        nombres: data.nombres,
                        apellidos: data.apellidos,
                        telefono:data.telefono,
                        f_nacimiento:data.f_nacimiento,
                        dni:data.dni,
                        genero:data.genero,
                        pais:data.pais,
                        password:hash,
                    });
                    res.status(200).send({data:reg});
                }
            });
        }else{
            console.log('sin contraseña')
            var reg = await Cliente.findByIdAndUpdate({_id:id},{
                nombres: data.nombres,
                apellidos: data.apellidos,
                telefono:data.telefono,
                f_nacimiento:data.f_nacimiento,
                dni:data.dni,
                genero:data.genero,
                pais:data.pais,
            });
            res.status(200).send({data:reg})
        }
    }else{
        res.status(500).send({message:'NoAccess'});
    }
}

//Direcciones
const registro_direccion_cliente  = async function(req,res){
    if(req.user){
        var data = req.body;
        if(data.principal){
            let direcciones = await Direccion.find({cliente:data.cliente});
            direcciones.forEach(async element => {
                await Direccion.findByIdAndUpdate({_id:element._id},{principal:false});
            });
        }
        let reg = await Direccion.create(data);
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}


const obtener_direccion_todos_cliente  = async function(req,res){
    if(req.user){
        var id = req.params['id'];

        let direcciones = await Direccion.find({cliente:id}).populate('cliente').sort({createdAt:-1});
        res.status(200).send({data:direcciones});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

// direcciones
const cambiar_direccion_principal_cliente  = async function(req,res){
    if(req.user){
        var id = req.params['id'];
        var cliente = req.params['cliente'];

        let direcciones = await Direccion.find({cliente:cliente});

        direcciones.forEach(async element => {
            await Direccion.findByIdAndUpdate({_id:element._id},{principal:false});
        });

        await Direccion.findByIdAndUpdate({_id:id},{principal:true});
 
        res.status(200).send({data:true});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}
module.exports = {
    registro_cliente,
    login_cliente,
    obtener_cliente_guest,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    eliminar_cliente_admin,
    actualizar_perfil_cliente_guest,
    registro_direccion_cliente,
    obtener_direccion_todos_cliente,
    cambiar_direccion_principal_cliente
}