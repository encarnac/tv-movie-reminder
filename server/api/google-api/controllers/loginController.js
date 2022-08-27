const { google } = require('googleapis')
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:3000'
);

const getLoginToken = async (req, res, next) => {
    try {
        if (Object.keys(oauth2Client.credentials).length === 0) {
            console.log('EMPTY CREDS')
        }
        const { code } = req.body;
        const { tokens } = await oauth2Client.getToken( code );
        oauth2Client.setCredentials(tokens);
        res.cookie( 'token', tokens.refresh_token, { httpOnly: true, secure: true, sameSite: true } );
        res.send( tokens.access_token );

    } catch ( error ) {
        next( error );
    };
}

module.exports = getLoginToken