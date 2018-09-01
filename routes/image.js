var express = require('express');

var api = express.Router();

var api = express();

var ImageController = require('../controllers/image');

// =============================
// Image
// =============================

api.get('/image/:type/:img', ImageController.getImage );

module.exports = api;