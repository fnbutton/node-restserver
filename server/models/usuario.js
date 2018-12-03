const mongoose = require('mongoose');

//MODULO PARA HACER VALIDACIONES
const uniqueValidator = require('mongoose-unique-validator');

//OBJETO DE MONGOOSE PARA HACER MODELOS
let Schema = mongoose.Schema;

//VALIDACION DE ROLES
let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol valido'
}




// MODELO DEL USUARIO
let usuarioSchema = new Schema({

  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email:{
    type: String,
    unique: true,
    required: [true, 'El correo es requerido']
  },
  password:{
    type: String,
    required: [true, 'La Contraseña es necesaria']
  },
  role:{
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado:{
    type: Boolean,
    default: true
  },
  google:{
    type: Boolean,
    default: false
  }

});

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico'})

usuarioSchema.methods.toJSON = function(){

  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;

}

module.exports = mongoose.model('Usuario', usuarioSchema);
