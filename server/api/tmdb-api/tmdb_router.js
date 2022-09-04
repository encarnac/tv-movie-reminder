const express = require('express');
const router = express.Router();

const getResultsId = require('./middleware/getResultsId');
const getTvDetails = require('./controllers/getTvDetails');
const getMovieDetails = require('./controllers/getMovieDetails');


// Middleware to fetch all the IDs from the search query 
router.use(getResultsId);

// Fetches more details for each ID to populate result cards 
router.post('/', getTvDetails, getMovieDetails)

module.exports = router;
