var Venta = require('../models/venta');
var DVenta = require('../models/dventa');
const dventa = require('../models/dventa');
var Producto = require('../models/productos');

var Carrito = require('../models/carrito');

var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');
const carrito = require('../models/carrito');

const registro_compra_cliente = async function(req,res){
    if(req.user){
        
        var data = req.body;
        var detalles = data.detalles;
        
        var venta_last = await Venta.find().sort({createdAt: -1});
        var serie;
        var correlativo;
        var n_venta;

        if(venta_last.length == 0){
            serie = '001';
            correlativo = '000001';

            n_venta = serie + '-' + correlativo;

        }else{
            // >= 1 REGISTRO EN VENTA
            var last_nventa = venta_last[0].nventa;
            var arr_nventa = last_nventa.split('-');

           if(arr_nventa[1] != '999999'){
                var new_correlativo = zfill(parseInt(arr_nventa[1])+1,6);
                n_venta = arr_nventa[0] + '-' + new_correlativo;
           }else if(arr_nventa[1] == '999999'){
                var new_serie = zfill(parseInt(arr_nventa[0])+1,3);
                n_venta = new_serie + '-000001';
           }
        }

        data.nventa = n_venta;
        data.estado = 'Completado';
        
        console.log(data);
        //REGISTRO DE LA VENTA
        
        let venta = await Venta.create(data);

        detalles.forEach(async element => {
            element.venta = venta._id;
            await dventa.create(element);

            let element_producto = await Producto.findById({_id:element.producto});
            let new_stock = element_producto.stock - element.cantidad;
            
            await Producto.findByIdAndUpdate({_id: element.producto},{
                stock: new_stock
            });

            //LIMPIAR CARRITO
            // await Carrito.remove({
            //     cliente:data.cliente
            // }); 

        });
        
        res.status(200).send({venta:venta});
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

//FUNCION ZFILL
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

const enviar_correo_compra_cliente = async function(req,res){

    var id = req.params['id'];

    var readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
        user: 'sandroingsistemas30@gmail.com',
        pass: 'gnsocnwvrqhwhxsv'
        }
    }));

    //cliente _id fecha data subtotal

    var venta = await Venta.findById({_id: id}).populate('cliente');
    var detalles = await dventa.find({venta: id}).populate('producto');

    var cliente = venta.cliente.nombres + '' +venta.cliente.apellidos;
    var _id = venta._id;
    var fecha = new Date(venta.createdAt);
    var data = detalles;
    var subtotal = venta.subtotal;
    var precio_envio = venta.envio_precio;

    readHTMLFile(process.cwd() + '/mail.html', (err, html)=>{
                        
    let rest_html = ejs.render(html, {data: data,cliente:cliente,_id:_id,fecha:fecha,subtotal:subtotal,precio_envio:precio_envio});

    var template = handlebars.compile(rest_html);
    var htmlToSend = template({op:true});

    var mailOptions = {
        from: 'sandroingsistemas30@gmail.com',
        to: venta.cliente.email,
        subject: 'Gracias por tu compra, Mi Tienda',
        html: htmlToSend
    };
    res.status(200).send({data:true});
    transporter.sendMail(mailOptions, function(error, info){
        if (!error) {
            console.log('Email sent: ' + info.response);
        }
    });
  
});

}

module.exports = {
    registro_compra_cliente,
    enviar_correo_compra_cliente
}