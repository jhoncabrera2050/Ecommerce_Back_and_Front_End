var Venta = require('../models/venta');
var Dventa = require('../models/dventa');
var Producto = require('../models/producto');

var Carrito = require('../models/carrito');

var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');



const registro_compra_cliente = async function(req,res){
    if(req.user){

        var data = req.body;
        var detalles = data.detalles;
        var d_detalles = [];

        var venta_last = await Venta.find().sort({createdAt: -1});
        var serie;
        var correlativo;
        var n_venta;

        if(venta_last.length == 0){
            serie = '001';
            correlativo = '000001';

            n_venta = serie + '-'+ correlativo;
        }else{
        //     // >= 1 registro en venta
            var last_nventa = venta_last[0].nventa;
            var arr_nventa = last_nventa.split('-');

            if(arr_nventa[1] != '999999'){
                var new_correlativo = zfill(parseInt(arr_nventa[1])+1,6);
                n_venta = arr_nventa[0] + '-'+new_correlativo;
            }else if(arr_nventa[1] == '999999'){
                var new_serie = zfill(parseInt(arr_nventa[0])+1,3);
                n_venta = new_serie + '-000001';
            }
        }

        data.nventa = n_venta;
        data.estado = 'Procesando';
        
        console.log(data);

        let venta = await Venta.create(data);


        detalles.forEach( async element => {
            element.venta = venta._id;
            await Dventa.create(element);
        //     // d_detalles.push(element)

            let element_producto = await Producto.findById({_id:element.producto});
            let new_stock = element_producto.stock - element.cantidad;

            await Producto.findByIdAndUpdate({_id: element.producto},{
                stock: new_stock
            });

            // //limpiar carrito
            await Carrito.remove({cliente:data.cliente});
        });

        res.status(200).send({venta:venta});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }

}

function zfill(number, width) {
    var numberOutput = Math.abs(number); 
    var length = number.toString().length;
    var zero = "0";
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }

    }
}
