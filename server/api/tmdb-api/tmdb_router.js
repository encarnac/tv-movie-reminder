const express = require('express');
const router = express.Router();

const getResultsId = require('./middleware/getResultsId');
const getTvDetails = require('./controllers/getTvDetails');
const getMovieDetails = require('./controllers/getMovieDetails');

// Middleware to fetch all the IDs of the results //
router.use(getResultsId);

// Controllers to fetch more details for each ID //
router.post('/', getTvDetails, getMovieDetails)


module.exports = router;
