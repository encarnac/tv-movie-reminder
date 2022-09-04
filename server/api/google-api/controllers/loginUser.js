const User = require('../models/User');
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:3000'
);

const loginUser = async (req, res, next) => {
    try {
        session = req.session;
        if (!session.userId) {
            const { code } = req.body;
            const { tokens } = await oauth2Client.getToken( code );
            oauth2Client.setCredentials(tokens);

            const oauth2 = google.oauth2({
                auth: oauth2Client,
                version: 'v2',
            });
            const { data } = await oauth2.userinfo.get();

            console.log('USER DATA = ', data)
            const newUser = {
                googleId: data.id,
                displayName: data.name,
                firstName: data.given_name,
                image: data.picture,
                email: data.email,
                credentials: tokens,
                calendarId: ''
            };
            const user = await User.create(newUser);
            console.log(' Added new Google account: ', user.email);
            session.userId = user._id;
            req.oauth2Client = oauth2Client;
            req.calendar = google.calendar('v3');
            next();
        } else next();

    } catch ( error ) {
        next( error );
    };
};

module.exports = loginUser