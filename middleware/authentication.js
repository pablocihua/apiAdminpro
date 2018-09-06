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
/********************
 *   Check Role  *
********************/
exports.verifyRole = function( req, res, next ){
    var user = req.user;

    var id = null;
    if( req.hasOwnProperty('params')){
        id = req.params.id || null;
    }

    if( user.role === 'ROLE_ADMIN' || user._id === id ){
        next();
        return;
    } else {
        return res.status( 401 )
            .json({
                ok: false,
                message: 'Token Wrong - Not Permissions! '+ id,
                errors: {
                    message: 'You do not have permited to do this ...'+user._id
                }
            });
    }
}