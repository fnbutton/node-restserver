const { Schema, model } = require('mongoose');


let categoriaSchema = new Schema({

  descripcion:{
    type: String,
    required: [true, 'La descripcion es necesaria']
  },

  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }


})

module.exports = model('Categoria', categoriaSchema);
