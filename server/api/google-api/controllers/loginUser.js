const User = require('../models/User')
const { google } = require('googleapis')

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

            const newUser = {
                googleId: data.id,
                displayName: data.name,
                image: data.picture,
                email: data.email,
                credentials: tokens
            }
            const user = await User.create(newUser)
            console.log('----- CREATED NEW USER: ', user.email)
            session.userId = user.googleId;
            req.creds = user.credentials
            next()
        } else next('route');

    } catch ( error ) {
        next( error );
    };
}

module.exports = loginUser