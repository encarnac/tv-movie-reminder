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

const getCalendarId = async (req, res, next) => {
    try {
        const { user } = req;
        oauth2Client.setCredentials(user.credentials)
        const response = await calendar.calendarList.list({
            auth: oauth2Client
        })

        const calendarsList = response.data.items
        const calendarId = await calendarsList.filter(
            ( cal ) => cal.summary === 'tv-movie');
            
        if (!calendarId?.length) {
            next()
        } else {
            console.log('NEED TO ADD CAL ID')
            const updateUser = await User.updateOne(
                { _id: user._id }, 
                { $set:
                    { calendarId: calendarId[0].id}
                }
            );
            console.log('----- CALENDAR ID = ', calendarId[0].id)
            res.send(calendarId[0].id); 
        }

    } catch ( error ) {
        next( error );
    };
}

module.exports = getCalendarId