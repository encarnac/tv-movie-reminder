const axios = require('axios');
const Movie = require('../models/Movie');


async function getMovieDetails(req, res, next) {
    try {
        if (req.category === 'movie') {
            let movieResults = [];
            for (const id of req.resultIds) {
                const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${req.apiKey}`);
                const movie = new Movie(movieInfo.data);
                movieResults.push(movie);
            }
            res.send(movieResults);

        } else next(error);

    } catch(error) {
        next(error);
    };
};

module.exports = getMovieDetails