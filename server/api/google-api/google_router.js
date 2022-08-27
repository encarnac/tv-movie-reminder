const express = require( 'express' );
const router = express.Router();

const getLoginToken = require('./controllers/loginController');
router.post( '/login', getLoginToken );

const getEvents = require('./controllers/getEventsController');
router.post( '/get-events', getEvents );


const deleteEvent = require('./controllers/deleteEventController');
router.post('/delete-event', deleteEvent )


const addMovieEvent = require('./controllers/addMovieController');
const addTvEvent = require('./controllers/addTvController')
router.post('/add-event', addMovieEvent, addTvEvent);

module.exports = router;
