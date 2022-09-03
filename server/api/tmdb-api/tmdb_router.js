const express = require('express');
const router = express.Router();


const tmdbReq = require('./controllers/tmdbReqController');
const tmdbRes = require('./controllers/tmdbResController');

// Handle request for the communication pipeline with the TMDB scraper
router.get('/', tmdbReq, tmdbRes);

module.exports = router;
