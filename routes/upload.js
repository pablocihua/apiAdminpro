var express = require('express');
var fileUpload = require('express-fileupload');

var api = express.Router();

var api = express();

api.use( fileUpload( ));

var UploadController = require('../controllers/upload');

// =============================
// Upload
// =============================

api.put('/upload/:type/:id', UploadController.putUpload );

module.exports = api;