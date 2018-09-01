'use strict'
const path = require('path');
const fs = require('fs');

var Image = {
    "getImage": function( req, res ){
        var type = req.params.type,
            img  = req.params.img;

        var pathImage = path.resolve( __dirname, `../uploads/${ type }s/${ img }` );

        if( fs.existsSync( pathImage )){
            // It sends the original image found.
        } else {
            pathImage = path.resolve( __dirname, '../assets/no-img.jpg');
        }

        res.sendFile( pathImage );
    }
};

module.exports = Image;