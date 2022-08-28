const Event = require('../models/Event');

const insertTvEvent = async (req, res, next) => {
    try {
        console.log('addTvEvent')
        const { calendarId } = req.body
        const { content } = req.body 
        const { oauth2Client } = req;
        const { calendar } = req;
        
        const { title } = content
        let promises = []
        for ( const episode of content.season_episodes) {
            if (new Date(episode.air_date) < new Date()) continue
            else {
                content.release = episode.air_date;
                content.title = `${ title } (S${ content.season_count }x${ episode.episode_number })`;
                const event = JSON.stringify(new Event(content))
                const response = await calendar.events.insert({
                    auth: oauth2Client,
                    calendarId: calendarId,
                    requestBody: event
                })
                promises.push(response.data)
            }
        }
        const data = await Promise.all(promises);
        res.send(data)
    } catch(error) {
        next(error)
    }
}

module.exports = insertTvEvent