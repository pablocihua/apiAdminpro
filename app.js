// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

// Init variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use( bodyparser.urlencoded({ extended: false }));
app.use( bodyparser.json() );

// Import routes
var appRoutes =  require('./routes/app');
var loginRoutes =  require('./routes/login');
var userRoutes = require('./routes/user');
var hospitalRoute = require('./routes/hospital');

// Conexion Db
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDb', ( err, res ) => {
    if( err ) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

// Routes
app.use('/', hospitalRoute );
app.use('/user', userRoutes );
app.use('/login', loginRoutes );
app.use('/', appRoutes );

// Listen requests
app.listen( 3000, () => {
    console.log('Express server port 3000: \x1b[32m%s\x1b[0m', 'online');
});