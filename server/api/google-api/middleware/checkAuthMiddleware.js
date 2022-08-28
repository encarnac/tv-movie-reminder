const User = require('../models/User')

const checkAuthMiddleware = async (req, res, next) => {
    try {
        session = req.session;
        if (session.userId) {
            const user = await User.findOne({ googleId: session.userId })
            console.log('----- FOUND USER IN DB: ', user.displayName)
            req.creds = user.credentials
            next()
        } else {
            next('route')
        }
    } catch ( error ) {
        next( error );
    };
}

module.exports = checkAuthMiddleware
