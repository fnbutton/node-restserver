const jwt = require('jsonwebtoken');

//=============================================================================
//  Verificacion de token
//=============================================================================

let verificacionToken = ( req, res, next ) => {

  let token = req.get('token');


  jwt.verify(token, process.env.SEED, ( err, decoded) => {

    if (err) {
      return  res.status(401).json({
        ok: false,
        err
      });
    }


    req.usuario = decoded.usuarioDB;

    next();


  })



}




//=============================================================================
// Verifica usuario Role
//=============================================================================

let verificaAdminRole = (req, res, next) => {

  let usuario = req.usuario;

  if (usuario.role === 'ADMIN_ROLE') {
    next();
  }else {

    res.json({
      ok: false,
      err:{
        message: 'Para añadir usuarios nesecita ser administrador'
      }
    });
  }




}



module.exports ={
  verificacionToken,
  verificaAdminRole
}
