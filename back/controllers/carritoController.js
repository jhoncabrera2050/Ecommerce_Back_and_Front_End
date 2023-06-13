var Carrito = require('../models/carrito');

const agregar_carrito_cliente = async function(req,res){
        if(req.user){
            let data = req.body;
            let res = await Carrito.create(data);
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message : ' No access'})
        }
}
module.exports = {
    agregar_carrito_cliente
}