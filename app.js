// Requires
var express = require('express');
var mongoose = require('mongoose');

// Init variables
var app = express();

// Conexion Db
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDb', ( err, res ) => {
    if( err ) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

// Routes
app.get('/', ( req, res, next ) => {
    res.status( 200 ).json({
        ok: true,
        message: 'Ok!'
    });
});

// Listen requests
app.listen( 3000, () => {
    console.log('Express server port 3000: \x1b[32m%s\x1b[0m', 'online');
});