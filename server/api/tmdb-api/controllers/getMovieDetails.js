const axios = require('axios');
const Movie = require('../models/Movie');

const validStatus = ['Planned', 'In Production', 'Post Production']

async function getMovieDetails(req, res, next) {
    try {
        if (req.category === 'movie') {
            let movieResults = [];
            for (const id of req.resultIds) {
                const request = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${req.apiKey}`);
                const movieInfo = request.data;
                if (validStatus.includes(movieInfo.status)) {
                    const movie = new Movie(movieInfo);
                    movieResults.push(movie);
                } else continue;        
            };
            res.send(movieResults);

        } else next(error);

    } catch(error) {
        next(error);
    };
};

module.exports = getMovieDetails