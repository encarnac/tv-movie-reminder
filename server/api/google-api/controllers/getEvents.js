
const getEvents = async (req, res, next) => {
    try {
        const { calendarId } = req.query;
        const { oauth2Client } = req;
        const { calendar } = req;
        const response = await calendar.events.list({
            auth: oauth2Client,
            calendarId: calendarId
        })
        res.send(response.data.items)
    } catch ( error ) {
        next( error );
    };
}

module.exports = getEvents