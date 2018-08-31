var express = require('express');

var api = express.Router();
var mdAuthentication = require('../middleware/authentication');
var DoctorController = require('../controllers/doctor');

var Doctor =  require('../models/doctor');

api.get('/doctor', DoctorController.getDoctors );
api.post('/doctor-register', mdAuthentication.verifyToken, DoctorController.addDoctor );
api.put('/doctor-update/:id', mdAuthentication.verifyToken, DoctorController.updateDoctor );
api.delete('/doctor-delete/:id', mdAuthentication.verifyToken, DoctorController.deleteDoctor );

module.exports = api;