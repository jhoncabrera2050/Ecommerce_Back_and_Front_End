var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'jhoncabrera'

exports.createToken = function(user){
    var playload = {
        sub:user._id,
        nombres:user._nombres,
        apellidos:user._apellidos,
        email:user._email,
        role:user.rol,
        iat:moment().unix(),
        exp:moment().add(7, 'days').unix()
    }
    return jwt.encode(playload,secret);
}