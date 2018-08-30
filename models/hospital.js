var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var hospitalSchema = new Schema({
        name: {
            type: String,
            required: [ true, 'El nombre es necesario'],
            img: {
                type: String,
                required: false
            }
        },
        user_fk: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
        collation: 'hospitals'
    }
);

module.exports = mongoose.model('Hospital', hospitalSchema );