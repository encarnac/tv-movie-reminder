const createError = require( 'http-errors' );
const express = require( 'express' );
const path = require( 'path' );
const cookieParser = require( 'cookie-parser' );
const logger = require( 'morgan' );
const cors = require( "cors" );
const mongoose = require( 'mongoose' );
const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' );

// Paths to middleware controllers
const tmdbRouter = require( './api/tmdb-api/tmdb_router' );
const googleRouter = require( './api/google-api/google_router' );

// Express configuration
const app = express();
app.use( cors() );
app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Connect MongoDB
mongoose.connect( process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} );
const database = mongoose.connection;

database.on( 'error', ( error ) => {
    console.log( error );
});
database.once( 'connected', () => {
    console.log( 'Database Connected' );
});


// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


// Setup session with database
const oneDay = 1000 * 60 * 60 * 24;
app.use( express.urlencoded( { extended: true } ) );
app.use(
    session( {
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: oneDay },
        store: MongoStore.create( { mongoUrl: process.env.MONGO_URI } )
    } )
);

// Mounts middleware at given paths
app.use( '/google', googleRouter );
app.use( '/search', tmdbRouter );


// Catch 404 and forward to error handler
app.use( function ( req, res, next ) {
    next( createError( 404 ) );
} );

// Error handler
app.use( function ( err, req, res, next ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

    // send the error page
    res.status( err.status || 500 );
    res.send( 'error' );
} );

module.exports = app;
