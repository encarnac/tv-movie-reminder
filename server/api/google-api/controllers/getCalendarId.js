const User = require('../models/User')

const getCalendarId = async (req, res, next) => {
    try {
        const { oauth2Client } = req;
        const { calendar } = req;
        const response = await calendar.calendarList.list({
            auth: oauth2Client
        })

        const calendarsList = response.data.items
        const calendarId = await calendarsList.filter(
            ( cal ) => cal.summary === 'tv-movie');
            
        if (!calendarId?.length) {
            next()
        } else {
            console.log('NEED TO ADD CAL ID')
            const updateUser = await User.updateOne(
                { _id: req.session.userId }, 
                { $set:
                    { calendarId: calendarId[0].id}
                }
            );
            res.send(calendarId[0].id); 
        }

    } catch ( error ) {
        next( error );
    };
}

module.exports = getCalendarId