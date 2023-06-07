const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tienda', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

module.exports = mongoose.connection;