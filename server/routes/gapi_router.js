const express = require( 'express' );
const router = express.Router();
const { google } = require( 'googleapis' );
const axios = require('axios');
const calendar = google.calendar( 'v3' );

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

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
        const { token } = req.body;
        const { calendarId } = req.body;
        if (!calendarId || !token) {
            res.send('')
        } else {
            const eventsUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
            const eventsRes = await axios({
                method: 'get',
                url: eventsUrl,
                headers: { Authorization: `Bearer ${ token }` }
                })
            res.send(eventsRes.data.items) }
    } catch ( error ) {
        next( error );
    };
});


// router.post('/get-episodes', async (req, res, next) => {
//     try {
//         console.log('REQ TO GET EPISODES')
//         const { token } = req.body;
//         const { calendarId } = req.body;
//         const { eventId } = req.body;
//         if (!calendarId || !eventId) {
//             res.send('')
//         } else {
//             const instancesUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}/instances`
//             const instancesRes =  await axios({
//                 method: 'get',
//                 url: instancesUrl,
//                 headers: { Authorization: `Bearer ${ token }` }
//                 })
//             res.send(instancesRes.data.items)
//         }
//     } catch( error ) {
//         next( error )
//     }
// })

router.post('/delete-event', async (req, res, next) => {
    try {
        const { token } = req.body;
        const { calendarId } = req.body;
        const { eventId } = req.body;
        if (!calendarId || !eventId) {
            res.send('')
        } else {
            console.log('DEL PARAMS: ', calendarId, eventId, token)
            const delUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`
            const delRes = await axios({
                method: 'delete',
                url: delUrl,
                headers: { Authorization: `Bearer ${ token }` }
                })
            res.send(delRes.status)
        }

    } catch (error) {
        next(error)
    }
})

router.post('/add-reminder', async (req, res, next) => {
    try {
        console.log('RECEIVED REQ FOR ADD')
        const { token } = req.body
        const { calendarId } = req.body
        const { event } = req.body 
        
        console.log(JSON.stringify(event))
        const addUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
        const addRes = await axios({
                method: 'post',
                url: addUrl,
                headers: { Authorization: `Bearer ${ token }` },
                data: JSON.stringify(event)
                })
        console.log(addRes.status)
        res.sendStatus(addRes.status)
    } catch(error) {
        next(error)
    }
})



module.exports = router;
