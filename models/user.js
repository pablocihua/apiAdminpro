var mongoose = require('mongoose');
var uniqueValidaor = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesRight = {
    values: ['ADMIN_ROLE', 'ROLE_USER'],
    message: '{VALUE} no es un role permitido'
};

var userSchema = new Schema({
    name: {
        type: String,
        required: [
            true, 'El nombre es necesario'
        ]
    },
    email: {
        type: String,
        unique: true,
        required: [
            true, 'El correo es necesario'
        ]
    },
    password: {
        type: String, 
        required: [ 
            true, 'La contraseña es necesaria'
        ]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'ROLE_USER',
        enum: rolesRight
    },
    google: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'User'
});

userSchema.plugin( uniqueValidaor, { message: "{PATH} debe ser único"});

module.exports = mongoose.model('User', userSchema );