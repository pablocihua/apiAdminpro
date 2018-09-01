var express = require('express');

var api = express.Router();

var SearchController = require('../controllers/search');

// =============================
// Search
// =============================
api.get('/search/collection/:table/:search', SearchController.getSearchCollection );

api.get('/search/:search', SearchController.getSearch );

module.exports = api;