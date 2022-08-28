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

const insertMovieEvent = async (req, res, next) => {
    try {
        const { content } = req.body;
        if (content.category === 'movie') {
            const { calendarId } = req.body
            const { creds } = req;
            oauth2Client.setCredentials(creds)
            const event = JSON.stringify(new Event(content))
            const response = await calendar.events.insert({
                auth: oauth2Client,
                calendarId: calendarId,
                requestBody: event
            })
            res.sendStatus(response.status) 
        } else next()

    } catch(error) {
        next(error)
    }
}

module.exports = insertMovieEvent