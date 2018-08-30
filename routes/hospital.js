var express = require('express');

var api = express.Router();
var mdAuthentication = require('../middleware/authentication');
var HospitalController = require('../controllers/hospital');

var Hospital =  require('../models/hospital');

api.get('/hospital', HospitalController.getHospitals );

module.exports = api;