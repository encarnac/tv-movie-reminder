const express = require( 'express' );
const router = express.Router();
const axios = require('axios');
const { google } = require( 'googleapis' );
const Event = require('../models/Event')

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'http://localhost:3000'
);

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



router.post('/add-reminder', addMovie, addShow);
async function addMovie(req, res, next) {
    try {
        const { token } = req.body
        const { calendarId } = req.body
        const { content } = req.body 
        
        console.log('CATEGORY = ', content.category)
        if (content.category === 'movie') {
            const event = JSON.stringify(new Event(content))
            const addRes = await axios({
                method: 'POST',
                url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
                headers: { Authorization: `Bearer ${ token }` },
                data: event
                })
            console.log(addRes.status)
            res.sendStatus(addRes.status)           
        } else next()
    } catch(error) {
        next(error)
    }
}


async function addShow(req, res, next) {
    try {
        const { token } = req.body
        const { calendarId } = req.body
        const { content } = req.body 
        const { title } = content
        
        let promises = []
        for ( const episode of content.season_episodes) {
            if (new Date(episode.air_date) < new Date()) continue
            else {
                content.release = episode.air_date;
                content.title = `${ title } (S${ content.season_count }x${ episode.episode_number })`;
                const event = JSON.stringify(new Event(content))
                const addRes = await axios({
                    method: 'POST',
                    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
                    headers: { Authorization: `Bearer ${ token }` },
                    data: event
                })
                promises.push(addRes.data)
            }
        }
        const data = await Promise.all(promises);
        res.send(data)
    } catch(error) {
        next(error)
    }
}


module.exports = router;
