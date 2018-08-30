'use strict'

// Models
var Hospital = require('../models/hospital');

function getHospitals( req, res ){
    Hospital.find({})
    .populate({ path: 'user_fk'})
    .exec(( err, hospitals ) => {
        if( err ){
            res.status( 500 )
            .send({
                ok: false,
                message: 'Error en la petición a hospitales!'
            });
        } else {
            if( hospitals ){
                res.status( 200 )
                .send({
                    hospitals
                });
            } else {
                res.status( 404 )
                .send({
                    ok: true,
                    message: 'No hay hospitales'
                });
            }
        }
    });
}

module.exports = {
    getHospitals
};