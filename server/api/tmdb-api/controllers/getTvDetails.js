const axios = require('axios');
const TvSeries = require('../models/TvSeries');

const validStatus = ['Returning Series', 'In Production', 'Post Production', 'Planned']

const getSeasonEpisodes = async (id, seasonNum, apiKey) => {
    const season = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=${apiKey}`);
    const seasonEpisodes = season.data.episodes;
    episodesList = [];
    seasonEpisodes.map((ep)=> {
        const episode = {
            airDate: ep.air_date,
            episodeNumber: ep.episode_number,
            name: ep.name
        };
        episodesList.push(episode);
    })
    return episodesList;
};

async function getTvDetails(req, res, next) {
    try {
        if (req.category === 'tv') {
            let tvResults = [];
            for (const id of req.resultIds) {
                const request = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${req.apiKey}`);
                const tvInfo = request.data;
                if (validStatus.includes(tvInfo.status) && tvInfo.number_of_seasons >= 1) {
                    const series = new TvSeries(tvInfo);
                    const seasonEpisodes = await getSeasonEpisodes(id, series.seasonCount, req.apiKey);
                    series.seasonEpisodes = seasonEpisodes;
                    tvResults.push(series);
                } else continue;
            };
            res.send(tvResults);
            
        } else next();

    } catch(error) {
        next(error);
    };
};

module.exports = getTvDetails