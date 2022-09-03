const Event = require('../models/Event');
const { google } = require('googleapis');

const revokeAuth = async (req, res, next) => {
    try {
        const { email } = req.user;
        const { _id } = req.user;
        google.accounts.id.revoke('user@google.com', done => {
            Event.deleteOne( { _id: _id } )
            res.send(200)
        });
    } catch ( error ) {
        next( error );
    };
};

module.exports = revokeAuth