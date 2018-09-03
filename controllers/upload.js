'use strict'

String.prototype.ucfirst = function(){
    return this.charAt( 0 ).toUpperCase() + this.substr( 1 );
}

var fs = require('fs');

// Models
var Hospital = require('../models/hospital');
var Doctor   = require('../models/doctor');
var User     = require('../models/user');

var Upload = {
    "putUpload": function( req, res, next ){
        var type = req.params.type,
            id   = req.params.id;
        // Types right
        var typesRight = [
            'hospital', 'doctor', 'user'
        ];
        if( typesRight.indexOf( type ) < 0 ){
            res.status( 400 ).json({
                ok: false,
                message: 'Tipo de colección no válido!',
                errors: {
                    message: 'Los tipos de colección válidos son ' + typesRight.join(', ')
                }
            });
        }

        if( !req.files ){
            res.status( 400 ).json({
                ok: false,
                message: 'No seleccionó una imagen!',
                errors: {
                    message: 'Debe de seleccionar una imagen'
                }
            });
        }

        // Get file name
        var _file = req.files.imagen;
        var nameShort = _file.name.split('.');
        var ext = nameShort[ nameShort.length -1 ];
        // Extensions valid
        var extensions = ['png', 'jpg', 'gif', 'jpeg'];
        
        if( extensions.indexOf( ext ) < 0 ){
            res.status( 400 ).json({
                ok: false,
                message: 'Extensión no válida!',
                errors: {
                    message: 'Las extensiones válidas son ' + extensions.join(', ')
                }
            });
        }
        
        // Name customized.
        var nameFile = `${ id }-${ new Date().getMilliseconds() }.${ ext }`;
        // Move file
        var path = `./uploads/${ type }s/${ nameFile }`;
        _file.mv( path, err => {
            if( err ){
                res.status( 500 ).json({
                    ok: false,
                    message: 'Error al subir el archivo!',
                    errors: err
                });
            } else {
                Upload.uploadByType( type, id, nameFile, res );
            }
        });
    },

    "uploadByType": function( type, id, nameFile, res ){
        var _type = require(`../models/${ type }`);// type.ucfirst();

        _type.findById( id, ( err, item ) => {
            if( !item ){
                return res.status( 400 ).json({
                    ok: true,
                    message: `No existe el tipo ${ type }`,
                    errors: {
                        message: `No existe el ${ type }`
                    }
                });
            }

            var pathOld = `./uploads/${ type }s/` + item.img;
            // If it exists, deletes the before image.
            if( fs.existsSync( pathOld )){
                fs.unlink( pathOld );
            }

            item.img = nameFile;

            item.save(( err, itemUpdated ) => {
                if( err ){
                    return res.status( 500 ).json({
                        ok: false,
                        message: 'Error al actualizar [ ' + type + ' ]',
                        errors: err
                    }); 
                }

                if( type.toLowerCase() == 'user' ){
                    itemUpdated.password    = 'ß¬)';
                }

                return res.status( 200 ).json({
                    ok: true,
                    message: type + ' actualizado!',
                    [ type ]: itemUpdated
                });
            });
        });
    }
}

module.exports = Upload;