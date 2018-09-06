var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var seed = require('../config/config').SEED;

var mdAuth = require('../middleware/authentication');

var app = express();

var User = require('../models/user');

/********************
 *   Get all users  *
********************/
app.get('/', ( req, res, next ) => {
    var from = req.query.from || 5;
    from = Number( from );

    User.find( {}, 'name email img role google')
        .skip( from )
        .limit( 5 )
        .exec(( err, items ) => {
        if( err ){
            return res.status( 500 ).json({
                ok: false,
                message: 'Error cargando usuarios!',
                errors: err
            });
        }
        User.count({}, ( err, count ) => {
            res.status( 200 ).json({
                ok: true,
                users: items,
                total: count
            });
        });
    });
});

/********************
 *   Check Token  *
********************/
/*app.use('/', ( req, res, next ) => {
    var token = req.query.token;

    jwt.verify( token, seed, ( err, decoded ) => {
        if( err ){
            return res.status( 401 ).json({
                ok: false,
                message: 'Token incorrecto!',
                errors: err
            });
        }

        next();
    });
});*/

/********************
 *   Update user  *
********************/
app.put('/:id', [ mdAuth.verifyToken, mdAuth.verifyRole ], ( req, res ) => {
    var id = req.params.id;
    var body = req.body;

    User.findById( id, ( err, user ) => {
        if( err ){
            return res.status( 500 ).json({
                ok: false,
                message: 'Error al buscar usuario!',
                errors: err
            });
        }

        if( !user ){
            return res.status( 400 ).json({
                ok: false,
                message: 'El usuario con el '+id+'no existe!',
                errors: {
                    message: 'No existe un usuario con ese ID'
                }
            });
        }

        user.name = body.name;
        user.email = body.email;
        user.role = body.role;

        user.save(( err, userSaved ) => {
            if( err ){
                return res.status( 400 ).json({
                    ok: false,
                    message: 'Error al actualizar usuario!',
                    errors: err
                });
            }

            userSaved.password = ';)';

            res.status( 200 ).json({
                ok: true,
                user: userSaved
            });
        });
    });
});
/********************
 *   Add new user  *
********************/
app.post('/', ( req, res ) => {
    var body = req.body;
    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        img: body.img,
        role: body.role
    });

    user.save(( err, userSaved ) => {
        if( err ){
            return res.status( 400 ).json({
                ok: false,
                message: 'Error al crear usuario!',
                errors: err
            });
        }

        res.status( 201 ).json({
            ok: true,
            user: userSaved,
            userToken: req.user
        });
    });

});
/********************
 *   Delete user  *
********************/
app.delete('/:id', [ mdAuth.verifyToken, mdAuth.verifyRole ], ( req, res ) => {
    var id = req.params.id;

    User.findOneAndRemove( id, ( err, userDeleted ) => {
        if( err ){
            return res.status( 500 ).json({
                ok: false,
                message: 'Error al borrar usuario!',
                errors: err
            });
        }

        if( !userDeleted ){
            return res.status( 400 ).json({
                ok: false,
                message: 'No existe un usuario con ese ID',
                errors: { message: 'No existe un usuario con ese ID'}
            });
        }

        res.status( 200 ).json({
            ok: true,
            user: userDeleted
        });
    });
});

module.exports = app;