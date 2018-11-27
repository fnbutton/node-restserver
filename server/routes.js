var express = require('express')
var router = express.Router();

router.get('/usuarios', (req, res) => {
	res.json('get usuarios');
})

router.post('/usuarios', (req, res) => {

	let persona = req.body;

	if (persona.nombre === undefined) {
		res.status(400).json({
			ok: false,
			mensaje: 'Erooor'
		})
	}

	res.json({
		persona
	});
})

router.put('/usuarios/:id', (req, res) => {

	let id = req.params.id;

	res.json({
		id
	});
})


router.delete('/usuarios', (req, res) => {
	res.json('delete usuarios');
})


router.post('/usuarios', (req, res) => {
	res.json('post usuarios');
})


module.exports = router;
