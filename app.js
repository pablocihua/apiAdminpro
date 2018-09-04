// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

// Init variables
var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body Parser
// parse application/x-www-form-urlencoded
app.use( bodyparser.urlencoded({ extended: false }));
app.use( bodyparser.json() );

// Import routes
var searchRoutes = require('./routes/search');
var appRoutes =  require('./routes/app');
var loginRoutes =  require('./routes/login');
var userRoutes = require('./routes/user');
var hospitalRoute = require('./routes/hospital');
var doctorRoute = require('./routes/doctor');
var uploadRoutes = require('./routes/upload');
var imageRoutes = require('./routes/image');

// Conexion Db
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDb', ( err, res ) => {
    if( err ) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

// Server Index config
// var serverIndex = require('serve-index');
// app.use( express.static( __dirname + '/'));
// app.use('/uploads', serverIndex( __dirname + '/uploads'));

// Routes
app.use('/api', doctorRoute );
app.use('/api', hospitalRoute );
app.use('/user', userRoutes );
app.use('/login', loginRoutes );

app.use('/api', imageRoutes );
app.use('/api', searchRoutes );
app.use('/api', uploadRoutes );

app.use('/', appRoutes );

// Listen requests
app.listen( 3000, () => {
    console.log('Express server port 3000: \x1b[32m%s\x1b[0m', 'online');
});