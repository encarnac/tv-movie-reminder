const { google } = require('googleapis')
const calendar = google.calendar('v3');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:3000'
);

const getEvents = async (req, res, next) => {
    try {
        const { calendarId } = req.body;
        const { creds } = req;
        oauth2Client.setCredentials(creds)
        const response = await calendar.events.list({
            auth: oauth2Client,
            calendarId: calendarId
        })
        res.send(response.data.items)
    } catch ( error ) {
        next( error );
    };
}

module.exports = getEvents