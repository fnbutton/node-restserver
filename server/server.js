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
	const routes = require('./routes/usuario');
//

//PORT
const port = process.env.PORT;



mongoose.connect(process.env.URL_DB, { useNewUrlParser: true }, (err, res) => {

	if (err) throw err;

	console.log('base de datos is connected');

});



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//RUTAS
app.use('/', routes);


app.listen(port, () => {
	console.log(`Server on port: ${ port } `);
})
