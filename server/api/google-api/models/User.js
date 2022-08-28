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
    // accessToken: {
    //     type: String,
    //     required: true,
    // },
    // refreshToken: {
    //     type: String,
    //     required: false,
    // },
    // expiryDate: {
    //     type: String,
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
} );

module.exports = mongoose.model( 'User', UserSchema );