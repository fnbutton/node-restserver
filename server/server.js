require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./routes');

//PORT
const port = process.env.PORT;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//RUTAS
app.use('/', routes);


app.listen(port, () => {
	console.log(`Server on port: ${ port } `);
})
