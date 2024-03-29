const User = require('../models/User');
const { google } = require('googleapis');
const calendar = google.calendar('v3');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT;
const RAILWAY_STATIC_URL = process.env.RAILWAY_STATIC_URL
const CALLBACK_URL = RAILWAY_STATIC_URL ? `https://${RAILWAY_STATIC_URL}` : `http://localhost:${PORT}`

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    `${CALLBACK_URL}`
);

const verifySession = async (req, res, next) => {
    try {
        console.log('CALLBACK URL = ', CALLBACK_URL);
        session = req.session;
        if (session.userId) {
            const user = await User.findOne({ _id: session.userId });
            console.log('Found user in database: ', user.email);
            oauth2Client.setCredentials(user.credentials);
            req.oauth2Client = oauth2Client;
            req.calendar = calendar;
            req.authUser = { 
                googleId: user.googleId,
                displayName: user.displayName,
                firstName: user.firstName,
                email: user.email,
                image: user.image
            };
            next();
        } else {
            next('route');
        }

    } catch ( error ) {
        next( error );
    };
};

module.exports = verifySession
