'use strict'

String.prototype.ucfirst = function(){
    return this.charAt( 0 ).toUpperCase() + this.substr( 1 );
}

// Models
var Hospital = require('../models/hospital');
var Doctor   = require('../models/doctor');
var User     = require('../models/user');

var Searching    = {
    getSearch: function( req, res ){
        var search = req.params.search;

        var regex = new RegExp( search, 'i' );

        Promise.all([
            Searching._searchHospitals( search, regex ),
            Searching._searchDoctors( search, regex ),
            Searching._searchUsers( search, regex )
        ])
        .then( responses => {
            res.status( 200 ).json({
                ok: true,
                hospitals: responses[ 0 ],
                doctors: responses[ 1 ],
                users: responses[ 2 ]
            });
        });

        /*searhcHospitals( search, regex )
        .then( hospitals => {
        });*/
    },

    getSearchCollection: function( req, res ){
        var search = req.params.search,
            table = req.params.table,
            regex = new RegExp( search, 'i'),
            promise,
            item = table;

        table = '_search' + table.ucfirst();

        if( Searching.hasOwnProperty( table ) ){
            promise = Searching[ table ]( search, regex );
            promise.then( data => {
                res.status( 200 ).json({
                    ok: true,
                    [ item ]: data
                });
            });
        } else {
            res.status( 400 ).json({
                ok: false,
                message: "Los tipos de busqueda sólo son: 'users', 'doctors' y 'hospitals'.",
                error: {
                    message: "Tipo de tabla/colección no válido."
                }
            });
        }
    },

    _searchHospitals: function( search, regex ){
        return new Promise(( resolve, reject ) => {
            // Hospital.find({ name: regex }, ( err, hospitals ) => {
            Hospital.find({ name: regex })
            .populate('User', 'name email img')
            .exec(( err, hospitals ) => {
                if( err ){
                    reject('Error al cargar hospitales', err );
                } else {
                    resolve( hospitals );
                }
            });
        })
    },

    _searchDoctors: function( search, regex ){
        return new Promise(( resolve, reject ) => {
            Doctor .find({ name: regex })
            .populate('User', 'name email img')
            .populate('Hospital')
            .exec(( err, doctors ) => {
                if( err ){
                    reject('Error al cargar doctores', err );
                } else {
                    resolve( doctors );
                }
            });
        })
    },

    _searchUsers: function( search, regex ){
        return new Promise(( resolve, reject ) => {
            User.find({}, 'name email img role')
            .or([{ name: regex }, { email: regex }])
            .exec(( err, users ) => {
                if( err ){
                    reject('Error al cargar usuarios', err );
                } else {
                    resolve( users );
                }
            });
        })
    }
}


module.exports = Searching;