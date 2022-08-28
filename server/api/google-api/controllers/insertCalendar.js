const User = require('../models/User')
const { google } = require('googleapis')
const calendar = google.calendar('v3');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:3000'
);

const insertCalendar = async (req, res, next) => {
    try {
        const { user } = req;
        oauth2Client.setCredentials(user.credentials)
        const response = await calendar.calendars.insert({
            auth: oauth2Client,
            requestBody: {'summary':'tv-movie'}
        })
        const updateUser = await User.updateOne(
            { _id: user._id }, 
            { $set:
                { calendarId: response.data.id}
            }
        );
        console.log('INSERTED CALENDAR = ', response.data.id)
        res.send(response.data.id)
        
    } catch (error) {
        next(error)
    }
}

module.exports = insertCalendar