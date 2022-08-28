const express = require( 'express' );
const router = express.Router();

const checkAuthMiddleware = require('./middleware/checkAuthMiddleware')
const getLoginToken = require('./controllers/loginController');
const getCalendarId = require('./controllers/getCalendarIdController')


router.post( '/login', checkAuthMiddleware, getCalendarId );

router.post( '/login', getLoginToken, getCalendarId );

const getEvents = require('./controllers/getEventsController');
router.post( '/get-events', checkAuthMiddleware, getEvents );

const deleteEvent = require('./controllers/deleteEventController');
router.post('/delete-event', checkAuthMiddleware, deleteEvent )


const addMovieEvent = require('./controllers/addMovieController');
const addTvEvent = require('./controllers/addTvController')
router.post('/add-event', addMovieEvent, addTvEvent);

module.exports = router;
