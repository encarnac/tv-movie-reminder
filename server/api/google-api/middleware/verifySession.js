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

const verifySession = async (req, res, next) => {
    try {
        session = req.session;
        if (session.userId) {
            const user = await User.findOne({ _id: session.userId })
            console.log('Found user in database: ', user.email)
            oauth2Client.setCredentials(user.credentials)
            req.oauth2Client = oauth2Client;
            req.calendar = calendar;
            next()
        } else {
            next('route')
        }
    } catch ( error ) {
        next( error );
    };
}

module.exports = verifySession
