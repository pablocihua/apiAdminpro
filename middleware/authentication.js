var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var seed = require('../config/config').SEED;

/********************
 *   Check Token  *
********************/
exports.verifyToken = function ( req, res, next ){
    var token = req.query.token;

    jwt.verify( token, seed, ( err, decoded ) => {
        if( err ){
            return res.status( 401 ).json({
                ok: false,
                message: 'Token incorrecto!',
                errors: err
            });
        }

        req.user = decoded.user;

        next();
        // return res.status( 200 ).json({
        //     ok: true,
        //     decoded: decoded
        // });
    });
}