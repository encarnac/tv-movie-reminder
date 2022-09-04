const axios = require('axios');
const TvSeries = require('../models/TvSeries');


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
                const tvInfo = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${req.apiKey}`);
                const series = new TvSeries(tvInfo.data);
                if (series.season_count >= 1) {
                    const seasonEpisodes = await getSeasonEpisodes(id, series.season_count, req.apiKey);
                    series.season_episodes = seasonEpisodes;
                }
                tvResults.push(series);
            }
            res.send(tvResults);

        } else next();

    } catch(error) {
        next(error);
    };
};

module.exports = getTvDetails