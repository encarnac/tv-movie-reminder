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
            const upcomingMovieResults = movieResults.filter(
                movie => ['Planned', 'In Production', 'Post Production'].includes(movie.status) 
            );
            res.send(upcomingMovieResults);

        } else next(error);

    } catch(error) {
        next(error);
    };
};

module.exports = getMovieDetails