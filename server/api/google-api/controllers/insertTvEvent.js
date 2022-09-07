const Event = require('../models/Event');

const insertTvEvent = async (req, res, next) => {
    try {
        console.log('insertTvEvent');
        const { calendarId } = req.body;
        const { content } = req.body;
        const { oauth2Client } = req;
        const { calendar } = req;
        
        const { title } = content;
        let promises = [];
        for ( const episode of content.seasonEpisodes) {
            if (new Date(episode.airDate) < new Date()) continue;
            else {
                content.release = episode.airDate;
                content.title = `${ title } (S${ content.seasonCount }x${ episode.episodeNumber })`;
                const event = JSON.stringify(new Event(content));
                console.log(event)
                const response = await calendar.events.insert({
                    auth: oauth2Client,
                    calendarId: calendarId,
                    requestBody: event
                });
                promises.push(response.data);
            }
        };

        const data = await Promise.all(promises);
        res.send(data);

    } catch(error) {
        next(error);
    }
};

module.exports = insertTvEvent