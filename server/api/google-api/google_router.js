const express = require( 'express' );
const router = express.Router();

const verifySession = require('./middleware/verifySession');
const loginUser = require('./controllers/loginUser');
const getCalendarId = require('./controllers/getCalendarId.js');
const insertCalendar = require('./controllers/insertCalendar');
const getCalendar = require('./controllers/getCalendar.js');
const deleteEvent = require('./controllers/deleteEvent.js');
const insertMovieEvent = require('./controllers/insertMovieEvent');
const insertTvEvent = require('./controllers/insertTvEvent');
const logoutUser = require('./controllers/logoutUser');


// Middleware function to check for user ID in session
router.use(verifySession);

// Login to Google and saves the user and 'tv-movie' calendar ID to DB
router.post( '/login', loginUser, getCalendarId, insertCalendar);

// Returns release dates (events) in the 'tv-movie' calendar and the user's public info
router.get( '/get-calendar', getCalendar );

// Deletes a release date (event) from the linked calendar
router.delete('/delete-event', deleteEvent );

// Adds release event to linked calendar depending on content type
router.post('/add-event', insertMovieEvent, insertTvEvent);

// Removes user data from the session 
router.post('/logout', logoutUser);

module.exports = router;
