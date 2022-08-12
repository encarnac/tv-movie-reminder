const express = require( 'express' );
const router = express.Router();
const { google } = require( 'googleapis' );
const axios = require('axios');
const calendar = google.calendar( 'v3' );

const CLIENT_ID = '439274580520-psn6jfl8i303hv6f86nuul7kk9c3ddhc.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:3000'
);

// Handle request for the communication pipeline with the TMDB scraper
router.post( '/login', async ( req, res, next ) => {
    try {
        const { code } = req.body;
        const { tokens } = await oauth2Client.getToken( code );
        res.cookie( 'token', tokens.refresh_token, { httpOnly: true, secure: true, sameSite: true } );
        res.send( tokens.access_token );
    } catch ( error ) {
        next( error );
    };
} );

router.post( '/get-upcoming', async ( req, res, next ) => {
    try {
        const { calendarId } = req.body;
        const { token } = req.body;
        if (!calendarId || !token) {
            res.send()
        } else {
            console.log('BACKEND ID ==', calendarId)

            const eventsUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
            console.log('BACKEND URL ==', eventsUrl)
            // const events = await axios.get(eventsUrl)
            const events = await axios({
                method: 'get',
                url: eventsUrl,
                headers: { Authorization: `Bearer ${ token }` }
                })
            console.log(events)
            res.send(events.data.items) }
    } catch ( error ) {
        next( error );
    };
});

module.exports = router;
