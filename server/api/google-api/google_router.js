const express = require( 'express' );
const router = express.Router();

const verifySession = require('./middleware/verifySession');
const loginUser = require('./controllers/loginUser');
const getCalendarId = require('./controllers/getCalendarId.js');
const insertCalendar = require('./controllers/insertCalendar');
// router.post( '/login', verifySession, getCalendarId, insertCalendar);

// Login user, find/save calendarId to user document, save user to DB, returnCalendarId 
router.post( '/login', loginUser, getCalendarId, insertCalendar);

const getEvents = require('./controllers/getEvents.js');
router.post( '/get-events', verifySession, getEvents );

const deleteEvent = require('./controllers/deleteEvent.js');
router.post('/delete-event', verifySession, deleteEvent )

const insertMovieEvent = require('./controllers/insertMovieEvent');
const insertTvEvent = require('./controllers/insertTvEvent')
router.post('/add-event', verifySession, insertMovieEvent, insertTvEvent);

const logoutUser = require('./controllers/logoutUser')
router.post('/logout', logoutUser)

module.exports = router;
