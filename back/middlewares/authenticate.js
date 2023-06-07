'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'jhoncabrera';

exports.auth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'NoHeadersError'});
    }
    var token = req.headers.authorization.replace(/[""] + /g,'');
    var segment = token.split('.');
    if(segment.length !=3){
        return res.status(403).send({message:'Invalid Token'});
    }else{
        try{
            var payload = jwt.decode(token,secret);
            console.log(payload);
            if(payload.exp <= moment().unix()){
                return res.status(403).send({message:'TokenExpirado'});
            }
        }catch(error){
            return res.status(403).send({message:'InvalidToken'});
        }
    }
    req.user = payload;
    next();
}