const express = require( 'express' );
const router = express.Router();

const verifySession = require('./middleware/verifySession');
const loginUser = require('./controllers/loginUser');
const getCalendarId = require('./controllers/getCalendarId.js');
const insertCalendar = require('./controllers/insertCalendar');
const getEvents = require('./controllers/getEvents.js');
const deleteEvent = require('./controllers/deleteEvent.js');
const insertMovieEvent = require('./controllers/insertMovieEvent');
const insertTvEvent = require('./controllers/insertTvEvent');
const logoutUser = require('./controllers/logoutUser');
const revokeAuth = require('./controllers/revokeAuth');

// Middleware function to check for user ID in session
router.use(verifySession)

// Login to Google and saves the user and 'tv-movie' calendar ID to DB
router.post( '/login', loginUser, getCalendarId, insertCalendar);

// Fetches release dates (events) in the 'tv-movie' calendar
router.get( '/get-events', getEvents );

// Deletes a release date (event) from the linked calendar
router.delete('/delete-event', deleteEvent );

// Adds release event to linked calendar depending on content type
router.post('/add-event', insertMovieEvent, insertTvEvent);

// Removes user data from the session 
router.post('/logout', logoutUser);

// Revokes the access tokens linked to the user
router.post('/revoke', revokeAuth);

module.exports = router;
