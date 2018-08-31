var express = require('express');

var api = express.Router();
var mdAuthentication = require('../middleware/authentication');
var HospitalController = require('../controllers/hospital');

var Hospital =  require('../models/hospital');

api.get('/hospital', HospitalController.getHospitals );
api.post('/hospital-register', mdAuthentication.verifyToken, HospitalController.addHospital );
api.put('/hospital-update/:id', mdAuthentication.verifyToken, HospitalController.updateHospital );
api.delete('/hospital-delete/:id', mdAuthentication.verifyToken, HospitalController.deleteHospital );

module.exports = api;