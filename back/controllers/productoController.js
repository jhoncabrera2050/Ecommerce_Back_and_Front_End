'use strict'

var Producto = require('../models/productos');
var fs = require('fs');
var path = require('path')
const registro_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            let data = req.body;
            var img_path = req.files.portada.path;
            var name = img_path.split('\\');
            var portada_name = path.basename(img_path);
            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g, '')
            data.portada = portada_name;
            let reg = await Producto.create(data);
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAcces'})
        }
    }else{
        res.status(500).send({message: 'NoAcces'})
    }
}

const listar_productos_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            var filtro = req.params['filtro'];
            let reg = await Producto.find({titulo: new RegExp(filtro, 'i')});
            res.status(200).send({data: reg});
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_portada = async function(req,res){
    var img = req.params['img'];


    fs.stat('../uploads/productos/'+img, function(err){
        if(!err){
            let path_img = '../uploads/productos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = '../uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}
// --- cliente publicos
const listar_productos_publico = async function (req, res) {
    var filtro = req.params['filtro'];
    let reg = await Producto.find({ titulo: new RegExp(filtro, 'i')}).sort({ createdAt: -1 });
    res.status(200).send({ data: reg });

}
const obtener_productos_slug_publico = async function (req, res) {
    var slug = req.params['slug'];
    let reg = await Producto.findOne({ slug:slug});
    res.status(200).send({ data: reg });

}

const agregar_imagen_galeria_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let id = req.params['id'];
            let data = req.body;

            var img_path = req.files.imagen.path;
            var name = img_path.split('\\');
            var imagen_name = name[2];
            /*res.status(200).send({data:reg});*/

            let reg = await Producto.findByIdAndUpdate({ _id: id }, {
                $push: {
                    galeria: {
                        imagen: imagen_name,
                        _id: data._id
                    }
                }
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}
const obtener_producto_admin = async function(req,res){
    if (req.user){
            if(req.user.role == 'admin'){

                var id = req.params['id'];

                try {
                    var reg = await Producto.findById({_id:id});

                    res.status(200).send({data:reg})
                } catch (error){
                    res.status(200).send({data:undefined})
                }

        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const actualizar_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            let id = req.params['id'];
            let data = req.body;

            console.log(req.files);

            if(req.files){
                var img_path = req.files.portada.path;
                var name = img_path.split('\\');
                var portada_name = name[2];

                let reg = await Producto.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    portada: portada_name 
                });

                fs.stat('./uploads/productos/'+reg.portada, function(err){
                   if(!err){
                    fs.unlink('./uploads/productos/'+reg.portada, (err)=>{
                        if(err) throw err;
                    })
                   }
                })

                res.status(200).send({data:reg});



            }else{
                let reg = await Producto.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                });
                res.status(200).send({data:reg});

            }


           
            // res.status(200).send({data:reg});
        }else{
            res.status(500).send({message: 'NoAcces'})
        }
    }else{
        res.status(500).send({message: 'NoAcces'})
    }
}

const eliminar_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            var id = req.params['id']
            let reg = await Producto.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message : ' No access'})
        }
    }else{
        res.status(500).send({message : ' No access'})
    }
}


module.exports = {
    registro_producto_admin,
    listar_productos_admin,
    obtener_portada,
    listar_productos_publico,
    obtener_productos_slug_publico,
    agregar_imagen_galeria_admin,
    obtener_producto_admin,
    actualizar_producto_admin,
    eliminar_producto_admin
}