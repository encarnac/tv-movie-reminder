const User = require('../models/User');


const insertCalendar = async (req, res, next) => {
    try {
        const { user } = req;
        oauth2Client.setCredentials(user.credentials);
        const response = await calendar.calendars.insert({
            auth: oauth2Client,
            requestBody: {'summary':'tv-movie'}
        });
        const updateUser = await User.updateOne(
            { _id: req.session.userId }, 
            { $set:
                { calendarId: response.data.id}
            }
        );
        console.log('INSERTED CALENDAR = ', response.data.id)
        res.send(response.data.id);
        
    } catch (error) {
        next(error);
    }
};

module.exports = insertCalendar