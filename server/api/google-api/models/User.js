const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema( {
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    credentials: {
        type: Object,
        required: true
    },
    calendarId: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
} );

module.exports = mongoose.model( 'User', UserSchema );