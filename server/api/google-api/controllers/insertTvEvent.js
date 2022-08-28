const Event = require('../models/Event');
const { google } = require('googleapis');
const calendar = google.calendar('v3');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:3000'
);

const insertTvEvent = async (req, res, next) => {
    try {
        console.log('addTvEvent')
        const { calendarId } = req.body
        const { content } = req.body 
        const { creds } = req;
        oauth2Client.setCredentials(creds)
        
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