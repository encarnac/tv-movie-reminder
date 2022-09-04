const express = require('express');
const router = express.Router();
const axios = require('axios');

const getResultsId = require('./middleware/getResultsId');
const getTvDetails = require('./controllers/getTvDetails');
// const getMovieDetails = require('./controllers/getMovieDetails');

// Middleware //
router.use(getResultsId);

router.post('/', getTvDetails)
// req.resultIds = resultIds;
// req.category = category;
// req.apiKey = API_KEY;



module.exports = router;
