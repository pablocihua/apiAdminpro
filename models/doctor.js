var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var doctorSchema = new Schema({
        name: {
            type: String,
            required: [ true, 'El nombre es necesario']
        },
        img: {
            type: String,
            required: false
        },
        user_fk: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        hospital_fk: {
            type: Schema.Types.ObjectId,
            ref: 'Hospital',
            required: [
                true,
                'El id hospital es un campo pbligatorio'
            ]
        }
    }, {
        collection: 'Doctor'
    }
);

module.exports = mongoose.model('Doctor', doctorSchema );