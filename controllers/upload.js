'use strict'

var Upload = {
    "putUpload": function( req, res, next ){
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

        res.status( 200 ).json({
            ok: true,
            message: 'Ok!'
        });
    }
}

module.exports = Upload;