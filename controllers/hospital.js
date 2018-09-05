'use strict'

// Models
var Hospital = require('../models/hospital');

function getHospitals( req, res ){
    var from = req.query.from || 0;
    from = Number( from );

    Hospital.find({})
    .skip( from )
    .limit( 5 )
    //.populate({ path: 'user_fk'})
    .populate('user_fk', 'name email')
    .exec(( err, hospitals ) => {
        if( err ){
            res.status( 500 )
            .send({
                ok: false,
                message: 'Error en la petición a hospitales!'
            });
        } else {
            if( hospitals ){
                Hospital.count({}, ( err, count ) => {
                    res.status( 200 )
                    .send({
                        ok: true,
                        hospitals: hospitals,
                        total: count
                    });
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


/*********************
* Get Hospital by Id *
*********************/
function getHospitalByID( req, res ){
    var id=  req.params.id;
    
    Hospital
    .findById( id )
    .populate('user_fk', 'name email img')
    .exec(( err, hospital ) => {
        if( err ){
            return res.status( 500 )
            .json({
                ok: false,
                message: 'Error al buscar hospital',
                errors: err
            });
        }

        if( !hospital ){
            return res.status( 400 ).json({
                ok: false,
                message: 'El hospital con el id '+ id +' no existe  ',
                errors: {
                    message: 'No existe un hospital con ese ID'
                }
            });
        }

        res.status( 200 ).json({
            ok: true,
            hospital: hospital
        });
    });
}
/********************
 *   Add new hospital  *
********************/
function addHospital( req, res ){
    var body = req.body;
    var hospital = new Hospital({
        name: body.name,
        user_fk: req.user._id
    });

    hospital.save(( err, hospitalSaved ) => {
        if( err ){
            return res.status( 400 ).json({
                ok: false,
                message: 'Error al crear hospital!',
                errors: err
            });
        }

        res.status( 201 ).json({
            ok: true,
            user: hospitalSaved
        });
    });
}
/********************
 *   Update hospital  *
********************/
function updateHospital( req, res ){
    var id = req.params.id;
    var body = req.body;

    Hospital.findById( id, ( err, hospital ) => {
        if( err ){
            return res.status( 500 ).json({
                ok: false,
                message: 'Error al buscar hospital!',
                errors: err
            });
        }

        if( !hospital ){
            return res.status( 400 ).json({
                ok: false,
                message: 'El hospital con el '+id+'no existe!',
                errors: {
                    message: 'No existe un hospital con ese ID'
                }
            });
        }

        hospital.name = body.name;
        hospital.user = req.user._id;

        hospital.save(( err, hospitalSaved ) => {
            if( err ){
                return res.status( 400 ).json({
                    ok: false,
                    message: 'Error al actualizar hospital!',
                    errors: err
                });
            }

            res.status( 200 ).json({
                ok: true,
                hospital: hospitalSaved
            });
        });
    });
}
/********************
*  Delete hospital  *
********************/
function deleteHospital( req, res ){
    var id = req.params.id;

    Hospital.findOneAndRemove( id, ( err, hospitalDeleted ) => {
        if( err ){
            return res.status( 500 ).json({
                ok: false,
                message: 'Error al borrar hospital!',
                errors: err
            });
        }

        if( !hospitalDeleted ){
            return res.status( 400 ).json({
                ok: false,
                message: 'No existe un hospital con ese ID',
                errors: { message: 'No existe un hospital con ese ID'}
            });
        }

        res.status( 200 ).json({
            ok: true,
            hospital: hospitalDeleted
        });
    });
}

module.exports = {
    getHospitals,
    getHospitalByID,
    addHospital,
    updateHospital,
    deleteHospital
};