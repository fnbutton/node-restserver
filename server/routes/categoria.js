const express = require('express');
const app = express();

const { verificacionToken, verificaAdminRole } = require('../midellware/autenticacion');

let Categoria = require('../models/categoria');

//==============================================================================
// Mostrar todas las categorias
//==============================================================================
app.get('/categoria', verificacionToken,(req, res) => {

  Categoria.find({})
    .sort('descripcion')
    .populate('usuario', 'nombre email' )
    .exec((err, categoriaDB) => {
      if (err){
        return res.status(500).json({
          ok: false,
          err
        })
      }

      if(categoriaDB.length === 0){
        return res.status(400).json({
          ok: false,
          err: {
            message: 'no hay nada en Categorias'
          }
        })
      }

      res.json({
        ok: true,
        Categorias: categoriaDB
      })
    })



})


//==============================================================================
// Mostrar una categoria
//==============================================================================
app.get('/categoria/:id', verificacionToken,(req, res) => {

  Categoria.findById( req.params.id ,(err, categoriaDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if(!categoriaDB){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      categoria: categoriaDB
    })

  })

})


//==============================================================================
// Guardar todas las categorias
//==============================================================================
app.post('/categoria', verificacionToken,(req, res) => {

  let body= req.body;

  let categoria = new Categoria({
    descripcion: body['descripcion'],
    usuario: req['usuario']._id
  })

  categoria.save((err, categoriaDB) => {

    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }

    if(!categoriaDB){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    return res.json({
      categoria: categoriaDB
    })


  })

})

//==============================================================================
// actualizar todas las categorias
//==============================================================================
app.put('/categoria/:id', verificacionToken,(req, res) => {

  let body = req.body;

  Categoria.findByIdAndUpdate( req.params.id, body, { new: true, runValidators: true},(err, categoriaDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if(!categoriaDB){
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Categoria no encontrada'
        }
      })
    }

    res.json({
      ok: true,
      categoria: categoriaDB
    })
  })

})

//==============================================================================
// eliminar una categorias
//==============================================================================
app.delete('/categoria/:id', [verificacionToken, verificaAdminRole],(req, res) => {

  Categoria.findByIdAndRemove(req.params.id, (err, categoriaDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if(!categoriaDB){
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Categoria no encontrada'
        }
      })
    }

    res.json({
      ok: true,
      categoria: categoriaDB
    })

  })

})


module.exports = app;
