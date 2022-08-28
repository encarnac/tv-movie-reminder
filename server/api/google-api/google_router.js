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

router.use(verifySession)

router.post( '/login', loginUser, getCalendarId, insertCalendar);

router.post( '/get-events', getEvents );

router.post('/delete-event', deleteEvent );

router.post('/add-event', insertMovieEvent, insertTvEvent);

router.post('/logout', logoutUser);

router.post('/revoke', revokeAuth);

module.exports = router;
