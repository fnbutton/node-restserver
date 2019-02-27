const Router = require('express');
const router = Router();
const { verificacionToken } = require('../midellware/autenticacion');
const Producto = require('../models/producto')

//==============================================================================
// Obtener Todos los Productos
//==============================================================================
router.get('/producto', verificacionToken,(req, res) => {

  let desde = req.query.desde || 0;

  Producto.find({ disponible: true })
    .skip(desde)
    .limit(5)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productos) => {


      if(err){
        return res.status(500).json({
          ok: false,
          err
        })
      }

      if (productos.length === 0) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No hay ningun producto'
          }
        })
      }

      return res.json({
        ok: true,
        productos
      })

    })
} )

//==============================================================================
// Obtener un Producto
//==============================================================================
router.get('/producto/:id', verificacionToken,(req, res) => {

  Producto.findById( req.params.id)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productoDB) => {
      if(err){
        return res.status(500).json({
          ok: false,
          err
        })
      }

      if (!productoDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No hay ningun producto'
          }
        })
      }

      return res.json({
        ok: true,
        productoDB
      })
    })
} )

//==============================================================================
// Obtener un Producto
//==============================================================================
router.get('/producto/buscar/:termino', verificacionToken,(req, res) => {

  let termino = req.params.termino;

  let regex = new RegExp(termino, 'i')

  Producto.find( { nombre: regex } )
    .sort('nombre')
    .populate('categoria', 'descripcion')
    .exec((err, productoDB) => {
      if(err){
        return res.status(500).json({
          ok: false,
          err
        })
      }

      if (productoDB.length === 0) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No hay ningun producto'
          }
        })
      }

      return res.json({
        ok: true,
        productoDB
      })
    })
} )

//==============================================================================
// Guardar Un Producto
//==============================================================================
router.post('/producto', verificacionToken,(req, res) => {

  let body = req.body;

  let producto = new Producto({
    nombre: body['nombre'],
    precioUni: body['precioUni'],
    descripcion: body['descripcion'],
    disponible: body['disponible'],
    categoria: body['categoria'],
    usuario: req.usuario._id
  })

  producto.save((err, productoDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    res.status(201).json({
      ok: true,
      producto: productoDB
    })

  })

})

//==============================================================================
// Actializar un producto
//==============================================================================
router.put('/producto/:id', verificacionToken,(req, res) => {

  Producto.findByIdAndUpdate(req.params.id, req.body ,{ new: true, runValidators: true },(err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Producto no encontrado'
        }
      })
    }


    res.json({
      ok: true,
      producto: productoDB
    })
  })

})
//==============================================================================
// borrar un producto
//==============================================================================
router.delete('/producto/:id', verificacionToken,(req, res) => {

  let disponible = {
    disponible: false
  }

  Producto.findByIdAndUpdate(req.params.id, disponible, { new: true, runValidators: true }, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Producto no encontrado'
        }
      })
    }

    res.json({
      ok: true,
      producto: productoDB
    })
  })

})


module.exports = router;
