const User = require('../models/User')

const checkAuthMiddleware = async (req, res, next) => {
    try {
        session = req.session;
        if (session.userId) {
            const user = await User.findOne({ googleId: session.userId })
            console.log('FOUND ID IN DB = ', user)
            res.send(user.accessToken)
        } else {
            next()
        }
    } catch ( error ) {
        next( error );
    };
}

module.exports = checkAuthMiddleware