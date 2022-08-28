const { google } = require('googleapis')
const calendar = google.calendar('v3');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:3000'
);

const deleteEvent = async (req, res, next) => {
    try {
        const { calendarId } = req.body;
        const { eventId } = req.body;
        const { creds } = req;
        oauth2Client.setCredentials(creds)
        const response = await calendar.events.delete({
            auth: oauth2Client,
            calendarId: calendarId,
            eventId: eventId
        })
        res.send(response.data)
        
    } catch (error) {
        next(error)
    }
}

module.exports = deleteEvent