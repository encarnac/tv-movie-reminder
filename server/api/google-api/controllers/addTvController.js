const axios = require('axios');
const Event = require('../models/Event');


const addTvEvent = async (req, res, next) => {
    try {
        console.log('addTvEvent')
        const { token } = req.body
        const { calendarId } = req.body
        const { content } = req.body 
        const { title } = content
        
        let promises = []
        for ( const episode of content.season_episodes) {
            if (new Date(episode.air_date) < new Date()) continue
            else {
                content.release = episode.air_date;
                content.title = `${ title } (S${ content.season_count }x${ episode.episode_number })`;
                const event = JSON.stringify(new Event(content))
                const addRes = await axios({
                    method: 'POST',
                    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
                    headers: { Authorization: `Bearer ${ token }` },
                    data: event
                })
                promises.push(addRes.data)
            }
        }
        const data = await Promise.all(promises);
        res.send(data)
    } catch(error) {
        next(error)
    }
}

module.exports = addTvEvent