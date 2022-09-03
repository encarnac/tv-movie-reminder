
const deleteEvent = async (req, res, next) => {
    try {
        const { calendarId } = req.body;
        const { eventId } = req.body;
        const { oauth2Client } = req;
        const { calendar } = req;
        const response = await calendar.events.delete({
            auth: oauth2Client,
            calendarId: calendarId,
            eventId: eventId
        });
        res.send(response.data);
        
    } catch (error) {
        next(error);
    }
};

module.exports = deleteEvent