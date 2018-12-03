//MODULOS
	var express = require('express')
	var router = express.Router();

	//ENCRYPTACION DE UN HASH
	const bcrypt = require('bcrypt');

	//UNDERSCORE
	const _ = require('underscore');
//

//Models
	const Usuario = require('../models/usuario');
//



//PETICIONES
	router.get('/usuarios', (req, res) => {

		let desde = req.query.desde || 0 ;
		desde = Number(desde);

		let limite = req.query.limite || 5 ;
		limite = Number(limite);

			let estado = req.query.estado || true;
			if (estado === 'false') {
				estado = false;
			}else if (estado === 'true') {
				estado = true;
			}else if (estado === undefined) {
				estado = null;
			}


		let nombre = req.query.nombre;

		let email = req.query.email;

		function busqueda(nombre, email, estado){
			if (nombre != undefined) {
				return {nombre};
			}else if (email) {
				return {email};
			}else if (estado || !estado) {
				return {estado};
			}else {
				return {};
			}

		}

	

		Usuario.find(busqueda(nombre, email, estado), 'nombre email role')
			.skip(desde)
			.limit(limite)
			.exec( (err,usuarios) => {

				if (err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				Usuario.count(busqueda(nombre, email, estado), (err, count) => {
					res.json({
						ok: true,
						count,
						usuarios
					})



				})

			});

	})


	router.post('/usuarios', (req, res) => {

		let body = req.body;

		let usuario = new Usuario({
			nombre: body.nombre,
			email: body.email,
			password: bcrypt.hashSync(body.password, 10) ,
			role: body.role
		})

		usuario.save( (err, usuarioDB) => {
			if (err) {
				return res.status(400).json({
					body,
					ok: false,
					err
				});
			}

			res.json({
				ok:true,
				usuario: usuarioDB
			})
		})


	})


	router.put('/usuarios/:id', (req, res) => {

		let id = req.params.id;
		let body = _.pick( req.body,['nombre', 'email', 'role', 'estado'])   ;


		Usuario.findByIdAndUpdate(id, body , {new: true, runValidators: true}, (err, usuario) => {

			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				usuario

			});
		})

	})


	router.delete('/usuarios/:id', (req, res) => {

		console.log(req);

		let id = req.params.id;

		let cambioEstado = {
			estado: false
		}

		//1er parametro(atributo por el cual es buscado), 2do parametro(atributo actualizado), 3er parametro(opciones 'ver documentacion '), 4to parametro(Callback)

		Usuario.findByIdAndUpdate( id, cambioEstado, {new: true}, (err, usuario) => {

			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				usuario
			})
		})

	})


	//DELETE fisico
	// router.delete('/usuarios/:id', (req, res) => {
	//
	// 	let id = req.params.id;
	//
	// 	Usuario.findByIdAndRemove(id, (err, usuarioDelete) => {
	//
	// 		if (err) {
	// 			return res.status(400).json({
	// 				ok: false,
	// 				err
	// 			});
	// 		}
	//
	// 		if (!usuarioDelete) {
	// 			return res.status(400).json({
	// 				ok: false,
	// 				err:{
	// 					maessage: 'Usuario no encontrados'
	// 				}
	// 			});
	// 		}
	// 		res.json({
	// 			ok: true,
	// 			usuario: usuarioDelete
	// 		})
	//
	//
	// 	})
	// })
//


module.exports = router;
