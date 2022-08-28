
const getCalendar = async (req, res, next) => {
    try {
        const { calendarId } = req.query;
        if (!calendarId) {
            res.end()
        } else {
            const { oauth2Client } = req;
            const { calendar } = req;
            const response = await calendar.events.list({
                auth: oauth2Client,
                calendarId: calendarId
            })
            res.send({
                events: response.data.items,
                authUser: req.authUser
            })
        }
    } catch ( error ) {
        next( error );
    };
}

module.exports = getCalendar