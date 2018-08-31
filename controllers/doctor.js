'use strict'

// Models
var Doctor = require('../models/doctor');

function getDoctors( req, res ){
    var from = req.query.from || 5;
    from = Number( from );

    Doctor.find({})
    .skip( from )
    .limit( 5 )
    // .populate({ path: 'user_fk', column: 'name email'})
    .populate('user_fk', 'name email')
    .populate('hospital_fk')
    .exec(( err, doctors ) => {
        if( err ){
            res.status( 500 )
            .send({
                ok: false,
                message: 'Error en la petición a doctores!'
            });
        } else {
            if( doctors ){
                Doctor.count({}, ( err, count ) => {
                    res.status( 200 )
                    .send({
                        ok: true,
                        doctors: doctors,
                        total: count
                    });
                });
            } else {
                res.status( 404 )
                .send({
                    ok: true,
                    message: 'No hay doctores'
                });
            }
        }
    });
}
/********************
 *   Add new doctor  *
********************/
function addDoctor( req, res ){
    var body = req.body;
    var doctor = new Doctor({
        name: body.name,
        user_fk: req.user._id,
        hospital_fk: body.hospital_fk
    });

    doctor.save(( err, doctorSaved ) => {
        if( err ){
            return res.status( 400 ).json({
                ok: false,
                message: 'Error al crear doctor!',
                errors: err
            });
        }

        res.status( 201 ).json({
            ok: true,
            user: doctorSaved
        });
    });
}
/********************
 *   Update doctor  *
********************/
function updateDoctor( req, res ){
    var id = req.params.id;
    var body = req.body;

    Doctor.findById( id, ( err, doctor ) => {
        if( err ){
            return res.status( 500 ).json({
                ok: false,
                message: 'Error al buscar doctor!',
                errors: err
            });
        }

        if( !doctor ){
            return res.status( 400 ).json({
                ok: false,
                message: 'El doctor con el '+id+'no existe!',
                errors: {
                    message: 'No existe un doctor con ese ID'
                }
            });
        }

        doctor.name = body.name;
        doctor.user = req.user._id;
        doctor.hospital = body.hospital_fk;

        doctor.save(( err, doctorSaved ) => {
            if( err ){
                return res.status( 400 ).json({
                    ok: false,
                    message: 'Error al actualizar doctor!',
                    errors: err
                });
            }

            res.status( 200 ).json({
                ok: true,
                doctor: doctorSaved
            });
        });
    });
}
/********************
*  Delete doctor  *
********************/
function deleteDoctor( req, res ){
    var id = req.params.id;

    Doctor.findOneAndRemove( id, ( err, doctorDeleted ) => {
        if( err ){
            return res.status( 500 ).json({
                ok: false,
                message: 'Error al borrar doctor!',
                errors: err
            });
        }

        if( !doctorDeleted ){
            return res.status( 400 ).json({
                ok: false,
                message: 'No existe un doctor con ese ID',
                errors: { message: 'No existe un doctor con ese ID'}
            });
        }

        res.status( 200 ).json({
            ok: true,
            doctor: doctorDeleted
        });
    });
}

module.exports = {
    getDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor
};