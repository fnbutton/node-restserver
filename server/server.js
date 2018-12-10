//Proyect Settings
require('./config/config');

//Dependencias
	//Express
	const express = require('express');
	const app = express();

	//Mongoose
	const mongoose = require('mongoose');

	//BodyParser
	const bodyParser = require('body-parser');

	//Modulos Locales


//

//PORT
	const port = process.env.PORT;
//




//Midelware
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())
//


//RUTAS
	app.use('/', require('./routes/index') )
//


//Conexion a la DB
	mongoose.connect(process.env.URL_DB, { useNewUrlParser: true }, (err, res) => {

		if (err) throw err;

		console.log('base de datos is connected');

	});
//

app.listen(port, () => {
	console.log(`Server on port: ${ port } `);
})
